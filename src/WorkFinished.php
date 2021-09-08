<?php

$driver_name = $wsdata['arg1'];
$driver_id = $wsdata['arg2'];
$user_name = $wsdata['arg3'];
$user_id = $wsdata['arg4'];
$driver_name_and_id = $driver_name . $driver_id;
$user_name_and_id = $user_id . $user_id;

$sql = "UPDATE websocket SET on_service = 0 WHERE name = '$driver_name_and_id' or name = '$user_name_and_id'";
$conn->query($sql);