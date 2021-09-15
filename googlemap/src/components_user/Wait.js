import './Wait.css'
import Popup from 'reactjs-popup';
import { useEffect, useState } from 'react';
// ------------------ user รอ match กับ driver ------------------
export default function Wait(props){
    const { cancelQueue ,conn, handleForDriverAccept } = props; 
    const [cost,setCost] = useState(0);
    const [queue,setQueue] = useState(0);
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
            }
        }
    },[])
    // ------------------ คำนวณราคาค่ะ ------------------
    useEffect(()=>{
        console.log(props.travelDistance);
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
            setCost(40)  
        }
        else {
            setCost(50)
        }
        // setCost(10+Math.ceil(props.travelDistance/170))
    },[props.travelDistance])
    return(
        <div className="waiting-box" >
            <h4>กรุณารอ</h4>
            <h5>'-เวลาโดยประมาณ-'</h5>
            <div id="waiting-detail">
                <div class="num-queue">จำนวนคิวที่รอ : {queue}</div>
                <div class="num-driver">จำนวนผู้ให้บริการ : $</div>
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