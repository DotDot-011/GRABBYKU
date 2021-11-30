<?php

require dirname(__DIR__) . "/backend/configs/JWT_key.php";
require dirname(__DIR__) . "/vendor/firebase/php-jwt/src/JWT.php";

use Firebase\JWT\JWT;

$post_Data = json_decode(file_get_contents("php://input"));
$jwt_user = $post_Data->JWT;
$authorize_code = True;

//for getting data from frontend
$postData = [];

// for returning data to frontend
$data = [];

try {
    $user_data = JWT::decode(
        $jwt_user,
        $key,
        array('HS256')
    );
} catch (error) {
    $authorize_code = False;
} catch (exception) {
    $authorize_code = False;
}



//give front end authorize result
$data['auth_code'] = $authorize_code;
//just set a normal message code
$data['message_code'] = "default";

$postData['authorize_code'] = $authorize_code;
if ($authorize_code == True) {
    //get all argument + authorize code
    $postData = array_merge($postData, (array)$post_Data);
    // get user data from jwt decode
    $postData = array_merge($postData, (array)$user_data);
} else {
    $postData = array_merge($postData, (array)$post_Data);
}
