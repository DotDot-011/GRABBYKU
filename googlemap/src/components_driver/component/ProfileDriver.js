import './ProfileDriver.css'
import React,{ useEffect , useRef, useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import axios from "axios";
import getCookie from "../../getCookie";
import { socketUrl, Url } from '../../LinkToBackend';
import CloseButton from 'react-bootstrap/CloseButton'

export default function ProfileDriver(props){
    const {citizenId , Fname ,Lname , birthDate , phone ,plate ,winNo,winName ,profilepicture ,handleForChangeProfile} = props;
    
    const [file,setFile] = useState(profilepicture);
    const NewPasswdRef = useRef(null);
    const OldPasswdRef = useRef(null);
    const phoneRef = useRef(null); 
    const [showPhone,setShowPhone] = useState(phone)
    useEffect(()=>{
        props.closeMenu();
    },[])
    function sendData() {
        // console.log(1)
        if(!!NewPasswdRef.current.value){
            if(!!phoneRef.current.value && phoneRef.current.value.length !==10){
                NotificationManager.warning('หมายเลขโทรศัพท์ไม่ถูกต้อง',"",2000);
            }
            else if(NewPasswdRef.current.value.length < 4){
                NotificationManager.warning('รหัสผ่านใหม่อย่างน้อย 4 หลัก',"",2000);
            }
            else{
                //sendData
                axios.post(Url.LinkToBackend+"backend/api/editProfile",{
                    JWT :`${getCookie('token')}`,
                    phone: phoneRef.current.value,
                    new_password: NewPasswdRef.current.value,
                    password: OldPasswdRef.current.value
                }).then((res)=>{ 
                    console.log(res.data)
                    if(res.data.message_code){
                        if(res.data.message === "Wrong password"){
                            NotificationManager.error("รหัสผ่านปัจจุบันผิดพลาด",'Alert',1000);
                        }
                        else{
                            NotificationManager.success("เปลี่ยนแปลงข้อมูลเสร็จสิ้น",'Alert',1000);
                            if(!!phoneRef.current.value){
                                handleForChangeProfile(phoneRef.current.value)
                                setShowPhone(phoneRef.current.value)
                            }
                        }
                    }
                    else{
                        NotificationManager.error("รหัสผ่านปัจจุบันผิดพลาด",'Alert',1000);
                    } 
                    phoneRef.current.value=null;
                    NewPasswdRef.current.value=null;
                    OldPasswdRef.current.value=null;
                }).catch(err=>{
                    NotificationManager.error(err.message,'Alert',1000);
                })
                
            }
        }
        else{
            if(!!phoneRef.current.value && phoneRef.current.value.length !==10){
                NotificationManager.warning('หมายเลขโทรศัพท์ไม่ถูกต้อง',"",2000);
            }
            else{
                //sendData
                axios.post(Url.LinkToBackend+"backend/api/editProfile",{
                    JWT :`${getCookie('token')}`,
                    phone: phoneRef.current.value,
                    new_password: NewPasswdRef.current.value,
                    password: OldPasswdRef.current.value
                }).then((res)=>{ 
                    console.log(res.data)
                    if(res.data.message_code){
                        if(res.data.message === "Wrong password"){
                            NotificationManager.error("รหัสผ่านปัจจุบันผิดพลาด",'Alert',1000);
                        }
                        else{
                            NotificationManager.success("เปลี่ยนแปลงข้อมูลเสร็จสิ้น",'Alert',1000);
                            if(!!phoneRef.current.value){
                                handleForChangeProfile(phoneRef.current.value)
                                setShowPhone(phoneRef.current.value)
                            }
                        }
                    }
                    else{
                        NotificationManager.error("รหัสผ่านปัจจุบันผิดพลาด",'Alert',1000);
                    }
                    phoneRef.current.value=null;
                    NewPasswdRef.current.value=null;
                    OldPasswdRef.current.value=null;
                }).catch(err=>{
                    NotificationManager.error(err.message,'Alert',1000);
                })
                
            }
        }
    } 
    return(
        <div className="profile-page">
            <CloseButton id="close-butt" onClick={()=>{props.close()}} />
            <div className="profile-picture">
                <img src={file}/>                
            </div>
            <form role="form">
                <br styles="" />
                <div className="driver-info">
                    <div id="boxinfo-driver">
                        <label>ชื่อ นามสกุล</label>
                        <input disabled  type="text"  className="name" value={Fname +' '+ Lname}  />
                    </div>
                    <div id="boxinfo-driver">
                        <label>วันเกิด</label>
                        <input disabled  type="text"  className="birthday" value={birthDate}  />
                    </div>
                    <div id="boxinfo-driver">
                        <label>เลขบัตรประชาชน</label>
                        <input disabled  type="text"  className="citizen-id" value={citizenId.substring(0, citizenId.length - 3)+"xxx"} />
                    </div>
                    <div id="boxinfo-driver">
                        <label>หมายเลขโทรศัพท์</label>
                        <input   type="number" ref={phoneRef}  className="phone" placeholder={showPhone} />
                    </div>
                    <div id="boxinfo-driver">
                        <label>ชื่อซุ้มวิน</label>
                        <input disabled  type="text"  className="winName" value={winName} />
                    </div>
                    <div id="boxinfo-driver">
                        <label>หมายเลขวิน</label>
                        <input disabled  type="text"  className="winNo" value={winNo}  />
                    </div>
                    <div id="boxinfo-driver">
                        <label>ทะเบียนรถ</label>
                        <input disabled  type="text"  className="plate" value={plate}  />
                    </div>
                    <div id="boxinfo-driver">
                        <h4>สำหรับการแก้ไขรหัสผ่าน</h4>
                    </div>
                    <div id="boxinfo-driver">
                        <label>รหัสผ่านปัจจุบัน</label>
                        <input type="password" required ref={OldPasswdRef}  className="password" placeholder=""  />
                    </div> 
                    <div id="boxinfo-driver">
                        <label>รหัสผ่านใหม่</label>
                        <input type="password" ref={NewPasswdRef}  className="password" placeholder=""  />
                    </div>
                </div>
                {/* <input type="submit" id="submit" name="submit" onClick={sendData}  value="Update"/> */}
                <button type="button"  id="submit" name="submit" className="updateinfo-driver" onClick={sendData}>Update</button>
            </form>
            <NotificationContainer />

        </div>

        
    );
}