<?php

require dirname(__DIR__, 2) . "/generate_jwt_driver.php";
require dirname(__DIR__, 2) . "/configs/JWT_key.php";

$postData = json_decode(file_get_contents("php://input"));
$username = $postData->username;

$sql = "SELECT driver_id, win_id FROM driver WHERE username = '$username'";
$result = $conn->query($sql);
$row = $result->fetch_assoc();
$driver_id = $row['driver_id'];
$win_id = $row['win_id'];

$sql1 = "DELETE FROM `queue` WHERE `driver_id` = $driver_id";
$sql2 = "UPDATE `driver` SET `status` = 0 WHERE `driver_id` = $driver_id";
$sql3 = "UPDATE win SET driver_online = driver_online - 1 WHERE win_id = '$win_id'";
if ($conn->query($sql1) == TRUE && $conn->query($sql2) == TRUE && $conn->query($sql3)) {
    $sql = "SELECT * FROM driver WHERE driver_id = $driver_id";
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    echo json_encode([
        "auth" => generate_JWT_driver($row, $key, 1),
        "massage" => TRUE
    ]);
} else {
    echo json_encode([
        "massage" => FALSE
    ]);
}
