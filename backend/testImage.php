<?php

$postData = json_decode(file_get_contents("php://input"));

//$image_type = getimagesize($postData['image']['name']);
//$image_data = addslashes(file_get_contents($postData['image']['name']));
$driver_id = $postData->driver_id;
$image_data = $postData->image;

$sql = "UPDATE driver SET imageData = '$image_data' WHERE driver_id = $driver_id";
$conn->query($sql);

$sql = "SELECT imageData FROM driver WHERE driver_id = $driver_id";
$result = $conn->query($sql) or die(mysqli_error($conn));

if (isset($result)) {
    $row = $result->fetch_assoc();
    $image = $row['imageData'];
    echo $image;
} else {
    echo "bruhh";
}