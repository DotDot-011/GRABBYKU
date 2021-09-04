import React, { useRef, useState } from "react";
import Driver from "../components_driver/Driver";
import axios from "axios";
import { Url } from '../LinkToBackend';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Login from "./login";


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
            <div classname="">
                <h1> เข้าสู่ระบบ Driver </h1> 
                <form>
                    <div>
                        <label>username</label>
                        <input type="text" ref={nameRef} value={nameRef.current.value} placeholder="username"/>
                    </div>
                    <div>
                        <label>password</label>
                        <input type="password" ref={passwordRef} value={passwordRef.current.value} placeholder="password"/>
                    </div>
                    <p id="loginError"></p>
                    <button type="submit" onClick={(event)=>{CheckUser(); event.preventDefault()}}> เข้าสู่ระบบ </button>
                    <button type="submit" onClick={()=> {return <Login />}}> กลับ </button>
                </form>
                <NotificationContainer />
            </div> 
            );
    }
    
}



export default LoginUser;