<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>StickyNote - Register</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body class="auth-body">
    <div class="auth-container">
        <h1>Welcome to StickyNote</h1><hr>
        <p>Please Register to continue</p>
        <form id="auth-form" method="POST" action="authentication.php">
            <input type="hidden" name="action" value="register">
            <input type="text" id="username" name="username" placeholder="Username" required>
            <input type="password" id="password" name="password" placeholder="Password" required>
            <button type="submit">Register</button>
            <br>
            <?php if (isset($_GET['error']) && $_GET['error'] == 1): ?>
            <div class="error-message" style="color:red; margin-bottom:10px;">
                Username is not avaible.
            </div>
            <?php endif; ?>
            <hr>
            <br>
            <span>Already have a Account?</span>
            <a href="login.php">Login here</a>
        </form>
    </div>
    <button onclick="toggleTheme()" id="theme-toggle-button"><img src='../assets/icons/light-mode-icon.png' id="icon-theme"><p id="text-theme">Switch Light</p></button>
    <script src="script.js"></script>    
</body>
</html>