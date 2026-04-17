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
// READ + SEARCH
// =====================
if ($method == "GET") {

    $search = isset($_GET['search']) ? $_GET['search'] : '';

    $stmt = $conn->prepare("
        SELECT Film.FilmId, Film.Tittel, Film.Produksjonsar, Film.Spilletid, Sjanger.Navn AS Sjanger
        FROM Film
        JOIN Sjanger ON Film.SjangerId = Sjanger.SjangerId
        WHERE Film.Tittel LIKE ? OR Sjanger.Navn LIKE ?
    ");

    $like = "%" . $search . "%";
    $stmt->bind_param("ss", $like, $like);

    $stmt->execute();
    $result = $stmt->get_result();

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