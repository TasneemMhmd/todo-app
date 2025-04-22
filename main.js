var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var tasks = [];
var taskList = document.getElementById('task-list');
var newTaskInput = document.getElementById('new-task-input');
var addTaskButton = document.getElementById('add-task-btn');
document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
    renderTasks();
});
addTaskButton.addEventListener('click', addTask);
newTaskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(function (task) {
        var taskElement = document.createElement('div');
        taskElement.className = "flex items-center justify-between p-3 rounded-lg border task-item ".concat(task.completed ? "completed-task" : "normal-task");
        taskElement.innerHTML = "\n        <div class=\"flex space-x-3\">\n            <button class=\"delete-btn\" data-id=\"".concat(task.id, "\">\n            <i class=\"fas fa-trash\" style=\"font-size: 18px;\"></i>\n            </button>\n        </div>\n        <div class=\"flex flex-1 items-center justify-end space-x-3\">\n            <span class=\"flex-1 text-right ").concat(task.completed ? "completed-text" : "task-text", "\">\n            ").concat(task.text, "\n            </span>\n            <button class=\"toggle-btn\" data-id=\"").concat(task.id, "\">\n            ").concat(task.completed
            ? "<i class=\"fas fa-check-circle check-icon\" style=\"font-size: 20px;\"></i>"
            : "<i class=\"far fa-circle circle-icon\" style=\"font-size: 20px;\"></i>", "\n            </button>\n        </div>\n        ");
        taskList.appendChild(taskElement);
    });
    attachEventListeners();
}
function attachEventListeners() {
    document.querySelectorAll('.delete-btn').forEach(function (button) {
        button.addEventListener('click', function () {
            deleteTask(parseInt(button.dataset.id));
        });
    });
    document.querySelectorAll('.toggle-btn').forEach(function (button) {
        button.addEventListener('click', function () {
            toggleTask(parseInt(button.dataset.id));
        });
    });
}
function addTask() {
    var text = newTaskInput.value.trim();
    if (text) {
        var newTask = {
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
function toggleTask(id) {
    tasks = tasks.map(function (task) {
        return task.id === id ? __assign(__assign({}, task), { completed: !task.completed }) : task;
    });
    renderTasks();
    saveTasks();
}
function deleteTask(id) {
    tasks = tasks.filter(function (task) { return task.id !== id; });
    renderTasks();
    saveTasks();
}
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function loadTasks() {
    var storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
}
