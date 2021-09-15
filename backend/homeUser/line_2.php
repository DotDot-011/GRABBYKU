<?php

// echo json_encode([
//     "username" => "test_username",
//     "password" => "test_password"
// ]);

$postData = json_decode(file_get_contents("php://input"));

$user_id = $postData->user_id;
$lat_user = $postData->latitudeStart;
$lng_user = $postData->longtitudeStart;
$lat_des = $postData->latitudeDestination;
$lng_des = $postData->longtitudeDestination;
// file_put_contents("./registerUser/test.txt", $postData);

$sql = "INSERT INTO booking (user_id, lat_user, lng_user, lat_des, lng_des)
VALUES ('$user_id', '$lat_user', '$lng_user', '$lat_des', '$lng_des')";
$result = $conn->query($sql);

$sql = "SELECT * FROM booking";
$result = $conn->query($sql);

echo $result->num_rows;
