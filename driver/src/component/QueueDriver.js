import './QueueDriver.css'
import { useState } from 'react';
export default function QueueDriver(props) {
   
    
    
    function showQueue(data){
        if( !!! document.getElementById('queueList')){
            return;
        }
        let queueList = document.querySelector('#queueList');
        document.getElementById('queueList').innerHTML='';
        data.forEach(val => {
            let myEl = document.createElement('span');
            myEl.innerText = `1 : ${val.driver_name} `;
            queueList.appendChild(myEl);
        })
        
    }
    
    
    window.timeoutId1 = setInterval(()=>{
            fetch("http://localhost:1235/queueDriver")
                .then(response=> response.json())
                .then(data => showQueue(data));
        },1000)
    
    function enQueue() {

        fetch("http://localhost:1235/queueDriver",{
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "id": 1,
                    "driver_name": "driver1"
                })
            })
            .then(response=> console.log(response))
            .catch(err => console.log(err));
           
        window.timeoutId2=setInterval(()=>{
            fetch("http://localhost:1236/location")
                .then(response=> response.json())
                .then(data => {
                    if(data[0].status ==='true'){
                        
                        clearInterval(window.timeoutId1);
                        clearInterval(window.timeoutId2);
                        leaveQueue();
                        props.handleForUpdate(data[0].latitudeStart, data[0].longtitudeStart , data[0].latitudeDestination ,data[0].longtitudeDestination ,null )
                }
            })
        }, 1500);
    }

    function leaveQueue() {
        fetch("http://localhost:1235/queueDriver/1",{
                method: 'delete',
                
            })
            .then(response=> console.log(response))
            .catch(err => console.log(err));
    }
 

    return(
        <div className="queue-container">
            <h4>ตารางคิว</h4>
            <div className="queue-list" id="queueList"></div>
            <div className="button-queue">
                <button className="button-enQueue" onClick={enQueue}> เข้าคิว </button>
                <button className="button-leaveQueue" onClick={leaveQueue}> ออกคิว </button>
            </div>
        </div>
    )
}