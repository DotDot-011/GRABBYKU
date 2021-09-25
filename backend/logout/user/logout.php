<?php

require dirname(__DIR__, 2) . "/generate_JWT.php";
require dirname(__DIR__, 2) . "/configs/JWT_key.php";

$postData = json_decode(file_get_contents("php://input"));
$username = $postData->username;

$sql = "SELECT user_id FROM user WHERE username = '$username'";
$result = $conn->query($sql);
$row = $result->fetch_assoc();
$user_id = $row['user_id'];

$sql = "SELECT on_service FROM websocket WHERE id = '$user_id' and is_driver = 0";
$result = $conn->query($sql);
if ($result->num_rows == 1) {
    $row = $result->fetch_assoc();
    $on_service = $row['on_service'];
    if ($on_service == 0) {
        $sql = "DELETE FROM booking WHERE user_id = '$user_id'";
        $conn->query($sql);
    }
}

$sql2 = "UPDATE `user` SET `status` = 0 WHERE `user_id` = $user_id";
if ($conn->query($sql2) == TRUE) {
    $sql = "SELECT * FROM user WHERE user_id = $user_id";
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    echo json_encode([
        "auth" => generate_JWT($row, $key, 1),
        "massage_code" => TRUE
    ]);
} else {
    echo json_encode([
        "massage_code" => FALSE
    ]);
}
