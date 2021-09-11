import Popup from 'reactjs-popup';
import '../Driver.css';
import './Receipt.css'

export default function Receipt(){
    return(
        <Popup trigger={<button className="done-button" type="button" class="btn btn-primary" id="buttcancel"> เสร็จสิ้น </button>} modal nested>
            {close=>(
                <div className="confirmCancel" id="confirmCancel"> <h1>ใส่จำนวนเงิน</h1>
                    <input id="input-mon" placeholder="ใส่จำนวนเงิน" type="number" />
                    {/* <p>จำนวนเงินที่ได้รับ: $</p> */}
                    <button id="sub-button" onClick={()=>{close();}}> ยืนยัน </button>
                </div>)
                
            }
            
            </Popup>
    );    
} 