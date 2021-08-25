import './QueueDriver.css'
import React,{ useEffect , useState } from 'react';
import leaveQueue from './LeaveQueue';
import axios from 'axios';
import { Url } from '../../LinkToBackend';

export default function QueueDriver(props) {
    
    
    function firstQueue() {
        clearInterval(window.timeoutId1);
        clearInterval(window.timeoutId2);

        axios.post(Url.LinkToBackend +"backend/api/check_booking",{
            driver_id : props.driverId
        })
        .then( res=>{
            console.log(res.data);
        });
        
    }

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
                myEl.innerText = `${i} : ${val.driver_id}  \n`;
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
        clearInterval(window.timeoutId2);
        window.timeoutId1 = setInterval(()=>{
            // fetch("http://localhost:1235/queueDriver")
            //     .then(response=> response.json())
            //     .then(data => showQueue(data));
            
            axios.get(Url.LinkToBackend+"backend/api/getqueue",{
                driver_id: props.driverId
              })
              .then(res=>{
                // console.log(typeof(res.data));
                  showQueue(res.data);
                  // เดี๋ยวมาดูใหม่
              });

            },1500)
    },[]);


    function enQueue() {
        clearInterval(window.timeoutId2);
        axios.post(Url.LinkToBackend+"backend/api/postdriverinq",{driver_id : props.driverId})
        .then(res=>{
            console.log(res.data);
        });
        


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