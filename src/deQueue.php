<?php

$driver_id = $wsdata['arg1'];
$name = $wsdata['arg2'];
$name_and_id = $name . $driver_id;

$sql = "DELETE FROM websocket WHERE name LIKE '$name_and_id'";
$conn->query($sql);

$sql = "UPDATE websocket SET on_service WHERE name LIKE '$name_and_id'";
$conn->query($sql);

require "./Queue.php";