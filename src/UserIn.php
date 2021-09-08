<?php

$name = $wsdata['arg1'];
$is_driver = $wsdata['arg2'];
$id = $wsdata['arg3'];
$name_and_id = $name . $id;

$sql = "INSERT INTO websocket (name, connection_id, is_driver) VALUES ('$name_and_id', '$from->resourceId', '$is_driver')";
$conn->query($sql);