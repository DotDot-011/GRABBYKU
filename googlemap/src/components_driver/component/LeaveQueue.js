import axios from "axios";
import { Url } from '../../LinkToBackend';
import { NotificationContainer, NotificationManager } from 'react-notifications';

export default function leaveQueue(driverId,conn) {

        conn.send(JSON.stringify({
                protocol: "dequeue", // protocol
                DriverID: `${driverId}`,
            }))
}