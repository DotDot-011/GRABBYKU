import { Chat, addResponseMessage, addLinkSnippet, addUserMessage } from 'react-chat-popup';
export default function ChatDriver(){
    

    function handleNewUserMessage(newMessage){
        
        // conn.send(newMessage)
        console.log(`New message incomig! ${newMessage}`);
        // Now send the message throught the backend API
      }
    return(
        <Chat
             handleNewUserMessage={handleNewUserMessage}
             profileAvatar="https://www.myskinrecipes.com/shop/1446-large/banana-flavor-%E0%B8%A3%E0%B8%AA%E0%B8%81%E0%B8%A5%E0%B9%89%E0%B8%A7%E0%B8%A2.jpg"
             title="Icezy"
             subtitle="And my cool subtitle"
             
        />
    );
}