<?php 
 $postdata = json_decode(file_get_contents("php://input"));;
 
 $driver_id = $postdata->id;
 
 $statement = "SELECT * FROM driver WHERE driver_id = '$driver_id'";
 
 $data = [];


 if($result = $conn->query($statement)){
  if($result->num_rows == 1){
   $row = $result->fetch_assoc();
   $data['driver_id'] = $row['driver_id'];
   $data['fname'] = $row['fname']; 
   $data['lname'] = $row['lname']; 
   $data['age'] = $row['age'];
   $data['plate'] = $row['plate'];
   $data['phone'] = $row['phone'];
   $data['id_no'] = $row['id_no'];
   $data['driver_no'] = $row['driver_no'];
   $data['win_name'] = $row['win_name'];
   $data['status'] = $row['status'];
   $data['username'] = $row['username'];
   
   echo json_encode($data);
  }
  else{
   echo("error");
  }
 }
 else {
  echo('error');
 }

 $conn->close();
