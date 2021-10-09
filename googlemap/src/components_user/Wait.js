import './Wait.css'
import Popup from 'reactjs-popup';
import { useEffect, useState } from 'react';
import { socketUrl, Url } from '../LinkToBackend';
import getCookie from "../getCookie";
import  Timer from "react-time-counter"
// ------------------ user รอ match กับ driver ------------------
export default function Wait(props){
    const { cancelQueue ,conn, handleForDriverAccept,userFname,userLname,userId  , winName, lastServiceTime} = props; 
    const [cost,setCost] = useState('');
    const [queue,setQueue] = useState(props.queueUser);
    const [availableDriver,setAvailableDriver] = useState(props.availableDriver)
    // function calculateCost(){
    //     return 10+props.travelDistance/1000;
    // }
    
    
    
    useEffect(()=>{
        conn.onmessage = function(e){
            let Message = JSON.parse(e.data)
            console.log(Message)
            console.log('----------5');
            if(Message.message_code==="driver-accepted"){
                console.log('driver_id : ',Message.driver_id , 'booking_id : ' ,Message.booking_id);
                handleForDriverAccept(null, 1,Number( Message.driver_id ), Number( Message.booking_id ));
                // setQueue()
            }
            else if(Message.message_code ==="your booking order"){
                setQueue(Message.booking_order);
                setAvailableDriver(Message.driver_online);
            }
        
            
        }
        
    },[])
    // ------------------ คำนวณราคาค่ะ ------------------
    useEffect(()=>{
        
        console.log(props.travelDistance);
        if(props.travelDistance !==0){
            if (props.travelDistance <= 500) {
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
                setCost(40)  
            }
            else {
                setCost(50)
            }
        }

    },[props.travelDistance])
    
    return(
        <div className="waiting-box" >
            <h4>กรุณารอ</h4>
            <div class="last-service">{lastServiceTime}</div>
            <div class="how-long"><i class="far fa-hourglass-half"></i><i class="wang">x</i><Timer class="howlong" showHours={false}/></div>
            <div id="waiting-detail">
                <div class="num-queue">จำนวนคิวที่รอ : {queue}</div>
                <div class="num-driver">จำนวนผู้ให้บริการ : {availableDriver} คน</div>
                <div class="num-win">ประจำจุด : {winName}</div>
                <div class="money-est">ราคาโดยประมาณ : {cost} บาท</div>
            </div>
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