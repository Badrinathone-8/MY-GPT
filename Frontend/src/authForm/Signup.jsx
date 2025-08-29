import React from 'react'
import "../styles/signup.css"
import { useState } from 'react'
import axios from 'axios';
import {useNavigate} from "react-router-dom"
import { useContext } from 'react';
import {ChatContext} from "../useContext"
import {Link } from "react-router-dom"
import server from '../environment.js'



export default function Signup() {

const [username,setUserName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('')
  const {setCurrentUser}=useContext(ChatContext)
  const navigator=useNavigate();

async function signup(){
  const response=await axios.post(`${server}/api/signup`,{
        username,
        email,
        password,

  })
  // const result=response.data
  const result=await response.data;
localStorage.setItem("token",result.token);
localStorage.setItem("userId",response.data.userId)
console.log(response.data.userId);
console.log(response.data.token);

setCurrentUser(response.data.userId);
navigator("/");
}
  return (
 <div className='contain'>
        <div className='signupDiv'><h2>Signup  to GPT</h2>
        <label htmlFor ="username" >username</label>
        <input id= "username" onChange={(e)=>setUserName(e.target.value)} value={username}></input>
                    <br></br>
                
                    
       
               <label htmlFor="email" >email</label>
        <input  id="email" onChange={(e)=>setEmail(e.target.value)} value={email}></input>
                        <br></br>

         <label htmlFor="password" >password</label>
        <input  id="password"onChange={(e)=>setPassword(e.target.value)} value={password} ></input>
       <div className='btnDiv'>
         <button className='btnn'onClick={signup}>Signup</button>
       </div>
                <br></br>
               <div className='end'>
                 <p>or</p>
                
                <h4>have an Account? <Link to="/login"><span>Login</span></Link></h4>
               </div>
      </div>

      </div>  
      )
}
