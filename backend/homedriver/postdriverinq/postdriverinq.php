<?php
$driver_id = $postData['driver_id'];
$sql = "INSERT INTO queue (driver_id) VALUES ('$driver_id')";
if ($conn->query($sql) === TRUE) {
    $data['message_code'] = "New record created successfully";
} else {
    $data['message_code'] = "Error: " . $conn->error;
}
$conn->close();
