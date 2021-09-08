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
    const { cancelQueue } = props;
    const [cost,setCost] = useState(0);
    const [estimatetime,setEstimatetime] = useState(0);
    //console.log(props.driverId);

    
    const [first_name, setFirst_name] = useState("นายธนาคาร");
    const [last_name, setLast_name] = useState("หลักแหลม");
    const [plate, setPlate] = useState("กอจ 666");
    const [driverNo, setdriverNo] = useState("47");
    const [driverPosition, setdriverPosition] = useState("ประตูนรก");
    const [value, setValue] = useState(4);
    const [hover, setHover] = useState(-1);
    // ------------------ คำนวณราคาค่ะ & เวลาค่ะ ------------------
    useEffect(()=>{
        // console.log(props.travelDistance);
        if (props.travelDistance <= 500 ) {
            setCost(10)
            setEstimatetime(2) 
        }
        else if (props.travelDistance <= 1000 ) {
            setCost(15)
            setEstimatetime(4)  
        }
        else if (props.travelDistance <= 1500 ) {
            setCost(20)
            setEstimatetime(6)  
        }
        else if (props.travelDistance <= 2000 ) {
            setCost(25)
            setEstimatetime(8)  
        }
        else if (props.travelDistance <= 2500 ) {
            setCost(30)
            setEstimatetime(10)  
        }
        else if (props.travelDistance <= 3000 ) {
            setCost(35)
            setEstimatetime(12)  
        }
        else if (props.travelDistance <= 4000 ) {
            setCost(40)
            setEstimatetime(14)  
        }
        else {
            setCost(50)
            setEstimatetime(16)
        }
    },[props.travelDistance])
    // ------------------ show ข้อมูลของ driver ที่ match ------------------
    useEffect(()=>{
        axios.post(Url.LinkToBackend +"backend/api/request_driver_info", {
        driver_id: props.driverId})
        .then(res=>{
            console.log(res.data)
            setFirst_name(res.data.fname);
            setLast_name(res.data.lname);
            setPlate(res.data.plate);
            setdriverNo(res.data.driver_no);
            setdriverPosition(res.data.win_name);
        })
        .catch(err=>{
            NotificationManager.error('ขออภัยในความไม่สะดวก','การเชื่อมต่อมีปัญหา',1000);
        })
    },[])
    

    return(
        <div className="detail-driver-container">
            <h4>กรุณารอ</h4>
            <h5>เวลาโดยประมาณ : {estimatetime} นาที</h5>
            <div class="driver-detail" >
                <Box component="fieldset" mb={3} borderColor="transparent">
                    <Rating name="half-rating-read" defaultValue={value} precision={1} readOnly />
                    
                </Box>
                <div class="image-driver"></div>
                <div class="name-driver">{first_name} {last_name}</div>
                <div class="name-license">ทะเบียนรถ : {plate}</div>
                <div class="name-number">เลขประจำตัว : {driverNo}</div>
                <div class="name-position">ประจำจุด : {driverPosition}</div>
            </div>
            <div class="money-div">ค่าโดยสารโดยประมาณ : {cost} บาท</div>
            {/* <button className="cancel-button" type="button" type="button" class="btn btn-primary" id="buttcancel" onClick={cancelQueue}>ยกเลิก</button> */}
            
            <Popup trigger={<button className="cancel-button" type="button" class="btn btn-primary" id="buttcancel"> ยกเลิก</button>} modal nested>
            {close=>(
                <div className="confirmCancel"> ยืนยันที่จะยกเลิก
                    <button onClick={()=>{cancelQueue();close();}}>ตกลง</button>
                    <button onClick={()=>{close();}}>ปฏิเสธ</button>
                </div>)
            }
            
            </Popup>
        </div>
    )
}