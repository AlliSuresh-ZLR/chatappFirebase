import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import {signInWithEmailAndPassword} from 'firebase/auth'
import './Register.css'
import { auth,db} from '../fireconfig'
import {doc,updateDoc} from 'firebase/firestore'
import {useNavigate} from 'react-router-dom'
function Login(props) {
    const [data,setData]=useState({
       
        email:"",
        password:"",
        error:null,
        loading:false
    })
    const navigate=useNavigate();
    const {email,password,error,loading}=data;
    const changeHandler=(e)=>{
setData({...data,[e.target.name]:e.target.value});
    }
    const submitHandler= async e=>{
        e.preventDefault();
        setData({...data,error:null,loading:false});

        if(!email||!password){
            setData({...data,error:"All Fields are required"});
        }
        try{
            const result=await signInWithEmailAndPassword(auth,email,password);
            console.log(result.user);
            await updateDoc(doc(db,'users',result.user.uid),{
               isOnline:true,
            })
            setData({
                
                email:"",
                password:"",
                error:null,
                loading:true
            });

            navigate("/");
            
        }
        
        catch(err){
            setData({...data,error:err.message,loading:false})

        }
        console.log(auth);

    }
    
  return (
    <center>
        
        <form onSubmit={submitHandler}>
        {/* <h3>{props.type==="REGISTER"?"Create an Account":"Login in to Your Account"}</h3> */}
        <h3>{loading?"Logging in ...!":"Login in to Your Account"}</h3>
        
        <TextField
          required
        value={email}
        onChange={changeHandler}


          id="standard-required"
          label="Email"
          name="email"
          variant="standard"
        />
        <TextField
          required
        value={password}
        onChange={changeHandler}
          id="standard-required"
          label="Password"
          name="password"
          variant="standard"
        />
        {error&&<p style={{background:"red",color:"white" }}>{error}</p>}
        <Button variant="contained" color="success" onClick={submitHandler} >
          
        {loading?"Logingin..":"Login"}
      </Button>

        </form>

    </center>
  )
}

export default Login