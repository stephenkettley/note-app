const btnEl = document.getElementById("btn");
const containerEl = document.getElementById("container");

Array.from(getNotes()).forEach((note) => {
  const noteEl = createNoteElement(note.id, note.content);
  containerEl.insertBefore(noteEl, btnEl);
});

btnEl.addEventListener("click", addNote);

function createNoteElement(id, content) {
  const element = document.createElement("textarea");
  element.classList.add("note");
  element.placeholder = "click and type to add text";
  element.value = content;

  element.addEventListener("dblclick", () => {
    const warning = confirm("Do you want to delete this note?");
    if (warning) {
      deleteNote(id, element);
    }
  });

  element.addEventListener("input", () => {
    updateNote(id, element.value);
  });

  return element;
}

function deleteNote(id, element) {
  const notes = getNotes().filter((note) => note.id != id);
  saveNoteLocalStorage(notes);
  containerEl.removeChild(element);
}

function updateNote(id, content) {
  const notes = getNotes();
  const target = notes.filter((note) => note.id == id)[0];
  target.content = content;
  saveNoteLocalStorage(notes);
}

function addNote() {
  const notes = getNotes();
  const noteObj = {
    id: Math.floor(Math.random() * 100000),
    content: "",
  };
  const noteEl = createNoteElement(noteObj.id, noteObj.content);
  containerEl.insertBefore(noteEl, btnEl);
  notes.push(noteObj);
  saveNoteLocalStorage(notes);
}

function saveNoteLocalStorage(notes) {
  localStorage.setItem("note-app", JSON.stringify(notes));
}

function getNotes() {
  return JSON.parse(localStorage.getItem("note-app") || "[]");
}
