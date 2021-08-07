<?php

$data = json_decode(file_get_contents("php://input"));

file_put_contents("./data/testPost.txt", json_encode($data));