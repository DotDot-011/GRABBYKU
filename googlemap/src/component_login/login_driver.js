import React, { useRef, useState } from "react";
import Driver from "../components_driver/Driver";
import axios from "axios";

function LoginUser() {
    const nameRef = useRef("");
    const passwordRef = useRef("");
    const [loginSuccess, setLoginSuccess] = useState(0);
    
    function CheckUser() {
        axios.post("http://4070-2001-fb1-132-988a-2c49-2ecb-17ea-f8cd.ngrok.io/backend/api/login_user", 
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
        return <Driver/>
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
                </form>
                
            </div> 
            );
    }
    
}



export default LoginUser;