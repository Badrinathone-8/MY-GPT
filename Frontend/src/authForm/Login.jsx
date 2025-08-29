import React from 'react'
import { useState,useEffect } from 'react'
import axios from "axios";
import { useContext } from 'react';
import {ChatContext} from "../useContext"
import Chat from '../Chat';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "../styles/signup.css"
import "react-toastify/dist/ReactToastify.css";
import {Link} from "react-router-dom"
import server from '../environment.js'

export default function Login() {
    const {currentUser,setCurrentUser}=useContext(ChatContext);
    const [username,setUserName]=useState("");
    const [password,setPassword]=useState("");
    const navigator=useNavigate();

async function login(){
    // const {username,password}=req.body;
   try{
     const response=await axios.post(`{server}/api/login`,{
        username,
        password,
    })
    localStorage.setItem("userId",response.data.id);
    localStorage.setItem("token",response.data.token);
    setCurrentUser(response.data.id);
    console.log(response.data.token);
    console.log(response.data.id);
   toast.success("Login successful 🎉", { autoClose: 1000 }); // disappears in 2s
setTimeout(()=>{
    navigator("/")
},2000)

   }catch(err){
    console.log(err);
    toast.error("Login falied",{autoClose:1000});
    // res.status(500).send("error on login");
   }

}

  return (
   <div className='contain'>
        <div className='signupDiv'><h2>Login to GPT</h2>
        <label htmlFor ="username" >username</label>
        <input id= "username" onChange={(e)=>setUserName(e.target.value)} value={username}></input>
                    <br></br>
                
                    
       
               
         <label htmlFor="password" >password</label>
        <input  id="password"onChange={(e)=>setPassword(e.target.value)} value={password} ></input>
       <div className='btnDiv'>
         <button className='btnn'onClick={login}>Login</button>
       </div>
                <br></br>
               <div className='end'>
                 <p>or</p>
                
                <h4>Create new Account ? <Link to="/signup"><span>Signup</span></Link></h4>
               </div>
                <ToastContainer /> 
      </div>

      </div>  

  )
}
