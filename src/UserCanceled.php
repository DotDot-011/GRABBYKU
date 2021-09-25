<?php

$user_id = $wsdata['user_id'];
$win_id = $wsdata['win_id'];

$sql = "SELECT driver_id FROM booking WHERE user_id = '$user_id' and driver_id IS NOT NULL";
$result = $conn->query($sql);

if ($result->num_rows == 1) {
    $row = $result->fetch_assoc();
    $driver_id = $row['driver_id'];
    $sql = "SELECT fname, lname FROM driver WHERE driver_id = '$driver_id'";
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    $driver_name = $row['fname'] . " " . $row['lname'];
    $sql = "SELECT connection_id FROM websocket WHERE name = '$driver_name' and id = '$driver_id' and is_driver = 1";
    $result = $conn->query($sql);
    if ($result->num_rows == 1) {
        $row = $result->fetch_assoc();
        $connection_id = $row['connection_id'];
        foreach ($this->clients as $client) {
            if ($client->resourceId == $connection_id) {
                $client->send(json_encode([
                    "message_code" => $protocol,
                    "message" => "Canceled"
                ]));
                break;
            }
        }
    }
}

$statement = "DELETE FROM booking WHERE user_id = '$user_id' ";

if ($conn->query($statement) === TRUE) {
    echo "deleted\n";
} else {
    echo "Error: " . $conn->error . "\n";
}

require dirname(__DIR__) . "/src/Booking.php";

$sql = "UPDATE user SET cancel_count = cancel_count + 1 WHERE user_id = $user_id";
$result = $conn->query($sql);
