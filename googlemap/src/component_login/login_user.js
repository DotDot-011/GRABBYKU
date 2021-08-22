import React, { useRef, useState } from "react";
import User from '../components_user/User';

function LoginUser() {
    const nameRef = useRef(null);
    const passwordRef = useRef(null);
    const [loginSuccess, setLoginSuccess] = useState(0);
    
    function CheckUser() {

        fetch("blank~",{
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "username": 1,
                    "password": "driver1"
                })
            })
            .then(response=> console.log(response))
            .catch(err => console.log(err));
    }

    function submitLogin(){
        console.log("test123");
        console.log("test123");
        console.log("test123");
        console.log("test123");
        console.log("test123");
        console.log("test123");
        console.log("test123");
        console.log("test123");
        console.log("test3333333");
        setLoginSuccess(1);
        
    }


    if(loginSuccess){
        return <User/>
    }
    else{
        return (
            <div classname="">
                <h1>Login as User</h1>
                <form>
                    <div>
                        <label>username</label>
                        <input type="text" ref={nameRef} placeholder="username"/>
                    </div>
                    <div>
                        <label>password</label>
                        <input type="password" ref={passwordRef} placeholder="password"/>
                    </div>
                    <button type="button" onClick={submitLogin}>login</button>
                </form>
                
            </div> 
            );
    }
    
}



export default LoginUser;
