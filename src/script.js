// quill.js

let quill;

document.addEventListener('DOMContentLoaded', () => {
    quill = new Quill('#editor', {
      theme: 'snow',
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          ['link'],
          ['clean']
        ]
      }
    });
});

// toggle theme

function toggleTheme() {
    const html = document.documentElement;

    html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';

    const img = document.getElementById('icon-theme');
    const txt = document.getElementById('text-theme');
    const themeToggleButton = document.getElementById('theme-toggle-button');

    if(html.dataset.theme === 'dark') {
        img.src = '../assets/icons/light-mode-icon.png';
        txt.innerText = 'Switch Light';
        themeToggleButton.insertBefore(img, txt);
    } else if (html.dataset.theme === 'light') {
        img.src = '../assets/icons/dark-mode-icon.png';
        txt.innerText = 'Switch Dark';
        themeToggleButton.insertBefore(txt, img);
    } 
};

// add note

function newNote() {
    document.getElementById('background-modal').style.display = 'flex';
    document.getElementById('note-modal').style.display = 'block';
    quill.enable(true);
};

function addNoteToDashboard(){
    document.getElementById('background-modal').style.display = 'none';
    document.getElementById('note-modal').style.display = 'none';

    const titleInput = document.getElementById('note-title');
    const contentInput = document.getElementById('hidden-content');
    let title = titleInput.value;
    let content = quill.root.innerHTML;

    contentInput.value = content;

    fetch('add_notes.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `action=add_note&title=${encodeURIComponent(title)}&content=${encodeURIComponent(content)}`
      })
      .then(response => response.text())
      .then(data => {
        console.log(data);
    });
    getNotes();
}

// get / load note

function getNotes() {
    fetch('get_notes.php')
        .then(response => response.json())
        .then(data => {
            const notesContainer = document.getElementById('notes-container');
            notesContainer.innerHTML = '';

            let emptyLabel = document.getElementById('empty-label');
            if (!emptyLabel) {
                emptyLabel = document.createElement('p');
                emptyLabel.id = 'empty-label';
                emptyLabel.textContent = 'Notes Empty...';
                notesContainer.appendChild(emptyLabel);
            }

            if (emptyLabel) {
                emptyLabel.style.display = data.length === 0 ? 'block' : 'none';
            }

            data.forEach(note => {
                const noteElement = document.createElement('div');
                noteElement.classList.add('note-card');
                
                // Gunakan DOM element biasa untuk button agar addEventListener bisa dipakai
                const deleteButton = document.createElement('button');
                deleteButton.classList.add('delete-note');
                deleteButton.innerHTML = `
                    <img src='../assets/icons/close-trashbin-icon.png' id='trashbin-icon'>
                `;
                deleteButton.addEventListener('click', () => showDeleteNotePopup(note.id, deleteButton));

                const titleElement = document.createElement('h1');
                titleElement.textContent = note.title;

                const hr = document.createElement('hr');

                const contentElement = document.createElement('div');
                contentElement.innerHTML = note.content;

                // Masukkan ke noteElement
                noteElement.appendChild(deleteButton);
                noteElement.appendChild(titleElement);
                noteElement.appendChild(hr);
                noteElement.appendChild(contentElement);

                // Masukkan ke container
                notesContainer.appendChild(noteElement);
            });
        })
        .catch(error => console.error('Error fetching notes:', error));
}


// load on refresh

window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    getNotes();
});

// delete note

function deleteNote(id) {
    fetch('delete_notes.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `id=${encodeURIComponent(id)}`
    })
    .then(response => response.text())
    .then(result => {
        console.log('Delete result:', result);
        getNotes();
    })
    .catch(error => {
        console.error('Error deleting note:', error);
    });
}

let noteToDelete = null;

function showDeleteNotePopup(id, element) {
    noteIdToDelete = id;
    const popup = document.getElementById('confirmPopup');
    popup.style.display = 'flex';

    document.getElementById('confirmYes').onclick = () => {
        deleteNote(noteIdToDelete);
        element.parentNode.remove();
        popup.style.display = 'none';
        if ([...document.querySelectorAll('#notes-container .note')].length === 0){
            document.getElementById('empty-label').style.display = 'flex';
        }
    };
    document.getElementById('confirmNo').onclick = () => {
        popup.style.display = 'none';
        noteToDeleteId = null;
    };
}

function showCancelPopup() {
    const popup = document.getElementById('confirmPopup');
    popup.style.display = 'flex';
    
    document.getElementById('confirmYes').onclick = () => {
        popup.style.display = 'none';
        document.getElementById('background-modal').style.display = 'none';
        document.getElementById('note-modal').style.display = 'none';
        document.getElementById('note-title').value = '';
        quill.setContents([]);
    }
};

document.getElementById('confirmYes').addEventListener('click', () => {
    if (noteIdToDelete !== null) {
        deleteNote(noteIdToDelete);
        noteIdToDelete = null;
        document.getElementById('confirmPopup').style.display = 'none';
    }
});

document.getElementById('confirmNo').addEventListener('click', () => {
    noteIdToDelete = null;
    document.getElementById('confirmPopup').style.display = 'none';
});