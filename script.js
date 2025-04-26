document.addEventListener('DOMContentLoaded', function () {
  const taskInput = document.getElementById('task-input');
  const addTaskBtn = document.getElementById('add-task-btn');
  const taskList = document.getElementById('task-list');

  // Load tasks from localStorage
  loadTasks();

  addTaskBtn.addEventListener('click', function (e) {
      e.preventDefault();
      addTask(taskInput.value);
      taskInput.value = '';
  });

  function addTask(taskText, completed = false) {
    if (taskText.trim() === '') return;

    const li = document.createElement('li');
    li.className = 'task-item';

    // Create a container for checkbox + task text
    const taskContent = document.createElement('div');
    taskContent.style.display = 'flex';
    taskContent.style.alignItems = 'center';
    taskContent.style.gap = '10px';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;
    checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
            li.classList.add('completed');
        } else {
            li.classList.remove('completed');
        }
        saveTasks();
    });

    const span = document.createElement('span');
    span.textContent = taskText;

    taskContent.appendChild(checkbox);
    taskContent.appendChild(span);

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '🗑️';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', function () {
        li.remove();
        saveTasks();
    });

    li.appendChild(taskContent); // add the checkbox + text group
    li.appendChild(deleteBtn);   // add delete button separately
    taskList.appendChild(li);

    saveTasks();
}

  function saveTasks() {
      const tasks = [];
      taskList.querySelectorAll('li').forEach(li => {
          const taskText = li.querySelector('span').textContent;
          const completed = li.querySelector('input[type="checkbox"]').checked;
          tasks.push({ taskText, completed });
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function loadTasks() {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.forEach(task => addTask(task.taskText, task.completed));
  }
});































