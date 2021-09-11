import { useEffect, useState } from 'react';
import axios from "axios";
import { Chat, addResponseMessage, addLinkSnippet, addUserMessage } from 'react-chat-popup';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Url } from '../LinkToBackend';


export default function ChatUser(props){
    const [first_name, setFirst_name] = useState("นายธนาคาร");
    const [last_name, setLast_name] = useState("หลักแหลม");
    const [count,setCount] = useState(0);
    const { conn ,driverId} = props;
    
    useEffect(()=>{
        console.log('--------------',driverId)
        conn.onmessage = function(e) {
            
            let Message = JSON.parse(e.data)
            if(Message.message_code =='chat'){
                
                addResponseMessage(Message.message)
                console.log(Message);
            }
        };
        return ()=>{
        }

    },[])

    useEffect(()=>{
        axios.post(Url.LinkToBackend +"backend/api/request_driver_info", {
        driver_id: props.driverId})
        .then(res=>{
            // console.log(res.data)
            setFirst_name(res.data.fname);
            setLast_name(res.data.lname);
        })
        .catch(err=>{
            // NotificationManager.error('ขออภัยในความไม่สะดวก','การเชื่อมต่อมีปัญหา',1000);
        })
    },[])
    
    
    function handleNewUserMessage(newMessage){
        console.log(`New message incomig! ${newMessage}`);
        // Now send the message throught the backend API
        conn.send(JSON.stringify({
            protocol: "chat", // protocol
            arg1: `${first_name} ${last_name}`, // name
            arg2: newMessage,
            arg3: `${driverId}`,
            arg4: `1`
        }));
    }
    return(
        <div key={driverId}>
            <Chat
                
                handleNewUserMessage={handleNewUserMessage}
                profileAvatar="https://www.myskinrecipes.com/shop/1446-large/banana-flavor-%E0%B8%A3%E0%B8%AA%E0%B8%81%E0%B8%A5%E0%B9%89%E0%B8%A7%E0%B8%A2.jpg"
                title={first_name+' '+last_name}
                subtitle="And my cool subtitle"
               
            />
        </div>
    );
}
