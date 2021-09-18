<?php
$routes = [];
$data = [];
$route = $_SERVER["REQUEST_URI"];
$method = $_SERVER["REQUEST_METHOD"];
$need_authorize = [];
// echo $route;
// $route == "/backend/login" && $method == "POST"
