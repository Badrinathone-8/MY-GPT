import React from 'react'
import "./styles/chatWindow.css"
import { useState } from 'react';
import Chat from "./Chat.jsx"
import { useContext } from 'react';
import { ChatContext } from './useContext.jsx';
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer, toast } from "react-toastify";
import { useEffect } from 'react';





export default function ChatWindow() {
   const {setCurrentUser,setChats,setInput,setThreads}=useContext(ChatContext);
const [open,setOpen]=useState(false);
const [Logout,setLogout]=useState(false);



function setProfile(){
  if(open){
    setOpen(false);
  }else{
    setOpen(true);
  }
}
function logout(){
  localStorage.removeItem("userId");
  localStorage.removeItem("token")
  setCurrentUser(null)
  setChats([]);
  setInput("");
  // setThreads([]);
       toast.success("Login successful 🎉", { autoClose: 1000 });

       setLogout(true) // disappears in 2s

    
  
}
 
  return (
    <div className='chatWindow'>
        <nav>
         <div className='gpt'>
            <span>My-Gpt <i className="fa-solid fa-caret-down"></i></span>
        </div>
        <div>
            <span className='img'>
                <i onClick={setProfile} className="profile fa-solid fa-user"></i>
            </span>
          
        </div>
        
       </nav>
      {open? <div className='dropdown'>
        <p><i className="fa-solid fa-cloud-arrow-up"></i> Upgrade plan</p>
        <p><i className="fa-solid fa-gear"></i> setting</p>
        <p onClick={!Logout?logout:null} disable={Logout}  ><i className="fa-solid fa-arrow-right-from-bracket"></i> logout</p>
       </div>:""}
         <Chat />
                         <ToastContainer /> 
         
    </div>
  )
}
