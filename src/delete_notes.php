<?php
session_start();
$database = new PDO("mysql:host=localhost;dbname=db_stickynote", "root", "root");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'];

    $stmt = $database->prepare("DELETE FROM notes WHERE note_id = ?");
    $stmt->execute([$id]);

    echo "success";
} else {
    echo "invalid request";
}
?>
