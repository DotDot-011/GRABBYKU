import React, { useRef } from "react";
import axios from "axios";
import { Url } from '../LinkToBackend';

function RegisUser() {

    const usernameRef = useRef("");
    const fnameRef = useRef("");
    const lnameRef = useRef("");
    const birth_dateRef = useRef("");
    const ageRef = useRef("");
    const emailRef = useRef("");
    const phoneRef = useRef("");
    const citizenIdRef = useRef("");
    const passwordRef = useRef("");

   
    function sendData(){
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
    }
    
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
                    <input type="password" placeholder="กรอกเพื่อยืนยันรหัสผ่าน" name="confirm_password" />
                </div>
            </form>
            <button type="submit" onClick={sendData}>ลงทะเบียน</button>
        </div>
    );
}

export default RegisUser;
