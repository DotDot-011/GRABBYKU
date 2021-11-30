<?php

$postData = json_decode(file_get_contents("php://input"));
require "/Users/kx/Documents/Work/soft-eng/GRABBYKU_B/GRABBYKU/backend/login/user/generate_JWT.php";
require "/Users/kx/Documents/Work/soft-eng/GRABBYKU_B/GRABBYKU/backend/configs/JWT_key.php";
$username = $postData->username;
$auth_answer = $postData->auth_answer;
// file_put_contents("./registerUser/test.txt", $postData);

//$key = "motherfucker";

$sql = "SELECT * FROM user WHERE username = '$username'";
$result = $conn->query($sql);
$row = $result->fetch_assoc();
if($row != NULL){
 $user_id = $row['user_id'];
 $password = $row['password'];
 
 $sql2 = "SELECT * FROM auth_table WHERE user_id = '$user_id' AND is_driver = '0' AND is_user = '1' ";
 $result_for_question = $conn->query($sql2);
 if($result_for_question != NULL){
  $row2 = $result_for_question->fetch_assoc();
  $question = $row2['auth_question'];
  
  //check password+question == answer for granting access
  $real_answer = hash('md5',$password.$question,false);
  if($real_answer == $auth_answer){
   echo(generate_JWT($row, $key, 0));
  }
  else{
   echo "access-denined";
  }
 }
}
else{
 echo "access-error-no-such-user";
}




$conn->close();
