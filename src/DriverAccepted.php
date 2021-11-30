<?php

$DriverName = $wsdata['DriverName'];
$UserName = $wsdata['UserName'];
$user_id = $wsdata['UserID'];
$driver_id = $wsdata['DriverID'];
$win_id = $wsdata['win_id'];
$sql2 = "UPDATE `driver` SET `status` = 2 WHERE `driver_id` = $driver_id";

$statement = "SELECT booking_id FROM booking WHERE user_id = '$user_id' AND win_id = '$win_id'";
$results = $conn->query($statement);
$rows = $results->fetch_assoc();
$booking_id = $rows["booking_id"];

$sql="SELECT connection_id FROM websocket WHERE name LIKE '$UserName' and id = '$user_id' and is_driver = 0";
$result = $conn->query($sql);

while ($row = $result->fetch_assoc()) {
    $connection_id = $row['connection_id'];
    foreach ($this->clients as $client) {
        if ($client->resourceId == $connection_id) {
            // send message
            $client->send(json_encode([
                "message_code"=> $protocol,
                "driver_id"=> $driver_id,
                "booking_id"=> $booking_id
            ]));
            break;
        }   
    }   
}

$sql = "UPDATE websocket SET on_service = 1 WHERE name = '$DriverName' AND id = '$driver_id' AND is_driver = 1";
$conn->query($sql);
$sql = "UPDATE websocket SET on_service = 1 WHERE name = '$UserName' and id = '$user_id' and is_driver = 0";
$conn->query($sql);
$currentTime = time();
$sql = "UPDATE booking SET time = '$currentTime' WHERE driver_id = '$driver_id'";
$conn->query($sql);

require dirname(__DIR__) . "/src/deQueue.php";
require dirname(__DIR__) . "/src/Booking.php";
