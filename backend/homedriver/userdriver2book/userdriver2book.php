<?php

$postData = json_decode(file_get_contents("php://input"));

$driver_id = $postData->driver_id;
$user_id = $postData->user_id;
$lng_user=$postData->lng_user;
$lat_user=$postData->lat_user;
$lng_des=$postData->lng_des;
$lat_des=$postData->lat_des;

// file_put_contents("./registerUser/test.txt", $postData);

$sql = "INSERT INTO booking (driver_id,user_id,lng_user,lat_user,lng_des,lat_des) 
        VALUES ('$driver_id','$user_id','$lng_user','$lat_user','$lng_des','$lat_des')";
//$result = $conn->query($sql);
$data = [];

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $conn->error;
}

$conn->close();
//asd