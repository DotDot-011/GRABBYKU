import './DetailDriver.css'

export default function DetailDriver(props){
    const { cancelQueue } = props; 
    return(
        <div className="detail-driver-container">
            <h4>กรุณารอ2</h4>
            <div id="driver-detail"></div>
            <div id="money-detail"></div>
            <button className="cancel-button" type="button" type="button" class="btn btn-primary" id="buttcancel" onClick={cancelQueue}>ยกเลิก</button>
        </div>
    )
}