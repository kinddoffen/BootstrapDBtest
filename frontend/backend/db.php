<?php
$conn = new mysqli("127.0.0.1", "root", "", "FilmDatabase");

if ($conn->connect_error) {
    http_response_code(500);
    die(json_encode(["error" => "DB feil"]));
}

$conn->set_charset("utf8");
?>