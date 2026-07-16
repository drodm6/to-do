import TodoApp from "./TodoApp.jsx";

// App is the root component. Right now it just renders TodoApp,
// but this is the natural place to add things later — a router,
// a second page, a header shared across views, etc. — without
// having to restructure TodoApp itself.
export default function App() {
  return <TodoApp />;
}