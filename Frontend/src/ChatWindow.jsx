import React from 'react'
import "./styles/chatWindow.css"
import { useState } from 'react';
import Chat from "./Chat.jsx"


export default function ChatWindow() {
   

 
  return (
    <div className='chatWindow'>
        <nav>
         <div className='gpt'>
            <span>My-Gpt <i className="fa-solid fa-caret-down"></i></span>
        </div>
        <div>
            <span className='img'>
                <i className="profile fa-solid fa-user"></i>
            </span>
        </div>
       </nav>
         <Chat />
    </div>
  )
}
