const userModel=require('../Models/user.model');

const jwt=require('jsonwebtoken');


async function registerUser(req,res){
    const {username, email, password, role=user}=req.body;    //requested the user details from the frontend

    const isuserexists= await userModel.findOne({      
        $or:[
            {username},               //find if the user already exists or not 
            {email}
        ]
    });


    if(isuserexists){
        return res.status(409).json(
            {message: "User already exists"}              // made a condition to check if the user exists or not 
        );
    }

    const user=await userModel.create(
        {
            username,
            email,                // registerd the user by creating the data for the user
            password,
            role
        }
    )

    const token=jwt.sign({
        id:user._id,                         //created  the token for the user 
        role: user.role,
    }, process.env.JWT_SECRET)          

    res.cookies("token", token)              //saved the token into the cookie storage 

    res.status(201).json({
        message: "user created successfully",    
        user:{
            id: user._id,
            username: user.username,              // responded to the backend that the user is created 
            email: user.email,
            role: user.role,
        }
    })
    

};

module.exports={registerUser};