const todoInput = document.getElementById("todo")
const todosContainer = document.getElementById("todos-container")
const completedTodosContainer = document.getElementById("completed-todos")
let todos = []
let completedTodos = []

const addTodo = () => {
  todos.push({ id: new Date().getTime(), content: todoInput.value })
  saveTodo()
  renderTodos()
  clearTodoInput()
}

const deleteTodo = (id) => {
  const newTodos = todos.filter(todo => todo.id !== id)
  todos = newTodos
  saveTodo()
  renderTodos()
}

const completeTodo = (id) => {
  todos.forEach(todo => {
    if (todo.id === id) {
      completedTodos.push({ ...todo, date: new Date() })
      deleteTodo(id)
    }
  });
}

const loadTodo = () => {
  todos = JSON.parse(localStorage.getItem("todos")) ?? []
  completedTodos = JSON.parse(localStorage.getItem("completedTodos")) ?? []
  renderTodos()
}

const saveTodo = () => {
  localStorage.setItem("todos", JSON.stringify(todos))
  localStorage.setItem("completedTodos", JSON.stringify(completedTodos))
}

const renderTodos = () => {
  let todosInnerHTML = ``
  let completedTodosInnerHTML = ``

  todos.forEach(todo => todosInnerHTML += `
    <div class="todo d-flex justify-content-between align-items-center mt-1 mb-1">
      <h4>${todo.content}</h4>
      <div class="d-flex justify-content-between align-items-center">
        <button class="btn btn-outline-success m-3" onclick="completeTodo(${todo.id})"><i class="fas fa-solid fa-check"></i></button>
        <button class="btn btn-outline-danger" onclick="deleteTodo(${todo.id})"><i class="fas fa-solid fa-ban"></i></button>
      </div>
    </div>
  `);
  todosContainer.innerHTML = todosInnerHTML

  completedTodos.forEach(todo => completedTodosInnerHTML += `<li>${todo.content} / ${todo.date}</li>`);
  completedTodosContainer.innerHTML = completedTodosInnerHTML
}

const clearTodoInput = () => todoInput.value = ""

const toggleCompleted = () => {
  if (completedTodosContainer.style.visibility === "hidden") completedTodosContainer.style.visibility = "visible"
  else completedTodosContainer.style.visibility = "hidden"
}

loadTodo()