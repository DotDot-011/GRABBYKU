<?php
$driver_id = $postData['driver_id'];
$user_id = $postData['user_id'];
$sql = "UPDATE `driver` SET `status` = 2 WHERE `driver_id` = $driver_id";
if($conn->query($sql) == TRUE) {
    $data['message_code'] = true;
} else {
    $data['message_code'] = false;
}

