import './Wait.css'

export default function Wait(props){
    const { cancelQueue } = props; 
    
    return(
        <div className="waiting-box">
            <h4> กรุณารอ</h4>
            <button className="cancel-button" onClick={cancelQueue}>ยกเลิก</button>
        </div>
    )
}