<?php

# test
$need_authorize["/backend/api/data"]["POST"] = true;
$need_authorize["/backend/api/test_get"]["GET"] = true;
// $need_authorize["/backend/api/testpost"]["POST"] = "./data/testPost.php";

# user&driver - register
$need_authorize["/backend/api/register_user"]["POST"] = false;
$need_authorize["/backend/api/register_driver"]["POST"] = false;


# user&driver - login
$need_authorize["/backend/api/login_user"]["POST"] = false;
$need_authorize["/backend/api/login_driver"]["POST"] = false;

# user&driver - logout
$need_authorize["/backend/api/logout_user"]["POST"] = false;
$need_authorize["/backend/api/logout_driver"]["POST"] = false;

# driver - booking
$need_authorize["/backend/api/driver_accept"]["POST"] = true;
$need_authorize["/backend/api/driver_cancel"]["POST"] = true;
$need_authorize["/backend/api/check_user_cancel"]["POST"] = true;
$need_authorize["/backend/api/check_booking"]["POST"] = true;
#$need_authorize["/backend/api/bomb"]["GET"] = "./homedriver/booking/SelfDestruction.php";

# driver - get driver data
$need_authorize["/backend/api/postdriver"]["POST"] = true;
$need_authorize["/backend/api/postdriverinq"]["POST"] = true;


# driver - get queue
$need_authorize["/backend/api/test"]["GET"] = false;
$need_authorize["/backend/api/getqueue"]["GET"] = true;

# user - get user data
$need_authorize["/backend/api/user_info"]["POST"] = true;
$need_authorize["/backend/api/order_booking"]["POST"] = true;

#insert user and driver to booking
$need_authorize["/backend/api/userdriver2book"]["POST"] = true;

#check user and driver in booking
$need_authorize["/backend/api/userdriverinbook"]["POST"] = true;

#always check user in queue?usert
$need_authorize["/backend/api/checkuser"]["POST"] = true;

#cancel booking by user 
$need_authorize["/backend/api/cancelation"]["POST"] = true;
#when driver accept -> sent driver info to user =]
$need_authorize["/backend/api/request_driver_info"]["POST"] = true;
#user keep fetching his booking when queing =]
//$need_authorize["/backend/api/homeuser_line3"]["POST"] = true;

$need_authorize["/backend/api/deletequeue"]["POST"] = true;

$need_authorize["/backend/api/reporting"]["POST"] = true;

# websocket
$need_authorize["in"]["ws"] = true;
// $need_authorize["out"]["ws"] = "./src/UserOut.php";
$need_authorize["chat"]["ws"] = false;
$need_authorize["enqueue"]["ws"] = false;
$need_authorize["dequeue"]["ws"] = false;
$need_authorize["driver-accepted"]["ws"] = false;
$need_authorize["work-finished"]["ws"] = false;
$need_authorize["getqueue"]["ws"] = false;
$need_authorize["user-cancel"]["ws"] = false;

$need_authorize["user-cancel"]["ws"] = false;
$need_authorize['/backend/api/get_auth_question']['POST'] = false;

$need_authorize['/backend/api/editProfile']['POST'] = TRUE;
$need_authorize['/backend/api/history']['POST'] = TRUE;
$need_authorize['/backend/api/getDistance']['POST'] = FALSE;
?>
