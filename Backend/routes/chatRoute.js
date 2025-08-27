import mongoose from "mongoose";
import express from "express";
import { getAllThreads, getThreadById,deleteThreadById } from "../controllers/threadController.js";
import {chatMessage,createThread} from "../controllers/chatController.js";

const router=express.Router();
router.post("/api/chat",chatMessage);
//router.post("/api/create",createThread);
router.get("/thread/getall",getAllThreads);
router.get("/thread/getbyid/:id",getThreadById)
router.delete("/thread/deletebyid/:id",deleteThreadById)




export default router;