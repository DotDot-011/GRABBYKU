<?php

$postData = json_decode(file_get_contents("php://input"));

$username = $postData->username;
$password = $postData->password;
// file_put_contents("./registerUser/test.txt", $postData);

$sql = "SELECT password FROM user WHERE username = '$username'";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while ($row = $result->fetch_assoc()) {
        $p_check = $row['password'];
    }
    // echo json_encode($p_check);
    if($p_check === $password) {
        echo json_encode([
            "message"=> true
        ]);
    }
} else {
    echo "username and password not register yet";
}


$conn->close();
