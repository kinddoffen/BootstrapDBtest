<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit();
}

include "db.php";

$method = $_SERVER['REQUEST_METHOD'];


// =====================
// READ
// =====================
if ($method == "GET") {

    $sql = "
        SELECT Film.FilmId, Film.Tittel, Sjanger.Navn AS Sjanger
        FROM Film
        JOIN Sjanger ON Film.SjangerId = Sjanger.SjangerId
    ";

    $result = $conn->query($sql);

    $data = [];

    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    echo json_encode($data);
}


// =====================
// CREATE
// =====================
if ($method == "POST") {

    $data = json_decode(file_get_contents("php://input"));

    $stmt = $conn->prepare("
        INSERT INTO Film (Tittel, Spilletid, Produksjonsar, Regissor, SjangerId)
        VALUES (?, ?, ?, ?, ?)
    ");

    $stmt->bind_param(
        "sissi",
        $data->tittel,
        $data->spilletid,
        $data->produksjonsar,
        $data->regissor,
        $data->sjanger_id
    );

    $stmt->execute();

    echo json_encode(["message" => "Film lagt til"]);
}


// =====================
// DELETE
// =====================
if ($method == "DELETE") {

    $id = $_GET['id'];

    $conn->query("DELETE FROM Film WHERE FilmId=$id");

    echo json_encode(["message" => "Film slettet"]);
}
?>