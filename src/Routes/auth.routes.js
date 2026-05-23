const express=require('express');
const Authcontroller=require('../Controllers/auth.controller');

const router=express.Router();

router.post('/register',Authcontroller.registerUser);


module.exports=router;
 