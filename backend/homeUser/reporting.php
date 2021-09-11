<?php
$post_data = json_decode(file_get_contents("php://input"));

$driver_id = $post_data->driver_id;
$user_id = $post_data->user_id;
$rating = $post_data->rating;
$string_report = $post_data->string_report;
$booking_id = $post_data->booking_id;
$statement = "UPDATE history SET rating = '$rating' ";


//if user has a comment on driver 
if($string_report != "NULL"){
 $statement = $statement . ", comment_report = '$string_report' ";
} 

$statement = $statement . "WHERE history_id = '$booking_id' ";
//echo($statement);
$conn->query($statement);


// this part calculate driver rating

if(!(($string_report == "NULL") && ($rating == 0))){
 $statement2 = "SELECT * FROM driver WHERE driver_id = '$driver_id' ";
 $result = $conn->query($statement2);
 $row = $result->fetch_assoc();
 $alltimescore = $row['rating']*$row['report_count'];
 //change rating 
 $new_rating = ($alltimescore+$rating)/($row['report_count']+1);
 
 $statement3 = "UPDATE driver SET rating = '$new_rating' , report_count = report_count+1 WHERE driver_id = '$driver_id' "; 
 $conn->query($statement3);
}
$conn->close();

echo("done");
