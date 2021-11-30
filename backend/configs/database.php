<?php
$host = "localhost";
$user = "root";
$password = "Opal_ku79";
$dbname = "grabbutku";

$conn = new mysqli($host, $user, $password, $dbname);

if($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
#echo "Connected successfully\n";
