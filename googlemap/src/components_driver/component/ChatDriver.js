import { useEffect, useState } from 'react';
import { Chat, addResponseMessage, addLinkSnippet, addUserMessage } from 'react-chat-popup';
export default function ChatDriver(props){
    const { conn ,userId ,userFname , userLname} = props;
    
    
    
    useEffect(()=>{
        
        console.log('------------',userId,userFname)
        conn.onmessage = function(e) {
            let Message = JSON.parse(e.data)
            addResponseMessage(Message.message)
            console.log(Message);
        };
           
    },[])



    function handleNewUserMessage(newMessage){
        
        // conn.send(newMessage)
        // Now send the message throught the backend API
        console.log(`New message incomig! ${newMessage}`);
        conn.send(JSON.stringify({
            protocol: "chat", // protocol
            arg1: `${userFname} ${userLname}`, // name
            arg2: newMessage,
            arg3: `${userId}`,
            arg4: "0"
        }));
        
      }
    return(
        <Chat
             handleNewUserMessage={handleNewUserMessage}
             profileAvatar="https://www.myskinrecipes.com/shop/1446-large/banana-flavor-%E0%B8%A3%E0%B8%AA%E0%B8%81%E0%B8%A5%E0%B9%89%E0%B8%A7%E0%B8%A2.jpg"
             title={userFname+' '+userLname}
            //  subtitle="And my cool subtitle"
             
        />
    );
}