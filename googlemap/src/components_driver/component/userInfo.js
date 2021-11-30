import React, { useEffect, useState } from 'react';

// --------------- component แสดงชื่อของ user ที่ต้องไปรับ -------------------
const UserInfo = (props) => {
    // const [userUserName, setUserUserName] = useState("5t6y7u8i");
    const [userFName, setUserFName] = useState("Jane");
    const [userLName, setUserLName] = useState("kaa");
    
    useEffect(()=>{
        setUserFName(props.userFname);
        setUserLName(props.userLname);
        
    },[props.userFname]);

    return (
      <div>

        {/* <p>Username: {userUserName}</p> */}
        <p>Name: {userFName} {userLName} </p>
        
      </div>
    );
  }

export default UserInfo;