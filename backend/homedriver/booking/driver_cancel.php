<?php

$driver_id = $postData['driver_id'];
$user_id = $postData['user_id'];
$sql = "UPDATE `booking` SET `driver_id` = NULL WHERE `user_id` = $user_id";
$result = $conn->query($sql);
$sql = "DELETE FROM `queue` WHERE `queue`.`driver_id` = $driver_id";
if($conn->query($sql) == TRUE){
    $data['message_code'] = TRUE;
}else{
    $data['message_code'] = FALSE; 
}

