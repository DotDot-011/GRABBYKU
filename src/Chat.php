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

if ($is_driver == '1') {
    $sql = "SELECT booking_id FROM booking WHERE driver_id = '$ReceiverID'";
} else {
    $sql = "SELECT booking_id FROM booking WHERE user_id = '$ReceiverID'";
}
$result = $conn->query($sql);
$row = $result->fetch_assoc();
$booking_id = $row['booking_id'];

$sql = "INSERT INTO chat_history (booking_id, sender_id, receiver_id, receiver_mode, message) VALUES ($booking_id, $SenderID, $ReceiverID, $is_driver, '$message')";
$conn->query($sql);