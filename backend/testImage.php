<?php

$postData = file_get_contents("php://input");

$image = $postData['image'];

$sql = "UPDATE driver SET image = $image WHERE driver_id = 18";


if ($conn->query($sql) == TRUE) {
    echo "image ok";
} else {
    echo "image not ok";
}