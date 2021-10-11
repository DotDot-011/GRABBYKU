import './DetailDriver.css'
import React from 'react';
import axios from "axios";
import { Url } from '../LinkToBackend';
import { useEffect, useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import ChatUser from './ChatUser';
import Popup from 'reactjs-popup';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import getCookie from '../getCookie';


const labels = {
    // 0.5: 'Useless',
    1: 'ควรปรับปรุง',
    // 1.5: 'Poor',
    2: 'พอใช้',
    // 2.5: 'Ok',
    3: 'ดี',
    // 3.5: 'Good',
    4: 'ดีมาก',
    // 4.5: 'Excellent',
    5: 'สุดยอด',
  };
  
  const useStyles = makeStyles({
    root: {
      width: 200,
      display: 'flex',
      alignItems: 'center',
    },
  });
export default function DetailDriver(props){
    const { cancelQueue,conn ,driverId} = props;
    const [cost,setCost] = useState(0);
    const [estimatetime,setEstimatetime] = useState(0);
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [plate, setPlate] = useState("");
    const [driverNo, setdriverNo] = useState("");
    const [driverPosition, setdriverPosition] = useState("");
    const [avatar,setAvatar] = useState(null)

    const [value, setValue] = useState(0);
    const [hover, setHover] = useState(-1);
    
    // ------------------ คำนวณราคาค่ะ & เวลาค่ะ ------------------
    useEffect(()=>{
        // console.log(props.travelDistance);
        // --------------------------------------------- calculate cost ------------------------------------6789
        if (props.travelDistance <= 500 ) {
            setCost(10)
        }
        else if (props.travelDistance <= 1000 ) {
            setCost(15)
        }
        else if (props.travelDistance <= 1500 ) {
            setCost(20)
        }
        else if (props.travelDistance <= 2000 ) {
            setCost(25)
        }
        else if (props.travelDistance <= 2500 ) {
            setCost(30)
        }
        else if (props.travelDistance <= 3000 ) {
            setCost(35)    
        }
        else if (props.travelDistance <= 4000 ) {
            setCost(35)
        }
        else {
            setCost(50)
        }
        // --------------------------------------------- calculate distance ------------------------------------
        
        if (props.driverDistance <= 500 ) {
            setEstimatetime(2) 
        }
        else if (props.driverDistance <= 1000 ) {
            setEstimatetime(4)  
        }
        else if (props.driverDistance <= 1500 ) {
            setEstimatetime(6)  
        }
        else if (props.driverDistance <= 2000 ) {
            setEstimatetime(8)
        }
        else if (props.driverDistance <= 2500 ) {
            setEstimatetime(10)
        }
        else if (props.driverDistance <= 3000 ) {
            setEstimatetime(12)
        }
        else if (props.driverDistance<= 4000 ) {
            setEstimatetime(14)   
        }
        else {
            setEstimatetime(16)
        }
    },[props.travelDistance,props.driverDistance])
    // ------------------ show ข้อมูลของ driver ที่ match ------------------
    useEffect(()=>{
        let timeoutId = setInterval(() => {
            axios.post(Url.LinkToBackend +"backend/api/request_driver_info", {
                driver_id: driverId,
                JWT :`${getCookie('token')}`
            })
            .then(res=>{
                if(res.data.auth_code === false){
                    axios.post(Url.LinkToBackend+"backend/api/logout_user",{
                      username: localStorage.getItem("username")
                    }).then(()=>{
                      localStorage.clear();
                      localStorage.setItem("Auth","failed");
                      window.location.reload();
                    })
                }
                else{
                    clearInterval(timeoutId);
                    console.log(res.data);
                    setFirst_name(res.data.fname);
                    setLast_name(res.data.lname);
                    setPlate(res.data.plate);
                    setdriverNo(res.data.driver_no);
                    setdriverPosition(res.data.win_name);
                    setAvatar(res.data.image)
                    setValue(res.data.rating);
                }
                })
                .catch(err=>{
                    NotificationManager.error('ขออภัยในความไม่สะดวก','การเชื่อมต่อมีปัญหา',1000);
                })
        }, 800);
        
    },[])
    

    return(
        <div className="detail-driver-container">
            <h4>กรุณารอ</h4>
            <h5>คุณจะได้รับบริการภายใน : {estimatetime} นาที</h5>
            <div class="driver-detail" >
                <Box id="starbox"component="fieldset" mb={3} borderColor="transparent">
                    <Rating name="half-rating-read" value={value} precision={1} readOnly />
                    
                </Box>
                <div class="image-driver">
                    <img src={avatar}/>
                </div>
                <div class="name-driver">{first_name} {last_name}</div>
                <div class="name-license">ทะเบียนรถ : {plate}</div>
                <div class="name-number">เลขประจำตัว : {driverNo}</div>
                <div class="name-position">ประจำจุด : {driverPosition}</div>
            </div>
            <div class="money-div">ค่าโดยสารโดยประมาณ : {cost} บาท</div>
            {/* <button className="cancel-button" type="button" type="button" class="btn btn-primary" id="buttcancel" onClick={cancelQueue}>ยกเลิก</button> */}
            
            <Popup trigger={<button className="cancel-button" type="button" class="btn btn-primary" id="buttcancel"> ยกเลิก</button>} modal nested>
            {close=>(
                <div className="confirmCancel" id="confirmCancel"> <h1>ยืนยันที่จะยกเลิกหรือไม่</h1>
                    <button id="don-cancel" onClick={()=>{cancelQueue();close();}}>ตกลง</button>
                    <button id="not-cancel" onClick={()=>{close();}}>ปฏิเสธ</button>
                </div>)
            }
            
            </Popup>
        </div>
    )
}