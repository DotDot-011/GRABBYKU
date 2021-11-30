<?php
# user - post user's info

$username = $postData['user_name'];
$sql = "SELECT * FROM user WHERE username = '$username'";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    $i = 0;
    while ($row = $result->fetch_assoc()) {

        $data[$i]["user_id"] = $row['user_id'];
        $data[$i]["fname"] = $row['fname'];
        $data[$i]["lname"] = $row['lname'];
        $data[$i]["birth_date"] = $row['birth_date'];
        $data[$i]["age"] = $row['age'];
        $data[$i]["email"] = $row['email'];
        $data[$i]["phone"] = $row['phone'];
        $data[$i]["id_no"] = $row['id_no'];
        $data[$i]["username"] = $row['username'];
        $data[$i]['imageData'] = $row['imageData'];
        $i++;
    }
} else {
    $data['message_code'] = "0 results";
}
//echo json_encode($data);
$conn->close();
