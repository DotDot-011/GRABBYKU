import { CountdownCircleTimer } from "react-countdown-circle-timer";

import './Penalty.css'

const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div className="timer" style={{fontSize:`45px`}}>✓</div>;
    }
  
    return (
      <div className="timer">
        <div className="text">เหลือเวลาอีก</div>
        <div className="value">{remainingTime}</div>
        <div className="text">วินาที</div>
      </div>
    );
  };

export default function Penalty(){
    return (
        <div className="cooldown-container">
      <h1>
        เนื่องจากคุณได้ปฏิเสธลูกค้า 
      </h1>
      <h2>
        กรุณารอ 10 วินาที
        <br/>
        เพื่อสามารถเข้าคิวใหม่ได้
      </h2>
      <div className="timer-wrapper">
        <CountdownCircleTimer
          isPlaying
          duration={10}
          // colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
          colors={[["#A30000", 0.33], ["#F7B801", 0.33], ["#03AC13"]]}

        //   onComplete={() => [true, 1000]}
        >
          {renderTime}
        </CountdownCircleTimer>
      </div>
      
    </div>
        
    );
}