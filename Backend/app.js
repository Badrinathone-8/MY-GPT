import OpenAI from "openai";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import router from "./routes/chatRoute.js"


dotenv.config();

const app=express();

const allowedOrigins = [
  "http://localhost:8000",               
  "https://badri-gpt.onrender.com"  ,
  "http://localhost:5173"
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like Postman or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true // if you need cookies/auth headers
}));
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

