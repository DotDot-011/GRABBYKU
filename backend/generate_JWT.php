<?php
require dirname(__DIR__) . "/vendor/firebase/php-jwt/src/JWT.php";

use Firebase\JWT\JWT;

function generate_JWT($info, $key, $notAvailable)
{
    $issuedAt = time();
    $expirationTime = $issuedAt + 60 * 60 * 8;
    if ($notAvailable) { 
        $expirationTime *= 1;
    }
    $payload = array(
        "user_id" => $info['user_id'],
        "user_name" => $info['username'],
        "fname" => $info['fname'],
        "lname" => $info['lname'],
        "mode" => "user",
        "exp" => $expirationTime
    );

    $jwt = JWT::encode($payload, $key);
    return $jwt;
}
