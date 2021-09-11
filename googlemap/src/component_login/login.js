import React, { useState } from "react";
import LoginDriver from "./login_driver";
import LoginUser from "./login_user";
import RegisDriver from "./regis_driver";
import RegisUser from "./regis_user";
import './login.css'


function Login() {
    
    const [count, setCount] = useState(0);
    if(count === 1) {        
        return <LoginUser />
    }else if(count === 2) {
        return <LoginDriver />
    }else if(count === 3) {
        return <RegisUser />
    }if(count === 4) {
        return <RegisDriver />
    }else {
        return (
            <div className="main_log">
                <h1>Login As </h1>
                <button classname="user_log" id="user_log" onClick={() => setCount(1)}>Customer</button>
                <button classname="driver_log" id="driver_log" onClick={() => setCount(2)}>Driver</button>
                <h4>Or Sign up As</h4>
                <button classname="user_reg" id="user_reg" onClick={() => setCount(3)}>Customer</button>
                <button classname="driver_reg" id="driver_reg" onClick={() => setCount(4)}>Driver</button>
            </div>
        );
    }
}

export default Login;
