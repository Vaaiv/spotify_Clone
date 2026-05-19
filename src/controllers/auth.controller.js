const userModel=require('../Models/user.model');
const jwt=require('jsonwebtoken');

const bcrypt=require('bcrypt');




async function registerUser(req,res){
    const {username,email,password,role='user'}=req.body;

    const useralreadyExists=await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if(useralreadyExists){
        return res.status(400).json({message:'Username or email already exists'});
    }

    const hash=await bcrypt.hash(password,10);


    const user=new userModel.create({
        username,
        email,
        password,
        role
    });
    

    const  token=jwt.sign({
        id:user._id,
        role:user.role
    },process.env.JWT_SECRET);    

    res.cookie('token',token);

    res.status(201).json({message:'User registered successfully',
        user:{
            id:user._id,
            username:user.username,
            email:user.email,
            role:user.role

        },
    
    });

}

async function loginUser(req,res){
    const {username,email,password}=req.body;
    
}

module.exports={
    registerUser
};