// ---------- state ----------
let todos = [];

// grab the elements once, so we don't query the DOM over and over
const todoTextInput = document.getElementById("todoText");
const todoDateInput = document.getElementById("todoDate");
const addBtn = document.getElementById("addBtn");
const todoContainer = document.getElementById("todoContainer");

// ---------- add a todo ----------
addBtn.addEventListener("click", () => {
  const text = todoTextInput.value.trim();
  const date = todoDateInput.value;

  // simple validation: don't add empty todos
  if (text === "") {
    alert("Please write something to do first.");
    return;
  }

  // build the todo object
  const newTodo = {
    id: Date.now(), // unique id, using the current timestamp
    text: text,
    date: date, // may be empty string if user didn't pick a date
  };

  todos.push(newTodo);

  // lo away input kan value yan nwe bbtawa refreshh  bbnawa lo wargrtnni value nwe 
  todoTextInput.value = "";
  todoDateInput.value = "";
  todoTextInput.focus();

  renderTodos();
});

// ---------- delete a todo ----------
function deleteTodo(id) {
  // keep every todo whose id does NOT match the one we clicked delete on
  todos = todos.filter((todo) => todo.id !== id);
  renderTodos();
}

// ---------- render the list ----------
// this clears the container and rebuilds it from the "todos" array.
// it's the simplest way to keep what's on screen in sync with our data.
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

    // the <p> that shows the todo text + date
    const textEl = document.createElement("p");
    textEl.textContent = todo.text;

    // only show a date line if the user actually picked one
    if (todo.date) {
      const dateEl = document.createElement("span");
      dateEl.className = "todo-date";
      dateEl.textContent = formatDate(todo.date);
      textEl.appendChild(dateEl);
    }

    // the delete button
    const delBtn = document.createElement("button");
    delBtn.className = "delete-btn";
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", () => deleteTodo(todo.id));

    item.appendChild(textEl);
    item.appendChild(delBtn);
    todoContainer.appendChild(item);
  });
}

// ---------- helper: format the date nicely ----------
function formatDate(dateString) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// draw the (empty) list once on page load
renderTodos();