<?php

$driver_id = $wsdata['arg1'];
$name = $wsdata['arg2'];
$name_and_id = $name . $driver_id;

$sql = "INSERT INTO queue (driver_id) VALUES ('$driver_id')";
$conn->query($sql);

$sql = "UPDATE websocket SET in_queue = 1";
$conn->query($sql);

require "./Queue.php";