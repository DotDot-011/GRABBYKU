<?php

# test
$routes["/backend/api/data"]["POST"] = "./data/test.php";
$routes["/backend/api/test_get"]["GET"] = "./data/testGet.php";
// $routes["/backend/api/testpost"]["POST"] = "./data/testPost.php";

# user&driver - register
$routes["/backend/api/register_user"]["POST"] = "./register/user/register.php";
$routes["/backend/api/register_driver"]["POST"] = "./register/driver/register.php";


# user&driver - login
$routes["/backend/api/login_user"]["POST"] = "./login/user/login.php";
$routes["/backend/api/login_driver"]["POST"] = "./login/driver/login.php";


# driver - booking
$routes["/backend/api/driver_accept"]["POST"] = "./homedriver/booking/driver_accept.php";
$routes["/backend/api/driver_cancel"]["POST"] = "./homedriver/booking/driver_accept.php";
$routes["/backend/api/check_user_cancel"]["POST"] = "./homedriver/booking/check_user_cancel.php";

# driver - get driver data
$routes["/backend/api/postdriver"]["POST"] = "./homedriver/postdriver/postdriver.php";
$routes["/backend/api/postdriverinq"]["POST"] = "./homedriver/postdriverinq/postdriverinq.php";


# driver - get queue
$routes["/backend/api/getqueue"]["GET"] = "./homedriver/getqueue/getqueue.php";

# user - get user data
$routes["/backend/api/line1"]["POST"] = "./homeUser/line_1.php";
$routes["/backend/api/line2"]["POST"] = "./homeUser/line_2.php";

#insert user and driver to booking
$routes["/backend/api/userdriver2book"]["POST"] = "./homedriver/userdriver2book/userdriver2book.php";

#always check user in queue
$routes["/backend/api/checkuser"]["POST"] = "./homedriver/checkuser/checkuser.php";

#cancel booking by user 
$routes["/backend/api/cancelation"]["POST"] = "./homeUser/homeuserline_5.php";
#when driver accept -> sent driver info to user =]
$routes["/backend/api/request_driver_info"]["POST"] = "./homeUser/homeuserline_4.php";
#user keep fetching his booking when queing =]
$routes["/backend/api/homeuser_line3"]["POST"] = "./homeUser/homeuserline_3.php";

?>
