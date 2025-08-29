import mongoose from "mongoose";

const MessageSchema=mongoose.Schema({
   
    role:{
        type:String,
        enum:["user","assistant"],
        //require:true,
    },
    content:{
        type:String,
        require:true,
    },
    timeStamp:{
        type:Date,
        default:Date.now
    }
})
const ThreadSchema=mongoose.Schema({
    threadId:{
        type:String,
        require:true,
        unique:true,
    },
    title:{
        type:String,
        default:"New Chat"

    },
    messages:[MessageSchema],
    createdAt:{
        type:Date,
        default:Date.now,
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
})
const Thread=new mongoose.model("Thread",ThreadSchema);
export default Thread;
