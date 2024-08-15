const sample = [
  {
    id: `soemId${Math.floor(Math.random() * 1000000)}`,
    title: "todo 1",
    completed: true,
  },
  {
    id: `soemId${Math.floor(Math.random() * 1000000)}`,
    title: "todo 2",
    completed: false,
  },
  {
    id: `soemId${Math.floor(Math.random() * 1000000)}`,
    title: "todo 3",
    completed: false,
  },
  {
    id: `soemId${Math.floor(Math.random() * 1000000)}`,
    title: "todo 4",
    completed: true,
  },
  {
    id: `soemId${Math.floor(Math.random() * 1000000)}`,
    title: "todo 5",
    completed: false,
  },
  {
    id: `soemId${Math.floor(Math.random() * 1000000)}`,
    title: "todo 6",
    completed: false,
  },
];

class Todo {
  constructor(author) {
    this.author = author;
    this.todos = [];
  }
  addTodo(todo) {
    this.todos.push(todo);
  }
  updateTodo(todoId) {
    console.log(todoId);
    console.log(this.todos.find((todo) => todo.id === todoId));
    this.todos = this.todos.map((todo) => {
      return todo.id === todoId
        ? { ...todo, completed: !todo.completed }
        : todo;
    });
  }
  deleteTodo(todoId) {
    console.log(todoId);
    this.todos = this.todos.filter((todo) => todo.id !== todoId);
  }

  renderTodos(container) {
    const todoList = container.querySelector(".todo-list");
    let output = "";
    if (this.todos.length === 0) {
      todoList.innerHTML = `<div class="no-todo">Todo list is empty</div>`;
      return;
    }
    for (let todo of this.todos) {
      output += `
                <div class="todo" data-id="${todo.id}">
                    <input type="checkbox" class="isCompleted" ${
                      todo.completed ? "checked=''" : ""
                    }>
                    <p>${todo.title}</p>
                    <button class="delete">&times;</button>
                </div>
            `;
    }
    todoList.innerHTML = output;
  }
}

function main(container) {
  const todo = new Todo("natanem");
  todo.todos = sample;
  todo.renderTodos(container);

  container.addEventListener("click", (e) => {
    e.preventDefault();
    const classes = e.target.classList;
    if (classes.contains("delete")) {
      const { id } = e.target.parentElement.dataset;
      todo.deleteTodo(id);
    }

    if (classes.contains("add")) {
      const textInput = container.querySelector("input");
      if (!textInput.value) return;
      todo.addTodo({
        id: `soemId${Math.floor(Math.random() * 1000000)}`,
        title: textInput.value,
        completed: false,
      });
      textInput.value = "";
    }

    if (classes.contains("isCompleted")) {
      const { id } = e.target.parentElement.dataset;
      todo.updateTodo(id);
    }

    todo.renderTodos(container);
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const containerEl = document.querySelector("#todo-container");
  main(containerEl);
});
