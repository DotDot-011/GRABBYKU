<?php

$name = $wsdata['arg1'];
$is_driver = $wsdata['arg2'];

if ($is_driver == 1) {
    $id = " " . $wsdata['arg3'];
} else {
    $id = $wsdata['arg3'];
}
$name_and_id = $name . $id;

$sql = "SELECT * FROM websocket WHERE name LIKE '$name_and_id'";
$result = $conn->query($sql);

if ($result->num_rows == 0) {
    $sql = "INSERT INTO websocket (name, connection_id, is_driver) VALUES ('$name_and_id', '$from->resourceId', '$is_driver')";
    $conn->query($sql);
} else {
    $sql = "UPDATE websocket SET connection_id = '$from->resourceId', is_driver = '$is_driver', on_service = 0, in_queue = 0 WHERE name = '$name_and_id'";
    $conn->query($sql);
}
