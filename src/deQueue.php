<?php

$driver_id = $wsdata['arg1'];
$sql = "SELECT fname, lname FROM driver WHERE driver_id = '$driver_id'";
$result = $conn->query($sql);
$row = $result->fetch_assoc();
$name = $row['fname'] . " " . $row['lname'];
$name_and_id = $name . " " . $driver_id;

$sql = "DELETE FROM queue WHERE driver_id = '$driver_id'";
$conn->query($sql);

$on_service = 0;

if ($protocol == 'driver-accepted') {
    $on_service = 1;
}

$sql = "UPDATE websocket SET on_service = $on_service WHERE name LIKE '$name_and_id'";
$conn->query($sql);

require dirname(__DIR__) . "/src/Queue.php";
