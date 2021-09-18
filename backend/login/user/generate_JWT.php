<?php 
require dirname(__DIR__, 3) . "/vendor/firebase/php-jwt/src/JWT.php";

use Firebase\JWT\JWT;

function generate_JWT($info,$key){
 $payload = array(
  "user_id" => $info['user_id'],
  "user_name" => $info['username'],
  "fname" =>$info['fname'],
  "lname" => $info['lname'],
  "mode" => "user"
 );
 
 $jwt = JWT::encode($payload, $key);
 return $jwt;
}
