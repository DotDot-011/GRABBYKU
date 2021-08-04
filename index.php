<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Content-type: application/json; charset=UTF-8');

require "configs/database.php";
require "configs/defined.php";
require "configs/route.php";

if(isset($routes[$route][$method])) {
    require $routes[$route][$method];
    // echo json_encode($users);
}else {
    echo "this routes is not route.php";
}
