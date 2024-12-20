document.getElementById('logout').addEventListener('click', function(event) {
    event.preventDefault();
    window.location.href = 'index.html';
});

document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    const username = localStorage.getItem('username');
    const userTasks = JSON.parse(localStorage.getItem('tasks')) || {};

    const tasks = userTasks[username] || [];
    tasks.forEach(task => addTaskToList(task));

    addTaskButton.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTaskToList(taskText);
            if (!userTasks[username]) {
                userTasks[username] = [];
            }
            userTasks[username].push(taskText);
            localStorage.setItem('tasks', JSON.stringify(userTasks));
            taskInput.value = '';
        }
    });

    function addTaskToList(task) {
        const li = document.createElement('li');
        li.textContent = task;
        li.className = 'list-group-item d-flex justify-content-between align-items-center';

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'btn btn-danger btn-sm';
        deleteButton.onclick = function() {
            taskList.removeChild(li);
            const index = userTasks[username].indexOf(task);
            if (index > -1) {
                userTasks[username].splice(index, 1);
                localStorage.setItem('tasks', JSON.stringify(userTasks));
            }
        };

        li.appendChild(deleteButton);
        taskList.appendChild(li);
    }
});