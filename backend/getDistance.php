<?php

$url = "https://maps.googleapis.com/maps/api/directions/json?";

$postData = json_decode(file_get_contents("php://input"));

$data['origin'] = $postData->origin;
$data['destination'] = $postData->destination;
$data['key'] = $postData->key;
$data['mode'] = $postData->mode;

$url = $url . "&origin=" . $data['origin'] . "&destination=" . $data['destination'] . "&key=" . $data['key'] . "&mode=" . $data['mode'];

$json = file_get_contents($url);

$res = json_decode($json, TRUE);

echo json_encode($res);