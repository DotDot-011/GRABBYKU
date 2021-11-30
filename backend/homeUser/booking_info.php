<?php
$user_id = $postData['user_id'];
$JWT = $postData['JWT'];
$statement = "SELECT * FROM booking WHERE user_id = '$user_id'";
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
        if ($data['driver_id'] != NULL) {
            $sql = "UPDATE `user` SET `status` = 2 WHERE `user_id` = $user_id";
        }
    } else {
        $data['message_code'] = "there are more than one booking for this user or there is no booking match";
    }
} else {
    $data['message_code'] = "error";
}
$conn->close();
