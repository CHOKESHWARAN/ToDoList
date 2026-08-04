/* ======================================================================
   To-Do List Application - JavaScript Logic
   Description: Frontend logic for SQLite-backed task storage.
   ========================================================================== */

const API_BASE = 'http://127.0.0.1:3000/api/tasks';

// --------------------------------------------------------------------------
// 1. DOM Elements Selection
// --------------------------------------------------------------------------
const todoForm = document.getElementById('todoForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');
const taskStats = document.getElementById('taskStats');

// --------------------------------------------------------------------------
// 2. Application State Initialization
// --------------------------------------------------------------------------
let tasks = [];

window.addEventListener('load', async () => {
    await fetchTasks();
    renderTasks();
});

// --------------------------------------------------------------------------
// 3. Server API Helper Functions
// --------------------------------------------------------------------------

async function fetchTasks() {
    try {
        const response = await fetch(API_BASE);
        if (!response.ok) throw new Error('Failed to load tasks.');
        tasks = await response.json();
    } catch (error) {
        console.error(error);
        tasks = [];
    }
}

async function createTask(text) {
    const response = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
    });
    if (!response.ok) {
        const errorText = await response.text().catch(() => response.statusText);
        throw new Error(`Failed to add task: ${errorText}`);
    }
    return response.json();
}

async function updateTask(id, updates) {
    const response = await fetch(`${API_BASE}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
    });
    if (!response.ok) throw new Error('Failed to update task.');
    return response.json();
}

async function removeTask(id) {
    const response = await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete task.');
}

// --------------------------------------------------------------------------
// 4. Core Features (CRUD Operations)
// --------------------------------------------------------------------------

todoForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Please enter a task before adding.');
        return;
    }

    try {
        const createdTask = await createTask(taskText);
        tasks.unshift(createdTask);
        renderTasks();
        taskInput.value = '';
        taskInput.focus();
    } catch (error) {
        console.error(error);
        alert('Unable to add task.');
    }
});

async function toggleTaskCompletion(id) {
    const task = tasks.find((taskItem) => taskItem.id === id);
    if (!task) return;

    try {
        const updatedTask = await updateTask(id, { completed: !task.completed });
        tasks = tasks.map((taskItem) => (taskItem.id === id ? updatedTask : taskItem));
        renderTasks();
    } catch (error) {
        console.error(error);
        alert('Unable to update task.');
    }
}

async function deleteTask(id) {
    try {
        await removeTask(id);
        tasks = tasks.filter((taskItem) => taskItem.id !== id);
        renderTasks();
    } catch (error) {
        console.error(error);
        alert('Unable to delete task.');
    }
}

async function editTask(id) {
    const task = tasks.find((taskItem) => taskItem.id === id);
    if (!task) return;

    const updatedText = prompt('Edit task', task.text);
    if (updatedText === null) return;

    const trimmedText = updatedText.trim();
    if (trimmedText === '') return;

    try {
        const updatedTask = await updateTask(id, { text: trimmedText });
        tasks = tasks.map((taskItem) => (taskItem.id === id ? updatedTask : taskItem));
        renderTasks();
    } catch (error) {
        console.error(error);
        alert('Unable to update task.');
    }
}

// --------------------------------------------------------------------------
// 5. DOM Rendering & UI Updates
// --------------------------------------------------------------------------

function renderTasks() {
    taskList.innerHTML = '';

    if (tasks.length === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
    }

    const completedCount = tasks.filter((task) => task.completed).length;
    taskStats.textContent = `${completedCount} of ${tasks.length} completed`;

    tasks.forEach((task) => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.setAttribute('data-id', task.id);

        li.innerHTML = `
            <div class="task-left">
                <input 
                    type="checkbox" 
                    class="task-checkbox" 
                    ${task.completed ? 'checked' : ''} 
                    aria-label="Mark task as complete"
                >
                <span class="task-text"></span>
            </div>
            <button class="edit-btn" title="Edit Task" aria-label="Edit Task">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                </svg>
            </button>
            <button class="delete-btn" title="Delete Task" aria-label="Delete Task">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
            </button>
        `;

        const taskTextSpan = li.querySelector('.task-text');
        taskTextSpan.textContent = task.text;

        const checkbox = li.querySelector('.task-checkbox');
        checkbox.addEventListener('change', () => {
            toggleTaskCompletion(task.id);
        });

        const editBtn = li.querySelector('.edit-btn');
        editBtn.addEventListener('click', () => {
            editTask(task.id);
        });

        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            deleteTask(task.id);
        });

        taskList.appendChild(li);
    });
}
