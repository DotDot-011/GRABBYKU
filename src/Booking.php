<?php

$sql  = "SELECT user_id FROM booking WHERE driver_id is NULL AND win_id = $win_id";
$result = $conn->query($sql);
$id = [];
$i = 0;

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $id[$i] = $row['user_id'];
        $sql1 = "SELECT connection_id FROM websocket WHERE id = $id[$i] AND is_driver = 0 ";
        $result1 = $conn->query($sql1);
        $sql2 = "SELECT driver_online FROM win WHERE win_id = '$win_id'";
        $result2 = $conn->query($sql2);
        $row2 = $result2->fetch_assoc();
        if ($result1->num_rows == 1) {
            $row1 = $result1->fetch_assoc();
            foreach ($this->clients as $client) {
                if ($client->resourceId == $row1['connection_id']) {
                    $client->send(json_encode([
                        "message_code" => "your booking order",
                        "booking_order" => $i + 1,
                        "driver_online" => $row2['driver_online']
                    ]));
                    break;
                }
            }
            $i++;
        }
    }
}
