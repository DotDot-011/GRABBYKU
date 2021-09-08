<?php

$driver_id = $wsdata['arg1'];
if ($check == 1) {
    $sql = "SELECT fname, lname FROM driver WHERE driver_id = '$driver_id'";
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    $name = $row['fname'] . " " . $row['lname'];
} else {
    $name = $wsdata['arg2'];
}
$name_and_id = $name . $driver_id;

$sql = "DELETE FROM websocket WHERE name LIKE '$name_and_id'";
$conn->query($sql);

$sql = "UPDATE websocket SET in_queue = 0 WHERE name LIKE '$name_and_id'";
$conn->query($sql);

require "./Queue.php";
