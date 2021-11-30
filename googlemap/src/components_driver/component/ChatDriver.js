import { useEffect, useState } from 'react';
import { Chat, addResponseMessage, addLinkSnippet, addUserMessage } from 'react-chat-popup';
import './ChatDriver.css'

export default function ChatDriver(props){
    const { conn ,userId ,userFname , userLname, file} = props;
    const [count,setCount] = useState(0);
    function showPreviousChat(Message){
        console.log(Message[0])
        for(let i in Message){
            if(Message[i]!== 'chat info'){
                if(Message[i].receiver_mode ==='0'){
                    addUserMessage(Message[i].message);
                }
                else{
                    addResponseMessage(Message[i].message);
                }
            }
        }
    }
    
    useEffect(()=>{
        localStorage.setItem("chatNoti", 0);
        let intervalChatNonti =  setInterval(() => {
            
            if(parseInt( localStorage['chatNoti']) ===0){
                // console.log('chatNoti')
                // console.log('----',count,localStorage['chatNoti'] )
                setCount(parseInt( localStorage['chatNoti']))
            }
        }, 500);
        console.log('------------',userId,userFname)
        conn.onmessage = function(e) {
            console.log('--------------');
            let Message = JSON.parse(e.data)
            console.log(Message)
            if(Message.message_code =='chat'){
                addResponseMessage(Message.message)
                // console.log(Message);
                localStorage["chatNoti"] = parseInt( localStorage["chatNoti"]) +1
                setCount(parseInt( localStorage["chatNoti"]));
            }
            else if(Message.message_code ==='user-cancel'){
                console.log(Message.message_code)
                props.cancelCase();
            }
            else if(Message.message_code ==='chat info'){
                showPreviousChat(Message)
            }
        };
        return ()=>{clearInterval(intervalChatNonti)}

    },[])


    



    function handleNewUserMessage(newMessage){
        
        // conn.send(newMessage)
        // Now send the message throught the backend API
        console.log(`New message incomig! ${newMessage}`);
        conn.onclose = function(e) {
            console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
        };
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
             badge={count}
             fullScreenMode={true}
            //  subtitle="And my cool subtitle"
        />
    );
}