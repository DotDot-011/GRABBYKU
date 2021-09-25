<?php
$mode = $postData['mode'];

if($mode == "user"){
 $id = $postData['user_id'];
} else {
 $id = $postData['driver_id'];
}

$mode = $mode . "_id";

$sql = "SELECT * FROM history WHERE $mode = '$id' ";
$result = $conn->query($sql);

if($result->num_rows > 0){
 $i = 0;
 while($row = $result->fetch_assoc()){
  $data[$i]['history_id'] = $row['history_id'];
  $data[$i]['driver_id'] = $row['driver_id'];
  $data[$i]['user_id'] = $row['user_id'];
  $data[$i]['lng_user'] = $row['lng_user'];
  $data[$i]['lat_user'] = $row['lat_user'];
  $data[$i]['lng_des'] = $row['lng_des'];
  $data[$i]['lat_des'] = $row['lat_des'];
  $data[$i]['price'] = $row['price'];
  $data[$i]['comment_report'] = $row['comment_report'];
  $data[$i]['date']  = $row['date'];
  $data[$i]['rating'] = $row['rating'];
  if($mode = "user_id"){
   $data[$i]['names_user'] = $postData['fname']." ".$postData['lname'];
   $d_id = $row['driver_id'];
   $sql2 = "SELECT * FROM driver WHERE driver_id = '$d_id' ";
   $result2 = $conn->query($sql2);   
   $row2 = $result2->fetch_assoc();
   $data[$i]['names_driver'] = $row2['fname']." ".$row2['lname'];
  } else {
   $data[$i]['names_driver'] = $postData['fname']." ".$postData['lname'];
   $u_id = $row['user_id'];
   $sql2 = "SELECT * FROM user WHERE user_id = '$u_id' ";
   $result2 = $conn->query($sql2);   
   $row2 = $result2->fetch_assoc();
   $data[$i]['names_user'] = $row2['fname']." ".$row2['lname'];
  }
  $i++;
 }
}

$conn->close();
