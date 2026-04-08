const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');

let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];

function updateUI() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}" onclick="toggleTask(${index})">
                ${task.text}
            </span>
            <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(li);
    });
    taskCount.innerText = `Tasks: ${tasks.length} / 15`;
    localStorage.setItem('myTasks', JSON.stringify(tasks));
}

function addTask() {
    const text = taskInput.value.trim();
    
    if (text === "") {
        alert("Task cannot be empty!");
        return;
    }
    if (tasks.length >= 15) {
        alert("Maximum 15 tasks allowed.");
        return;
    }

    tasks.push({ text: text, completed: false });
    taskInput.value = '';
    updateUI();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    updateUI();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    updateUI();
}

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

// Initial load
updateUI();