<?php

require dirname(__DIR__, 2) . "/generate_jwt_driver.php";
require dirname(__DIR__, 2) . "/configs/JWT_key.php";

$postData = json_decode(file_get_contents("php://input"));
$driver_id = $postData->driver_id;
 
 $sql1 = "DELETE FROM `queue` WHERE `driver_id` = $driver_id";
 $sql2 = "UPDATE `driver` SET `status` = 0 WHERE `driver_id` = $driver_id";
 if($conn->query($sql1) == TRUE && $conn->query($sql2) == TRUE){
     $sql = "SELECT * FROM driver WHERE driver_id = $driver_id";
     $result = $conn->query($sql);
     $row = $result->fetch_assoc();
     echo json_encode([
         "auth"=> generate_JWT_driver($row, $key, 1),
         "massage"=> TRUE
     ]);
 } else {
     echo json_encode([
         "massage"=> FALSE
     ]);
 }
