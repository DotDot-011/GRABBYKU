<?php

$name = $wsdata['arg2'];
$user_id = $wsdata['arg3'];
$driver_id = $wsdata['arg1'];
$name_and_id = $name . $user_id;

$sql1 = "UPDATE `booking` SET `driver_id` = $driver_id WHERE `user_id` = $user_id";
$sql2 = "UPDATE `driver` SET `status` = 2 WHERE `driver_id` = $driver_id";

if($conn->query($sql1) == TRUE && $conn->query($sql2) == TRUE) {
    echo json_encode([
        "message"=> true
    ]);
} else {
    echo json_encode([
        "message"=> false
    ]);
}

$statement = "SELECT * FROM booking WHERE user_id = '$user_id'";

//$result = mysqli_query($statement); 
$data = [];

if ($result = $conn->query($statement)) {
    if ($result->num_rows == 1) {
        $row = $result->fetch_assoc();
        $data['booking_id'] =  $row['booking_id'];
        $data['driver_id'] = $row['driver_id'];
        $data['user_id'] = $row['user_id'];
        $data['lng_user'] = $row['lng_user'];
        $data['lat_user'] = $row['lat_user'];
        $data['lng_des'] = $row['lng_des'];
        $data['lat_des'] = $row['lat_des'];
        echo json_encode($data);
        $sql = "";
        $conn->query($sql);
        if ($data['driver_id'] != NULL) {
            $sql = "UPDATE `user` SET `status` = 2 WHERE `user_id` = $user_id";
            $conn->query($sql);
        }
    } else {
        echo "there are more than one booking for this user or there is no booking match";
    }
} else {
    echo "error";
}

$sql = "UPDATE websocket SET on_service = 1 WHERE name = '$name_and_id'";
$conn->query($sql);

require dirname(__DIR__) . "/src/deQueue.php";
require dirname(__DIR__) . "/src/Booking.php";