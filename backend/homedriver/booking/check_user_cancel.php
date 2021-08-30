<?php

$postData = json_decode(file_get_contents("php://input"));
$user_id = $postData->user_id;

$sql = "SELECT * FROM `booking` WHERE `user_id` = $user_id";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo json_encode([
        "message" => true
    ]);
} else {
    echo json_encode([
        "message" => false
    ]);
}