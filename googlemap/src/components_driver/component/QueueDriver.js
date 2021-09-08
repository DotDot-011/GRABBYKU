import './QueueDriver.css'
import React,{ useEffect , useState } from 'react';
import leaveQueue from './LeaveQueue';
import axios from 'axios';
import { Url } from '../../LinkToBackend';
import { NotificationContainer, NotificationManager } from 'react-notifications';


export default function QueueDriver(props) {
    
    // ------------------ฟังชันเมื่อ driver ถึง queue แรก------------------------
    function firstQueue() {
        
        //  ------------------ driver เอาข้อมูลของ user ผ่าน api check_booking--------------------
        axios.post(Url.LinkToBackend +"backend/api/check_booking",{
            driver_id : props.driverId
        })
        .then( res=>{
            console.log(res.data);
            // console.log(typeof(res.data.message));
            
            // console.log(res.data.message);
            if (res.data.message){
                // clearInterval(window.timeoutId1);
                // console.log(Number(res.data.lat_user));
                props.handleForUpdate(Number(res.data.lat_user), Number(res.data.lng_user),Number(res.data.lat_des) ,Number(res.data.lng_des)
                 ,0 ,res.data.user_id, res.data.user_fname, res.data.user_lname);
            }

        })
        .catch(err=>{
            NotificationManager.error('ขออภัยในความไม่สะดวก','การเชื่อมต่อมีปัญหา',1000);
        })
        
        
    }

    //--------------------------function แสดง queue ของ driver ทั้งหมด --------------------------
    function showQueue(data){
        if( !!! document.getElementById('queueList')){
            return;
        }
        let i=1;
        let queueList = document.querySelector('#queueList');
        document.getElementById('queueList').innerHTML='';
        if(typeof(data)=== 'object' ){
            data.forEach(val => {
                let myEl = document.createElement('span');
                myEl.innerText = `${i} : ${val.driver_name}  \n`;
                queueList.appendChild(myEl);
                if (i==1 && val.driver_id==props.driverId){
 
                    firstQueue();
                }
                else{
                    
                }
                i++;
            })
        }
        else{
            document.getElementById('queueList').innerHTML='';
        }
        
    }
    
    useEffect(()=>{
        clearInterval(window.timeoutId1);
        window.timeoutId1 = setInterval(()=>{
            // console.log('check')
            axios.get(Url.LinkToBackend+"backend/api/getqueue",{
                driver_id: props.driverId
              })
              .then(res=>{
                  console.log(res.data)
                  showQueue(res.data);
              });

            },1500)
        return ()=>{
            clearInterval(window.timeoutId1);
        }
    },[]);

    // ------------------เมื่อdriverกดปุ่มเข้าคิว----------------------
    function enQueue() {
        axios.post(Url.LinkToBackend+"backend/api/postdriverinq",{
            driver_id : props.driverId})
        .then(res=>{
            // console.log(res.data);
        })
        .catch(err=>{
            NotificationManager.error('ขออภัยในความไม่สะดวก','การเชื่อมต่อมีปัญหา',1000);
        })
        


        // window.timeoutId2=setInterval(()=>{
        //     fetch("http://localhost:1236/location")
        //         .then(response=> response.json())
        //         .then(data => {
                    
        //             if(data[0].status ==='true'){
        //                 clearInterval(window.timeoutId1);
        //                 clearInterval(window.timeoutId2);
        //                 props.handleForUpdate(data[0].latitudeStart, data[0].longtitudeStart , data[0].latitudeDestination ,data[0].longtitudeDestination ,null )
        //         }
        //     })
        // }, 1500);
        // axios.post(Url.LinkToBackend +"")
        //---------------------------------------
    }
 

    return(
        <div className="queue-container">
            <h4>ตารางคิว</h4>
            <div className="queue-list" id="queueList"></div>
            <div className="button-queue">
                <button className="button-enQueue" onClick={enQueue}> เข้าคิว </button>
                <button className="button-leaveQueue" onClick={()=>{leaveQueue(props.driverId);}}> ออกคิว </button>
            </div>
            
        </div>
    )
}