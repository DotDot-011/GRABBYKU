import React from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';
 
function AlertPop() {  
  
  NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
    return (
      <div>
        <NotificationContainer/>
      </div>
    )
  
}
 
export default AlertPop;