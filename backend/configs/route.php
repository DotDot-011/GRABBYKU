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

# user&driver - logout
$routes["/backend/api/logout_user"]["POST"] = "./logout/user/logout.php";
$routes["/backend/api/logout_driver"]["POST"] = "./logout/driver/logout.php";

# driver - booking
$routes["/backend/api/driver_accept"]["POST"] = "./homedriver/booking/driver_accept.php";
$routes["/backend/api/driver_cancel"]["POST"] = "./homedriver/booking/driver_cancel.php";
$routes["/backend/api/check_user_cancel"]["POST"] = "./homedriver/booking/check_user_cancel.php";
$routes["/backend/api/check_booking"]["POST"] = "./homedriver/booking/check_booking.php";
#$routes["/backend/api/bomb"]["GET"] = "./homedriver/booking/SelfDestruction.php";

# driver - get driver data
$routes["/backend/api/postdriver"]["POST"] = "./homedriver/postdriver/postdriver.php";
$routes["/backend/api/postdriverinq"]["POST"] = "./homedriver/postdriverinq/postdriverinq.php";


# driver - get queue
$routes["/backend/api/test"]["GET"] = "./homedriver/getqueue/enterwebsocket.php";
$routes["/backend/api/getqueue"]["GET"] = "./homedriver/getqueue/getqueue.php";

# user - get user data
$routes["/backend/api/user_info"]["POST"] = "./homeUser/user_info.php";
$routes["/backend/api/order_booking"]["POST"] = "./homeUser/order_booking.php";

#insert user and driver to booking
$routes["/backend/api/userdriver2book"]["POST"] = "./homedriver/userdriver2book/userdriver2book.php";

#check user and driver in booking
$routes["/backend/api/userdriverinbook"]["POST"] = "./homedriver/userdriverinbook/userdriverinbook.php";

#always check user in queue
$routes["/backend/api/checkuser"]["POST"] = "./homedriver/checkuser/checkuser.php";

#cancel booking by user 
$routes["/backend/api/cancelation"]["POST"] = "./homeUser/cancel_booking.php";
#when driver accept -> sent driver info to user =]
$routes["/backend/api/request_driver_info"]["POST"] = "./homeUser/driver_info.php";
#user keep fetching his booking when queing =]
//$routes["/backend/api/homeuser_line3"]["POST"] = "./homeUser/homeuserline_3.php";

$routes["/backend/api/deletequeue"]["POST"] = "./homedriver/deleteQueue/deleteQueue.php";

$routes["/backend/api/reporting"]["POST"] = "./homeUser/reporting.php";

# websocket
$routes["in"]["ws"] = dirname(__DIR__, 2) . "/src/UserIn.php";
$routes["out"]["ws"] = dirname(__DIR__, 2) . "/src/UserOut.php";
$routes["chat"]["ws"] = dirname(__DIR__, 2) . "/src/Chat.php";
$routes["enqueue"]["ws"] = dirname(__DIR__, 2) . "/src/enQueue.php";
$routes["dequeue"]["ws"] = dirname(__DIR__, 2) . "/src/deQueue.php";
$routes["driver-accepted"]["ws"] = dirname(__DIR__, 2) . "/src/DriverAccepted.php";
$routes["work-finished"]["ws"] = dirname(__DIR__, 2) . "/src/WorkFinished.php";
$routes["getqueue"]["ws"] = dirname(__DIR__, 2) . "/src/Queue.php";
$routes["user-cancel"]["ws"] = dirname(__DIR__, 2) . "/src/UserCanceled.php";

# waiting to test
$routes['/backend/api/get_auth_question']['POST'] = "./random_question.php";

$routes['/backend/api/editProfile']['POST'] = "./editProfile.php";
$routes['/backend/api/history']['POST'] = "./homeUser/History.php";
$routes['/backend/api/getDistance']['POST'] = "./getDistance.php";
?>
