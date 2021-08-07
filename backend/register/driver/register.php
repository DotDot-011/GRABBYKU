<?php

$postData = json_decode(file_get_contents("php://input"));

$fname = $postData->fname; 
$lname = $postData->lname; 
$birth_date = $postData->birth_date; 
$age = $postData->age; 
$plate = $postData->plate;
$phone = $postData->phone; 
$id_no = $postData->id_no; 
$driver_no = $postData->driver_no; 
$win_name = $postData->win_name; 
$status = $postData->status; 
$username = $postData->username; 
$password = $postData->password;
// file_put_contents("./registerUser/test.txt", $postData);

$sql = "INSERT INTO driver (fname, lname, birth_date, age, plate, phone, id_no, driver_no, win_name, status, username, password)
VALUES ('$fname','$lname','$birth_date','$age','$plate','$phone','$id_no','$driver_no','$win_name','$status','$username','$password')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $conn->error;
}