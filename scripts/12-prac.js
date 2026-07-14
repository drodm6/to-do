// =========================================================
// STATE
// =========================================================

// each todo is an object: { id, text, date }
// keeping them in an array lets us loop over them and re-draw the list
// any time something changes (added, deleted, or edited).
let todos = [];

// keeps track of which todo's id is currently open in the edit modal
// null means no todo is being edited right now
let editingId = null;

// =========================================================
// DOM ELEMENTS
// =========================================================

// ---- add form elements ----
const todoTextInput = document.getElementById("todoText");
const todoDateInput = document.getElementById("todoDate");
const addBtn = document.getElementById("addBtn");
const todoContainer = document.getElementById("todoContainer");

// ---- edit modal elements ----
const editModal = document.getElementById("editModal");
const editTextInput = document.getElementById("editTextInput");
const editDateInput = document.getElementById("editDateInput");
const applyEditBtn = document.getElementById("applyEditBtn");
const cancelEditBtn = document.getElementById("cancelEditBtn");

// =========================================================
// HELPERS
// =========================================================

function formatDate(dateString) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// =========================================================
// CORE TODO OPERATIONS (add / delete)
// =========================================================

function addTodo(text, date) {
  const newTodo = {
    id: Date.now(), // unique id
    text: text,
    date: date,
  };

  todos.push(newTodo);
}

function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  renderTodos();
}

// =========================================================
// EDIT MODAL OPERATIONS
// =========================================================

// opens the modal and fills it with the selected todo's current values
function openEditModal(todo) {
  editingId = todo.id;
  editTextInput.value = todo.text;
  editDateInput.value = todo.date;
  editModal.classList.remove("hidden");
}

// hides the modal and clears the "currently editing" state
function closeEditModal() {
  editModal.classList.add("hidden");
  editingId = null;
}

// reads the modal's inputs and saves them onto the matching todo
function applyEdit() {
  const newText = editTextInput.value.trim();
  const newDate = editDateInput.value;

  if (newText === "") {
    alert("Todo text can't be empty.");
    return;
  }

  const todo = todos.find((t) => t.id === editingId);
  todo.text = newText;
  todo.date = newDate;

  closeEditModal();
  renderTodos();
}

// =========================================================
// RENDER
// =========================================================

function renderTodos() {
  todoContainer.innerHTML = "";

  if (todos.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-message";
    empty.textContent = "No tasks yet — add one above.";
    todoContainer.appendChild(empty);
    return;
  }

  todos.forEach((todo) => {
    // outer row for this todo
    const item = document.createElement("div");
    item.className = "todo-item";

    // todo text + date
    const textEl = document.createElement("p");
    textEl.textContent = todo.text;

    if (todo.date) {
      const dateEl = document.createElement("span");
      dateEl.className = "todo-date";
      dateEl.textContent = formatDate(todo.date);
      textEl.appendChild(dateEl);
    }

    // edit button
    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => openEditModal(todo));

    // delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

    item.appendChild(textEl);
    item.appendChild(editBtn);
    item.appendChild(deleteBtn);

    todoContainer.appendChild(item);
  });
}

// =========================================================
// EVENT LISTENERS
// =========================================================

// ---- add button ----
addBtn.addEventListener("click", () => {
  const text = todoTextInput.value.trim();
  const date = todoDateInput.value;

  if (text === "") {
    alert("Please write something to do first.");
    return;
  }

  addTodo(text, date);

  todoTextInput.value = "";
  todoDateInput.value = "";
  todoTextInput.focus();
  renderTodos();
});

// ---- edit modal buttons ----
applyEditBtn.addEventListener("click", applyEdit);
cancelEditBtn.addEventListener("click", closeEditModal);

// =========================================================
// INITIAL RENDER
// =========================================================

renderTodos();