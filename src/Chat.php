<?php

$name = $wsdata['arg1'];
$message = $wsdata['arg2'];
$id = $wsdata['arg3'];
$name_and_id = $name . $id;

$sql = "SELECT connection_id FROM websocket WHERE name LIKE '$name_and_id'";
echo "send message to " . $name_and_id . "\n";
$result = $conn->query($sql);

if ($result === FALSE) {
    $from->send("name not found");
    die(mysqli_error($conn));
}

while ($row = $result->fetch_assoc()) {
    $connection_id = $row['connection_id'];
    foreach ($this->clients as $client) {
        if ($client->resourceId == $connection_id) {
            // send message
            $client->send(json_encode([
                "message_code"=> $protocol,
                "message"=> $message
            ]));
            break;
        }
    }
}
