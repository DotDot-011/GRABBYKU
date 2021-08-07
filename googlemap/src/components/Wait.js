import './Wait.css'

export default function Wait(props){
    const { cancelQueue } = props; 
    
    return(
        <div className="waiting-box" >
            <h4>กรุณารอ1</h4>
            <div id="w8detail"></div>
            <button className="cancel-button" type="button" type="button" class="btn btn-primary" id="buttcancel" onClick={cancelQueue}>ยกเลิก</button>
        </div>
    )
}