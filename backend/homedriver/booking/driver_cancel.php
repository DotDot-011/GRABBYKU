<?php

$postData = json_decode(file_get_contents("php://input"));
$driver_id = $postData->driver_id;
$user_id = $postData->user_id;

$sql = "UPDATE `booking` SET `driver_id` = NULL WHERE `user_id` = $user_id";
if($conn->query($sql) == TRUE){
    $temp = TRUE;
}else{
    $temp = FALSE;
}

$sql = "DELETE FROM 'queue' WHERE 'driver_id' = $driver_id";
if($conn->query($sql) == TRUE && $temp == TRUE){
    echo json_encode([
        "message"=> TRUE
    ]);
}else{
    echo json_encode([
        "message"=> FALSE
    ]);
}

?>