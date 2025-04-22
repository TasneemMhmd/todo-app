interface Task {
    id: number;
    text: string;
    completed: boolean;
}

let tasks: Task[] = [];

const taskList = document.getElementById('task-list') as HTMLElement;
const newTaskInput = document.getElementById('new-task-input') as HTMLInputElement;
const addTaskButton = document.getElementById('add-task-btn') as HTMLButtonElement;

document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    renderTasks();
});

addTaskButton.addEventListener('click', addTask);

newTaskInput.addEventListener('keypress', (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

function renderTasks(): void {
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = `flex items-center justify-between p-3 rounded-lg border task-item ${task.completed ? "completed-task" : "normal-task"}`;

        taskElement.innerHTML = `
        <div class="flex space-x-3">
            <button class="delete-btn" data-id="${task.id}">
            <i class="fas fa-trash" style="font-size: 18px;"></i>
            </button>
        </div>
        <div class="flex flex-1 items-center justify-end space-x-3">
            <span class="flex-1 text-right ${task.completed ? "completed-text" : "task-text"}">
            ${task.text}
            </span>
            <button class="toggle-btn" data-id="${task.id}">
            ${task.completed
                ? `<i class="fas fa-check-circle check-icon" style="font-size: 20px;"></i>`
                : `<i class="far fa-circle circle-icon" style="font-size: 20px;"></i>`
            }
            </button>
        </div>
        `;

        taskList.appendChild(taskElement);
    });

    attachEventListeners();
}

function attachEventListeners(): void {
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', () => {
            deleteTask(parseInt((button as HTMLButtonElement).dataset.id));
        });
    });

    document.querySelectorAll('.toggle-btn').forEach(button => {
        button.addEventListener('click', () => {
            toggleTask(parseInt((button as HTMLButtonElement).dataset.id));
        });
    });
}

function addTask(): void {
    const text = newTaskInput.value.trim();

    if (text) {
        const newTask: Task = {
            id: Date.now(),
            text: text,
            completed: false
        };

        tasks.push(newTask);
        newTaskInput.value = '';
        renderTasks();
        saveTasks();
    }
}

function toggleTask(id: number): void {
    tasks = tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    renderTasks();
    saveTasks();
}

function deleteTask(id: number): void {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
    saveTasks();
}

function saveTasks(): void {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks(): void {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks) as Task[];
    }
}
