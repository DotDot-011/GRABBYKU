<?php

$name = $wsdata['Name'];
$is_driver = $wsdata['Mode'];
$ID = $wsdata['ID'];


if (isset($wsdata['reconnect'])) {
    $reconnect = $wsdata['reconnect'];
    echo $reconnect , "\n";
} else {
    $reconnect = FALSE;
}

if ($is_driver == '1') {
    $sql = "SELECT win_id FROM driver WHERE driver_ID = '$ID'";
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    $win_id = $row['win_id'];
} else {
    $win_id = -1;
}

$sql = "SELECT connection_ID, on_service FROM websocket WHERE name LIKE '$name' and ID = '$ID' and is_driver = '$is_driver'";
$result = $conn->query($sql);

if ($result->num_rows == 0) {
    $sql = "INSERT INTO websocket (name, ID, connection_ID, is_driver, win_id) VALUES ('$name', '$ID', '$from->resourceId', '$is_driver', '$win_id')";
    $conn->query($sql);
    if ($is_driver) {
        $sql3 = "UPDATE win SET driver_online = driver_online + 1 WHERE win_id = '$win_id'";
        $conn->query($sql3);
        require dirname(__DIR__) . "/src/Booking.php";
    }
} else {
    $row = $result->fetch_assoc();
    $connection_ID = $row['connection_ID'];
    $on_service = $row['on_service'];
    if ($reconnect) {
        $sql = "UPDATE websocket SET connection_ID = '$from->resourceId', on_service = 0  WHERE name = '$name' and ID = '$ID' and is_driver = '$is_driver'";
        $conn->query($sql);
    } else if ($on_service == 0) {
        foreach ($this->clients as $client) {
            if ($client->resourceId == $connection_ID || $client->resourceId == $from->resourceId) {
                $client->send(json_encode([
                    "message_code" => "multiple login"
                ]));
                $client->close();
            }
        }
        $sql = "DELETE FROM websocket WHERE name LIKE '$name' and ID = '$ID' and is_driver = '$is_driver'";
        $conn->query($sql);
        if ($is_driver) {
            $sql = "UPDATE win SET driver_online = driver_online - 1 WHERE win_id = '$win_id'";
            $conn->query($sql);
        }
    } else {
        foreach ($this->clients as $client) {
            if ($client->resourceId == $from->resourceId) {
                $client->send(json_encode([
                    "message_code" => "multiple login"
                ]));
                $client->close();
                break;
            }
        }
    }
}

// reconnect part
if ($is_driver == '1') {
    $sql1 = "SELECT * FROM booking WHERE driver_ID = '$ID'";
    $result1 = $conn->query($sql1);
    if ($result1->num_rows == 1) {
        // booking info
        $row1 = $result1->fetch_assoc();
        $user_id = $row1['user_id'];
        $booking_id = $row1['booking_id'];
        $sql2 = "SELECT * FROM user WHERE user_id = '$user_id'";
        $result2 = $conn->query($sql2);
        $row2 = $result2->fetch_assoc();
        $data = [];
        $data["user_fname"] = $row2["fname"];
        $data["user_lname"] = $row2["lname"];
        $data["image"] = $row2["imageData"];
        $row = array_merge($row1, $data);
        $row['message_code'] = 'booking info';
        $from->send(json_encode($row));
        sleep(0.5);

        // chat info
        $data = [];
        $sql = "SELECT * FROM chat_history WHERE booking_id = '$booking_id'";
        $result = $conn->query($sql);
        $i = 0;
        while($row = $result->fetch_assoc()) {
            $data[$i] = $row;
            $i++;
        }
        $data['message_code'] = 'chat info';
        $from->send(json_encode($data));
    }
} else {
    $sql = "SELECT * FROM booking WHERE user_ID = '$ID' and driver_ID is not NULL";
    $result = $conn->query($sql);
    if ($result->num_rows == 1) {
        // booking_info
        $row = $result->fetch_assoc();
        $booking_id = $row['booking_id'];
        $row['message_code'] = 'booking info';
        $from->send(json_encode($row));
        sleep(0.5);

        // chat info
        $data = [];
        $sql = "SELECT * FROM chat_history WHERE booking_id = '$booking_id'";
        $result = $conn->query($sql);
        $i = 0;
        while($row = $result->fetch_assoc()) {
            $data[$i] = $row;
            $i++;
        }
        $data['message_code'] = 'chat info';
        $from->send(json_encode($data));
    }
}
