<?php

$sql = "DELETE FROM websocket WHERE `connection_id` = '$from->resourceId'";
$conn->query($sql);

$from->send(json_encode([
    "message_code"=> "out"
]));

$this->clients->detach($from);