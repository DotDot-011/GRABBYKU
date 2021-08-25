<?php

// file_put_contents("./registerUser/test.txt", $postData);

$sql = "SELECT * FROM queue";
$result = $conn->query($sql);
$data = [];

if ($result->num_rows > 0) {
    $i = 0;
    while ($row = $result->fetch_assoc()) {

        $data[$i]["id"] = $row['queue_id'];
        $data[$i]["driver_id"] = $row['driver_id'];
        $data[$i]["status"] = $row['status'];
        $data[$i]["time_stamp"] = $row['create_at'];
        $i++;
    }
    echo json_encode($data, JSON_PRETTY_PRINT);
} else {
    echo "0 results";
}

$conn->close();