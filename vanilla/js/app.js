/**
 * Shared Storage Utility
 * Handles persistence of todos to localStorage.
 */
const STORAGE_KEY = 'todo-app-data';

const storage = {
    getTodos: () => {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error reading from storage:', error);
            return [];
        }
    },

    saveTodos: (todos) => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
        } catch (error) {
            console.error('Error saving to storage:', error);
        }
    }
};

/**
 * Main Application Logic
 */

// State
let todos = [];
let filter = 'active'; // Default to active
let isSelectionMode = false;
let selectedIds = new Set();

// DOM Elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const filterButtons = document.querySelectorAll('.filter-btn');
const header = document.querySelector('header');

// Initialization
function init() {
    todos = storage.getTodos();
    injectSelectButton();
    render();
    setupEventListeners();
}

function injectSelectButton() {
    const btn = document.createElement('button');
    btn.id = 'select-toggle';
    btn.className = 'btn btn-sm';
    btn.textContent = 'Select';
    btn.style.float = 'right'; // Simple positioning
    btn.style.marginTop = '-40px'; // Align with title
    header.appendChild(btn);

    btn.addEventListener('click', toggleSelectionMode);
}

// Event Listeners
function setupEventListeners() {
    todoForm.addEventListener('submit', handleAddTodo);

    // Event delegation for list items
    todoList.addEventListener('click', (e) => {
        const target = e.target;
        const item = target.closest('.todo-item');
        if (!item) return;
        const id = item.dataset.id;

        if (target.matches('.todo-checkbox')) {
            if (isSelectionMode) {
                toggleSelect(id);
            } else {
                toggleTodo(id);
            }
        } else if (target.closest('.btn-delete')) {
            deleteTodo(id, item);
        } else if (target.closest('.btn-edit')) {
            startEdit(id);
        }
    });

    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filter = btn.dataset.filter;
            updateFilterUI();
            render();
        });
    });
}

// Logic
function handleAddTodo(e) {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (!text) return;

    const newTodo = {
        id: crypto.randomUUID(),
        text,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    todos.unshift(newTodo); // Add to top
    saveAndRender();
    todoInput.value = '';
}

function toggleTodo(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed, updatedAt: new Date().toISOString() };
        }
        return todo;
    });
    saveAndRender();
}

function deleteTodo(id, itemElement) {
    itemElement.classList.add('removing');
    itemElement.addEventListener('animationend', () => {
        todos = todos.filter(todo => todo.id !== id);
        saveAndRender();
    }, { once: true });
}

function startEdit(id) {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    const newText = prompt('Edit task:', todo.text);
    if (newText !== null && newText.trim() !== '') {
        todos = todos.map(t => {
            if (t.id === id) {
                return { ...t, text: newText.trim(), updatedAt: new Date().toISOString() };
            }
            return t;
        });
        saveAndRender();
    }
}

// Bulk Actions
function toggleSelectionMode() {
    isSelectionMode = !isSelectionMode;
    if (!isSelectionMode) {
        selectedIds.clear();
    }
    const btn = document.getElementById('select-toggle');
    btn.textContent = isSelectionMode ? 'Cancel' : 'Select';
    btn.classList.toggle('active', isSelectionMode);

    // Toggle form visibility
    todoForm.style.display = isSelectionMode ? 'none' : 'flex';

    render();
}

function toggleSelect(id) {
    if (selectedIds.has(id)) {
        selectedIds.delete(id);
    } else {
        selectedIds.add(id);
    }
    render();
}

function bulkDelete() {
    todos = todos.filter(t => !selectedIds.has(t.id));
    selectedIds.clear();
    toggleSelectionMode(); // Exit mode
    saveAndRender();
}

function bulkComplete() {
    todos = todos.map(t => {
        if (selectedIds.has(t.id)) return { ...t, completed: true };
        return t;
    });
    selectedIds.clear();
    toggleSelectionMode();
    saveAndRender();
}

function bulkActivate() {
    todos = todos.map(t => {
        if (selectedIds.has(t.id)) return { ...t, completed: false };
        return t;
    });
    selectedIds.clear();
    toggleSelectionMode();
    saveAndRender();
}

function saveAndRender() {
    storage.saveTodos(todos);
    render();
}

function updateFilterUI() {
    filterButtons.forEach(btn => {
        if (btn.dataset.filter === filter) {
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');
        } else {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        }
    });
}

function getFilteredTodos() {
    switch (filter) {
        case 'active': return todos.filter(t => !t.completed);
        case 'completed': return todos.filter(t => t.completed);
        default: return todos;
    }
}

// Rendering
function render() {
    const filteredTodos = getFilteredTodos();
    const appContainer = document.querySelector('.app-container');

    // Remove existing bulk toolbar if any
    const existingToolbar = document.querySelector('.bulk-actions');
    if (existingToolbar) existingToolbar.remove();

    if (filteredTodos.length === 0) {
        todoList.innerHTML = `<li class="empty-state">No ${filter === 'all' ? '' : filter} tasks found.</li>`;
    } else {
        todoList.innerHTML = filteredTodos.map(todo => {
            const isSelected = selectedIds.has(todo.id);
            return `
            <li class="todo-item ${todo.completed ? 'completed' : ''} ${isSelected ? 'selected' : ''}" data-id="${todo.id}">
              <input 
                type="checkbox" 
                class="todo-checkbox" 
                ${isSelectionMode ? (isSelected ? 'checked' : '') : (todo.completed ? 'checked' : '')}
                aria-label="${isSelectionMode ? 'Select' : 'Toggle'} ${todo.text}"
              >
              <span class="todo-text">${escapeHtml(todo.text)}</span>
              ${!isSelectionMode ? `
              <div class="todo-actions">
                <button class="btn-icon btn-edit" aria-label="Edit task">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                </button>
                <button class="btn-icon btn-delete" aria-label="Delete task">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                </button>
              </div>` : ''}
            </li>
          `}).join('');
    }

    // Render Bulk Toolbar if in mode
    if (isSelectionMode) {
        const toolbar = document.createElement('div');
        toolbar.className = 'bulk-actions';
        toolbar.innerHTML = `
            <span class="selected-count">${selectedIds.size} selected</span>
            <div class="bulk-buttons">
                <button id="btn-bulk-active" class="btn btn-sm">Mark Active</button>
                <button id="btn-bulk-complete" class="btn btn-sm">Mark Completed</button>
                <button id="btn-bulk-delete" class="btn btn-sm btn-danger">Delete</button>
            </div>
        `;
        appContainer.appendChild(toolbar);

        // Bind events
        document.getElementById('btn-bulk-active').addEventListener('click', bulkActivate);
        document.getElementById('btn-bulk-complete').addEventListener('click', bulkComplete);
        document.getElementById('btn-bulk-delete').addEventListener('click', bulkDelete);
    }
}

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Start app
document.addEventListener('DOMContentLoaded', init);
