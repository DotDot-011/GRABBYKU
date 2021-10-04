<?php

if ($protocol != 'close') {
    $driver_id = $wsdata['DriverID'];
}
$sql = "SELECT fname, lname, win_id FROM driver WHERE driver_id = '$driver_id'";
$result = $conn->query($sql);
$row = $result->fetch_assoc();
$driver_name = $row['fname'] . " " . $row['lname'];
$win_id = $row['win_id'];

if ($protocol != 'driver-accepted') {
    $is_penalty = $wsdata['is_penalty'];
    if ($is_penalty) {
        $penalty = time() + 10;
        $sql = "UPDATE driver SET penalty = '$penalty' WHERE driver_id = '$driver_id'";
        $conn->query($sql);
    }
}



$sql = "DELETE FROM queue WHERE driver_id = '$driver_id'";
$conn->query($sql);

$on_service = 0;

if ($protocol == 'driver-accepted') {
    $on_service = 1;
}

$sql = "UPDATE websocket SET on_service = $on_service WHERE name LIKE '$driver_name' and id = '$driver_id'";
$conn->query($sql);

if ($protocol != 'driver-accepted') {
    $sql = "UPDATE booking SET driver_id = NULL WHERE driver_id = '$driver_id'";
    $conn->query($sql);
}

require dirname(__DIR__) . "/src/Queue.php";
