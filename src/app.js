const express=require('express');
const app=express();
const AuthRoutes=require('../src/Routes/auth.routes')

app.use(express.json());

app.use("api/auth", AuthRoutes);

module.exports=app;