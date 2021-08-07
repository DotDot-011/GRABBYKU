import './DetailDriver.css'

export default function DetailDriver(props){
    const { cancelQueue } = props; 
    return(
        <div className="detail-driver-container">
            <h4>กรุณารอ</h4>
            <h5>'-เวลาโดยประมาณ-'</h5>
            <div class="driver-detail">
                <div class="name-driver">นายธนาคาร  หลักแหลม</div>
                <div class="name-license">ทะเบียนรถ : กอจ 666</div>
                <div class="name-number">เลขประจำตัว : 47</div>
                <div class="name-position">ประจำจุด : ประตูนรก</div>
            </div>
            <div class="money-div">
                {/* <div class="money-est">จำนวนเงินที่ต้องชำระ : $</div> */}
            จำนวนเงินที่ต้องชำระ : $
            </div>
            <button className="cancel-button" type="button" type="button" class="btn btn-primary" id="buttcancel" onClick={cancelQueue}>ยกเลิก</button>
        </div>
    )
}