<?php

$driver_name = $wsdata['driver_name'];
$driver_id = $wsdata['driver_id'];
$user_name = $wsdata['user_name'];
$user_id = $wsdata['user_id'];
$cost = $wsdata['cost'];

//Set on service in websocket of driver to 0
$sql = "UPDATE websocket SET on_service = 0 WHERE name = '$driver_name' and id = '$driver_id' or name = '$user_name' and id = '$user_id'";
$conn->query($sql);

//notify user arrive
$sql2 = "SELECT * FROM websocket WHERE name LIKE '$user_name' and id = '$user_id'";
$result_for_trigger = $conn->query($sql2);
if ($result_for_trigger != NULL) {
    $row = $result_for_trigger->fetch_assoc();
    foreach ($this->clients as $client) {
        if ($client->resourceId == $row['connection_id']) {
            print("answer to socket: " . $row['connection_id'] . "\n");
            $client->send(json_encode([
                "message_code" => "arrive"
            ]));
        }
    }
}

//look for booking_info in booking table insert history and then delete it from booking
$sql6 = "SELECT * FROM  booking WHERE user_id = '$user_id' AND driver_id = '$driver_id' ";
$result_for_booking_id = $conn->query($sql6);
if ($result_for_booking_id != NULL) {
    $row_for_booking_id  = $result_for_booking_id->fetch_assoc();
    $booking_id = $row_for_booking_id['booking_id'];
    $win_id = $row_for_booking_id['win_id'];
    $date_booking = $row_for_booking_id['create_date'];
    $lng_user = $row_for_booking_id['lng_user'];
    $lat_user = $row_for_booking_id['lat_user'];
    $lng_des = $row_for_booking_id['lng_des'];
    $lat_des = $row_for_booking_id['lat_des'];
    $currentTime = time();

    //insert history
    $sql7 = "INSERT INTO history (history_id , driver_id , user_id , win_id , lng_user , lat_user , lng_des , lat_des , price , date, time)";
    $sql7 = $sql7 . "VALUES('$booking_id' , '$driver_id' , '$user_id' , '$win_id' , '$lng_user' , '$lat_user' , '$lng_des' , '$lat_des' ,'$cost' ,'$date_booking', '$currentTime') ";
    $conn->query($sql7);

    //Delete booking when done
    $sql3 = "DELETE FROM booking WHERE driver_id = '$driver_id' ";
    $conn->query($sql3);
}

//notify driver "booking has been delete"
$sql4 = "SELECT * FROM websocket WHERE name LIKE '$driver_name' and id = '$driver_id'";
//print($driver_name . " " . $id);
$result_for_answer = $conn->query($sql4);
if ($result_for_answer != NULL) {
    print(" try answer \n");
    $row2 = $result_for_answer->fetch_assoc();
    foreach ($this->clients as $client) {
        if ($client->resourceId == $row2['connection_id']) {
            $client->send(json_encode([
                "message_code" => "หิวหมัด"
            ]));
        }
    }
}

//update success_count
$sql5 = "UPDATE user Set success_count = success_count + 1 WHERE user_id = '$user_id' ";
$conn->query($sql5);

$sql = "UPDATE driver SET status = 1 WHERE driver_id = $driver_id";
$conn->query($sql);
