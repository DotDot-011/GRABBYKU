import './DetailDriver.css'
import axios from "axios";
import { Url } from '../LinkToBackend';
import { useEffect, useState } from 'react';
export default function DetailDriver(props){
    const { cancelQueue } = props;
    //console.log(props.driverId);

    
    const [first_name, setFirst_name] = useState("นายธนาคาร");
    const [last_name, setLast_name] = useState("หลักแหลม");
    const [plate, setPlate] = useState("กอจ 666");
    const [driverNo, setdriverNo] = useState("47");
    const [driverPosition, setdriverPosition] = useState("ประตูนรก");
    
    useEffect(()=>{
        axios.post(Url.LinkToBackend +"backend/api/request_driver_info", {
        driver_id: props.driverId})
        .then(res=>{
        console.log(res.data);
        
        setFirst_name(res.data.fname);
        setLast_name(res.data.lname);
        setPlate(res.data.plate);
        setdriverNo(res.data.driver_no);
        setdriverPosition(res.data.win_name);
        })
    },[])
    

    return(
        <div className="detail-driver-container">
            <h4>กรุณารอ</h4>
            <h5>'-เวลาโดยประมาณ-'</h5>
            <div class="driver-detail" >
                <div class="image-driver"></div>
                <div class="name-driver">{first_name} {last_name}</div>
                <div class="name-license">ทะเบียนรถ : {plate}</div>
                <div class="name-number">เลขประจำตัว : {driverNo}</div>
                <div class="name-position">ประจำจุด : {driverPosition}</div>
            </div>
            <div class="money-div">จำนวนเงินที่ต้องชำระ : $</div>
            <button className="cancel-button" type="button" type="button" class="btn btn-primary" id="buttcancel" onClick={cancelQueue}>ยกเลิก</button>
        </div>
    )
}