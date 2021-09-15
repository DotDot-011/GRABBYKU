import { useEffect, useState } from 'react';
import { Chat, addResponseMessage, addLinkSnippet, addUserMessage } from 'react-chat-popup';
export default function ChatDriver(props){
    const { conn ,userId ,userFname , userLname, file} = props;
    const [count,setCount] = useState(0);
    
    
    useEffect(()=>{
        
        console.log('------------',userId,userFname)
        conn.onmessage = function(e) {
            console.log('--------------');
            let Message = JSON.parse(e.data)
            if(Message.message_code =='chat'){
                addResponseMessage(Message.message)
                // console.log(Message);
            }
        };

    },[])



    function handleNewUserMessage(newMessage){
        
        // conn.send(newMessage)
        // Now send the message throught the backend API
        console.log(`New message incomig! ${newMessage}`);
        conn.send(JSON.stringify({
            protocol: "chat", // protocol
            ReceiverName: `${userFname} ${userLname}`, // name
            Message: newMessage,
            ReceiverID: `${userId}`,
            ReceiverMode: "0" // ระบุ customer หรือ driver (ไม่ใช่ของบุคคล)
        }));
        
      }
    return(
        <Chat
             handleNewUserMessage={handleNewUserMessage}
             profileAvatar={file}
             title={userFname+' '+userLname}
             
            //  subtitle="And my cool subtitle"
             
        />
    );
}