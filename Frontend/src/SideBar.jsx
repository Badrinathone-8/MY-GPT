import React, { useContext, useEffect } from 'react';
import "./styles/sideBar.css";
import { ChatContext } from './useContext';
import axios from 'axios';
import { v1 as uuidv1 } from "uuid";

import server from './environment.js';
import blackLogo from './assets/blacklogo.png'; 
export default function SideBar() {
  const { setInput, setChats, setThreadId, threads, setThreads } = useContext(ChatContext);

  useEffect(() => {
    const getResponse = async () => {
      try {
        const response = await axios.get(`${server}/thread/getall`);
        const threadsArray = response.data.allThreads;

        const filteredData = threadsArray
          .map(thread => {
            const userMessages = thread.messages.filter(m => m.role === "user");
            return userMessages.length > 0
              ? { threadId: thread.threadId, question: userMessages[0].content }
              : null;
          })
          .filter(Boolean);

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
      const response = await axios.get(`${server}/thread/getbyid/${threadId}`);
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
      await axios.delete(`${server}/thread/deletebyid/${threadId}`);
      setThreads(prev => prev.filter(t => t.threadId !== threadId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='sideBar'>
      <button className='button' onClick={newChat}>
        <img src={blackLogo} alt='logo' className='logo' /> {/* ✅ use imported image */}
        <i className="fa-solid fa-pen-to-square"></i>
      </button>
      
      <ul className='history'>
        {threads.map((t) => (
          <li key={t.threadId} onClick={() => getInfo(t.threadId)}>
            {t.question}
            <i 
              className="fa-solid fa-trash"
              onClick={(e) => { e.stopPropagation(); deleteThread(t.threadId); }}
            ></i>
          </li>
        ))}
      </ul>

      <div className='sign'>
        <p>from Badri &hearts;</p>
      </div>
    </div>
  );
}
