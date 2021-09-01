import axios from "axios";
import { Url } from '../../LinkToBackend';
import { NotificationContainer, NotificationManager } from 'react-notifications';

export default function leaveQueue(driverId) {

        // fetch("http://localhost:1235/queueDriver/1",{
        //         method: 'delete',
                
        //     })
        //     .then(response=> console.log(response))
        //     .catch(err => console.log(err));
        axios.post(Url.LinkToBackend+"backend/api/deletequeue",{
                driver_id: driverId
        })
        .then(res=>{
                console.log(typeof(driverId));
                console.log(res.data);
                
        })
        .catch(err=>{
                NotificationManager.error('ขออภัยในความไม่สะดวก','การเชื่อมต่อมีปัญหา',1000);

        })
}