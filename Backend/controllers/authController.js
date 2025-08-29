import mongoose from "mongoose"
import express from "express"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {User} from "../models/userModel.js"
import dotenv from "dotenv";
dotenv.config();

export const Signup=async (req,res)=>{
const {username,email,password}=req.body;
try{
    if(!username || !email || !password){
    alert("fill all details");
    return;
}
const user=await User.findOne({username});
if(user){
    return res.status(401).json({message:"User already Exists"});
}
const salt=await bcrypt.genSalt(10);
const hashedPassword=await bcrypt.hash(password,salt);
const newUser=await User({
    username,email,password:hashedPassword
})
newUser.save();
const token=await jwt.sign(
    {id:newUser._id},
    process.env.JWT_SECRET,
    {expiresIn:"1h"}

)
res.status(201).json({token:token,userId:newUser._id});

}catch(err){
    console.log(err);
    res.status(400).json({message:err});
}
    
}
export const Login=async (req,res)=>{
    const {username,password}=req.body;
    try{
        //  if(!username||!password){
        //     return res.json({message:"fill ll detaailes"});
        //  }
         const user=await User.findOne({username});
         if(!user){
            return res.status(400).json({message:"user not existed "});

         }
         const isMatch=await bcrypt.compare(password,user.password);
         if(!isMatch){
            return res.status(404).json({messag:"password missmatch"});
         }
         const token=jwt.sign(
            {user:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"1h"}
         )
         res.status(200).json({token:token,
        id: user._id,
        // username: user.username,
        // email: user.email, // only if you have it in schema
      },)
    }catch(err){
        console.log(err);
    res.status(400).json({message:err});
    }
}
