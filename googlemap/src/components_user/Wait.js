import './Wait.css'

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
            <button className="cancel-button" type="button" type="button" class="btn btn-primary" id="buttcancel" onClick={cancelQueue}>ยกเลิก</button>
        </div>
    )
}