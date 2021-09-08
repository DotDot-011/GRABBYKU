<?php

$sql = "DELETE FROM websocket WHERE `connection_id` = '$from->resourceId'";
$conn->query($sql);

$this->clients->detach($from);