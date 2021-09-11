<?php

$driver_id = $wsdata['DriverID'];

$sql = "SELECT * FROM queue";
$result = $conn->query($sql);
$data = [];

if ($result->num_rows > 0) {
    $i = 0;
    while ($row = $result->fetch_assoc()) {
        $data[$i]["id"] = $row['queue_id'];
        $data[$i]["driver_id"] = $row['driver_id'];
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
        $sql2 = "SELECT connection_id FROM websocket WHERE is_driver = 1 and on_service = 0";
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
    } else {
        $data["message_code"] = "queue";
        $from->send(json_encode($data));
        echo "sent data back to connection ", $from->resourceId, "\n";
    }
} else {
    echo $protocol . "\n";
    $data["message_code"] = "empty_queue";
    $sql2 = "SELECT connection_id FROM websocket WHERE is_driver = 1 and on_service = 0";
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
