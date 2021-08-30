import React, { useRef, useState } from "react";
import User from '../components_user/User';
import axios from "axios";
import { Url } from '../LinkToBackend';
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
            console.log(res.data);
            if(res.data.message){
                document.getElementById('loginError').innerHTML=null;
                setLoginSuccess(1);
            }else{
                setLoginSuccess(0);
                document.getElementById('loginError').innerHTML=' --- ชื่อผู้ใช้งาน หรือ รหัสผ่าน ผิดพลาด ! --- ';
            }
        })
    }

    if(loginSuccess){
        localStorage.setItem("loginStatus","user");
        localStorage.setItem("username",nameRef.current.value);
        return <User username={nameRef.current.value}/>
    }
    else{
        return (
            <div classname="">
                <h1> เข้าสู่ระบบ User </h1>
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
                </form>
                
            </div> 
            );
    }
    
}



export default LoginUser;
