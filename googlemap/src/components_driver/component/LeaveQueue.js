import React from "react";
export default function leaveQueue(props) {

        fetch("http://localhost:1235/queueDriver/1",{
                method: 'delete',
                
            })
            .then(response=> console.log(response))
            .catch(err => console.log(err));
        
}