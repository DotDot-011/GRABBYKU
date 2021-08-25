<?php
$postdata = json_decode(file_get_contents("php://input"));;

$driver_id = $postdata->driver_id;
// sql to delete a record
$sql = "DELETE FROM queue WHERE driver_id = '$driver_id'";

if ($conn->query($sql) === TRUE) {
  echo "Record deleted successfully";
} else {
  echo "Error deleting record: " . $conn->error;
}

$conn->close();
?>