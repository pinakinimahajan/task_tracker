let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let filter = 'all';

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  const list = document.getElementById('taskList');
  list.innerHTML = '';
  let filtered = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });
  filtered.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';
    const span = document.createElement('span');
    span.textContent = task.text;
    li.appendChild(span);

    const actions = document.createElement('div');
    actions.className = 'actions';

    const completeBtn = document.createElement('button');
    completeBtn.textContent = task.completed ? 'Undo' : 'Complete';
    completeBtn.className = 'complete';
    completeBtn.onclick = () => toggleComplete(index);
    actions.appendChild(completeBtn);

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit';
    editBtn.onclick = () => editTask(index);
    actions.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete';
    deleteBtn.onclick = () => deleteTask(index);
    actions.appendChild(deleteBtn);

    li.appendChild(actions);
    list.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById('taskInput');
  const text = input.value.trim();
  if (!text) {
    alert('Task cannot be empty!');
    return;
  }
  if (tasks.length >= 15) {
    alert('Maximum of 15 tasks allowed!');
    return;
  }
  tasks.push({ text, completed: false });
  input.value = '';
  saveTasks();
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const newText = prompt('Edit task:', tasks[index].text);
  if (newText !== null) {
    const trimmed = newText.trim();
    if (trimmed) {
      tasks[index].text = trimmed;
      saveTasks();
      renderTasks();
    } else {
      alert('Task cannot be empty!');
    }
  }
}

function setFilter(f) {
  filter = f;
  document.querySelectorAll('.filters button').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`.filters button[onclick="setFilter('${f}')"]`).classList.add('active');
  renderTasks();
}

renderTasks();
