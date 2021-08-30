<?php

$postData = json_decode(file_get_contents("php://input"));
$driver_id = $postData->driver_id;
$user_id = $postData->user_id;

$sql = "UPDATE `booking` SET `driver_id` = $driver_id WHERE `user_id` = $user_id";

if($conn->query($sql) == TRUE) {
    echo json_encode([
        "message"=> true
    ]);
}else{
    echo json_encode([
        "message"=> false
    ]);
}

