<?php
session_start();
$database = new PDO("mysql:host=localhost;dbname=db_stickynote", "root", "root");
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $action = $_POST["action"];

    if ($action == "add_note") {
        $uid = $_SESSION["uid"];
        $title = $_POST["title"];
        $content = isset($_POST["content"]) ? $_POST["content"] : '';
        $id = generate_unique_id($database);

        $stmt = $database->prepare("INSERT INTO notes (note_id, note_title, note_content, uid) VALUES (?, ?, ?, ?)");
        $stmt->execute([$id, $title, $content, $uid]);

        header("Location: ../dashboard.php");
        exit;
    }
}

function generate_id($length = 16) {
    return bin2hex(random_bytes($length / 2));
}

function generate_unique_id($database){
    do {
        $id = generate_id();
        $stmt = $database->prepare("SELECT COUNT(*) FROM notes WHERE note_id = ?");
        $stmt->execute([$id]);
        $count = $stmt->fetchColumn();
    } while ($count > 0);
    return $id;
}

?>