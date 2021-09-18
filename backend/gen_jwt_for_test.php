<?php
//require "/Users/kx/Documents/Work/soft-eng/GRABBYKU_B/GRABBYKU/backend/configs/JWT_key.php";
//$key= "Rossiya – svyashchennaya nasha derzhava.";
$key = "Rossiya – svyashchennaya nasha derzhava.
Rossiya – lyubimaya nasha strana.
Moguchaya volya, velikaya slava –
Tvoio dostoyanye na vse vremena!
Slav'sya, Otechestvo nashe svobodnoye
Bratsikh narodov soyuz vekovoi
Predkami dannaya mudrost' narodnaya!
Slav'sya, strana! My gordimsya toboi!
Ot yuzhnyh morei do polyarnogo kraya
Raskinulis' nashi lesa i polya.
Odna ty na svete! Odna ty takaya –
Khranimaya Bogom rodnaya zemlya!
Slav'sya, Otechestvo nashe svobodnoye
Bratsikh narodov soyuz vekovoi
Predkami dannaya mudrost' narodnaya!
Slav'sya, strana! My gordimsya toboi!
Shirokii prostor dlya mechty i dlya zhizni.
Gryadushchiye nam otkryvayut goda.
Nam silu daiot nasha vernost' Otchizne.
Tak bylo, tak yest' i tak budet vsegda!
Slav'sya, Otechestvo nashe svobodnoye
Bratsikh narodov soyuz vekovoi
Predkami dannaya mudrost' narodnaya!
Slav'sya, strana! My gordimsya toboi!
";


require "/Users/kx/Documents/Work/soft-eng/GRABBYKU_B/GRABBYKU/vendor/firebase/php-jwt/src/JWT.php";
use Firebase\JWT\JWT;
function gen_jwt_for_test($user_id,$user_name,$fname,$lname,$mode){
 $payload = array(
  "driver_id" => $user_id,
   "user_name" => $user_name,
   "fname" => $fname,
   "lname" => $lname,
   "mode" => $mode
 );
 $jwt = JWT::encode($payload,"Rossiya – svyashchennaya nasha derzhava.
Rossiya – lyubimaya nasha strana.
Moguchaya volya, velikaya slava –
Tvoio dostoyanye na vse vremena!
Slav'sya, Otechestvo nashe svobodnoye
Bratsikh narodov soyuz vekovoi
Predkami dannaya mudrost' narodnaya!
Slav'sya, strana! My gordimsya toboi!
Ot yuzhnyh morei do polyarnogo kraya
Raskinulis' nashi lesa i polya.
Odna ty na svete! Odna ty takaya –
Khranimaya Bogom rodnaya zemlya!
Slav'sya, Otechestvo nashe svobodnoye
Bratsikh narodov soyuz vekovoi
Predkami dannaya mudrost' narodnaya!
Slav'sya, strana! My gordimsya toboi!
Shirokii prostor dlya mechty i dlya zhizni.
Gryadushchiye nam otkryvayut goda.
Nam silu daiot nasha vernost' Otchizne.
Tak bylo, tak yest' i tak budet vsegda!
Slav'sya, Otechestvo nashe svobodnoye
Bratsikh narodov soyuz vekovoi
Predkami dannaya mudrost' narodnaya!
Slav'sya, strana! My gordimsya toboi!
");
 echo($jwt);
}


gen_jwt_for_test('17','sep','chep','chung','driver');
