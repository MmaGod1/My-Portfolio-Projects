const cards = document.querySelectorAll(".card");
const lists = document.querySelectorAll(".list");

// ----- DRAGGABLE ELEMENT FUNCTIONS ------
function dragStart(ev) {
  ev.dataTransfer.setData("text/plain", ev.target.id);
}

function dragEnd(ev) {
  /* ----- get feed back from the console
   or manipulate the draggable element here
  */
}

// ----- DROP ELEMENT FUNCTIO:NS ------
function dragOver(ev) {
  ev.preventDefault();
}

function dragEnter(ev) {
  ev.preventDefault();
  this.classList.add("over");
}

function dragLeave(ev) {
  ev.preventDefault();
  this.classList.remove("over");
}

function dragDrop(ev) {
  ev.preventDefault();

  const id = ev.dataTransfer.getData("text/plain");
  const list = document.getElementById(id);

  this.appendChild(list);
  this.classList.remove("over");
}

// ----- ADD THE FUNCTIONS AND EVENT LISTENERS -----
for (const list of lists) {
  list.addEventListener("dragstart", dragStart);
  list.addEventListener("dragend", dragEnd);
}

for (const card of cards) {
  card.addEventListener("dragover", dragOver);
  card.addEventListener("dragenter", dragEnter);
  card.addEventListener("dragleave", dragLeave);
  card.addEventListener("drop", dragDrop);
}
