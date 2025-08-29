import React from "react";
import {useRoutes,useNavigate} from "react-router-dom"
import  Signup from "./authForm/Signup";
import {ChatContext} from "./useContext"
import { useContext } from "react";
import { useEffect } from "react";
import ChatWindow from "./ChatWindow";
import App from "./App";
import Login from "./authForm/Login";
export const ProjectRoutes=()=>{
    const {currentUser,setCurrentUser}=useContext(ChatContext);
    const navigate=useNavigate();

    useEffect(()=>{
        const userIdFromStorage=localStorage.getItem("userId");
        if(userIdFromStorage && !currentUser){
            setCurrentUser(userIdFromStorage);
        }
        if(!userIdFromStorage && !["/login","/signup"].includes(window.location.pathname)){
            navigate("/signup");
        }
        if(userIdFromStorage && window.location.pathname=='/signup'){
            navigate("/");
        }
        if(userIdFromStorage&&window.location.pathname=="/login"){
            navigate("/")
        }
    },[currentUser,navigate,setCurrentUser]);

    return useRoutes([
        {path:"/",
            element:<App />
        },
        {
            path:"/signup",
            element:<Signup />
        },
        {
            path:"/login",
            element:<Login />
        }
    ])

}
 