import React, { useRef, useState} from "react";
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
    const win_nameRef = useRef("");
    const emailRef = useRef("");
    const phoneRef = useRef("");
    const citizenIdRef = useRef("");
    const passwordRef = useRef("");
    const driver_noRef = useRef("");
    const confirmPasswordRef = useRef("");
    const [file,setFile] = useState(null)
    const [newFile,setNewFile] = useState(null)
    
    function uploadFile(){
        axios.post(Url.LinkToBackend+"backend/api/image", {
           image: file,
           driver_id: 18,
        }).then((res) => {
        //   console.log(res.data)
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
        (win_nameRef.current.value != '') ? count++ : NotificationManager.warning('กรุณากรอกชื่อซุ้มวิน');

        if(passwordRef.current.value === confirmPasswordRef.current.value & count === 13) {
            axios.post(Url.LinkToBackend +"backend/api/register_driver",{
                fname: fnameRef.current.value,
                lname: lnameRef.current.value,
                birth_date: birth_dateRef.current.value,
                age: ageRef.current.value,
                email: emailRef.current.value,
                phone: phoneRef.current.value,
                id_no: citizenIdRef.current.value,
                username: usernameRef.current.value,
                password: passwordRef.current.value,
                win_name:win_nameRef.current.value,
                plate: plateRef.current.value,
                driver_no: driver_noRef.current.value,
            })
            .then(res=>{
                console.log(res.data);
                // history.push("/");
                if(res.data === "New record created successfully"){
                    localStorage.setItem("regis_success","success");
                    setCount(1)
                }
            })
            .catch(err=>{
                NotificationManager.error(err.message,'Alert',3000);
            })
        }else if(passwordRef.current.value !== confirmPasswordRef.current.value && count === 13){
            NotificationManager.warning('รหัสผ่านไม่ตรงกัน');
        }
    }
    const [count, setCount] = useState(0);
    if(count === 0){
        return (
            <div id="main_driverreg">
                <img src={newFile}/>

                <h1>Register as Driver</h1>
                <form classname="" id="driverreg" action="" method="post">
                    <div id="boxinput-driver">
                        <label>ชื่อผู้ใช้</label>
                        <input type="text" ref={usernameRef} value={usernameRef.current.value} placeholder="กรอกชื่อผู้ใช้" name="username"/>
                    </div>
                    <div id="boxinput-driver">
                        <label>ชื่อจริง</label>
                        <input type="text" ref={fnameRef} value={fnameRef.current.value} placeholder="กรอกชื่อจริง" name="fname"/>
                    </div>
                    <div id="boxinput-driver">
                        <label>นามสกุล</label>
                        <input type="text" ref={lnameRef} value={lnameRef.current.value} placeholder="กรอกนามสกุล" name="lname"/>
                    </div>
                    <div id="boxinput-driver">
                        <label>วันเกิด</label>
                        <input type="date" ref={birth_dateRef} value={birth_dateRef.current.value} placeholder="กรอกวันเกิด" name="birth_date"/>
                    </div>
                    <div id="boxinput-driver">
                        <label>อายุ</label>
                        <input type="number" ref={ageRef} value={ageRef.current.value} placeholder="กรอกอายุ" name="age"/>
                    </div>
                    <div id="boxinput-driver">
                        <label>อีเมลล์</label>
                        <input type="email" ref={emailRef} value={emailRef.current.value} placeholder="กรอกอีเมลล์" name="email"/>
                    </div>
                    <div id="boxinput-driver">
                        <label>หมายเลขโทรศัพท์</label>
                        <input type="tel" ref={phoneRef} value={phoneRef.current.value} placeholder="กรอกหมายเลขโทรศัพท์" name="phone" />
                    </div>
                    <div id="boxinput-driver">
                        <label>รหัสประจำตัวประชาชน</label>
                        <input type="text" ref={citizenIdRef} value={citizenIdRef.current.value} placeholder="กรอกรหัสประจำตัวประชาชน" name="id_no" />
                    </div>
                    <div id="boxinput-driver">
                        <label>รหัสผ่าน</label>
                        <input type="password" ref={passwordRef} value={passwordRef.current.value} placeholder="กรอกรหัสผ่าน" name="password" />
                    </div>
                    <div id="boxinput-driver">
                        <label>ยืนยันรหัสผ่าน</label>
                        <input type="password" ref={confirmPasswordRef} value={confirmPasswordRef.current.value} placeholder="กรอกเพื่อยืนยันรหัสผ่าน" name="confirm_password" name="confirmPassword" />
                    </div>
                    <div id="boxinput-driver">
                        <label>หมายเลขวิน</label>
                        <input type="number" ref={driver_noRef} value={driver_noRef.current.value} placeholder="กรอกหมายเลขวิน" name="driver_number"/>
                    </div>
                    <div id="boxinput-driver">
                        <label>ชื่อซุ้มวิน</label>
                        <input type="text" ref={win_nameRef} value={win_nameRef.current.value} placeholder="กรอกชื่อซุ้ม" name="win_name" />
                    </div>
                    <div id="boxinput-driver">
                        <label>ป้ายทะเบียนรถ</label>
                        <input type="text" ref={plateRef} value={plateRef.current.value} placeholder="กรอกป้ายทะเบียนรถ" name="plate" />
                    </div>
                </form>
                <button id="sum_driverreg" type="button" onClick={sendData}>ลงทะเบียน</button>
                <button id="back_driverreg" type="submit" onClick={()=> {setCount(1)}}> กลับ </button>
                <input name="csv" type="file" onChange={event=>{
                    fileChangedHandler(event);
                    // setFile(URL.createObjectURL(event.target.files[0]))
                    // console.log(URL.createObjectURL(event.target.files[0]))
                    
                    
                    }} />

                {/* <input type="file" onChange={} /> */}
                {/* <img src={newFile}/> */}
                
            <button onClick={()=>{
                
                uploadFile();
            }}>กดค่ะ</button>
                <NotificationContainer />
            </div>
        );
    }
    else {
        return <Login/>
    } 
}

export default RegisDriver;
