<?php

$postData = json_decode(file_get_contents("php://input"));
$driver_id = $postData->driver_id;
$user_id = $postData->user_id;

$sql1 = "UPDATE `booking` SET `driver_id` = $driver_id WHERE `user_id` = $user_id";
$sql2 = "UPDATE `driver` SET `status` = 2 WHERE `driver_id` = $driver_id";

if($conn->query($sql1) == TRUE && $conn->query($sql2) == TRUE) {
    echo json_encode([
        "message"=> true
    ]);
} else {
    echo json_encode([
        "message"=> false
    ]);
}

