import { useEffect, useRef } from 'react';
import Popup from 'reactjs-popup';
// import '../Driver.css';
import './Receipt.css'

export default function Receipt(props){
    const costRef = useRef();
    const {driverFname, driverLname, driverId, userFname, userLname, userId ,conn} = props
    console.log(driverFname, driverLname, driverId, userFname, userLname, userId);
    async function sendData(){
        
        await conn.send(JSON.stringify({
            protocol: "work-finished",
            driver_name: `${driverFname} ${driverLname}`,
            driver_id: `${driverId}`,
            user_name: `${userFname} ${userLname}`,
            user_id: `${userId}`,
            cost:`${costRef.current.value}`
        }))
        await console.log(1)
        await window.location.reload();
    }
    useEffect(()=>{

    },[props.disableButton])
    return(
        <Popup trigger={<button className="done_button" disabled={props.disableButton} type="button" class="btn btn-primary" id="done_button" > เสร็จสิ้น </button>} modal nested>
    
            {           
            close=>(
                <div className="confirmCancel-money" id="confirmCancel-money"> <h1>ใส่จำนวนเงิน</h1>
                    <input id="input-mon" placeholder="ใส่จำนวนเงิน" type="number" ref={costRef}/>
                    <button id="sub-button" disabled={props.disableButton} onClick={()=>{
                        sendData();
                        close();
                       
                        }}> ยืนยัน </button>
                </div>)
                
            }
            
            </Popup>
    );    
}