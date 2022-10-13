import { Button } from '@mui/material'
import React, { useEffect,useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import {auth,db} from '../fireconfig'
import {signOut} from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'
import {authcontext} from '../context/Auth'
import {useNavigate} from 'react-router-dom'



function Navbar() {
  const navigate=useNavigate();
  const {user} =useContext(authcontext);
  const signOutHandler=async()=>{
    await updateDoc(doc(db,"users",auth.currentUser.uid),{isOnline:false})
    await signOut(auth);
    navigate("/login");
  }
  
  
  return (
    <nav>
        <h2>
        <Link to="/">Messenger</Link>
        </h2>
        
        <div>
          {user?
          <>
            <Link to="/profile">profile</Link>
            <Button onClick={signOutHandler} >Logout</Button>

          </>
          :
          <>
          <Link to="/Register">Register</Link>
            <Link to="/Login">Login</Link>
          </>
          }
            
        </div>
    </nav>
  )
}

export default Navbar