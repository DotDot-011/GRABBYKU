import './DetailDriver.css'

export default function DetailDriver(props){
    const { cancelQueue } = props; 
    return(
        <div className="detail-driver-container">
            <button className="cancel-button" onClick={cancelQueue}>ยกเลิก</button>
        </div>
    )
}