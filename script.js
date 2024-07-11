// Create new note 
const create_new_note = document.querySelector('#create-note-button');
const create_note_img = create_new_note.querySelector('img');

// Change theme
const change_theme = document.querySelector('#change-theme-button');
const change_theme_img = change_theme.querySelector('img');
const themeStylesheet = document.querySelector('#theme-stylesheet');

// Notes section
const notes_card_container = document.querySelector('.notes-section');

// Store notes
function updatestorage() {
    const notes = [];
    document.querySelectorAll('.notes-card').forEach(noteCard => {
        const noteTitle = noteCard.querySelector('.note-title').value;
        const noteContent = noteCard.querySelector('.note-content').value;
        notes.push({ title: noteTitle, content: noteContent });
    });
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Function to create a new note card
function createNoteCard(title = '', content = '') {
    // Create new note card elements
    const new_note_card = document.createElement("div");
    new_note_card.className = "notes-card";

    const new_notes_card_header = document.createElement("div");
    new_notes_card_header.className = "notes-card-header";

    const new_note_title = document.createElement("input");
    new_note_title.type = "text";
    new_note_title.name = "Note title";
    new_note_title.className = "note-title";
    new_note_title.placeholder = "Title";
    new_note_title.value = title;

    const new_delete_note_button = document.createElement("button");
    new_delete_note_button.className = "transparent delete-button";
    new_delete_note_button.innerHTML = `<img src="assets/images/Light-theme-icons/deletenotelight.svg" alt="Delete note" width="15px">`;

    const new_note_content = document.createElement("textarea");
    new_note_content.name = "Notes";
    new_note_content.className = "note-content";
    new_note_content.placeholder = "Enter your note";
    new_note_content.value = content;

    // Append new elements to the new note card
    new_notes_card_header.appendChild(new_note_title);
    new_notes_card_header.appendChild(new_delete_note_button);
    new_note_card.appendChild(new_notes_card_header);
    new_note_card.appendChild(new_note_content);

    // Append the new note card to the notes section
    notes_card_container.appendChild(new_note_card);

    // Update storage whenever note title or content changes
    new_note_title.addEventListener('input', updatestorage);
    new_note_content.addEventListener('input', updatestorage);

    // Function to delete note
    new_delete_note_button.addEventListener('click', () => {
        notes_card_container.removeChild(new_note_card);
        updatestorage();
    });

    // Update storage after adding the new note card
    updatestorage();
}

// Add event listener to create new note button
create_new_note.addEventListener('click', () => createNoteCard());

// Load notes from local storage on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedNotes = JSON.parse(localStorage.getItem("notes") || "[]");
    savedNotes.forEach(note => createNoteCard(note.title, note.content));
});

// Function to change theme
change_theme.addEventListener('click', () => {
    if (themeStylesheet.getAttribute('href') === 'style/lightmode.css') {
        themeStylesheet.setAttribute('href', 'style/darkmode.css');
    } else {
        themeStylesheet.setAttribute('href', 'style/lightmode.css');
    }
    // Update SVG sources for the new theme
    document.querySelectorAll('.delete-button img').forEach(button => {
        if (themeStylesheet.getAttribute('href') === 'style/darkmode.css') {
            button.setAttribute('src', 'assets/images/Dark-theme-icons/deletenotedark.svg');
        } else {
            button.setAttribute('src', 'assets/images/Light-theme-icons/deletenotelight.svg');
        }
    });

    // Update create note button image source
    if (themeStylesheet.getAttribute('href') === 'style/darkmode.css') {
        create_note_img.setAttribute('src', 'assets/images/Dark-theme-icons/createnotedark.svg');
        change_theme_img.setAttribute('src', 'assets/images/Dark-theme-icons/changethemedark.svg');
    } else {
        create_note_img.setAttribute('src', 'assets/images/Light-theme-icons/createnotelight.svg');
        change_theme_img.setAttribute('src', 'assets/images/Light-theme-icons/changethemelight.svg');
    }
});
