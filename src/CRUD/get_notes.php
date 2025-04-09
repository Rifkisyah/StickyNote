<?php
session_start();
header('Content-Type: application/json');
$database = new PDO("mysql:host=localhost;dbname=db_stickynote", "root", "root");

$result = $database->prepare("SELECT note_id, note_title, note_content FROM notes ORDER BY note_title ASC");
$result->execute();

$note = [];

while($row = $result->fetch(PDO::FETCH_ASSOC)) {
    $note[] = [
        'id' => $row['note_id'],
        'title' => $row['note_title'],
        'content' => $row['note_content']
    ];
}

header('Content-Type: application/json');
echo json_encode($note);


?>