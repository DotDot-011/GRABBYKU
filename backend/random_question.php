<?php
function generateRandomString($length = 50) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

$postData = json_decode(file_get_contents("php://input"));
$username = $postData->username;
$is_driver = $postData->is_driver;
$is_user = $postData->is_user;
$auth_question = generateRandomString();
 
$sql = "SELECT * FROM ";

if(($is_driver == 0 )&& ($is_user == 1)){
 $sql = $sql . "user ";
}
else if(($is_driver == 1) && ($is_user == 0) ){
 $sql = $sql . "driver ";
}
else{
 echo("ERROR identifying your role.");
}

$sql = $sql . "WHERE username = '$username' ";
$res_for_id = $conn->query($sql);
$row = $res_for_id->fetch_assoc();
$id_no = 0;
if($res_for_id != NULL){
 if(($is_driver == 0 )&& ($is_user == 1)){
  $id_no = $row['user_id'];
 }
 else if(($is_driver == 1) && ($is_user == 0) ){
  $id_no = $row['driver_id'];
 }
}

 
$sql1 = "SELECT * FROM auth_table WHERE user_id  = '$id_no' AND is_driver = '$is_driver' AND is_user = '$is_user' ";
$result = $conn->query($sql1);

if($result != NULL){
 $sql2 = "DELETE FROM auth_table WHERE user_id  = '$id_no' AND is_driver = '$is_driver' AND is_user = '$is_user' ";
 $result2 = $conn->query($sql2);
 
 if($result2){
  $sql3 = "INSERT INTO auth_table (user_id , is_driver , is_user , auth_question ) VALUES ('$id_no' , '$is_driver' , '$is_user' , '$auth_question' ) ";
  $conn->query($sql3);
 } 
}else{
 $s1l4 = "INSERT INTO auth_table (user_id , is_driver , is_user , auth_question ) VALUES ('$id_no' , '$is_driver' , '$is_user' , '$auth_question' ) ";
 $conn->query($sql4);
}



echo($auth_question);
