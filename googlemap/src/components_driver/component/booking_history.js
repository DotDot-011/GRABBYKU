import React,{ useEffect , useState } from 'react';
import './booking_history.css'
import axios from "axios";
import getCookie from "../../getCookie";
import { socketUrl, Url } from '../../LinkToBackend';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import CloseButton from 'react-bootstrap/CloseButton'

export default function History(props){

    // axios.post(Url.LinkToBackend +"",{
    //     driver_id : props.driverId,
    //     JWT :`${getCookie('token')}`
    // })
    

    function show_history(history_array){
        let historyList = document.querySelector("#history-list");                  //ยัดข้อมูลลงหน้าประวัติ
        document.getElementById('history-list').innerHTML='<h3>ประวัติรายได้</h3>';
        console.log()
        let i=1;
        for (let item in history_array) {
            
            if(item !== 'auth_code' && item!== 'message_code'){
                let blocking = document.createElement("div");
                blocking.className = "history-container";                               //classnameของก้อนHistoryแต่ละอัน
                blocking.innerText=`Booking#${i}
                วันที่: ${history_array[item]["date"]}
                รายรับ: ${history_array[item]["price"] } บาท
                `  
                historyList.appendChild(blocking);
                i+=1;
            }
        }
    }


    useEffect(()=>{
        props.closeMenu();
        let fetchdata=1;
        clearInterval(window.fetchdata)
        fetchdata=setInterval(()=>{
            axios.post(Url.LinkToBackend+"backend/api/history",{
                JWT :`${getCookie('token')}`, 
            }).then((res)=>{
                clearInterval(fetchdata)
                // auth_code
                // message_code
                console.log(res.data)
                show_history(res.data);
            }).catch(err=>{
                NotificationManager.error(err.message,'Alert',1000);
            })
        },100) 
        // const test = [
        //     {
        //         "booking_id": 1,
        //         "date":"16/12/21",
        //         "Fname":"มิ้น",
        //         "Lname":"แม่มึงเป็นไรมากปะ",
        //         "income":"20บาท",
        //     },
        //     {
        //         "booking_id": 2,
        //         "date":"20/1/21",
        //         "Fname":"ABC",
        //         "Lname":"DEควาย",
        //         "income":"30บาท",
        //     },
        //     {
        //         "booking_id": 3,
        //         "date":"20/1/21",
        //         "Fname":"ABC",
        //         "Lname":"DEควาย",
        //         "income":"30บาท",
        //     }
        // ]
        // show_history(test);
    },[])


    return(
        <div className="history-page">
            <CloseButton id="close-butt" onClick={()=>{props.close()}} />
             <div classname="history-list" id="history-list" >
                                         {/* <h2> ประวัติรายได้ </h2>  */}
            </div>        
            <NotificationContainer />

        </div> 
    )
}



