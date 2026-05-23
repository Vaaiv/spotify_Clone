const userModel=require('../Models/user.model');

const jwt=require('jsonwebtoken');


async function registerUser(req,res){

    const {username , email, password}=req.body;

    const user= await userModel.create({
        username,
        email,
        password
    });

    const token=jwt.sign({ id },
         process.env.JWT_SECRET,
          { expiresIn: "7d"});

    res.status(201).json({
      message:"user created succesfully",
      _id: user._id,
      name: user.username,
      email: user.email,
      token: token
    });

};

module.exports={registerUser};