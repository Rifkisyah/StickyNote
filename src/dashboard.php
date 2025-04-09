<?php include "authentication.php"; ?>
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>StickyNote - Dahsboard</title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
</head>
<body>
    <div class="main-container">
    <a href="dashboard.php" id="logo">Sticky Note</a>
        <header>
            <h2 id="username-label">Welcome, <?php echo htmlspecialchars($username); ?>!</h2>
            <button onclick="newNote()" id="new-note-button">New Note</button>
        </header>
        <main>
            <div id="notes-container">
                <p id="empty-label">Notes Empty...</p>
            </div>
            <div class="background-modal" id="background-modal">
                <div class="note-modal" id="note-modal">
                    <button class="delete-note" onclick="showCancelPopup()"><img src='../assets/icons/close-trashbin-icon.png' id='cancel-trashbin-icon'></button>
                    <form class="note-form" id="note-form" method="POST" action="add_notes.php">
                        <input type="hidden" name="action" value="add_note">
                        <input type="text" name="title" id="note-title" placeholder="Title">
                        <input type="hidden" name="content" id="hidden-content">
                        <hr>
                        <div id="editor"></div>
                        <button type="button" id="save-note-button" onclick="addNoteToDashboard()">Save Note</button>
                    </form>
                </div>
            </div>
            <div id="confirmPopup" style="display: none;" class="popup-overlay">
                <div class="popup-box">
                  <p>Are You Sure To Delete This Note?</p>
                  <button id="confirmYes">Yes</button>
                  <button id="confirmNo">No</button>
                </div>
              </div>
        </main>

        <footer>
            <p>&copy; 2025 StickyNote. All rights reserved.</p>

        </footer>
    </div>
    <button onclick="toggleTheme()" id="theme-toggle-button"><img src='../assets/icons/light-mode-icon.png' id="icon-theme"><p id="text-theme">Switch Light</p></button>

    <script src="https://cdn.quilljs.com/1.3.6/quill.min.js"></script>
    <script src="script.js"></script>
</body>
</html>