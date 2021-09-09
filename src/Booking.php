<?php

$sql  = "SELECT fname, lname, user_id FROM user";
$result = $conn->query($sql);
$user = [];
$i = 0;
while ($row = $result->fetch_assoc()) {
    $user[$i]['name_and_id'] = $row['fname'] . " " . $row['lname'] . $row['user_id'];
    $sql1 = "SELECT connection_id FROM websocket WHERE name LIKE '$user[$id]['name_and_id']'";
    $result1 = $conn->query($sql1);
    $row1 = $result1->fetch_assoc();
    foreach ($this->clients as $client) {
        if ($client->resourceId == $row1['connection_id']) {
            $client->send(json_encode([
                "message_code" => "your booking order",
                "booking order" => $i + 1
            ]));
            /* $user[$i]['client'] = $client;
            $this->clients->detach($client); */
            break;
        }
    }
    $i++;
}
