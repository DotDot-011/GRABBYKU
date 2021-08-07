<?php

// echo json_encode([
//     "username" => "test_username",
//     "password" => "test_password"
// ]);

$postData = json_decode(file_get_contents("php://input"));

$lat_user = $postData->latitudeStart;
$lng_user = $postData->longtitudeStart;
$lat_des = $postData->latitudeDestination;
$lng_des = $postData->longtitudeDestination;
// file_put_contents("./registerUser/test.txt", $postData);

$sql = "INSERT INTO booking (lat_user, lng_user, lat_des, lng_des)
VALUES ('$lat_user', '$lng_user', '$lat_des', '$lng_des')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $conn->error;
}