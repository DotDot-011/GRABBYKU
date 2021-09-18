<?php
require dirname(__DIR__, 3) ."/vendor/firebase/php-jwt/src/JWT.php";
use Firebase\JWT\JWT;
function generate_JWT_driver($info,$key){
 $payload = array(
  "driver_id" => $info['driver_id'],
  "username" => $info['username'],
  "fname" =>$info['fname'],
  "lname" => $info['lname'],
  "mode" => "driver"
 );
  $jwt = JWT::encode($payload, $key);
 return $jwt;

}
