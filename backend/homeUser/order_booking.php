<?php

// echo json_encode([
//     "username" => "test_username",
//     "password" => "test_password"
// ]);

//$postData = json_decode(file_get_contents("php://input"));

$user_id = $postData['user_id'];
$win_id = $postData['win_id'];
$lat_user = $postData['latitudeStart'];
$lng_user = $postData['longtitudeStart'];
$lat_des = $postData['latitudeDestination'];
$lng_des = $postData['longtitudeDestination'];

// file_put_contents("./registerUser/test.txt", $postData);

$sql = "DELETE FROM booking WHERE user_id = '$user_id'";
$conn->query($sql);

$sql = "INSERT INTO booking (user_id, win_id, lat_user, lng_user, lat_des, lng_des)
VALUES ('$user_id', '$win_id', '$lat_user', '$lng_user', '$lat_des', '$lng_des')";
$result = $conn->query($sql);

$sql = "SELECT * FROM booking WHERE win_id = '$win_id' and driver_id is NULL";
$result = $conn->query($sql);

$data['booking_order'] = $result->num_rows;

$sql = "SELECT win_name, driver_online FROM win WHERE win_id = '$win_id'";
$result = $conn->query($sql);
$row = $result->fetch_assoc();
$data['win_name'] = $row['win_name'];
$data['driver_online'] = $row['driver_online'];

$sql = "UPDATE websocket SET on_service = 1 WHERE id = '$user_id' and is_driver = 0";
$conn->query($sql);

$sql = "SELECT time FROM booking WHERE win_id = '$win_id' and driver_id is not NULL ORDER BY time DESC";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $data['time'] = $row['time'];
} else {
    $sql = "SELECT time FROM history WHERE win_id = '$win_id' ORDER BY time DESC";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $data['time'] = $row['time'];
    } else {
        $data['time'] = 0;
    }
}
