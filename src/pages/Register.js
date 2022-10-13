import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import './Register.css'
import { auth,db} from '../fireconfig'
import {setDoc,doc, Timestamp} from 'firebase/firestore'
import {useNavigate} from 'react-router-dom'
function Register(props) {
    const [data,setData]=useState({
        name:"",
        email:"",
        password:"",
        error:null,
        loading:false
    })
    const navigate=useNavigate();
    const {name,email,password,error,loading}=data;
    const signupHandler=(e)=>{
setData({...data,[e.target.name]:e.target.value});
    }
    const submitHandler= async e=>{
        e.preventDefault();
        setData({...data,error:null,loading:false});

        if(!name||!email||!password){
            setData({...data,error:"All Fields are required"});
        }
        try{
            const result=await createUserWithEmailAndPassword(auth,email,password);
            console.log(result.user);
            await setDoc(doc(db,'users',result.user.uid),{
                uid:result.user.uid,
                name,
                email,
                password,
                createdAt:Timestamp.fromDate(new Date()),
                isOnline:true
            
            })
            setData({
                name:"",
                email:"",
                password:"",
                error:null,
                loading:false
            });
            navigate("/");
            
        }
        
        catch(err){
            setData({...data,error:err.message,loading:false})

        }
        console.log(data);

    }
    
  return (
    <center>
        
        <form onSubmit={submitHandler}>
        <h3>{props.type==="REGISTER"?"Create an Account":"Login in to Your Account"}</h3>
        {props.type==="REGISTER"&&<TextField
        value={name}
        onChange={signupHandler}
        required
          id="standard-required"
          label="Name"
          name="name"
          variant="standard"
        />}
        <TextField
          required
        value={email}
        onChange={signupHandler}


          id="standard-required"
          label="Email"
          name="email"
          variant="standard"
        />
        <TextField
          required
        value={password}
        onChange={signupHandler}
          id="standard-required"
          label="Password"
          name="password"
          variant="standard"
        />
        {error&&<p style={{background:"red",color:"white" }}>{error}</p>}
        <Button variant="contained" color="success" onClick={submitHandler} >
          {props.type==="REGISTER"?"REGISTER":"LOGIN"}
        {/* {loading?"Creating..":"Register"} */}
      </Button>

        </form>

    </center>
  )
}

export default Register