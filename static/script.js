document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const addBtn = document.getElementById("addBtn");
  const taskList = document.getElementById("taskList");

  // Load saved tasks from local storage
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach((task) => renderTask(task.text, task.completed));

  // Add task event
  addBtn.addEventListener("click", addTask);
  taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
  });

  function addTask() {
    const text = taskInput.value.trim();
    if (text === "") return;

    renderTask(text, false);
    saveTasks();
    taskInput.value = "";
  }

  function renderTask(text, isCompleted) {
    const li = document.createElement("li");

    const taskContent = document.createElement("div");
    taskContent.className = "task-content";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = isCompleted;

    const span = document.createElement("span");
    span.textContent = text;
    if (isCompleted) span.classList.add("completed");

    checkbox.addEventListener("change", () => {
      span.classList.toggle("completed");
      saveTasks();
    });

    taskContent.appendChild(checkbox);
    taskContent.appendChild(span);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", () => {
      li.remove();
      saveTasks();
    });

    li.appendChild(taskContent);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  }

  function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach((li) => {
      const text = li.querySelector("span").textContent;
      const completed = li.querySelector("input[type='checkbox']").checked;
      tasks.push({ text, completed });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
