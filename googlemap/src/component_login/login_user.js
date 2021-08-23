import React, { useRef, useState } from "react";
import User from '../components_user/User';
import axios from "axios";
function LoginUser() {
    const nameRef = useRef("");
    const passwordRef = useRef("");
    const [loginSuccess, setLoginSuccess] = useState(0);
    
    function CheckUser() {
        axios.post("http://4070-2001-fb1-132-988a-2c49-2ecb-17ea-f8cd.ngrok.io/backend/api/login_user", 
        {username: nameRef.current.value, password:passwordRef.current.value })
        .then(res => console.log(res.data));
    }

    function submitLogin(){
        console.log(nameRef.current.value);
        console.log(typeof(nameRef.current.value));
        console.log(passwordRef.current.value);
        console.log(typeof(passwordRef.current.value));
        CheckUser();
        setLoginSuccess(1);
        //ยังไม่ได้เขียนให้เสร็จ แค่สร้างมาtest
    }


    if(loginSuccess){
        return <User/>
    }
    else{
        return (
            <div classname="">
                <h1>เข้าสู่ระบบ User </h1>
                <form>
                    <div>
                        <label>username</label>
                        <input type="text" ref={nameRef} value={nameRef.current.value} placeholder="username"/>
                    </div>
                    <div>
                        <label>password</label>
                        <input type="password" ref={passwordRef} value={passwordRef.current.value} placeholder="password"/>
                    </div>
                    <button type="button" onClick={submitLogin}> เข้าสู่ระบบ </button>
                </form>
                
            </div> 
            );
    }
    
}



export default LoginUser;
