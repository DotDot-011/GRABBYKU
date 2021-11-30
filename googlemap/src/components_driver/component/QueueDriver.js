import './QueueDriver.css'
import React,{ useEffect , useState } from 'react';
import leaveQueue from './LeaveQueue';
import axios from 'axios';
import { Url } from '../../LinkToBackend';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import getCookie from '../../getCookie';


export default function QueueDriver(props) {
    const {conn ,winId ,penaltyTime} = props;
    // ------------------ฟังชันเมื่อ driver ถึง queue แรก------------------------
    function firstQueue() {
        
        //  ------------------ driver เอาข้อมูลของ user ผ่าน api check_booking--------------------
        axios.post(Url.LinkToBackend +"backend/api/check_booking",{
            driver_id : props.driverId,
            JWT :`${getCookie('token')}`,
            win_id : winId
        })
        .then( res=>{
            console.log(res.data);
            // console.log(typeof(res.data.message));
            
            // console.log(res.data.message);
            if(res.data.auth_code === false){
                axios.post(Url.LinkToBackend+"backend/api/logout_driver",{
                  username: localStorage.getItem("username")
                }).then(()=>{
                  localStorage.clear();
                  localStorage.setItem("Auth","failed");
                  window.location.reload();
                })
              }
            else{
                if (res.data.message){
                    console.log(res.data.message_code);
                    clearInterval(window.timeoutId1);
                    // console.log(Number(res.data.lat_user));
                    props.handleForUpdate(Number(res.data.lat_user), Number(res.data.lng_user),Number(res.data.lat_des) ,Number(res.data.lng_des)
                    ,0 ,res.data.user_id, res.data.user_fname, res.data.user_lname,res.data.image);
                }
            }

        })
        .catch(err=>{
            NotificationManager.error('ขออภัยในความไม่สะดวก','การเชื่อมต่อมีปัญหา',1000);
        })
        
        
    }

    //--------------------------function แสดง queue ของ driver ทั้งหมด --------------------------
    function showQueue(Message){
        if( !!! document.getElementById('queueList')){
            return;
        }
        let i=1;
        let queueList = document.querySelector('#queueList');
        document.getElementById('queueList').innerHTML='';
        
        for (let key in Message) {
            
            if(key != 'message_code'){
                // console.log(key)
                // console.log(Message[key])
                // console.log(props.driverId)
                let myEl = document.createElement('span');
                myEl.innerText = `${i} : ${Message[key].driver_name}  \n`;
                queueList.appendChild(myEl);
                
                if(key==0 && Number(Message[key].driver_id) === props.driverId){
                    firstQueue();
                }
                // if (i==1 && val.driver_id==props.driverId){
 
                //     firstQueue();
                // }
                // else{
                    
                // }
                i++;
            }
        }
        
        
    }
    
    
    

    useEffect(()=>{
        conn.send(JSON.stringify({
            protocol: "getqueue", // protocol
            DriverID: `${props.driverId}`, // name
            win_id:`${winId}`
        }))
        
        conn.onmessage = function(e) {
            let Message = JSON.parse(e.data)
            console.log('Message 000: ',Message)
            
            clearInterval(window.timeoutId1);
            if(Message.message_code ==="multiple login"){
                axios.post(Url.LinkToBackend+"backend/api/logout_driver",{
                  username: localStorage.getItem("username")
                }).then(()=>{
                  localStorage.clear();
                  localStorage.setItem("Auth","Multiple_Login");
                  window.location.reload();
                })
              }

            if(Message.message_code ==='queue' || Message.message_code =='empty_queue'){
                // console.log(Message.message_code);
                console.log(Message);
                window.timeoutId1 = setInterval(()=>{showQueue(Message);},500)
                
                
            }
            if(Message.message_code ==='user-cancel'){
                console.log(Message.message_code)
                props.cancelCase();
            }
            
            if(Message.message_code ==="booking info"){
                props.handleForDriverReconnect(Number(Message.lat_user), Number(Message.lng_user),Number(Message.lat_des) ,Number(Message.lng_des)
                ,0 ,Message.user_id, Message.user_fname, Message.user_lname,Message.image)
            }

            
    
        };
        
        return ()=>{
            clearInterval(window.timeoutId1);
        }
    },[]);

    // ------------------เมื่อdriverกดปุ่มเข้าคิว----------------------
    function enQueue() {
        console.log('date now :',Math.floor(new Date().getTime() / 1000))
        console.log('penalty time :',Math.floor(new Date().getTime() / 1000) - penaltyTime)
        
        if(Math.floor(new Date().getTime() / 1000) - penaltyTime > 0)
        conn.send(JSON.stringify({
            protocol: "enqueue", // protocol
            DriverID: `${props.driverId}`,
            win_id:`${winId}`
        }))
        else{
            NotificationManager.warning(`จะเข้าคิวใหม่ได้ในอีก ${-(Math.floor(new Date().getTime() / 1000) - penaltyTime)} วินาที`,'เนื่องจากคุณปฏิเสธลูกค้า' ,2000);
        }
        conn.onerror = (e) =>{
            console.log(e)
        }

    }
 

    return(
        <div className="queue-container">
            <h4>ตารางคิว </h4>
            <h3>ประจำจุด : {props.winName}</h3>
            <div className="queue-list" id="queueList"></div>
            <div className="button-queue">
                <button  className="button-enQueue" onClick={enQueue}> เข้าคิว </button>
                <button className="button-leaveQueue" onClick={()=>{leaveQueue(props.driverId,conn,winId,0); }}> ออกคิว </button>
            </div>
            
        </div>
    )
}