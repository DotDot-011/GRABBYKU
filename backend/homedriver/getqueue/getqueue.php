<?php
$sql = "SELECT * FROM queue";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $i = 0;
    while ($row = $result->fetch_assoc()) {

        $data[$i]["id"] = $row['queue_id'];
        $data[$i]["driver_id"] = $row['driver_id'];
        $driver_id = $row['driver_id'];
        $sql1 = "SELECT fname,lname FROM driver WHERE driver_id = '$driver_id'";
        $result1 = $conn->query($sql1);
        $row1 = $result1->fetch_assoc();
        $data[$i]["driver_name"] = $row1['fname'] . " " . $row1['lname'];
        $data[$i]["status"] = $row['status'];
        $data[$i]["time_stamp"] = $row['create_at'];
        $i++;
    }
} else {
    $data['message_code'] =  "0 results";
}

 $conn->close();

// ▒▒▒▒▒▒▒▒▄▄▄▄▄▄▄▄▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▄█▀▀░░░░░░▀▀█▄▒▒▒▒▒
// ▒▒▒▄█▀▄██▄░░░░░░░░▀█▄▒▒▒
// ▒▒█▀░▀░░▄▀░░░░▄▀▀▀▀░▀█▒▒
// ▒█▀░░░░███░░░░▄█▄░░░░▀█▒
// ▒█░░░░░░▀░░░░░▀█▀░░░░░█▒
// ▒█░░░░░░░░░░░░░░░░░░░░█▒
// ▒█░░██▄░░▀▀▀▀▄▄░░░░░░░█▒
// ▒▀█░█░█░░░▄▄▄▄▄░░░░░░█▀▒
// ▒▒▀█▀░▀▀▀▀░▄▄▄▀░░░░▄█▀▒▒
// ▒▒▒█░░░░░░▀█░░░░░▄█▀▒▒▒▒
// ▒▒▒█▄░░░░░▀█▄▄▄█▀▀▒▒▒▒▒▒
// ▒▒▒▒▀▀▀▀▀▀▀▒▒▒▒▒▒▒▒▒▒▒▒▒
