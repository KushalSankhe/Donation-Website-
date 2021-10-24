const jwt=require('jsonwebtoken');
const express= require ('express');
const router =express.Router();
const bcrypt = require('bcryptjs');


require('../db/conn');
const User =require("../model/userSchema")

router.get('/',(req,res)=>{
    res.send('hello world from the server auth.js');
});

router.post('/register', async (req,res)=>{
    const { name, email, phone , work , password, cpassword}=req.body;
    if(!name || !email || !phone  || !work  || !password || !cpassword ){
        return res.status(422).json({error:'plz filled the field properly'});
    }
    try{
       const userExist = await User.findOne({email:email});
       if (userExist){
        return res.status(422).json({error: "Email already Exist"});
    } 
    else if(password !=cpassword){
        return res.status(422).json({error:"password are not matching"});
    }
    
    
    else{


    const user=new User({ name, email, phone , work , password, cpassword});


         await user.save();
         res.status(201).json({message:'User registered successfully'})
    }
    

    
    // else{
    //     res.status(500).json({error:'failed to register'});
    // }

    } catch(err){
        console.log(err)
    }
});


// login

router.post('/signin', async (req,res)=>{
    // console.log(req.body);
    // res.json({message:'awesome bhai'});

    try{
        let token; 
        const {email,password} = req.body;
        if (!email || !password){
            return res.status(400).json({error:"Pls filled the data!"})
        }
    
        const userLogin= await User.findOne({ email :email });
        if(userLogin){
                const isMatch = await bcrypt.compare(password,userLogin.password);

                 token = await userLogin.generateAuthToken();
                 console.log(token);
                res.cookie("jwtoken",token,{
                    expiers: new Date(Date.now()+ 25892000000),
                    httpOnly:true
                })

                if (!isMatch){
                    return res.status(400).json({error:'Invalid credentials '});
                } else{
                    res.json({message:'User signin successful'});
                }
    }
    else{
        return res.status(400).json({error:'Invalid credentials '});
    }
    } catch(err){
        console.log(err);
    }
});




// Using promises
// router.post('/register', async (req,res)=>{
//     const { name, email, phone , work , password, cpassword}=req.body;
//     if(!name || !email || !phone  || !work  || !password || !cpassword ){
//         return res.status(422).json({error:'plz filled the field properly'});
//     }

//     // to check whether the email exsits or not  we shall not use in contact us page
//     User.findOne({email:email})
//     .then((userExist)=>{
//         if (userExist){
//             return res.status(422).json({error: "Email already Exist"});
//         }
//         const user=new User({ name, email, phone , work , password, cpassword});
//         user.save().then(()=>{
//             res.status(201).json({message:'User registered successfully'})
//         }).catch((err)=>res.status(500).json({error:'failed to register'}) );
//     }).catch((err)=>{console.log(err);});
// });

module.exports =router; 