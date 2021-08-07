<?php
 $postdata = json_decode(file_get_contents("php://input"));
 $user_id = $postdata->id;


 $statement = "DELETE FROM booking WHERE user_id = '$user_id' ";

 if($conn->query($statement) === TRUE){
  echo "delete laew ja =] ";
 }
 else {
  echo "Error: " . $conn->error;
 }
