const btnEl = document.getElementById("btn");
const containerEl = document.getElementById("container");

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

function deleteNote(id, element) {}

function updateNote(id, elementValue) {}

function addNote() {
  const noteObj = {
    id: Math.floor(Math.random() * 100000),
    content: "",
  };
  const noteEl = createNoteElement(noteObj.id, noteObj.content);
  containerEl.insertBefore(noteEl, btnEl);
}
