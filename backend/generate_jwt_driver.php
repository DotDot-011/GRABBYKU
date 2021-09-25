<?php
require dirname(__DIR__) . "/vendor/firebase/php-jwt/src/JWT.php";

use Firebase\JWT\JWT;

function generate_JWT_driver($info, $key, $notAvailable)
{
    $issuedAt = time();
    $expirationTime = $issuedAt + 60 * 60 * 8;
    if ($notAvailable) {
        $expirationTime *= -1;
    }
    $payload = array(
        "driver_id" => $info['driver_id'],
        "username" => $info['username'],
        "fname" => $info['fname'],
        "lname" => $info['lname'],
        "mode" => "driver",
        "win_id" => $info['win_id'],
        "exp" => $expirationTime
    );
    $jwt = JWT::encode($payload, $key);
    return $jwt;
}
