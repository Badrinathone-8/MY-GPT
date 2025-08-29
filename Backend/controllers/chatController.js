import mongoose from "mongoose";
import OpenAI from "openai";
import dotenv from "dotenv";
import Thread from "../models/threadSchema.js";



dotenv.config();

export const chatMessage=async(req,res)=>{
  
    const {threadId,message}=req.body;
    try{
      let thread=await Thread.findOne({threadId});
      if(!thread){
        thread= new Thread({
            threadId,
            titile:"new thread",
            messages:[],
        })
        await thread.save();
      }
      thread.messages.push({role:"user",content:message});
      await thread.save();
        let client = new OpenAI({
  apiKey: process.env['MY-GPT-KEY'], 
  baseURL: "https://api.groq.com/openai/v1", // Groq's endpoint
});
       
        const response=await client.chat.completions.create({
            model: "llama-3.3-70b-versatile", // pick Groq model
    messages: [
      { role: "system", content: "You are a helpful coding assistant. Always address the user as 'dear' in every response." },
     // { role: "user", content: "Are semicolons optional in JavaScript?" },
      
      {role:"user",content:message}
    ]
         

        })
        const aiReply=response.choices[0].message.content
         //res.status(200).json()
         thread.messages.push({role:"assistant",content:aiReply})
               thread.updatedAt=new Date();

         await thread.save();
         res.status(200).json({ reply: aiReply, threadId: thread });
    }catch(err){
        res.status(400).send("Error on gettig message")
        console.log(err);
    }  
    
}

 export const createThread=async (req,res)=>{
    const {threadId,title}=req.body;
    const user= await Thread.findOne({threadId});
    if(user){
        res.status(200).json({message:"user is already created"});
    }

    const newUser=new Thread({
        threadId,
        title,
    })
    await newUser.save();
    res.status(200).send({message:newUser})
 }
;