<?php

echo $protocol;

$driver_id = $wsdata['DriverID'];

$sql = "SELECT fname, lname FROM driver WHERE driver_id = '$driver_id'";
$result = $conn->query($sql);
$row = $result->fetch_assoc();
$driver_name = $row['fname'] . " " . $row['lname'];

$sql = "SELECT win_id FROM websocket WHERE connection_id = '$from->resourceId'";
$result = $conn->query($sql);
$row = $result->fetch_assoc();
$win_id = $row['win_id'];

$sql = "INSERT INTO queue (driver_id, win_id) VALUES ('$driver_id', '$win_id')";
$conn->query($sql);

require dirname(__DIR__) . "/src/Queue.php";