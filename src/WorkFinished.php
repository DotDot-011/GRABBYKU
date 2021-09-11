<?php

$driver_name = $wsdata['driver_name'];
$driver_id = $wsdata['driver_id'];
$user_name = $wsdata['user_name'];
$user_id = $wsdata['user_id'];
//$cost = $wsdata['cost'];
$driver_name_and_id = $driver_name." ".$driver_id;
$user_name_and_id = $user_name." ".$user_id;



//Set on service in websocket of driver to 0
$sql = "UPDATE websocket SET on_service = 0 WHERE name = '$driver_name_and_id' or name = '$user_name_and_id'";
$conn->query($sql);


//notify user arrive
$sql2 = "SELECT * FROM websocket WHERE name LIKE '$user_name_and_id' ";
$result_for_trigger = $conn->query($sql2);
if($result_for_trigger != NULL){
 $row=$result_for_trigger->fetch_assoc();
 foreach($this->clients as $client){
  if($client->resourceId == $row['connection_id']){
   print("answer to socket: ".$row['connection_id']."\n");
   $client->send(json_encode([
                 "message_code" => "arrive"
   ]));
  }
 }
}

//Delete booking when done
$sql3 = "DELETE FROM booking WHERE driver_id = '$driver_id' ";
$conn->query($sql3);



//notify driver "booking has been delete"
$sql4 = "SELECT * FROM websocket WHERE name LIKE '$driver_name_and_id' ";
print($driver_name_and_id); 
$result_for_answer = $conn->query($sql4);
if($result_for_answer != NULL){
 print(" try answer \n");
 $row2=$result_for_answer->fetch_assoc();
 foreach($this->clients as $client){
  if($client->resourceId == $row2['connection_id']){
   $client->send(json_encode([
    "message_code" => "หิวหมัด"
   ]));
  }
 }
}


//update success_count
$sql5 = "UPDATE user Set success_count = success_count + 1 WHERE user_id = '$user_id' ";
$conn->query($sql5);

