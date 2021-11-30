<?php


$password = $postData['password'];
$mode = $postData['mode'];
$mode_id = $mode . "_id";
if ($mode == 'driver') {
    $id = $postData['driver_id'];
} else {
    $id = $postData['user_id'];
}

$sql = "UPDATE $mode SET ";

$state = 0;

if ($postData['phone'] != NULL) {
    $phone = $postData['phone'];
    $sql = $sql . "phone = '$phone' ";
    $state = 1;
}

if ($postData['new_password'] != NULL && $postData['password'] != NULL) {
    $sql1 = "SELECT password FROM $mode WHERE $mode_id = '$id'";
    $result1 = $conn->query($sql1);
    $row1 = $result1->fetch_assoc();
    $verify = password_verify($password, $row1['password']);
    if ($verify) {
        if ($state) {
            $sql = $sql . ", ";
        }
        $new_password = password_hash($postData['new_password'], PASSWORD_DEFAULT);
        $sql = $sql . "password = '$new_password' ";
    } else {
        $data['message'] = "Wrong password";
    }
}

$sql = $sql . "WHERE $mode_id = '$id'";
$data['sql'] = $sql;
if ($conn->query($sql)) {
    $data['message_code'] = TRUE;
} else {
    $data['message_code'] = FALSE;
    $data['message'] = $conn->err;
}
