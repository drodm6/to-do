// ---------- state ----------

// each todo is an object: { id, text, date }
// keeping them in an array lets us loop over them and re-draw the list
// any time something changes (added or deleted).
let todos = [];

const todoTextInput = document.getElementById("todoText");
const todoDateInput = document.getElementById("todoDate");
const addBtn = document.getElementById("addBtn");
const todoContainer = document.getElementById("todoContainer");

function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  renderTodos();
}

function formatDate(dateString) {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// addBtn click handler
addBtn.addEventListener("click", () => {
  const text = todoTextInput.value.trim();
  const date = todoDateInput.value;

  if (text === "") {
    alert("Please write something to do first.");
    return;
  }

  const newTodo = {
    id: Date.now(), // unique id
    text: text,
    date: date,
  };

  todos.push(newTodo);

  todoTextInput.value = "";
  todoDateInput.value = "";
  todoTextInput.focus();
  renderTodos();
});

//render 
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
      editBtn.addEventListener("click", () => {




      });

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

// ---------- helper: format the date nicely ----------
function formatDate(dateString) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// draw the (empty) list once on page load
renderTodos();