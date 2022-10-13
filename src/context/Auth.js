import { onAuthStateChanged } from "firebase/auth";
import {  createContext, useEffect, useState } from "react";
import { auth } from "../fireconfig";
 export const authcontext=createContext();
export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);
    useEffect(() => {
        onAuthStateChanged(auth,(user)=>{
            setUser(user);
            setLoading(false);
        })
        
      
    }, [])
    if(loading)
    return "loading"

    return <authcontext.Provider value={{user}}>{children}</authcontext.Provider>
    
   
}