<?php

$postData = json_decode(file_get_contents("php://input"));
require dirname(__DIR__, 2) . "/generate_jwt_driver.php";
require dirname(__DIR__, 2) . "/configs/JWT_key.php";
$username = $postData->username;
$password = $postData->password;
$password = password_hash($password, PASSWORD_DEFAULT);
// file_put_contents("./registerUser/test.txt", $postData);

$sql = "SELECT * FROM `driver` WHERE `username` = '$username'";

$result = $conn->query($sql);

if ($result->num_rows == 1) {
    $row = $result->fetch_assoc();
    $p_check = $row['password'];
    $verify = password_verify($password, $p_check);
    // echo json_encode($p_check);
    if ($verify) {
        $sql2 = "UPDATE `driver` SET `status` = 1 WHERE `username` = '$username'";
        if ($conn->query($sql2)) {
            echo json_encode([
                "message" => true,
                "auth" => generate_JWT_driver($row, $key, 0)
            ]);
        } else {
            echo json_encode([
                "message"=> FALSE
            ]);
        }
    } else {
        echo json_encode([
            "message" => FALSE
        ]);
    }
} else {
    echo json_encode([
        "message"=> "username and password not registered yet"
    ]);
}

$conn->close();
