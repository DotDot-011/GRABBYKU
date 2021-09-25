<?php

$phone = $postData['phone'];
$password = $postData['password'];

if ($postData['mode'] == 'driver') {
    $driver_id = $postData['driver_id'];
    $sql = "UPDATE driver SET fname = '$fname', lname = '$lname', phone = '$phone', birth_date = '$birth_date', password = '$password', imageData = '$imageData' WHERE driver_id = '$driver_id'";
} else {
    $user_id = $postData['user_id'];
    $sql = "UPDATE user SET fname = '$fname', lname = '$lname', phone = '$phone', birth_date = '$birth_date', password = '$password', imageData = '$imageData' WHERE user_id = '$user_id'";
}
$conn->query($sql);