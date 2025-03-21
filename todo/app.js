const todoForm = document.querySelector(".todo-form");
const todoList = document.querySelector(".todo-items");
const todos = JSON.parse(localStorage.getItem("todos")) || [];
const clearAllButton = document.querySelector(".clear-all");
const darkModeToggle = document.querySelector(".dark-mode-toggle");

function addTodo(e) {
  e.preventDefault();
  const text = this.querySelector("[name=item]").value;
  const todo = {
    text,
    done: false,
  };
  todos.push(todo);
  populateTodoList(todos, todoList);
  localStorage.setItem("todos", JSON.stringify(todos));
  this.reset();
  console.log(todos);
}

function populateTodoList(todoItems = [], todoListElement) {
  todoListElement.innerHTML = todoItems
    .map((todo, i) => {
      return `
        <li>
            <input type="checkbox" data-index=${i} id="item${i}" ${
        todo.done ? "checked" : ""
      } />
            <label for="item${i}">${todo.text}</label>
        </li>
        `;
    })
    .join("");
}

function toggleComplete(e) {
  if (!e.target.matches("input")) return;
  const el = e.target;
  const index = el.dataset.index;
  todos[index].done = !todos[index].done;
  localStorage.setItem("todos", JSON.stringify(todos));
  populateTodoList(todos, todoList);
}

function clearAllTodos() {
  todos.length = 0;
  localStorage.removeItem("todos");
  populateTodoList(todos, todoList);
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  const isDarkMode = document.body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", isDarkMode);
}

function checkDarkModePreference() {
  const isDarkMode = localStorage.getItem("darkMode") === "true";
  if (isDarkMode) {
    document.body.classList.add("dark-mode");
  }
}

todoForm.addEventListener("submit", addTodo);
todoList.addEventListener("click", toggleComplete);
clearAllButton.addEventListener("click", clearAllTodos);
darkModeToggle.addEventListener("click", toggleDarkMode);

checkDarkModePreference();
populateTodoList(todos, todoList);
