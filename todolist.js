// Simple To-Do List App Logic

document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    let tasks = [];

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = 'task-item';

            if (task.editing) {
                const input = document.createElement('input');
                input.type = 'text';
                input.value = task.text;
                input.className = 'edit-input';

                const saveBtn = document.createElement('button');
                saveBtn.textContent = 'Save';
                saveBtn.className = 'save-btn';
                saveBtn.onclick = function() {
                    saveTask(index, input.value);
                };

                const cancelBtn = document.createElement('button');
                cancelBtn.textContent = 'Cancel';
                cancelBtn.className = 'cancel-btn';
                cancelBtn.onclick = function() {
                    cancelEdit(index);
                };

                li.appendChild(input);
                li.appendChild(saveBtn);
                li.appendChild(cancelBtn);
            } else {
                const span = document.createElement('span');
                span.textContent = task.text;
                span.className = 'task-text';

                const actions = document.createElement('div');
                actions.className = 'task-actions';

                const editBtn = document.createElement('button');
                editBtn.textContent = 'Edit';
                editBtn.className = 'edit-btn';
                editBtn.onclick = function() {
                    editTask(index);
                };

                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.className = 'delete-btn';
                deleteBtn.onclick = function() {
                    deleteTask(index);
                };

                actions.appendChild(editBtn);
                actions.appendChild(deleteBtn);

                li.appendChild(span);
                li.appendChild(actions);
            }

            taskList.appendChild(li);
        });
    }

    function addTask() {
        const text = taskInput.value.trim();
        if (text) {
            tasks.push({ text, editing: false });
            taskInput.value = '';
            renderTasks();
        }
    }

    function editTask(index) {
        tasks = tasks.map((task, i) => ({ ...task, editing: i === index }));
        renderTasks();
    }

    function saveTask(index, newText) {
        if (newText.trim()) {
            tasks[index].text = newText.trim();
            tasks[index].editing = false;
            renderTasks();
        }
    }

    function cancelEdit(index) {
        tasks[index].editing = false;
        renderTasks();
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        renderTasks();
    }

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    renderTasks();
});
