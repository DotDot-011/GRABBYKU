import React from 'react';
import { Url } from './LinkToBackend';
import Login from './component_login/login';
import User from './components_user/User';
import Driver from './components_driver/Driver';

export default function App() {
    
    if(localStorage.getItem("loginStatus")==="user"){
        return(
            <User/>
        )
    }
    else if(localStorage.getItem("loginStatus")==="driver"){
        return(
            <Driver/>
        )
    }
    else{
        return (
            
            <Login/>
      )
    }

}

