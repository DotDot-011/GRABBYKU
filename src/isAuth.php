<?php

use Firebase\JWT\JWT;

function isAuth($JWTTOKEN, $key) {
    $jwt_user = $JWTTOKEN;
    try {
        JWT::decode(
            $jwt_user,
            $key,
            array('HS256')
        );
    } catch (Exception $e) {
        return FALSE;
    }
    return TRUE;
}
