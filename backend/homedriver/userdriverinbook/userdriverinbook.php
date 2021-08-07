<?php

$postData = json_decode(file_get_contents("php://input"));

$driver_id = $postData->driver_id;

// file_put_contents("./registerUser/test.txt", $postData);

$sql = "SELECT driver_id,user_id FROM booking WHERE driver_id = '$driver_id'";
$result = $conn->query($sql);
$data = [];

if ($result->num_rows > 0) {
    $i = 0;
    while ($row = $result->fetch_assoc()) {

        $data[$i]["driver_id"] = $row['driver_id'];
        $data[$i]["user_id"] = $row['user_id'];
        $i++;
    }
    echo json_encode($data, JSON_PRETTY_PRINT);
} else {
    echo "0 results";
}


$conn->close();
