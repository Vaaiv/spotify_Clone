const express=require('express');
const app=express();
const AuthRoutes=require('../src/Routes/auth.routes')
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

app.use("api/auth", AuthRoutes);

module.exports=app;