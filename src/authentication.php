<?php
session_unset();
session_start();
$database = new PDO("mysql:host=localhost;dbname=db_stickynote", "root", "root");

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $action = $_POST["action"];

    if ($action == "register") {
        $username = $_POST["username"];
        $password = password_hash($_POST["password"], PASSWORD_DEFAULT);
        $uid = generate_unique_uid($database);

        $stmt = $database->prepare("SELECT uid, password FROM users WHERE username = ?");
        $stmt->execute([$username]);

        if ($stmt->rowCount() > 0) {
            header("Location: register.php?error=1");
            exit;
        } else {
            $stmt = $database->prepare("INSERT INTO users (uid, username, password) VALUES (?, ?, ?)");
            $stmt->execute([$uid, $username, $password]);
            $_SESSION["uid"] = $uid;
            header("Location: dashboard.php");
            exit;
        }
    }

    if ($action == "login") {
        $username = $_POST["username"];
        $password = $_POST["password"];

        $stmt = $database->prepare("SELECT uid, password FROM users WHERE username = ?");
        $stmt->execute([$username]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user["password"]) && $user["password"] != "") {
            $_SESSION["uid"] = $user["uid"];
            header("Location: dashboard.php");
            exit;
        } else {
            header("Location: login.php?error=1");
            exit;
        }        
    }
}

function generate_uid($length = 16) {
    return bin2hex(random_bytes($length / 2));
}

function generate_unique_uid($database){
    do {
        $uid = generate_uid();
        $stmt = $database->prepare("SELECT COUNT(*) FROM users WHERE uid = ?");
        $stmt->execute([$uid]);
        $count = $stmt->fetchColumn();
    } while ($count > 0);
    return $uid;
}


$stmt = $database->prepare("SELECT username FROM users WHERE uid = ?");
$stmt->execute([$_SESSION["uid"]]);
$user = $stmt->fetch();

$username = $user ? $user["username"] : "User";

?>