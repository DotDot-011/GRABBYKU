<?php

$postData = json_decode(file_get_contents("php://input"));

$fname = $postData->fname; 
$lname = $postData->lname; 
$email = $postData->email;
$birth_date = $postData->birth_date; 
$age = $postData->age; 
$plate = $postData->plate;
$phone = $postData->phone; 
$id_no = $postData->id_no; 
$driver_no = $postData->driver_no;
$win_id = $postData->win_id;
$username = $postData->username; 
$password = password_hash($postData->password, PASSWORD_DEFAULT);
$imageData = $postData->image;

$sql = "SELECT win_name FROM win WHERE win_id = '$win_id'";
$result = $conn->query($sql);
$row = $result->fetch_assoc();
$win_name = $row['win_name'];

$sql = "INSERT INTO driver (fname, lname, email, birth_date, age, plate, phone, id_no, driver_no, win_id, win_name, username, password, imageData)
VALUES ('$fname','$lname','$email','$birth_date','$age','$plate','$phone','$id_no','$driver_no','$win_id','$win_name','$username','$password','$imageData')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo $conn->error;
}