<?php

$fname = $postData['fname'];
$lname = $postData['lname'];
$phone = $postData['phone'];
$birth_date = $postData['birth_date'];
$password = $postData['password'];
$imageData = $postData['image'];
$user_id = $postData['user_id'];

if ($postData['mode'] == 'driver') {
    $sql = "UPDATE driver SET fname = '$fname', lname = '$lname', phone = '$phone', birth_date = '$birth_date', password = '$password', imageData = '$imageData' WHERE driver_id = '$driver_id'";
} else {
    $sql = "UPDATE user SET fname = '$fname', lname = '$lname', phone = '$phone', birth_date = '$birth_date', password = '$password', imageData = '$imageData' WHERE user_id = '$user_id'";
}
$conn->query($sql);