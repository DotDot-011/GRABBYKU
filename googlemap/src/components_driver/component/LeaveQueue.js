import axios from "axios";
import { Url } from '../../LinkToBackend';
import { NotificationContainer, NotificationManager } from 'react-notifications';

export default function leaveQueue(driverId,conn,winId,penalty) {

        conn.send(JSON.stringify({
                protocol: "dequeue", // protocol
                DriverID: `${driverId}`,
                win_id: `${winId}`,
                is_penalty : `${penalty}`
            }))
}