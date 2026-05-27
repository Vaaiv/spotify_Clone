const userModel = require('../Models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function registerUser(req, res) {
    const { username, email, password, role = "user" } = req.body;

    const isUserExists = await userModel.findOne({
        $or: [{ username }, { email }]
    });

    if (isUserExists) {
        return res.status(409).json({ message: "User already exists" });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hash,
        role
    });

    const token = jwt.sign({
        id: user._id,
        role: user.role,
    }, process.env.JWT_SECRET);

    res.cookie("token", token);

    res.status(201).json({
        message: "user created successfully",
        user: {
            id: user._id,
            username: user.username,
            password: user.password,
            email: user.email,
            role: user.role,
        }
    });
}

async function loginUser(req, res){
    try {
        const { username, email, password } = req.body;

        // Find user by username OR email
        const user = await userModel.findOne({
            $or: [{ username }, { email }]
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare password with hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Sign token with user id
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // Set token in cookie
        res.cookie("token", token);

        res.status(200).json({
            message: "User logged in",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = { registerUser, loginUser };