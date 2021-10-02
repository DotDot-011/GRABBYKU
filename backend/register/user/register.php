<?php

$postData = json_decode(file_get_contents("php://input"));

$fname = $postData->fname; 
$lname = $postData->lname; 
$birth_date = $postData->birth_date; 
$age = $postData->age; 
$email = $postData->email; 
$phone = $postData->phone; 
$id_no = $postData->id_no; 
$username = $postData->username; 
$password = password_hash($postData->password, PASSWORD_DEFAULT);
$imageData = $postData->image;
// file_put_contents("./registerUser/test.txt", $postData);

$sql = "INSERT INTO user (fname, lname, birth_date, age, email, phone, id_no, username, password, imageData)
VALUES ('$fname','$lname','$birth_date','$age','$email','$phone','$id_no','$username','$password', '$imageData')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo $conn->error;
}