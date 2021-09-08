<?php

$postData = json_decode(file_get_contents("php://input"));

$username = $postData->username;
$password = $postData->password;
// file_put_contents("./registerUser/test.txt", $postData);

$sql = "SELECT `password` FROM `driver` WHERE `username` = '$username'";

$result = $conn->query($sql);

if ($result->num_rows == 1) {
    $row = $result->fetch_assoc();
    $p_check = $row['password'];
    // echo json_encode($p_check);
    if ($p_check == $password) {
        $sql1 = "SELECT `status` FROM `driver` WHERE `username` = '$username'";
        $result1 = $conn->query($sql1);
        if ($result1->num_rows == 1) {
            $row1 = $result1->fetch_assoc();
            if ($row1['status'] == 0) {
                $sql2 = "UPDATE `driver` SET `status` = 1 WHERE `username` = '$username'";
                if ($conn->query($sql2)) {
                    echo json_encode([
                        "message" => TRUE
                    ]);
                };
            } elseif ($row1['status'] >= 1) {
                $sql2 = "UPDATE `driver` SET `status` = 0 WHERE `username` = '$username'";
                if ($conn->query($sql2) == TRUE) {
                    echo json_encode([
                        "message" => "this driver is already logged in",
                        "error_code" => 1
                    ]);
                }
            } else {
                echo json_encode([
                    "message" => "this driver is currently on a service",
                    "error_code" => 2
                ]);
            }
        }
    }
} else {
    echo "username and password not registered yet";
}

$conn->close();
