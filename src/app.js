const express=require('express');
const app=express();
const cookieParser = require("cookie-parser");
const AuthRoutes=require('../src/Routes/auth.routes');
const postRoutes=require('../src/Routes/postRoutes');

app.use(express.json());
app.use(cookieParser());

app.use("api/auth", AuthRoutes);

module.exports=app;