import React, { useState } from "react";
import LoginDriver from "./login_driver";
import LoginUser from "./login_user";
import RegisDriver from "./regis_driver";
import RegisUser from "./regis_user";


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
            <div>
                <h1>Login As </h1>
                <button classname="" onClick={() => setCount(1)}>User</button>
                <button classname="" onClick={() => setCount(2)}>Driver</button>
                <h4>Or Register As</h4>
                <button classname="" onClick={() => setCount(3)}>user</button>
                <button classname="" onClick={() => setCount(4)}>driver</button>
            </div>
        );
    }
}

export default Login;
