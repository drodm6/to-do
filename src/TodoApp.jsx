import { useState } from "react";

// =========================================================
// TodoApp
//
// This is the React version of your vanilla-JS todo app.
// Same features, same section structure as your original
// script.js (state / helpers / core operations / edit modal /
// search / render / event handlers) — just expressed the
// React way: state lives in useState, and the UI is built
// with JSX instead of document.createElement().
// =========================================================
export default function TodoApp() {
  // =======================================================
  // STATE
  // =======================================================

  // each todo is an object: { id, text, date, tag }
  // In vanilla JS this was `let todos = []` + manual re-render.
  // In React, todos lives in state — whenever we call setTodos(),
  // React automatically re-runs this component and updates the
  // screen. There is no renderTodos() function anymore; the JSX
  // at the bottom IS the render function, always in sync with state.
  const [todos, setTodos] = useState([]);

  // holds the id of the todo currently open in the edit modal
  // null = no todo is being edited right now
  const [editingId, setEditingId] = useState(null);

  // current text typed into the search bar
  const [searchQuery, setSearchQuery] = useState("");

  // form fields for the "add todo" row
  // (previously read directly from the DOM via todoTextInput.value,
  // etc. — in React, inputs are "controlled": their value always
  // comes from state, and typing updates that state via onChange)
  const [todoText, setTodoText] = useState("");
  const [todoDate, setTodoDate] = useState("");
  const [todoTag, setTodoTag] = useState("");

  // form fields for the edit modal (separate from the add-row fields
  // above, since they edit an existing todo rather than create one)
  const [editText, setEditText] = useState("");
  const [editDate, setEditDate] = useState("");

  // =======================================================
  // HELPERS
  // =======================================================

  function formatDate(dateString) {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  // strips a leading "#" so "#work" and "work" are treated the same
  function normalizeTag(rawTag) {
    return rawTag.trim().replace(/^#/, "");
  }

  // =======================================================
  // CORE TODO OPERATIONS (add / delete)
  // =======================================================

  function addTodo(text, date, tag) {
    const newTodo = {
      id: Date.now(), // unique id
      text,
      date,
      tag,
    };

    // setTodos with a function form: take the previous array,
    // return a new array with the new todo appended. React re-renders
    // automatically after this.
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  }

  function deleteTodo(id) {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }

  // =======================================================
  // SEARCH / FILTER
  // =======================================================

  // returns only the todos whose text OR tag contains the search query
  // (case-insensitive, works with or without a leading "#")
  function getFilteredTodos() {
    if (searchQuery === "") return todos;

    const query = normalizeTag(searchQuery).toLowerCase();

    return todos.filter((todo) => {
      const textMatch = todo.text.toLowerCase().includes(query);
      const tagMatch = todo.tag.toLowerCase().includes(query);
      return textMatch || tagMatch;
    });
  }

  // =======================================================
  // EDIT MODAL OPERATIONS
  // =======================================================

  // opens the modal and fills its fields with the selected todo's
  // current values
  function openEditModal(todo) {
    setEditingId(todo.id);
    setEditText(todo.text);
    setEditDate(todo.date);
  }

  // hides the modal by clearing editingId (the modal only renders
  // when editingId is not null — see the JSX below)
  function closeEditModal() {
    setEditingId(null);
  }

  // reads the modal's fields and saves them onto the matching todo
  function applyEdit() {
    const newText = editText.trim();

    if (newText === "") {
      alert("Todo text can't be empty.");
      return;
    }

    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === editingId
          ? { ...todo, text: newText, date: editDate }
          : todo
      )
    );

    closeEditModal();
  }

  // =======================================================
  // EVENT HANDLERS (previously your addBtn / searchInput listeners)
  // =======================================================

  function handleAddClick() {
    const text = todoText.trim();

    if (text === "") {
      alert("Please write something to do first.");
      return;
    }

    addTodo(text, todoDate, normalizeTag(todoTag));

    // clear the form, same as the old .value = "" resets
    setTodoText("");
    setTodoDate("");
    setTodoTag("");
  }

  const visibleTodos = getFilteredTodos();

  // =======================================================
  // RENDER
  // Mobile-first: the layout is written for a small screen by
  // default (stacked, full-width), then widened at the `sm:`
  // breakpoint (≥640px) once there's room for a row layout.
  // =======================================================
  return (
    // min-h-screen + flex centers the card on any screen size.
    // px-4 keeps content off the screen edges on narrow phones.
    <div className="min-h-screen bg-[var(--color-canvas)] flex justify-start sm:justify-center items-start px-4 py-10 sm:py-16">
      <div className="w-full max-w-[520px] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-5 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">

        {/* ---------- title ---------- */}
        <h1 className="font-[var(--font-display)] text-2xl sm:text-3xl font-semibold text-center uppercase tracking-wide text-[var(--color-ink)] border-b-[3px] border-[var(--color-accent)] pb-3 mb-6">
          Taskly
        </h1>

        {/* ---------- add row ----------
            flex-col by default (stacked, mobile-friendly),
            sm:flex-row once there's enough width for one line */}
        <div className="flex flex-col sm:flex-row gap-2.5 mb-5">
          <input
            type="text"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            placeholder="What needs to get done?"
            className="flex-1 min-w-0 px-3 py-2.5 text-[15px] rounded-lg bg-transparent border-2 border-[var(--color-border)] text-[var(--color-ink)] placeholder-[var(--color-ink-muted)] outline-none focus:border-[var(--color-accent)] transition-colors"
          />
          <input
            type="date"
            value={todoDate}
            onChange={(e) => setTodoDate(e.target.value)}
            className="w-full sm:w-auto px-3 py-2.5 text-[15px] rounded-lg bg-transparent border-2 border-[var(--color-border)] text-[var(--color-ink)] outline-none focus:border-[var(--color-accent)] transition-colors"
          />
          <input
            type="text"
            value={todoTag}
            onChange={(e) => setTodoTag(e.target.value)}
            placeholder="#tag (optional)"
            className="w-full sm:w-auto sm:flex-1 min-w-0 px-3 py-2.5 text-[15px] rounded-lg bg-transparent border-2 border-[var(--color-border)] text-[var(--color-ink)] placeholder-[var(--color-ink-muted)] outline-none focus:border-[var(--color-accent)] transition-colors"
          />
          <button
            onClick={handleAddClick}
            className="w-full sm:w-auto px-6 py-2.5 text-[15px] font-semibold rounded-lg bg-[var(--color-accent)] text-black hover:brightness-110 active:translate-y-0.5 transition-all"
          >
            ADD
          </button>
        </div>

        {/* ---------- search bar ---------- */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by text or #tag..."
          className="w-full px-3 py-2.5 text-[15px] rounded-lg bg-transparent border-2 border-[var(--color-border)] text-[var(--color-ink)] placeholder-[var(--color-ink-muted)] outline-none focus:border-[var(--color-accent)] transition-colors mb-4"
        />

        {/* ---------- todo list ---------- */}
        <div className="flex flex-col gap-2.5">
          {visibleTodos.length === 0 ? (
            <p className="text-center text-[var(--color-ink-muted)] text-sm py-2.5">
              {searchQuery
                ? "No todos match your search."
                : "No tasks yet — add one above."}
            </p>
          ) : (
            visibleTodos.map((todo) => (
              <div
                key={todo.id}
                className="flex flex-wrap sm:flex-nowrap items-center gap-2 bg-[var(--color-canvas)] border border-[var(--color-border)] border-l-4 border-l-[var(--color-accent)] rounded-lg px-3.5 py-3"
              >
                {/* text + date + tag, all in one <p> like your original */}
                <p className="flex-1 min-w-0 m-0 text-[15px] leading-snug text-[var(--color-ink)] break-words">
                  {todo.text}

                  {todo.date && (
                    <span className="inline text-xs text-[var(--color-ink-muted)] ml-2">
                      {formatDate(todo.date)}
                    </span>
                  )}

                  {todo.tag && (
                    <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full ml-2 bg-[var(--color-accent-light)] text-[var(--color-accent)]">
                      #{todo.tag}
                    </span>
                  )}
                </p>

                {/* buttons: full-width stacked on the smallest screens
                    so they stay tappable, inline from `sm:` up */}
                <div className="flex gap-1.5 ml-auto">
                  <button
                    onClick={() => openEditModal(todo)}
                    className="px-3.5 py-2 text-[13px] font-semibold rounded-md bg-transparent border border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent-light)] transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="px-3.5 py-2 text-[13px] font-semibold rounded-md bg-transparent border border-[var(--color-ink-muted)] text-[var(--color-ink)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ---------- edit modal ----------
          only rendered at all when editingId isn't null — this
          replaces the old .hidden class toggle. React just skips
          rendering the JSX when the condition is false. */}
      {editingId !== null && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center px-4">
          <div className="w-full max-w-[360px] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6 flex flex-col gap-3 shadow-[0_12px_30px_rgba(0,0,0,0.6)]">
            <h2 className="font-[var(--font-display)] text-lg text-[var(--color-ink)] m-0">
              Edit todo
            </h2>

            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="px-3 py-2.5 text-[15px] rounded-lg bg-transparent border-2 border-[var(--color-border)] text-[var(--color-ink)] outline-none focus:border-[var(--color-accent)] transition-colors"
            />
            <input
              type="date"
              value={editDate}
              onChange={(e) => setEditDate(e.target.value)}
              className="px-3 py-2.5 text-[15px] rounded-lg bg-transparent border-2 border-[var(--color-border)] text-[var(--color-ink)] outline-none focus:border-[var(--color-accent)] transition-colors"
            />

            <div className="flex gap-2.5 mt-1.5">
              <button
                onClick={applyEdit}
                className="flex-1 px-4 py-2.5 text-[15px] font-semibold rounded-lg bg-[var(--color-accent)] text-black hover:brightness-110 transition-all"
              >
                Apply
              </button>
              <button
                onClick={closeEditModal}
                className="flex-1 px-4 py-2.5 text-[15px] font-semibold rounded-lg bg-transparent border border-[var(--color-ink-muted)] text-[var(--color-ink)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}