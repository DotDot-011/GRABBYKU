<?php

$sql = "DELETE FROM `booking`";
$conn->query($sql);
$sql = "DELETE FROM `queue`";
$conn->query($sql);
echo "bomb has been planted.";
