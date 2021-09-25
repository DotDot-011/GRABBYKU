<?php

namespace MyApp;

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
require dirname(__DIR__) . "/src/isAuth.php";

class WebSocket implements MessageComponentInterface
{
    protected $clients;

    public function __construct()
    {
        $this->clients = new \SplObjectStorage;
    }

    public function onOpen(ConnectionInterface $user)
    {
        // Store the new connection to send messages to later
        $this->clients->attach($user);
    }

    public function onMessage(ConnectionInterface $from, $msg)
    {
        // front send json {protocol, arg1, arg2, arg3,...}

        // protocol:in -> Name:sender's name, Mode:is_driver? 1 : 0, ID:sender's id, JWT: Auth Token
        // protocol:out -> nothing required
        // protocol:chat -> ReceiverName:receiver's name, Message:string, ReceiverID:receiver's id, Mode:is_driver? 1 : 0
        // protocol:enqueue -> DriverID:driver's id
        // protocol:dequeue -> DriverID:driver's id
        // protocol:getqueue -> DriverID:driver's id
        // protocol:driver-accepted -> DriverId:driver's id, Name:user's name, UserId:user's id 
        // protocol:work-finished -> DriverName:driver's name, DrierID:driver's id, UserName:user's name, UserID:user's id, Cost:service's fee
        // protocol:user-cancel -> user_id:user's id

        $routes = [];
        require dirname(__DIR__) . "/backend/configs/database.php";
        require dirname(__DIR__) . "/backend/configs/route.php";
        require dirname(__DIR__) . "/backend/configs/need_authorize.php";
        require dirname(__DIR__) . "/backend/configs/JWT_key.php";
        

        $wsdata = json_decode($msg, true);
        echo date('d-m-Y') . "\n";
        echo "front send " . $msg . " connection_id = ", $from->resourceId, "\n";
        $protocol = $wsdata['protocol'];

        if (isset($routes[$protocol]['ws'])) {
            if ($need_authorize[$protocol]['ws']) {
                $isAuth = isAuth($wsdata['JWT'], $key);
                if ($isAuth) {
                    echo "authorized\n";
                    $from->send(json_encode([
                        "message" => "authorized"
                    ]));
                    require $routes[$protocol]['ws'];
                } else {
                    echo $err_message . "\n";
                    $from->send(json_encode([
                        "message" => $err_message
                    ]));
                    $from->close();
                }
            } else {
                $sql = "SELECT * FROM websocket WHERE connection_id = $from->resourceId";
                $result = $conn->query($sql);
                if ($result->num_rows == 1) {
                    require $routes[$protocol]['ws'];
                }
            }
        } else {
            echo "this protocol is not available\n";
            $from->send("this protocol is not available");
        }
        $conn->close();
        echo "- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n";
    }

    public function onClose(ConnectionInterface $from)
    {
        // The connection is closed, remove it, as we can no longer send it messages
        require dirname(__DIR__) . "/backend/configs/database.php";
        $sql = "SELECT id, is_driver FROM websocket WHERE connection_id = '$from->resourceId'";
        $result = $conn->query($sql);
        $row = $result->fetch_assoc();
        $id = $row['id'];
        $is_driver = $row['is_driver'];
        $sql = "DELETE FROM websocket WHERE connection_id = '$from->resourceId'";
        $conn->query($sql);

        echo "Connection {$from->resourceId} has disconnected\n";
        $this->clients->detach($from);
    }

    public function onError(ConnectionInterface $from, \Exception $e)
    {
        echo "An error has occurred: {$e->getMessage()}\n";
        $from->close();
    }
}
