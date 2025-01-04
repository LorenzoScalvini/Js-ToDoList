document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("task-input");
  const addTaskButton = document.getElementById("add-task");
  const taskList = document.getElementById("task-list");
  const filters = document.querySelectorAll(".filter");
  const darkModeToggle = document.getElementById("dark-mode-toggle");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Function to render tasks
  function renderTasks(filter = "all") {
    taskList.innerHTML = "";
    const filteredTasks = tasks.filter((task) =>
      filter === "all"
        ? true
        : filter === "active"
        ? !task.completed
        : task.completed
    );
    filteredTasks.forEach((task, index) => {
      const taskItem = document.createElement("li");
      taskItem.classList.add("task-item");
      taskItem.innerHTML = `
                <span class="${
                  task.completed ? "completed" : ""
                }" contenteditable="true" onblur="editTask(${index}, this.innerText)">${
        task.text
      }</span>
                <div>
                    <button onclick="toggleComplete(${index})">${
        task.completed ? "Undo" : "Complete"
      }</button>
                    <button onclick="deleteTask(${index})">Delete</button>
                </div>
            `;
      taskList.appendChild(taskItem);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Add a task
  addTaskButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
      tasks.push({ text: taskText, completed: false });
      taskInput.value = "";
      renderTasks();
    }
  });

  // Filter tasks
  filters.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");
      renderTasks(filter);
    });
  });

  // Toggle dark mode
  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });

  // Edit a task
  window.editTask = function (index, newText) {
    tasks[index].text = newText;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  // Toggle complete status
  window.toggleComplete = function (index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
  };

  // Delete a task
  window.deleteTask = function (index) {
    tasks.splice(index, 1);
    renderTasks();
  };

  // Initial render
  renderTasks();
});
