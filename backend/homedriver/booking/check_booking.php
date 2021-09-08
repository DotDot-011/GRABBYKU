<?php

$postData = json_decode(file_get_contents("php://input"));
$driver_id = $postData->driver_id;

$sql = "SELECT * FROM `booking` WHERE `driver_id` IS NULL ORDER BY `booking_id`";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $user_id = $row["user_id"];
    $data = [];
    $data["user_id"] = $row["user_id"];
    $data["lng_user"] = $row["lng_user"];
    $data["lat_user"] = $row["lat_user"];
    $data["lng_des"] = $row["lng_des"];
    $data["lat_des"] = $row["lat_des"];
    $data["driver_id"] = $driver_id;
    $data["message"] = TRUE;
    $sql2 = "UPDATE `queue` SET `status` = 'waiting' WHERE `driver_id` = '$driver_id'";
    $sql3 = "SELECT `fname`,`lname` FROM `user` WHERE `user_id` = $user_id";
    $result2 = $conn->query($sql2);
    $result3 = $conn->query($sql3);
    $row3 = $result3->fetch_assoc();
    $data["user_fname"] = $row3["fname"];
    $data["user_lname"] = $row3["lname"];
    echo json_encode($data, JSON_PRETTY_PRINT);
} else {
    echo json_encode([
        "message"=> FALSE
    ]);
}

//                                                            ,1,
//                               ......                     .ifL1
//                            .;1ttttLLf1,                 ;fffff,
//                           :LCLfttfLLLLL:              ,tffffffi
//                          ,CCCLf11ff1tff;            ,1Lffffffff.
//                          iLttt11ifLLLfft.           :iitffffffLi
//                          ;t1111ii1fffff1               ffffft;i1.
//                          ,1iiiiii1tt1it,              ifffff,
//                           ;1i;;;;i1tff:              .fffff1
//                           ,t1ii;:::;i;               ifffff,
//                          .,;11iii;:                 .fffff1
//                     ..,,.,,.,iftitGi...             ifffff,
//                 .,,,::::,,,,..;LLLGt::::,,,.       .fffff1
//                 ;,,,,,,,,,,,,,.,;tfi,::,,::::,     ;fffff,
//                 ::,,,,,,,,..,:,,.:ft,::,,:,,::.   .fffff1
//                 ,i:,,,,,,,,..,,,,,,;,:::,:,,,::   ;fffff,
//                 .1:,,,,,,,,..,,,:,,,::,,,:,,,,:, .fffff1
//                  ;;:,,,,,:, ..,,,::,,,:,,:,,,,::.,1tfff:
//                  ,1;:,,,,;f:.,,,,,,:,..,,:,..,,::,  ..,
//                   ;i::,,,,,:,,:,,:,:::,,,;1:,.,,,:,
//                   .;;;:,,,,,,,,,::::::::::LGC;,,,,:.
//                    .;;:,,.,,,,,,,,,,,,,,:::;;:,,,,,:
//                     ,:::,.....,,,,,,,,,,,:,,,,,,,,,:.
//                     ....,....,,,,,,.....,,,,,,,,,,,,.
//                     ,,..     .,::;:........,,,,,...
//                     :,,......      ............
//                     :,...........   ....:,...,.
//                     ,,............. ...,1;,,,,.
//                                         ..

