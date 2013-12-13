<?php

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
    header('Content-Type: application/json; charset=UTF-8');
    header('Access-Control-Allow-Origin: *');
    readfile($file);
}
