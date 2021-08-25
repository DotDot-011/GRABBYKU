<?php
 $postdata = json_decode(file_get_contents("php://input"));
 
 $user_id = $postdata->id;
 
 $statement = "SELECT * FROM booking WHERE user_id = '$user_id'";
 
 //$result = mysqli_query($statement); 
 $data = [];

 if($result = $conn->query($statement)){
  if($result->num_rows == 1){
   $row = $result->fetch_assoc(); 
   $data['id'] =  $row['id'];
   $data['driver_id'] = $row['driver_id'];
   $data['user_id'] = $row['user_id'];
   $data['lng_user'] = $row['lng_user'];
   $data['lat_user'] = $row['lat_user'];
   $data['lng_des'] = $row['lng_des'];
   $data['lat_des'] = $row['lat_des'];
   echo json_encode($data);
  }
  else{
   echo "there are more than one booking for this user or there is no booking match";
  }
 }
 else{
  echo "error";
 }

$conn->close();


