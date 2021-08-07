<?php

$routes["/backend/api/data"]["POST"] = "./data/test.php";
$routes["/backend/api/test_get"]["GET"] = "./data/testGet.php";
// $routes["/backend/api/testpost"]["POST"] = "./data/testPost.php";

<<<<<<< HEAD
$routes["/backend/api/register_user"]["POST"] = "./register/user/register_user.php";
$routes["/backend/api/register_driver"]["POST"] = "./register/user/register_driver.php";
=======
$routes["/backend/api/register_user"]["POST"] = "./register/user/register.php";
$routes["/backend/api/register_driver"]["POST"] = "./register/driver/register.php";
>>>>>>> 8ce48aca567985bdbefb7273cf98e2b73cf85041

$routes["/backend/api/login_user"]["POST"] = "./login/user/login.php";
$routes["/backend/api/login_driver"]["POST"] = "./login/driver/login.php";

<<<<<<< HEAD
$routes["/backend/api/postdriver"]["POST"] = "./postdriver/postdriver.php";

$routes["/backend/api/driver_accept"]["POST"] = "./homedriver/booking/driver_accept.php";
$routes["/backend/api/driver_cancel"]["POST"] = "./homedriver/booking/driver_accept.php";
$routes["/backend/api/check_user_cancel"]["POST"] = "./homedriver/booking/check_user_cancel.php";
=======
$routes["/backend/api/postdriver"]["POST"] = "./homedriver/postdriver/postdriver.php";
$routes["/backend/api/postdriverinq"]["POST"] = "./homedriver/postdriverinq/postdriverinq.php";
$routes["/backend/api/getqueue"]["GET"] = "./homedriver/getqueue/getqueue.php";

$routes["/backend/api/line1"]["POST"] = "./homeUser/line_1.php";
$routes["/backend/api/line2"]["POST"] = "./homeUser/line_2.php";
>>>>>>> 8ce48aca567985bdbefb7273cf98e2b73cf85041
