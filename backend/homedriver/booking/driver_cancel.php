<?php

$postData = json_decode(file_put_contents("php://input"));
$driver_id = $postData->driver_id;
$user_id = $postData->user_id;

$sql = "DELETE FROM `booking` WHERE `booking`.`user_id` = $user_id";
if($conn->query($sql) == TRUE){
    $temp = TRUE;
}else{
    $temp = FALSE;
}

$sql = "DELETE FROM 'queue' WHERE 'queue'.'driver_id' = $driver_id";
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