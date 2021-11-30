import React,{ useEffect , useState } from 'react';
import LoginDriver from "./login_driver";
import LoginUser from "./login_user";
import RegisDriver from "./regis_driver";
import RegisUser from "./regis_user";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import './login.css'
function Login() {
    useEffect(()=>{
        if(localStorage.getItem("regis_success")){
            NotificationManager.success('ลงทะเบียนเสร็จสิ้น','',3000);
        }
        if(localStorage.getItem("Auth") === "failed"){
            NotificationManager.error('หมดเวลาการเชื่อมต่อ','',3000);
        }
        if(localStorage.getItem("Auth") ==="Multiple_Login"){
            NotificationManager.error('มีผู้เข้าสู่ระบบจากอุปกรณ์อื่น','',3000);
        }
        localStorage.clear();
    },[]);
    
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
            <div className="main">
                <div className="main_map">

                </div>
                {/* <img src="./pictures/map.jpg" width="500" height="600"> */}
                <div className="main_log">
                    <h1>Login As </h1>
                    <button classname="user_log" id="user_log" onClick={() => setCount(1)}>Customer</button>
                    <button classname="driver_log" id="driver_log" onClick={() => setCount(2)}>Driver</button>
                    <h4>Or Sign up As</h4>
                    <button classname="user_reg" id="user_reg" onClick={() => setCount(3)}>Customer</button>
                    <button classname="driver_reg" id="driver_reg" onClick={() => setCount(4)}>Driver</button>
                    <NotificationContainer />
                    
                </div>
            </div>
            
        );
    }


}

export default Login;
