<?php
// api/delete.php
header('Content-Type: application/json');
require_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

// Récupérer les données DELETE
$data = json_decode(file_get_contents("php://input"));

if(!empty($data->id)) {
    $query = "DELETE FROM produits WHERE id = :id";
    $stmt = $db->prepare($query);
    
    $id = htmlspecialchars(strip_tags($data->id));
    $stmt->bindParam(":id", $id);
    
    if($stmt->execute()) {
        http_response_code(200);
        echo json_encode(array("message" => "Produit supprimé avec succès."));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Impossible de supprimer le produit."));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "ID du produit manquant."));
}
?>