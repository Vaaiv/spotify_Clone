const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({ //define the structure of the data 
    username : String,
    email: string,
    password: string
});

const userModel=mongoose.model("user", userSchema); //make that data to work 

module.exports=userModel;