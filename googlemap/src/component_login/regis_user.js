import React, { useRef, useState } from "react";
import axios from "axios";
import { Url } from '../LinkToBackend';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import './regis_user.css'
import Login from "./login";


function RegisUser() {

    
    // userRefพวกนนี้สามารถลบแล้วเขียนใหม่ได้เลย
    const usernameRef = useRef("");
    const fnameRef = useRef("");
    const lnameRef = useRef("");
    const birth_dateRef = useRef("");
    const ageRef = useRef("");
    const emailRef = useRef("");
    const phoneRef = useRef("");
    const citizenIdRef = useRef("");
    const passwordRef = useRef("");
    const confirmPasswordRef = useRef("");

    function sendData(){

        var count = 0;
        (fnameRef.current.value != '') ? count++ : NotificationManager.warning('กรุณากรอกชื่อจริง');
        (lnameRef.current.value != '') ? count++ : NotificationManager.warning('กรุณากรอกนามสกุล');
        (birth_dateRef.current.value != '') ? count++ : NotificationManager.warning('กรุณากรอกวันเกิด');
        (ageRef.current.value != '') ? count++ : NotificationManager.warning('กรุณากรอกอายุ');
        (emailRef.current.value != '') ? count++ : NotificationManager.warning('กรุณากรอกอีเมลล์');
        (phoneRef.current.value != '') ? count++ : NotificationManager.warning('กรุณากรอกเบอร์โทรศัพท์');
        (citizenIdRef.current.value != '') ? count++ : NotificationManager.warning('กรุณากรอกเลขบัตรประชาชน');
        (usernameRef.current.value != '') ? count++ : NotificationManager.warning('กรุณากรอกชื่อผู้ใช้');
        (passwordRef.current.value != '') ? count++ : NotificationManager.warning('กรุณากรอกรหัสผ่าน');
        (confirmPasswordRef.current.value != '') ? count++ : NotificationManager.warning('กรุณากรอกยืนยันรหัสผ่าน');

        if(passwordRef.current.value === confirmPasswordRef.current.value & count === 10) {
            axios.post(Url.LinkToBackend +"backend/api/register_user",{
                fname: fnameRef.current.value,
                lname: lnameRef.current.value,
                birth_date: birth_dateRef.current.value,
                age: ageRef.current.value,
                email: emailRef.current.value,
                phone: phoneRef.current.value,
                id_no: citizenIdRef.current.value,
                username: usernameRef.current.value,
                password: passwordRef.current.value,
            })
            .then(res=>{
                console.log(res.data);
            })
            .catch(err=>{
                NotificationManager.error(err.message,'Alert',3000);
            })
        }else if(passwordRef.current.value !== confirmPasswordRef.current.value & count === 10){
            NotificationManager.warning('รหัสผ่านไม่ตรงกัน');
        }
    }
    const [count, setCount] = useState(0);
    if(count === 0) {
        return (
            <div>
                <h1>Register as User</h1>
                <form classname="" action="" method="post">
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
                        <input type="password" ref={passwordRef} value={passwordRef.current.value} placeholder="กรอกรหัสผ่าน" name="password" />
                    </div>
                    <div>
                        <label>ยืนยันรหัสผ่าน</label>
                        <input type="password" ref={confirmPasswordRef} value={confirmPasswordRef.current.value} placeholder="กรอกเพื่อยืนยันรหัสผ่าน" name="confirmPassword" />
                    </div>
                </form>
                <button type="submit" onClick={sendData}>ลงทะเบียน</button>
                <button type="submit" id="back" onClick={() => setCount(1)}> กลับ </button>
                <NotificationContainer />
            </div>
        );
    }else {
        return <Login/>
    }
    return (
        <div classname="main_userreg" id="main_userreg">
            <h1>Sign up as User</h1>
            <form classname="userreg" id="userreg" action="" method="post">
                <div id="boxinput-user">
                    <label>ชื่อผู้ใช้</label>
                    <input type="text" ref={usernameRef} value={usernameRef.current.value} placeholder="กรอกชื่อผู้ใช้" name="username"/>
                </div>
                <div id="boxinput-user">
                    <label>ชื่อจริง</label>
                    <input type="text" ref={fnameRef} value={fnameRef.current.value} placeholder="กรอกชื่อจริง" name="fname"/>
                </div>
                <div id="boxinput-user">
                    <label>นามสกุล</label>
                    <input type="text" ref={lnameRef} value={lnameRef.current.value} placeholder="กรอกนามสกุล" name="lname"/>
                </div>
                <div id="boxinput-user">
                    <label>วันเกิด</label>
                    <input type="date" ref={birth_dateRef} value={birth_dateRef.current.value} placeholder="กรอกวันเกิด" name="birth_date"/>
                </div>
                <div id="boxinput-user">
                    <label>อายุ</label>
                    <input type="number" ref={ageRef} value={ageRef.current.value} placeholder="กรอกอายุ" name="age"/>
                </div>
                <div id="boxinput-user">
                    <label>อีเมลล์</label>
                    <input type="email" ref={emailRef} value={emailRef.current.value} placeholder="กรอกอีเมลล์" name="email"/>
                </div>
                <div id="boxinput-user">
                    <label>หมายเลขโทรศัพท์</label>
                    <input type="tel" ref={phoneRef} value={phoneRef.current.value} placeholder="กรอกหมายเลขโทรศัพท์" name="phone" />
                </div>
                <div id="boxinput-user">
                    <label>รหัสประจำตัวประชาชน</label>
                    <input type="text" ref={citizenIdRef} value={citizenIdRef.current.value} placeholder="กรอกรหัสประจำตัวประชาชน" name="id_no" />
                </div>
                <div id="boxinput-user">
                    <label>รหัสผ่าน</label>
                    <input type="password" ref={passwordRef} value={passwordRef.current.value} placeholder="กรอกรหัสผ่าน" name="password" />
                </div>
                <div id="boxinput-user">
                    <label>ยืนยันรหัสผ่าน</label>
                    <input type="password" placeholder="กรอกเพื่อยืนยันรหัสผ่าน" name="confirm_password" />
                </div>
            </form>
            <button classname="sum_userreg" id="sum_userreg" type="submit" onClick={sendData}>ลงทะเบียน</button>
            <NotificationContainer />
        </div>
    );
}

export default RegisUser;
