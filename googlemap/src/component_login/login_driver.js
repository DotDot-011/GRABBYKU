import React, { useRef, useState } from "react";
import Driver from "../components_driver/Driver";
import axios from "axios";
import { Url } from '../LinkToBackend';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import './login_driver.css'


function LoginUser() {
    const nameRef = useRef("");
    const passwordRef = useRef("");
    const [loginSuccess, setLoginSuccess] = useState(0);
    
    function CheckUser() {
        console.log(typeof(nameRef.current.value))
        axios.post(`${Url.LinkToBackend}backend/api/login_driver`, 
        {username: nameRef.current.value, password:passwordRef.current.value })
        .then(res => {
            console.log(res);
            if(res.data.message){
                document.getElementById('loginError').innerHTML=null;
                setLoginSuccess(1);
            }else{
                setLoginSuccess(0);
                document.getElementById('loginError').innerHTML=' --- ชื่อผู้ใช้งาน หรือ รหัสผ่าน ผิดพลาด ! --- ';
            }
        })
        .catch(err=>{
            NotificationManager.error(err.message,'Login error',3000);
        })
    }


    if(loginSuccess){
        localStorage.setItem("loginStatus","driver");
        localStorage.setItem("username",nameRef.current.value);
        return <Driver username={nameRef.current.value}/>
    }
    else{
        return (
            <div classname="main_driverlog" id="main_driverlog">
                <h1> เข้าสู่ระบบ Driver </h1> 
                <form classname="driverlog" id="driverlog">
                    <div>
                        <label>username</label>
                        <input type="text" ref={nameRef} value={nameRef.current.value} placeholder="username"/>
                    </div>
                    <div>
                        <label>password</label>
                        <input type="password" ref={passwordRef} value={passwordRef.current.value} placeholder="password"/>
                    </div>
                    <p id="loginError"></p>
                    <button classname="sum_driver" id="sum_driver" type="submit" onClick={(event)=>{CheckUser(); event.preventDefault()}}> เข้าสู่ระบบ </button>
                </form>
                <NotificationContainer />
            </div> 
            );
    }
    
}



export default LoginUser;