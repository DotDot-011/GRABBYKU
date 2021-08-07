<?php

$routes["/backend/api/data"]["POST"] = "./data/test.php";
$routes["/backend/api/test_get"]["GET"] = "./data/testGet.php";
// $routes["/backend/api/testpost"]["POST"] = "./data/testPost.php";

$routes["/backend/api/register_user"]["POST"] = "./registerUser/register_user.php";
$routes["/backend/api/register_driver"]["POST"] = "./registerDriver/register_driver.php";

$routes["/backend/api/login_user"]["POST"] = "./login/user/login.php";
$routes["/backend/api/login_driver"]["POST"] = "./login/driver/login.php";

$routes["/backend/api/postdriver"]["POST"] = "./postdriver/postdriver.php";
$routes["/backend/api/postdriverinq"]["POST"] = "./postdriverinq/postdriverinq.php";
$routes["/backend/api/getqueue"]["GET"] = "./getqueue/getqueue.php";