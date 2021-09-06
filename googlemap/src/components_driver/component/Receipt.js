import Popup from 'reactjs-popup';
import '../Driver.css';

export default function Receipt(){
    return(
        <Popup trigger={<button className="done-button" type="button" class="btn btn-primary" id="buttcancel"> เสร็จสิ้น </button>} modal nested>
            {close=>(
                <div className="confirmCancel"> เงินค่ะ
                    {/* <input placeholder="ใส่จำนวนเงิน" type="number" /> */}
                    <p>จำนวนเงินที่ได้รับ: $</p>
                    <button onClick={()=>{close();}}> ยืนยัน </button>
                </div>)
                
            }
            
            </Popup>
    );    
} 