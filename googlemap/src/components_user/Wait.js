import './Wait.css'
import Popup from 'reactjs-popup';
// ------------------ user รอ match กับ driver ------------------
export default function Wait(props){
    const { cancelQueue } = props; 
    
    return(
        <div className="waiting-box" >
            <h4>กรุณารอ</h4>
            <h5>'-เวลาโดยประมาณ-'</h5>
            <div id="waiting-detail">
                <div class="num-queue">จำนวนคิวที่รอ : $</div>
                <div class="num-driver">จำนวนผู้ให้บริการ : $</div>
                <div class="money-est">จำนวนเงินที่ต้องชำระ : $</div>
            </div>
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