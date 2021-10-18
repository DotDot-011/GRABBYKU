import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Url } from '../LinkToBackend';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import './regis_user.css'
import Login from "./login";
import Resizer from "react-image-file-resizer";


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
    const [count, setCount] = useState(0);
    const [file,setFile] = useState('data:image/jpeg;base64,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')
    const [newFile,setNewFile] = useState(null)
    const [loginSuccess, setLoginSuccess] = useState(0);


    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      }
      
    async function uploadFile(){
        
        axios.post(Url.LinkToBackend+"backend/api/image", {
           image: file,
           driver_id: 18,
        }).then((res) => {
            console.log(res.data)
        //   fileChangedHandler(res.data)
          setNewFile(res.data)
        })
      }

    function fileChangedHandler(event) {
        var fileInput = false;
        if (event.target.files[0]) {
          fileInput = true;
        }
        if (fileInput) {
          try {
            Resizer.imageFileResizer(
              event.target.files[0],
              125,
              125,
              "JPEG",
              100,
              0,
              (uri) => {
                // console.log(uri);
                
                setFile(uri)
              },
              "Blob",
              100,
              100
            );
          } catch (err) {
            console.log(err);
            
          }
        }
      }
    
      function checkID(id)
        {
            let i,sum;
            if(id.length != 13) {
                return false;
            }
            for(i=0, sum=0; i < 12; i++){
                sum += parseFloat(id.charAt(i))*(13-i);
            } 
            if((11-sum%11)%10!=parseFloat(id.charAt(12))){
                return false; 
            }
        return true;}

    function sendData(){

        var Count = 0;
        (fnameRef.current.value != '') ? Count++ : NotificationManager.warning('กรุณากรอกชื่อจริง');
        (lnameRef.current.value != '') ? Count++ : NotificationManager.warning('กรุณากรอกนามสกุล');
        (birth_dateRef.current.value != '') ? Count++ : NotificationManager.warning('กรุณากรอกวันเกิด');
        (ageRef.current.value != '') ? Count++ : NotificationManager.warning('กรุณากรอกอายุ');
        (emailRef.current.value != '') ? Count++ : NotificationManager.warning('กรุณากรอกอีเมลล์');
        (phoneRef.current.value != '') ? Count++ : NotificationManager.warning('กรุณากรอกเบอร์โทรศัพท์');
        (citizenIdRef.current.value != '') ? Count++ : NotificationManager.warning('กรุณากรอกเลขบัตรประชาชน');
        (usernameRef.current.value != '') ? Count++ : NotificationManager.warning('กรุณากรอกชื่อผู้ใช้');
        (passwordRef.current.value != '') ? Count++ : NotificationManager.warning('กรุณากรอกรหัสผ่าน');
        (confirmPasswordRef.current.value != '') ? Count++ : NotificationManager.warning('กรุณากรอกยืนยันรหัสผ่าน');
        
        if(passwordRef.current.value === confirmPasswordRef.current.value & Count===10 & validateEmail(emailRef.current.value) 
        & passwordRef.current.value.length >= 4 & citizenIdRef.current.value.length ==13 && 2021 - birth_dateRef.current.value.split('-')[0] >=18) {
            axios.post(Url.LinkToBackend +"backend/api/register_user",{
                fname: fnameRef.current.value,
                lname: lnameRef.current.value,
                birth_date: birth_dateRef.current.value,
                age: 0,
                email: emailRef.current.value,
                phone: phoneRef.current.value,
                id_no: citizenIdRef.current.value,
                username: usernameRef.current.value,
                password: passwordRef.current.value,
                image: file,
            })
            .then(res=>{
                console.log(res.data);
                
                if(res.data === "New record created successfully"){
                    localStorage.setItem("regis_success","success");
                    setCount(1)
                }
                else{
                    if(res.data.indexOf("'username'")!== -1){
                        NotificationManager.warning('username นี้ถูกใช้แล้ว');
                    }
                    if(res.data.indexOf("'email'")!== -1){
                        NotificationManager.warning('email นี้ถูกใช้แล้ว');
                    }
                    if(res.data.indexOf("'id_no'")!== -1){
                        NotificationManager.warning('รหัสประจำตัวประชาชนนี้ถูกใช้แล้ว');
                    }
                }
            })
            .catch(err=>{
                NotificationManager.error(err.message,'Alert',3000);
            })
        }
        else {
            if(passwordRef.current.value !== confirmPasswordRef.current.value ){
                NotificationManager.warning('รหัสผ่านไม่ตรงกัน');
            }
            if(!validateEmail(emailRef.current.value)){
                console.log(emailRef.current.value)
                NotificationManager.warning('รูปแบบอีเมลล์ไม่ถูกต้อง');
            }
            if(passwordRef.current.value.length < 4 ){
                NotificationManager.warning('รหัสผ่านสั้นเกินไป');
            }
            if(!checkID(citizenIdRef.current.value) ){
                NotificationManager.warning('รหัสประจำตัวประชาชนไม่ถูกต้อง');
            }
            if(phoneRef.current.value.length != 10){
                NotificationManager.warning('หมายเลขโทรศัพท์ไม่ถูกต้อง');   
            }
            if(2021 - birth_dateRef.current.value.split('-')[0] <18){
                NotificationManager.warning('อายุยังไม่ถึงเกณฑ์');
            }
        }
        
        
    }
    
    
    
    if(count === 0) {
        return (
            <div id="main_userreg">
                <h1>Register as User</h1>
                <form classname="" id="userreg" action="" method="post">
                    <div id="boxinput-user">
                        <label>ชื่อผู้ใช้</label>
                        <input type="text" ref={usernameRef}  placeholder="กรอกชื่อผู้ใช้" name="username"/><br/>
                    </div>
                    <div id="boxinput-user">
                        <label>ชื่อจริง</label>
                        <input type="text" ref={fnameRef}  placeholder="กรอกชื่อจริง" name="fname"/>
                    </div>
                    <div id="boxinput-user">
                        <label>นามสกุล</label>
                        <input type="text" ref={lnameRef}  placeholder="กรอกนามสกุล" name="lname"/>
                    </div>
                    <div id="boxinput-user">
                        <label>วันเกิด</label>
                        <input type="date" ref={birth_dateRef}  placeholder="กรอกวันเกิด" name="birth_date"/>

                    </div>
                    {/* <div id="boxinput-user">
                        <label>อายุ</label>
                        <input type="number" ref={ageRef}  placeholder="กรอกอายุ" name="age"/>

                    </div> */}
                    <div id="boxinput-user">
                        <label>อีเมลล์</label>
                        <input type="email" ref={emailRef}  placeholder="กรอกอีเมลล์" name="email"/>

                    </div>
                    <div id="boxinput-user">
                        <label>หมายเลขโทรศัพท์</label>
                        <input type="number" ref={phoneRef}  placeholder="กรอกหมายเลขโทรศัพท์" name="phone" />

                    </div>
                    <div id="boxinput-user">
                        <label>รหัสประจำตัวประชาชน</label>
                        <input type="number" ref={citizenIdRef}  placeholder="กรอกรหัสประจำตัวประชาชน" name="id_no" />

                    </div>
                    <div id="boxinput-user">
                        <label>รหัสผ่าน</label>
                        <input type="password" ref={passwordRef}  placeholder="กรอกรหัสผ่าน" name="password" />

                    </div>
                    <div id="boxinput-user">
                        <label>ยืนยันรหัสผ่าน</label>
                        <input type="password" ref={confirmPasswordRef}  placeholder="กรอกเพื่อยืนยันรหัสผ่าน" name="confirmPassword" />

                    </div>
                    {/* <label>เลือกภาพประจำตัว</label>
                    <input name="csv" type="file" onChange={event=>{
                    fileChangedHandler(event);
                    }} />
                    <img src={file}/> */}
                </form>
                <button type="submit" id="sum_userreg" onClick={sendData}>ลงทะเบียน</button>
                <button type="submit" id="back" onClick={() => setCount(1)}>กลับ</button>
                
                {/* <button onClick={()=>{
                
                uploadFile();
            }}>กดค่ะ</button> */}
                <NotificationContainer />
            </div>
        );
    }else {
        
        return <Login/>
    }
}

export default RegisUser;
