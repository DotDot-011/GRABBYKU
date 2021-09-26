<?php

$postData = json_decode(file_get_contents("php://input"));
require dirname(__DIR__, 2) . "/generate_JWT.php";
require dirname(__DIR__, 2) . "/configs/JWT_key.php";

$username = $postData->username;
$password = $postData->password;
// file_put_contents("./registerUser/test.txt", $postData);

$sql = "SELECT password FROM user WHERE username = '$username'";

$result = $conn->query($sql);

if ($result->num_rows == 1) {
    $row = $result->fetch_assoc();
    $p_check = $row['password'];
    $verify = password_verify($password, $p_check);
    // echo json_encode($p_check);
    if ($verify) {
        $sql2 = "UPDATE `user` SET `status` = 1 WHERE `username` = '$username'";
        if ($conn->query($sql2) == TRUE) {
            $sql = "SELECT * FROM user WHERE username = '$username'";
            $result = $conn->query($sql);
            $row = $result->fetch_assoc();
            $auth_a = generate_JWT($row, $key, 0);
            echo json_encode([
                "message" => true,
                "auth" => $auth_a
            ]);
            //$data = [];
            //$data['message'] = TRUE; 
            //$data['auth'] = generate_JWT($row,$key);
            //echo json_encode($data);
        }
    } else {
        echo json_encode([
            "database_password"=> $p_check,
            "sent_password"=> $password,
            "message"=> FALSE
        ]);
    }
} else {
    echo "username and password not register yet";
}


$conn->close();
