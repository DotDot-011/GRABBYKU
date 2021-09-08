<?php

$user_name = $wsdata['arg1'];
$user_id = $wsdata['arg2'];

$sql = "SELECT driver_id FROM booking WHERE user_id = '$user_id' and driver_id IS NOT NULL";
if ($result->num_rows == 1) {
    $row = $result->fetch_assoc();
    $driver_id = $row['driver_id'];
    $sql = "SELECT fname, lname FROM driver WHERE driver_id = '$driver_id'";
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    $driver_name_and_id = $row['fname'] . " " . $row['lname'] . $driver_id;
    $sql = "SELECT connection_id FROM websocket WHERE name = '$driver_name_and_id'";
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    $connection_id = $row['connection_id'];
    foreach ($this->clients as $client) {
        if ($from->resourceId == $connection_id) {
            $client->send(json_encode([
                "message_code"=> $protocol,
            ]));
        }
    }
}

$statement = "DELETE FROM booking WHERE user_id = '$user_id' ";

if ($conn->query($statement) === TRUE) {
    echo "delete laew ja =] ";
} else {
    echo "Error: " . $conn->error;
}
