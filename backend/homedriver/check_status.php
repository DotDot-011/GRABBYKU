<?php

$postData = json_decode(file_get_contents("php://input"));
$driver_id = $postData->$driver_id;

$sql = "SELECT `status` FROM `driver` WHERE `driver_id` = $driver_id";
$result = $conn->query($sql);

if ($result->num_rows == 1) {
    $row = $result->fetch_assoc();
    if ($row['status'] == 0) {
        echo FALSE;
    } else {
        echo TRUE;
    }
}