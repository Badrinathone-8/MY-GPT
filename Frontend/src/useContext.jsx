import React from "react";
import { useState,useContext,createContext,useEffect } from "react";
import {v4 as uuidv4} from "uuid"

export const ChatContext=createContext();
export const ContextProvide=({children})=>{
    const [input,setInput]=useState("");
    const [chats,setChats]=useState([]);
    const [currentUser,setCurrentUser]=useState("");
    const [threads, setThreads] = useState([]);

    useEffect(()=>{
      const userId=localStorage.getItem("userId");
      if(userId){
        setCurrentUser(userId);
      }
    },[])
      const [threadId,setThreadId] = useState(uuidv4());
    return(
    <ChatContext.Provider value={{threads, setThreads,currentUser,setCurrentUser,input,setInput,chats,setChats,threadId,setThreadId}}>
        {children}
    </ChatContext.Provider>
)

}
