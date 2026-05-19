const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true, //this means thAT USERNAME IS ALWAYS REQUIRED
        unique:true //THIS IS UNIQUE FOR EACH USERNAME
    },
    email:{
        type:String,
        required:true, //this means thAT EMAIL IS ALWAYS REQUIRED
        unique:true //THIS IS UNIQUE FOR EACH EMAIL
    },
    password:{
        type:String,
        required:true //this means thAT PASSWORD IS ALWAYS REQUIRED
    },
    role:{
        type:String,
        enum:['artist','user'], //ENUM IS USED TO SPECIFY THE ALLOWED VALUES FOR THE ROLE FIELD
        default:'user'//DEFAULT VALUE FOR ROLE IS USER
    }

});

const usermodel=mongoose.model('User',userSchema); 

module.exports=usermodel;

