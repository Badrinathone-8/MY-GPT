import mongoose from "mongoose";
import express from "express";
import Thread from "../models/threadSchema.js"; 

export  const getAllThreads=async(req,res)=>{
    const allThreads=await Thread.find({});
    if(allThreads.length==0){
        return res.status(500).json({message:"no threads are presented"});
    }
    res.status(200).json({allThreads});
}
export  const getThreadById =async(req,res)=>{
    const {id}=req.params;
    try{
        const user=await Thread.findOne({threadId:id});
        if(!user){
            return res.status(404).json({message:"user not existed"})
        }
        res.status(200).json(user);
    }catch(err){
        res.status(400).json({messgae:"Error on getiing thread by id"});
        console.log(err);
    }
}
export const deleteThreadById=async(req,res)=>{
    const {id}=req.params;
    try{
        const user=await Thread.findOneAndDelete({threadId:id});
        if(!user){
            return res.status(404).json({message:"user not existed"})
        }
        res.status(200).json({message:`${user} deleted sucessfully`});

    }catch(err){
        res.status(400).json({messgae:"Error on deleting thread by id"});
        console.log(err);
    }
}
