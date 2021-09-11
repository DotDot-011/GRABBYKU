import Popup from 'reactjs-popup';
import '../Driver.css';
import './Receipt.css'

export default function Receipt(props){
    const {driverFname, driverLname, driverId, userFname, userLname, userId ,conn ,cancelIntervalId} = props
    console.log(driverFname, driverLname, driverId, userFname, userLname, userId);
    function sendData(){
        console.log(1)
        clearInterval(cancelIntervalId)
        conn.send(JSON.stringify({
            protocol: "work-finished",
            driver_name: `${driverFname} ${driverLname}`,
            driver_id: `${driverId}`,
            user_name: `${userFname} ${userLname}`,
            user_id: `${userId}`,
        }))
    }
    
    return(

        <Popup trigger={<button className="done-button" type="button" class="btn btn-primary" id="buttcancel" > เสร็จสิ้น </button>} modal nested>
    
            {           
            close=>(
                <div className="confirmCancel" id="confirmCancel"> <h1>ใส่จำนวนเงิน</h1>
                    <input id="input-mon" placeholder="ใส่จำนวนเงิน" type="number" />
                    <button id="sub-button" onClick={()=>{
                        sendData();
                        close();
                        }}> ยืนยัน </button>
                </div>)
                
            }
            
            </Popup>
    );    
} 