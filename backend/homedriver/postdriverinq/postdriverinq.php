<?php

$postData = json_decode(file_get_contents("php://input"));

$driver_id = $postData->driver_id;

// file_put_contents("./registerUser/test.txt", $postData);

$sql = "INSERT INTO queue (driver_id) VALUES ('$driver_id')";
// $result = $conn->query($sql);

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $conn->error;
}
