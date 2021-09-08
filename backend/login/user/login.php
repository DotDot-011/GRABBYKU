<?php

$postData = json_decode(file_get_contents("php://input"));

$username = $postData->username;
$password = $postData->password;
// file_put_contents("./registerUser/test.txt", $postData);

$sql = "SELECT password FROM user WHERE username = '$username'";

$result = $conn->query($sql);

if ($result->num_rows == 1) {
    $row = $result->fetch_assoc();
    $p_check = $row['password'];
    // echo json_encode($p_check);
    if ($p_check === $password) {
        $sql1 = "SELECT `status` FROM `user` WHERE `username` = '$username'";
        $result1 = $conn->query($sql1);
        $row1 = $result1->fetch_assoc();
        if ($row1['status'] == 0) {
            $sql2 = "UPDATE `user` SET `status` = 1 WHERE `username` = '$username'";
            if ($conn->query($sql2) == TRUE) {
                echo json_encode([
                    "message" => true
                ]);
            }
        } elseif ($row1['status'] >= 1) {
            $sql2 = "UPDATE `user` SET `status` = 0 WHERE `username` = '$username'";
            if ($conn->query($sql2) == TRUE) {
                echo json_encode([
                    "message" => "this user is already logged in",
                    "error_code" => 1
                ]);
            }
        } else {
            echo json_encode([
                "message" => "this user is currently using a service",
                "error_code" => 2
            ]);
        }
    }
} else {
    echo "username and password not register yet";
}


$conn->close();
