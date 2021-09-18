<?php

$sql = "DELETE FROM `booking`";
$conn->query($sql);
$sql = "DELETE FROM `queue`";
$conn->query($sql);
$data['message_code'] = "bomb has been planted.";
