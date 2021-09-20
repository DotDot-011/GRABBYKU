<?php

$name = $wsdata['Name'];
$is_driver = $wsdata['Mode'];
$id = $wsdata['ID'];

$sql = "SELECT connection_id, on_service FROM websocket WHERE name LIKE '$name' and id = '$id' and is_driver = '$is_driver'";
$result = $conn->query($sql);

if ($result->num_rows == 0) {
    $sql = "INSERT INTO websocket (name, id, connection_id, is_driver) VALUES ('$name', '$id', '$from->resourceId', '$is_driver')";
    $conn->query($sql);
} else {
    $row = $result->fetch_assoc();
    $connection_id = $row['connection_id'];
    $on_service = $row['on_service'];
    if ($on_service == 0) {
        foreach ($this->clients as $client) {
            if ($client->resourceId == $connection_id || $client->resourceId == $from->resourceId) {
                $client->send(json_encode([
                    "message_code" => "multiple login"
                ]));
                $client->close();
            }
        }
        $sql = "DELETE FROM websocket WHERE name LIKE '$name' and id = '$id' and is_driver = '$is_driver'";
        $conn->query($sql);
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

    /* $sql = "UPDATE websocket SET connection_id = '$from->resourceId', on_service = 0  WHERE name = '$name' and id = '$id' and is_driver = '$is_driver'";
    $conn->query($sql); */
}
