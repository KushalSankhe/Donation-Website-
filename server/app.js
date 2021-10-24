const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app =express();


dotenv.config({path: './config.env'});



dotenv.config({path: './config.env'});

require('./db/conn');
app.use(express.json());


app.use(require('./router/auth'));

// const User =requrie('./model/userSchema');
const PORT=process.env.PORT;

//middleware
const middlewaver =(req,res,next)=>{
console.log('hello from kushal server');
next();
}




app.get('/',(req,res)=>{
    res.send('hello world from the server app.js');
});
app.get('/about',middlewaver, (req,res)=>{
    res.send('hello about world from the server');
});
app.get('/login',(req,res)=>{
    res.send('hello login world from the server');
});
app.get('/contact',(req,res)=>{
    res.send('hello contact world from the server');
});
app.get('/signup',(req,res)=>{
    res.send('hello  signup world from the server');
});

app.listen(PORT, ()=>{
    console.log(`server is running at ${PORT}`);
});
