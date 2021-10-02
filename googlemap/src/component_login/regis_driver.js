import React, { useCallback, useRef, useState} from "react";
import axios from "axios";
import { Url } from '../LinkToBackend';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useHistory } from "react-router-dom";
import './regis_driver.css'
import Login from "./login";
import Resizer from "react-image-file-resizer";





function RegisDriver() {

    const usernameRef = useRef("");
    const fnameRef = useRef("");
    const lnameRef = useRef("");
    const birth_dateRef = useRef("");
    const ageRef = useRef("");
    const plateRef = useRef("");
    const win_idRef = useRef("");
    const emailRef = useRef("");
    const phoneRef = useRef("");
    const citizenIdRef = useRef("");
    const passwordRef = useRef("");
    const driver_noRef = useRef("");
    const confirmPasswordRef = useRef("");
    const [file,setFile] = useState(null)
    const [count, setCount] = useState(0);
    const [newFile,setNewFile] = useState(null)



    
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
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
        (driver_noRef.current.value != '') ? count++ : NotificationManager.warning('กรุณากรอกหมายเลขวิน');
        (plateRef.current.value != '') ? count++ : NotificationManager.warning('กรุณากรอกป้ายทะเบียน');
        (win_idRef.current.value != '') ? count++ : NotificationManager.warning('กรุณากรอกชื่อซุ้มวิน');

        if(passwordRef.current.value === confirmPasswordRef.current.value & count === 13 & validateEmail(emailRef.current.value) 
        & passwordRef.current.value.length >= 4 & citizenIdRef.current.value.length ==13 & !!file & phoneRef.current.value.length == 10
        && 2021 - birth_dateRef.current.value.split('-')[0] >=18) {
            axios.post(Url.LinkToBackend +"backend/api/register_driver",{
                fname: fnameRef.current.value,
                lname: lnameRef.current.value,
                birth_date: birth_dateRef.current.value,
                age: 0,
                email: emailRef.current.value,
                phone: phoneRef.current.value,
                id_no: citizenIdRef.current.value,
                username: usernameRef.current.value,
                password: passwordRef.current.value,
                win_id:win_idRef.current.value,
                plate: plateRef.current.value,
                driver_no: driver_noRef.current.value,
                image: file,
            })
            .then(res=>{
                console.log(res.data);
                // history.push("/");
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
                    if(res.data.indexOf("'driver_no'")!== -1){
                        NotificationManager.warning('หมายเลขวินนี้ถูกใช้แล้ว');
                    }
                    if(res.data.indexOf("'plate'")!== -1){
                        NotificationManager.warning('ป้ายทะเบียนนี้ถูกใช้แล้ว');
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
            if(citizenIdRef.current.value.length != 13){
                NotificationManager.warning('รหัสประจำตัวประชาชนไม่ถูกต้อง');
            }
            if(phoneRef.current.value.length != 10){
                NotificationManager.warning('หมายเลขโทรศัพท์ไม่ถูกต้อง');   
            }
            if(!!!file){
                NotificationManager.warning('กรุณาใส่รูปประจำตัว');
            }
            if(2021 - birth_dateRef.current.value.split('-')[0] <18){
                NotificationManager.warning('อายุยังไม่ถึงเกณฑ์');
            }
            
        }
    }
    if(count === 0){
        return (
            <div id="main_driverreg">
                <img src={newFile}/>

                <h1>Register as Driver</h1>
                <form classname="" id="driverreg" action="" method="post">
                    <div id="boxinput-driver">
                        <label id="label-input">ชื่อผู้ใช้</label>
                        <input id="input-normal" type="text" ref={usernameRef}  placeholder="กรอกชื่อผู้ใช้" name="username"/>
                    </div>
                    <div id="boxinput-driver">
                        <label id="label-input">ชื่อจริง </label>
                        <input id="input-normal" type="text" ref={fnameRef}  placeholder="กรอกชื่อจริง" name="fname"/>
                    </div>
                    <div id="boxinput-driver">
                        <label id="label-input">นามสกุล</label>
                        <input id="input-normal" type="text" ref={lnameRef}  placeholder="กรอกนามสกุล" name="lname"/>
                    </div>
                    <div id="boxinput-driver">
                        <label id="label-input">วันเกิด</label>
                        <input id="input-normal" type="date" ref={birth_dateRef}  placeholder="กรอกวันเกิด" name="birth_date"/>
                    </div>
                    {/* <div id="boxinput-driver">
                        <label>อายุ</label>
                        <input type="number" ref={ageRef} placeholder="กรอกอายุ" name="age"/>
                    </div> */}
                    <div id="boxinput-driver">
                        <label id="label-input">อีเมลล์</label>
                        <input id="input-normal" type="email" ref={emailRef}  placeholder="กรอกอีเมลล์" name="email"/>
                    </div>
                    <div id="boxinput-driver">
                        <label id="label-input">หมายเลขโทรศัพท์</label>
                        <input id="input-normal" type="number" ref={phoneRef} placeholder="กรอกหมายเลขโทรศัพท์" name="phone" />
                    </div>
                    <div id="boxinput-driver">
                        <label id="label-input">รหัสประจำตัวประชาชน</label>
                        <input id="input-normal" type="text" ref={citizenIdRef} placeholder="กรอกรหัสประจำตัวประชาชน" name="id_no" />
                    </div>
                    <div id="boxinput-driver">
                        <label id="label-input">รหัสผ่าน</label>
                        <input id="input-normal" type="password" ref={passwordRef} placeholder="กรอกรหัสผ่าน" name="password" />
                    </div>
                    <div id="boxinput-driver">
                        <label id="label-input">ยืนยันรหัสผ่าน</label>
                        <input id="input-normal" type="password" ref={confirmPasswordRef} placeholder="กรอกเพื่อยืนยันรหัสผ่าน" name="confirm_password" name="confirmPassword" />
                    </div>
                    <div id="boxinput-driver">
                        <label id="label-input">ชื่อซุ้มวิน</label>
                        {/* <input id="input-normal" type="text" ref={win_idRef} placeholder="กรอกชื่อซุ้ม" name="win_name" /> */}
                        <select  ref={win_idRef} >
                            <option  value="1">ตึกนิเทศ</option>
                            <option  value="2">ประตูวิภา</option>
                            <option  value="3">ประตูงาม3</option>
                            <option  value="4">ประตูงาม1</option>
                            <option  value="5">ประตูพหล</option>
                            <option  value="6">BTS เกษตร</option>
                            <option  value="7">คณะประมง</option>
                            <option  value="8">หอในนอก</option>
                            <option  value="9">สระว่ายน้ำ</option>
                            <option  value="10">starbuck</option>
                        </select>
                        <img id="img-driver" src={file}/>
                    </div>
                    <div id="boxinput-driver2">
                        <label id="label-input">หมายเลขวิน</label>
                        <input id="input-short" type="number" ref={driver_noRef} placeholder="กรอกหมายเลขวิน" name="driver_number"/>
                        {/* <img id="img-driver" src={file}/> */}
                    </div>
                    <div id="boxinput-driver2">
                        <label id="label-input">ป้ายทะเบียนรถ</label>
                        <input id="input-short" type="text" ref={plateRef} placeholder="กรอกป้ายทะเบียนรถ" name="plate" />
                    </div>
                    <div id="boxinput-driver2"> 

                        <label id="label-input">เลือกรูปประจำตัว</label>

                        <label for="img-input" id="img-box">เลือกไฟล์</label>
                        <input type="file" id="img-input" name="csv" accept=".jpg, .png, .jpeg," onChange={event=>{
                        fileChangedHandler(event);
                        }} />
                    </div>

                </form>
                {/* <label>เลือกรูปประจำตัว</label> */}
                <button id="sum_driverreg" type="button" onClick={sendData}>ลงทะเบียน</button>
                <button id="back_driverreg" type="submit" onClick={()=> {setCount(1)}}> กลับ </button>
                {/* <input type="file" onChange={} /> */}
                
                
            {/* <button onClick={()=>{
                console.log(birth_dateRef.current.value.split('-')[0])
                // uploadFile();
            }}>กดค่ะ</button> */}
                <NotificationContainer />
            </div>
             
            
        );
    }
    else {
        return <Login/>
    } 
}

export default RegisDriver;
