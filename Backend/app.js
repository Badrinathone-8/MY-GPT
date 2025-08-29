import OpenAI from "openai";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import router from "./routes/chatRoute.js"


dotenv.config();

const app=express();



app.use(cors({ origin: "*" }));
app.use(express.json());
 
const server=async ()=>{
     mongoose.connect(process.env.MYKEY).then(()=>{
        console.log("Server is connected");

     }).catch((err)=>{
        console.log(err);
     })
}
server();
app.use(router);

const PORT = process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log(`http://localhost:8000`);
})

