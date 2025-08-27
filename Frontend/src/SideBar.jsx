import React, { useContext, useEffect, useState } from 'react'
import "./styles/sideBar.css"
import { ChatContext } from './useContext'
import axios from 'axios';
import { v1 as uuidv1 } from "uuid";
import dotenv from "dotenv";

dotenv.config();

export default function SideBar() {
  const { setInput, setChats, setThreadId } = useContext(ChatContext);
  const [threads, setThreads] = useState([]);

  
  useEffect(() => {
    const getResponse = async () => {
      try {
        const response = await axios(`${import.meta.env.VITE_API_URL}/thread/getall`);
        const threadsArray = response.data.allThreads;

        const filteredData = threadsArray.map(thread => {
          const userMessages = thread.messages.filter(m => m.role === "user");
          return userMessages.length > 0
            ? { threadId: thread.threadId, question: userMessages[0].content }
            : null;
        }).filter(Boolean);

        setThreads(filteredData);
      } catch (err) {
        console.error("Error fetching threads:", err);
      }
    };

    getResponse();
  }, []);


  const newChat = () => {
    setInput("");
    const newId = uuidv1();
    setThreadId(newId);
    setChats([]);
  };

  
  const getInfo = async (threadId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/thread/getbyid/${threadId}`);
      const thread = response.data;
      console.log("Loaded thread:", thread);

      setChats(thread.messages);
      setThreadId(thread.threadId);
      setInput("");
    } catch (err) {
      console.error("Error loading thread:", err);
    }
  };


  const deleteThread = async (threadId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/thread/deletebyid/${threadId}`);
     
      setThreads(prev => prev.filter(t => t.threadId !== threadId));
     
    } catch (err) {
      console.log(err);
    
    }
  };

  return (
    <div className='sideBar'>
      <button className='button' onClick={newChat}>
        <img src="src/assets/blacklogo.png" alt='logo' className='logo' />
        <i className="fa-solid fa-pen-to-square"></i>
      </button>
      
      <ul className='history'>
        {threads.map((t) => (
          <li key={t.threadId} onClick={() => getInfo(t.threadId)}>
            {t.question}
            <i 
              className="fa-solid fa-trash"
              onClick={(e) => { e.stopPropagation(); deleteThread(t.threadId); }}
             // style={{ marginLeft: "10px", cursor: "pointer", color: "red" }}
            ></i>
          </li>
        ))}
      </ul>

      <div className='sign'>
        <p>from Badri &hearts;</p>
      </div>
    </div>
  )
}
