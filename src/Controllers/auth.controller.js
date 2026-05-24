const userModel=require('../Models/user.model');

const jwt=require('jsonwebtoken');


async function registerUser(req,res){

    const {username , email, password}=req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(409).json({
             message: "User already exists"
         });
    }

    const user= await userModel.create({
        username,
        email,
        password
    });

    const token=jwt.sign({ id },
         process.env.JWT_SECRET,
          { expiresIn: "7d"});

    res.cookie("token", token);

    res.status(201).json({
      message:"user created succesfully",
      _id: user._id,
      name: user.username,
      email: user.email,
      token: token
    });
};

module.exports={registerUser};