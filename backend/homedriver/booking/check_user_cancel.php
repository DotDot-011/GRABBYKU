<?php
$user_id = $postData['user_id'];
$sql = "SELECT * FROM `booking` WHERE `user_id` = $user_id";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    $data['message_code'] = true;
} else {
    $data['message_code'] = false;
}
