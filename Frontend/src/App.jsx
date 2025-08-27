import { useState } from 'react'
import Chat from './Chat'
import ChatWindow from './ChatWindow'
import "./App.css"
import SideBar from './SideBar'
import {ContextProvide} from "./useContext.jsx"

function App() {


  return (
    <>
    <ContextProvide >
    <div className='app'>
      <SideBar/>
     
     <ChatWindow />
          

    </div>
     </ContextProvide >
    </>
  )
}

export default App
