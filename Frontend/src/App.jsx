import { useState } from 'react'
import Chat from './Chat'
import ChatWindow from './ChatWindow'
import "./App.css"
import SideBar from './SideBar'
import {ContextProvide} from "./useContext.jsx"
// import  SignIn from "./authForm/Signup.jsx"

function App() {


  return (
    <>
  
    <div className='app'>
     
      <SideBar/>
     
     <ChatWindow />
          

    </div>
   
    </>
  )
}

export default App
