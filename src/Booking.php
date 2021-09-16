<?php

$sql  = "SELECT user_id FROM booking WHERE driver_id is NULL ";
$result = $conn->query($sql);
$user = [];
$i = 0;
while ($row = $result->fetch_assoc()) {
    // $user[$i]['name'] = $row['fname'] . " " . $row['lname'] ;
    $id[$i] = $row['user_id'];
    // echo $user[$i]['name'];
    // echo "\n";
    // echo $id[$i],"\n";
    $sql1 = "SELECT connection_id FROM websocket WHERE id = $id[$i] AND is_driver = 0 ";

    $result1 = $conn->query($sql1);
    if($result1->num_rows == 1){
        $row1 = $result1->fetch_assoc();
        foreach ($this->clients as $client) {
            if ($client->resourceId == $row1['connection_id']) {
                $client->send(json_encode([
                    "message_code" => "your booking order",
                    "booking_order" => $i + 1
                ]));
                /* $user[$i]['client'] = $client;
                $this->clients->detach($client); */
                break;
            }
        }
        $i++;
    }
    
    
}
