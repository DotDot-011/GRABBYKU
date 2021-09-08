<?php

namespace MyApp;

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

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
        // front send json {protocol, arg1, arg2, arg3, arg4}
        // protocol:in -> arg1:sender's name, arg2:is_driver? 1 : 0, arg3:id
        // protocol:out -> nothing required
        // protocol:chat -> arg1:receiver's name, arg2:string, arg3:receiver's id
        // protocol:enqueue -> arg1:driver's id, arg2:driver's name
        // protocol:dequeue -> arg1:driver's id, arg2:driver's name
        // protocol:driver-accepted -> arg1:driver's id, arg2:user's name, arg3:user's id
        // protocol:work-finished -> arg1:driver's name, arg2:driver's id, arg3:user's name, arg4:user's id
        // protocol:user-cancel -> arg1:user's name, arg2:user's id
        $routes = [];
        require dirname(__DIR__) . "/backend/configs/database.php";
        require dirname(__DIR__) . "/backend/configs/route.php";

        $wsdata = json_decode($msg, true);
        echo "front send " . $msg . "\n";
        $protocol = $wsdata['protocol'];
        $check = 0;

        if (isset($routes[$protocol]['ws'])) {
            require $routes[$protocol]['ws'];
        } else {
            echo "this protocol is not available";
            $from->send("this protocol is not available");
        }

        $conn->close();
    }

    public function onClose(ConnectionInterface $user)
    {
        // The connection is closed, remove it, as we can no longer send it messages

        echo "Connection {$user->resourceId} has disconnected\n";
        $this->clients->detach($user);
    }

    public function onError(ConnectionInterface $user, \Exception $e)
    {
        echo "An error has occurred: {$e->getMessage()}\n";
        $user->close();
    }
}
