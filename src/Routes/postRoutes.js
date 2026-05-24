const express=require("express");
const jwt=require("jsonwebtoken");
const userModel = require("../Models/user.model");




const Router=express.Router();




Router.post("/create", async (req,res)=>{



    console.log(req.body);

    const token=req.cookies.token;

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);// REGISTER  → jwt.sign(user._id)   → token saved to cookie
                                                               // ANY ROUTE → jwt.verify(token)    → decodes id → find user in DB
                                                               // JWT_SECRET never leaves server — if cookie tampered → verify throws 

                                                            
        console.log(jwt.decoded);


        const user=await userModel.findOne({
            _id: decoded._id,
        });

        console.log(user);
    }
    catch(err){
        return res.status(401).json({
            message: "token is invalid",
        });
    }



    console.log(req.cookies);



    res.send("post created successfully");





});

mode