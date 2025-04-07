let quill;

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
}

function newNote() {
    document.getElementById('background-modal').style.display = 'flex';
    document.getElementById('note-modal').style.display = 'block';
    quill.enable(true);
}

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
})

function showDeleteNotePopup(element) {
    const popup = document.getElementById('confirmPopup');
    popup.style.display = 'flex';

    document.getElementById('confirmYes').onclick = () => {
        element.parentNode.remove();
        popup.style.display = 'none';
        if ([...document.querySelectorAll('#notes-container .note')].length === 0){
            document.getElementById('empty-label').style.display = 'flex';
        }
    };
}

function showCancelPopup(callback) {
    const popup = document.getElementById('confirmPopup');
    popup.style.display = 'flex';
    
    document.getElementById('confirmYes').onclick = () => {
        popup.style.display = 'none';
        document.getElementById('background-modal').style.display = 'none';
        document.getElementById('note-modal').style.display = 'none';
        document.getElementById('note-title').value = '';
        quill.setContents([]);
    
        callback(true);
    };

document.getElementById('confirmNo').onclick = () => {
    popup.style.display = 'none';
    callback(false);
};
}
  
document.getElementById('deleteButton').addEventListener('click', () => {
    showConfirmPopup((confirmed) => {
        if (confirmed) {
        console.log('Data dihapus!');
        } else {
        console.log('Batal dihapus');
        }
    });
});

function addNoteToDashboard(){
    document.getElementById('background-modal').style.display = 'none';
    document.getElementById('note-modal').style.display = 'none';

    const titleInput = document.getElementById('note-title');
    const title = titleInput.value;
    let content = quill.root.innerHTML;

    // Reset input
    titleInput.value = '';
    quill.setContents([]);
    document.getElementById('empty-label').style.display = 'none';
    document.getElementById('notes-container').style.height = 'fit-content';

    // Buat note baru
    const note = document.createElement('div');
    note.classList.add('note-card');
    note.innerHTML = `
        <button class="delete-note" onclick="showDeleteNotePopup(this)">
            <img src='../assets/icons/close-trashbin-icon.png' id='trashbin-icon'>
        </button>
        <h1>${title}</h1>
        <hr>
        <div>${content}</div>
    `;

    document.getElementById('notes-container').appendChild(note);
}
