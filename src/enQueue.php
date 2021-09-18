<?php

echo $protocol;

$driver_id = $wsdata['DriverID'];

$sql = "SELECT fname, lname FROM driver WHERE driver_id = '$driver_id'";
$result = $conn->query($sql);
$row = $result->fetch_assoc();
$driver_name = $row['fname'] . " " . $row['lname'];

$sql = "INSERT INTO queue (driver_id) VALUES ('$driver_id')";
$conn->query($sql);

require dirname(__DIR__) . "/src/Queue.php";