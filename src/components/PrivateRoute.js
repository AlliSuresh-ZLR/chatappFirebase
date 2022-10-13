import React from 'react'
import { Route ,Navigate} from 'react-router-dom';
import {useContext} from 'react'
import {authcontext} from '../context/Auth'
import { useNavigate } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../Home';

function PrivateRoute() {
  // alert(component.props);
    const navigate=useNavigate()
    const {user}=useContext(authcontext);
    
  return (
    user?<Home/>:<Login/>
  )
}

export default PrivateRoute