<?php

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Max-Age: 0');    // cache for 1 day
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");     
header('Content-Type: application/json; charset=UTF-8');

$file = $_SERVER['SCRIPT_FILENAME'];

$localFile = sprintf('%s%s.json', dirname($file), $_SERVER['REQUEST_URI']);
$methodFile = sprintf('%s%s.%s.json', dirname($file), $_SERVER['REQUEST_URI'], strtolower($_SERVER['REQUEST_METHOD']));

if (is_file($localFile)) {
    serve($localFile);
} else if (is_file($methodFile)) {
    serve($methodFile);
} else {
    return false;
}

function serve($file)
{
    readfile($file);
}
