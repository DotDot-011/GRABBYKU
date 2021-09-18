<?php

$jwt_user = $wsdata['JWT'];
$isAuth = TRUE;
try {
    JWT::decode(
        $jwt_user,
        $key,
        array('HS256')
    );
} catch (Exception $e) {
    $isAuth = FALSE;
    $err_message = $e->getMessage();
}
