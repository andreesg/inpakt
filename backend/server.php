<?php

$file = $_SERVER['SCRIPT_FILENAME'];
$jsonFile = sprintf('%s%s.json', dirname($file), $_SERVER['REQUEST_URI']);

$path = pathinfo($file);

if ($path["extension"] === "json") {
    serve($file);
} else if (is_file($jsonFile)) {
    serve($jsonFile);
} else {
    return false;
}

function serve($file)
{
    header('Content-Type: application/json; charset=UTF-8');
    readfile($file);
}
