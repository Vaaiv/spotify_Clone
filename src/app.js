const express=require('express');
const cookieParser=require('cookie-parser');
const authRoutes=require('./Routes/auth.routes');




const app=express();
app.use('/api/auth',authRoutes); //THIS IS THE BASE URL FOR ALL AUTHENTICATION-RELATED ROUTES. ANY REQUESTS TO ROUTES STARTING WITH /api/auth WILL BE HANDLED BY THE authRoutes MODULE.

app.use(express.json());
app.use(cookieParser());






module.exports=app;
