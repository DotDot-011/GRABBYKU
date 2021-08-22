import React, { useRef, useState } from "react";
import Driver from "../components_driver/Driver";


function LoginUser() {
    const nameRef = useRef("");
    const passwordRef = useRef("");
    const [loginSuccess, setLoginSuccess] = useState(0);
    
    function CheckDriver() {

        fetch("",{
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "username": nameRef.current.value,
                    "password": passwordRef.current.value
                })
            })
            .then(response=> console.log(response))
            .catch(err => console.log(err));
    }

    function submitLogin(){
        console.log(nameRef.current.value);
        console.log(passwordRef.current.value);
        CheckDriver();
        //setLoginSuccess(1);
        
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
                    <button type="button" onClick={submitLogin}> เข้าสู่ระบบ </button>
                </form>
                
            </div> 
            );
    }
    
}



export default LoginUser;