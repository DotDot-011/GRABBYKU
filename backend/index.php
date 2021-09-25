<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');
header('Content-type: application/json; charset=UTF-8');

require "configs/database.php";
require "configs/defined.php";
require "configs/route.php";
require "configs/need_authorize.php";
//require "./authorize.php";
//require "/Users/kx/Documents/Work/soft-eng/GRABBYKU_B/GRABBYKU/backend/login/user/generate_JWT.php";
//use Firebase\JWT\JWT;

if (isset($routes[$route][$method])) {
   if ($need_authorize[$route][$method]) {
      require "./authorize.php";
      if ($data['auth_code']) {
         require $routes[$route][$method];
      } else {
         $data['message_code'] = "Token is now expired";
      }
      echo json_encode($data);
   } else {
      require $routes[$route][$method];
      //echo json_encode($data);
   }
} else {
   $data['message_code'] = "this routes is not route.php";
   echo json_encode($data);
}
