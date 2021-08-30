<?php

$postData = json_decode(file_get_contents("php://input"));
$driver_id = $postData->driver_id;

$sql = "SELECT * FROM `booking` WHERE `driver_id` IS NULL ORDER BY `booking_id`";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $user_id = $row["user_id"];
    $sql1 = "UPDATE `booking` SET `driver_id` = '$driver_id' WHERE `user_id` = '$user_id'";
    if ($conn->query($sql1) == TRUE) {
        $row["driver_id"] = $driver_id;
        echo json_encode([$row, JSON_PRETTY_PRINT]);
        $sql2 = "UPDATE `queue` SET `status` = 'waiting' WHERE `driver_id` = '$driver_id'";
        if ($conn->query($sql2) == FALSE) {
            echo FALSE;
        }
    }
} else {
    echo FALSE;
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

