// Initialize tasks from localStorage or empty array
let tasks = JSON.parse(localStorage.getItem('proTasks')) || [];
let currentFilter = 'all';

const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const taskCountDisplay = document.getElementById('taskCount');

function render() {
    taskList.innerHTML = '';
    
    // Logic to filter tasks based on selection
    const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'active') return !task.completed; // Pending
        if (currentFilter === 'completed') return task.completed; // Done
        return true; // All
    });

    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        
        // Find the actual index in the main tasks array
        const mainIndex = tasks.indexOf(task);

        li.innerHTML = `
            <span class="task-text ${task.completed ? 'done' : ''}" onclick="toggleTask(${mainIndex})">
                ${task.text}
            </span>
            <div class="btn-group">
                <button class="del-btn" onclick="removeTask(${mainIndex})">✕</button>
            </div>
        `;
        taskList.appendChild(li);
    });

    // Update the count: shows total tasks out of 15
    taskCountDisplay.innerText = `${tasks.length} / 15 tasks`;
    
    // Save to localStorage
    localStorage.setItem('proTasks', JSON.stringify(tasks));
}

function addTask() {
    const val = taskInput.value.trim();
    if (val === "") {
        alert("Task cannot be empty!");
        return;
    }
    if (tasks.length >= 15) {
        alert("Goal limit reached (15 max)!");
        return;
    }

    tasks.push({ text: val, completed: false });
    taskInput.value = '';
    render();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    render();
}

function removeTask(index) {
    tasks.splice(index, 1);
    render();
}

// Filter Button Logic
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Remove active class from all buttons and add to the clicked one
        document.querySelector('.filter-btn.active').classList.remove('active');
        e.target.classList.add('active');
        
        currentFilter = e.target.dataset.filter;
        render();
    });
});

// Event Listeners
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

// Initial render
render();
