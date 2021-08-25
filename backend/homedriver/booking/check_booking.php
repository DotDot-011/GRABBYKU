<?php

$postData = json_decode(file_get_contents("php://input"));
$driver_id = $postData->driver_id;

$sql = "SELECT * FROM `booking` WHERE `booking`.`driver_id` IS NULL ORDER BY `booking`.`booking_id`";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $user_id = $row["user_id"];
    $sql1 = "UPDATE `booking` SET `booking`.`driver_id` = $driver_id WHERE `booking`.`user_id` = $user_id";
    if ($conn->query($sql1) == TRUE) {
        echo json_encode([
            "message" => "update booking table successfully"
        ]);
        echo json_encode([$row, JSON_PRETTY_PRINT]);
        $sql2 = "UPDATE `queue` SET `queue`.`status` = 'waiting' WHERE `queue`.`driver_id` = $driver_id";
        if ($conn->query($sql2) == TRUE) {
            echo json_encode([
                "message" => "update queue table successfully"
            ]);
        } else {
            echo json_encode([
                "message" => "driver_id not found"
            ]);
        }
    } else {
        echo json_encode([
            "message" => "user_id not found"
        ]);
    }
} else {
    echo json_encode([
        "message" => "available booking not found"
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

