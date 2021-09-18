<?php

$user_id = $postData['$user_id'];
$sql = "SELECT `status` FROM `user` WHERE `user_id` = $user_id";
$result = $conn->query($sql);

if ($result->num_rows == 1) {
    $row = $result->fetch_assoc();
    if ($row['status'] == 0) {
        $data['message_code'] = "FALSE";
    } else {
       $data['message_code'] = "TRUE";
    }
}
