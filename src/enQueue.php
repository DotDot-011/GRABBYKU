<?php

$driver_id = $wsdata['arg1'];

$sql = "SELECT fname, lname FROM driver WHERE driver_id = '$driver_id'";
$result = $conn->query($sql);
$row = $result->fetch_assoc();
$name = $row['fname'] . " " . $row['lname'];
$name_and_id = $name . " " . $driver_id;
echo $name_and_id . "\n";

$sql = "INSERT INTO queue (status, driver_id) VALUES (0, '$driver_id')";
$conn->query($sql);

$sql = "UPDATE websocket SET in_queue = 1 WHERE name = '$name_and_id'";
$conn->query($sql);

require dirname(__DIR__) . "/src/Queue.php";