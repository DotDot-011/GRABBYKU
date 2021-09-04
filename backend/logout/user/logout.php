<?php

$postData = json_decode(file_get_contents("php://input"));
$user_id = $postData->user_id;

$sql1 = "DELETE FROM `booking` WHERE `user_id` = $user_id";
$sql2 = "UPDATE `user` SET `status` = 0 WHERE `driver_id` = $driver_id";
if($conn->query($sql1) == TRUE && $conn->query($sql2) == TRUE){
    echo json_encode([
        "massage"=> TRUE
    ]);
} else {
    echo json_encode([
        "massage"=> FALSE
    ]);
}