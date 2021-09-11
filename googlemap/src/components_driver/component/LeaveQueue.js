import axios from "axios";
import { Url } from '../../LinkToBackend';
import { NotificationContainer, NotificationManager } from 'react-notifications';

export default function leaveQueue(driverId,conn) {

        conn.send(JSON.stringify({
                protocol: "dequeue", // protocol
                arg1: `${driverId}`, // name
            }))
        // axios.post(Url.LinkToBackend+"backend/api/deletequeue",{
        //         driver_id: driverId
        // })
        // .then(res=>{
        //         console.log(typeof(driverId));
        //         console.log(res.data);
                
        // })
        // .catch(err=>{
        //         NotificationManager.error('ขออภัยในความไม่สะดวก','การเชื่อมต่อมีปัญหา',1000);

        // })
}