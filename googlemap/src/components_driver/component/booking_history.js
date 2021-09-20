import React,{ useEffect , useState } from 'react';
import './QueueDriver.css'

export default function History(props){

    // axios.post(Url.LinkToBackend +"",{
    //     driver_id : props.driverId,
    //     JWT :`${getCookie('token')}`
    // })


    function show_history(history_array){
        let historyList = document.querySelector("#history_list");
        document.getElementById('history_list').innerHTML='<h3>ประวัติรายได้</h3>';
        // let i=0;
        console.log()
        for (let item in history_array) {
            // console.log("here ",item);
            let blocking = document.createElement("span");
            // blocking.innerText='ประวัติรายได้'
            blocking.innerText=`Booking#${item+1}
            Booking ID: ${history_array[item]["booking_id"]} 
            วันที่: ${history_array[item]["date"]}
            ชื่อลูกค้า: ${history_array[item]["Fname"]} ${history_array[item]["Lname"]}
            รายรับ: ${history_array[item]["income"]}
            `  
            historyList.appendChild(blocking);
            // i+=1;
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
            }
        ]
        show_history(test);
    },[])


    return(
        <div className="queue-container">
             <div classname="history_list" id="history_list" >
                                         {/* <h2> ประวัติรายได้ </h2>  */}
            </div>        
        </div> 
    )
}



