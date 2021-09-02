import React, { useRef } from "react";
import axios from "axios";
import { Url } from '../LinkToBackend';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import './regis_driver.css'

function RegisDriver() {

    const usernameRef = useRef("");
    const fnameRef = useRef("");
    const lnameRef = useRef("");
    const birth_dateRef = useRef("");
    const ageRef = useRef("");
    const plateRef = useRef("");
    const win_nameRef = useRef("");
    const emailRef = useRef("");
    const phoneRef = useRef("");
    const citizenIdRef = useRef("");
    const passwordRef = useRef("");
    const driver_noRef = useRef("");

    function sendData(){
        axios.post(Url.LinkToBackend +"backend/api/register_driver",{
            fname: fnameRef.current.value,
            lname: lnameRef.current.value,
            birth_date: birth_dateRef.current.value,
            age: ageRef.current.value,
            plate: plateRef.current.value,
            win_name: win_nameRef.current.value,
            email: emailRef.current.value,
            phone: phoneRef.current.value,
            id_no: citizenIdRef.current.value,
            username: usernameRef.current.value,
            password: passwordRef.current.value,
            driver_no: driver_noRef.current.value,
        })
        .then(res=>{
            console.log(res.data);
            
        })
        .catch(err=>{
            NotificationManager.error(err.message,'Alert',3000);
        })
    }


    return (
        <div classname="main_driverreg" id="main_driverreg">
            <h1>Register as Driver</h1>
            <form classname="driverreg" id="driverreg" action="" method="post">
                <div>
                    <label>ชื่อผู้ใช้</label>
                    <input type="text" ref={usernameRef} value={usernameRef.current.value} placeholder="กรอกชื่อผู้ใช้" name="username"/>
                </div>
                <div>
                    <label>ชื่อจริง</label>
                    <input type="text" ref={fnameRef} value={fnameRef.current.value} placeholder="กรอกชื่อจริง" name="fname"/>
                </div>
                <div>
                    <label>นามสกุล</label>
                    <input type="text" ref={lnameRef} value={lnameRef.current.value} placeholder="กรอกนามสกุล" name="lname"/>
                </div>
                <div>
                    <label>วันเกิด</label>
                    <input type="date" ref={birth_dateRef} value={birth_dateRef.current.value} placeholder="กรอกวันเกิด" name="birth_date"/>
                </div>
                <div>
                    <label>อายุ</label>
                    <input type="number" ref={ageRef} value={ageRef.current.value} placeholder="กรอกอายุ" name="age"/>
                </div>
                <div>
                    <label>อีเมลล์</label>
                    <input type="email" ref={emailRef} value={emailRef.current.value} placeholder="กรอกอีเมลล์" name="email"/>
                </div>
                <div>
                    <label>หมายเลขโทรศัพท์</label>
                    <input type="tel" ref={phoneRef} value={phoneRef.current.value} placeholder="กรอกหมายเลขโทรศัพท์" name="phone" />
                </div>
                <div>
                    <label>รหัสประจำตัวประชาชน</label>
                    <input type="text" ref={citizenIdRef} value={citizenIdRef.current.value} placeholder="กรอกรหัสประจำตัวประชาชน" name="id_no" />
                </div>
                <div>
                    <label>รหัสผ่าน</label>
                    <input type="text" ref={passwordRef} value={passwordRef.current.value} placeholder="กรอกรหัสผ่าน" name="password" />
                </div>
                <div>
                    <label>ยืนยันรหัสผ่าน</label>
                    <input type="text" placeholder="กรอกเพื่อยืนยันรหัสผ่าน" name="confirm_password" />
                </div>
                <div>
                    <label>หมายเลขวิน</label>
                    <input type="number" ref={driver_noRef} value={driver_noRef.current.value} placeholder="กรอกหมายเลขวิน" name="driver_number"/>
                </div>
                <div>
                    <label>ชื่อซุ้มวิน</label>
                    <input type="text" ref={win_nameRef} value={win_nameRef.current.value} placeholder="กรอกชื่อซุ้ม" name="win_name" />
                </div>
                <div>
                    <label>ป้ายทะเบียนรถ</label>
                    <input type="text" ref={plateRef} value={plateRef.current.value} placeholder="กรอกเพื่อยืนยันรหัสผ่าน" name="plate" />
                </div>
            </form>
            <button classname="sum_driverreg" id="sum_driverreg" type="button" onClick={sendData}>ลงทะเบียน</button>
            <NotificationContainer />
        </div>
    );
}

export default RegisDriver;
