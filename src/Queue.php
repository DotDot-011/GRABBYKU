<?php

if ($protocol != 'close') {
    $driver_id = $wsdata['DriverID'];
}

if ($protocol == 'getqueue') {
    $sql = "SELECT fname, lname, win_id FROM driver WHERE driver_id = '$driver_id'";
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    $driver_name = $row['fname'] . " " . $row['lname'];
    $win_id = $row['win_id'];
}

$sql = "SELECT * FROM queue where win_id = '$win_id'";
$result = $conn->query($sql);
$data = [];

if ($result->num_rows > 0) {
    $data["message_code"] = "queue";
    $i = 0;
    while ($row = $result->fetch_assoc()) {
        $data[$i]["id"] = $row['queue_id'];
        $data[$i]["driver_id"] = $row['driver_id'];
        $data[$i]["win_id"] = $row['win_id'];
        $driver_id = $row['driver_id'];
        $sql1 = "SELECT fname,lname FROM driver WHERE driver_id = '$driver_id'";
        $result1 = $conn->query($sql1);
        $row1 = $result1->fetch_assoc();
        $data[$i]["driver_name"] = $row1['fname'] . " " . $row1['lname'];
        $data[$i]["status"] = $row['status'];
        $data[$i]["time_stamp"] = $row['create_at'];
        $i++;
    }
    if ($protocol != 'getqueue') {
        echo $protocol . "\n";
        $sql2 = "SELECT connection_id FROM websocket WHERE is_driver = 1 and on_service = 0 and win_id = '$win_id'";
        $result2 = $conn->query($sql2);
        while ($row = $result2->fetch_assoc()) {
            $connection_id = $row['connection_id'];
            foreach ($this->clients as $client) {
                if ($client->resourceId == $connection_id) {
                    $client->send(json_encode($data));
                    break;
                }
            }
        }
    } else {
        $from->send(json_encode($data));
        echo "sent data back to connection ", $from->resourceId, "\n";
    }
} else {
    echo $protocol . "\n";
    $data["message_code"] = "empty_queue";
    $sql2 = "SELECT connection_id FROM websocket WHERE is_driver = 1 and on_service = 0 and win_id = '$win_id'";
    $result2 = $conn->query($sql2);
    while ($row = $result2->fetch_assoc()) {
        $connection_id = $row['connection_id'];
        $data["message_code"] = "queue";
        foreach ($this->clients as $client) {
            if ($client->resourceId == $connection_id) {
                $client->send(json_encode($data));
                break;
            }
        }
    }
}
