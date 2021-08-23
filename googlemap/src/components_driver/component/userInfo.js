import React, { useEffect, useState } from 'react';

const UserInfo = (props) => {
    const [userUserName, setUserUserName] = useState("5t6y7u8i");
    const [userFName, setUserFName] = useState("Jane");
    const [userLName, setUserLName] = useState("kaa");
    function fetchUser(){
        fetch("http://localhost:1240/UserDetail")
        .then(response=> response.json())
        .then(datas=>{
            console.log(datas);
            console.log("hello world");
            setUserUserName(datas[0].UserName);
            setUserFName(datas[0].FName);
            setUserLName(datas[0].LName);
        })
            
    }

    useEffect(()=>{
        fetchUser();
    },[]);

    return (
      <div>

        <p>Username: {userUserName}</p>
        <p>Name: {userFName} {userLName} </p>

      </div>
    );
  }

export default UserInfo;