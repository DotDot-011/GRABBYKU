<?php
# user - post user's info

$postData = json_decode(file_get_contents("php://input"));

$username = $postData->username;
// file_put_contents("./registerUser/test.txt", $postData);

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
        $data[$i]["password"] = $row['password'];
        $i++;
    }
    echo json_encode($data, JSON_PRETTY_PRINT);
} else {
    echo "0 results";
}
$conn->close();