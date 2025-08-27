import React, { useState, useRef, useEffect, useContext } from 'react'
import "./styles/chat.css"
import { ScaleLoader } from "react-spinners";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import ReactMarkdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"
import {ChatContext} from "./useContext"

export default function Chat() {
  // const [input, setInput] = useState("");
  const {input,setInput,threadId,setThreadId}=useContext(ChatContext)

  const [loading, setLoading] = useState(false);
//  const [chats, setChats] = useState([]);
  const {chats,setChats}=useContext(ChatContext)

  const messagesEndRef = useRef(null);

  // Auto-scroll when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  async function getResponse() {
    if (!input.trim()) return;
    setLoading(true);

    // Add user message
    const userMessage = { role: "user", content: input };
    setChats(prev => [...prev, userMessage]);

    const currentInput = input;
    setInput("");

    try {
      const response = await axios.post("http://localhost:8000/api/chat", {
        message: currentInput,
        threadId
      });

      
      const botMessage = { role: "assistant", content: "" };
      setChats(prev => [...prev, botMessage]);

      //typing words egfect
      const words = response.data.reply.split(" ");
      let i = 0;

      const interval = setInterval(() => {
        if (i < words.length) {
          setChats(prev => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              ...updated[updated.length - 1],
              content: updated[updated.length - 1].content + (i === 0 ? "" : " ") + words[i]
            };
            return updated;
          });
          i++;
        } else {
          clearInterval(interval);
          setLoading(false);
        }
      }, 30); 
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }

  return (
    <div className='chatContainer'>
      <div className="messages">
        {chats.map((chat, index) => (
          <div key={index} className={chat.role === "user" ? "userDiv" : "gptDiv"}>
            <div className={chat.role === "user" ? "user" : "gpt"}>
              <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                {chat.content}
              </ReactMarkdown>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className='inputDiv'>
        {loading && <ScaleLoader loading={loading} color='white' />}
        <input
          placeholder='Ask me anything'
          className='input'
          onKeyDown={(e) => e.key === "Enter" ? getResponse() : null}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className='para'>
          <p>ChatGPT can make mistakes. Check important info. See <span>Cookie Preferences.</span></p>
        </div>
      </div>
    </div>
  );
}
