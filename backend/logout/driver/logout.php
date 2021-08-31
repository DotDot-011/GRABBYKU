<?php

$postData = json_decode(file_get_contents("php://input"));
$driver_id = $postData->driver_id;

$sql1 = "DELETE FROM `queue` WHERE `driver_id` = $driver_id";
$sql2 = "UPDATE `driver` SET `status` = 'offline'";
if($conn->query($sql1) == TRUE && $conn->query($sql2) == TRUE){
    echo json_encode([
        "massage"=> TRUE
    ]);
} else {
    echo json_encode([
        "massage"=> FALSE
    ]);
}