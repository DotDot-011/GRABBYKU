import React,{ useEffect , useState } from 'react';
import './booking_history.css'

export default function History(props){

    // axios.post(Url.LinkToBackend +"",{
    //     driver_id : props.driverId,
    //     JWT :`${getCookie('token')}`
    // })


    function show_history(history_array){
        let historyList = document.querySelector("#history-list");                  //ยัดข้อมูลลงหน้าประวัติ
        document.getElementById('history-list').innerHTML='<h3>ประวัติรายได้</h3>';
        console.log()
        for (let item in history_array) {
            let blocking = document.createElement("div");
            blocking.className = "history-container";                               //classnameของก้อนHistoryแต่ละอัน
            blocking.innerText=`Booking#${item+1}
            วันที่: ${history_array[item]["date"]}
            รายรับ: ${history_array[item]["income"]}
            `  
            historyList.appendChild(blocking);
        }
    }


    useEffect(()=>{
        props.closeMenu();
        const test = [
            {
                "booking_id": 1,
                "date":"16/12/21",
                "Fname":"มิ้น",
                "Lname":"แม่มึงเป็นไรมากปะ",
                "income":"20บาท",
            },
            {
                "booking_id": 2,
                "date":"20/1/21",
                "Fname":"ABC",
                "Lname":"DEควาย",
                "income":"30บาท",
            },
            {
                "booking_id": 3,
                "date":"20/1/21",
                "Fname":"ABC",
                "Lname":"DEควาย",
                "income":"30บาท",
            }
        ]
        show_history(test);
    },[])


    return(
        <div className="history-page">
             <div classname="history-list" id="history-list" >
                                         {/* <h2> ประวัติรายได้ </h2>  */}
            </div>        
        </div> 
    )
}



