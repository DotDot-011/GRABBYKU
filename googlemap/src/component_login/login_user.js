import React, { useRef, useState } from "react";
import User from '../components_user/User';
import axios from "axios";
import { Url } from '../LinkToBackend';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import './login_user.css'
import Login from "./login";




function LoginUser() {
    const nameRef = useRef("");
    const passwordRef = useRef("");
    const [loginSuccess, setLoginSuccess] = useState(0);
    //console.log(Url);
    //console.log(Url.LinkToBackend);
    //console.log(typeof(Url.LinkToBackend));
    //console.log(`${Url.LinkToBackend}backend/api/login_user`);
    function CheckUser() {
        axios.post(`${Url.LinkToBackend}backend/api/login_user`, 
        {username: nameRef.current.value, password:passwordRef.current.value })
        .then(res => {
             
            console.log(res);
            if(res.data.message){
                console.log('test');
                document.getElementById('loginError').innerHTML=null;
                document.cookie = `token=${res.data.auth}`;
                // console.log(res.data.auth)
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
        localStorage.setItem("loginStatus","user");
        localStorage.setItem("username",nameRef.current.value);
        return <User username={nameRef.current.value}/>
    }
    else{
        return (
            <div classname="main_userlog" id="main_userlog">
                <h1>เข้าสู่ระบบ</h1>
                <h2>Customer</h2>
                <form classname="userlog" id="userlog"> 
                    <div>
                        <label>Username</label>
                        <input type="text" ref={nameRef} value={nameRef.current.value} placeholder="Username"/>
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" ref={passwordRef} value={passwordRef.current.value} placeholder="Password"/>
                    </div>
                    <p id="loginError"></p>

{/* CSS แก้ */}
                    {/* <button classname="sum_user" id="sum_user" type="submit" onClick={(event)=>{CheckUser(); event.preventDefault()}}> เข้าสู่ระบบ </button> */}

                    <button id="sum_user" type="submit" onClick={(event)=>{CheckUser(); event.preventDefault()}}> เข้าสู่ระบบ </button>
                    <button id="back_user" type="submit" onClick={()=> {return <Login />}}> กลับ </button>

                </form>
                <NotificationContainer />
            </div> 
            );
    }
    
}



export default LoginUser;
