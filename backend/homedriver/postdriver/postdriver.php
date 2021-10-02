<?php
$username = $postData['username'];
$sql = "SELECT * FROM driver WHERE username = '$username'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $i = 0;
    while ($row = $result->fetch_assoc()) {

        $data[$i]["driver_id"] = $row['driver_id'];
        $data[$i]["fname"] = $row['fname'];
        $data[$i]["lname"] = $row['lname'];
        $data[$i]["birth_date"] = $row['birth_date'];
        $data[$i]["age"] = $row['age'];
        $data[$i]["plate"] = $row['plate'];
        $data[$i]["phone"] = $row['phone'];
        $data[$i]["id_no"] = $row['id_no'];
        $data[$i]['driver_no'] = $row['driver_no'];
        $data[$i]['win_id'] = $row['win_id'];
        $win_id = $row['win_id'];
        $sql1 = "SELECT win_name FROM win WHERE win_id = '$win_id'";
        $result1 = $conn->query($sql1);
        $row1 = $result1->fetch_assoc();
        $data[$i]['win_name'] = $row1['win_name'];
        $data[$i]["status"] = $row['status'];
        $data[$i]["username"] = $row['username'];
        $data[$i]['imageData'] = $row['imageData'];
        $data[$i]['penalty'] = $row['penalty'];
        $i++;
    }
} else {
    $data['message_code'] =  "0 results";
} 
$conn->close();
