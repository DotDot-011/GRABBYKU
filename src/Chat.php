<?php

$ReceiverName = $wsdata['ReceiverName'];
$message = $wsdata['Message'];
$ReceiverID = $wsdata['ReceiverID'];
$is_driver = $wsdata['ReceiverMode'];

$sql = "SELECT id FROM websocket WHERE connection_id = '$from->resourceId'";
$result = $conn->query($sql);
$row = $result->fetch_assoc();
$SenderID = $row['id'];

$sql = "SELECT connection_id FROM websocket WHERE name LIKE '$ReceiverName' and id = '$ReceiverID' and is_driver = '$is_driver'";
echo "send message to " . $ReceiverName . "\n";
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

$sql = "INSERT INTO chat_history (sender, receiver, message) VALUES ('$SenderID', '$ReceiverID', '$message')";
$conn->query($sql);