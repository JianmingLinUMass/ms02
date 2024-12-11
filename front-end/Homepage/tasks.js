document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');
    const username = localStorage.getItem('storedUsername');

    if (!username) {
        console.error('No username found');
        return;
    }

    async function fetchTasks() {
        try {
            const response = await fetch(`/api/tasks/${username}`);
            if (!response.ok) throw new Error('Failed to fetch tasks');
            const tasks = await response.json();
            renderTasks(tasks);
        } catch (error) {
            console.error('Error:', error);
            showError('Failed to load tasks');
        }
    }

    function renderTasks(tasks) {
        taskList.innerHTML = tasks.map(task => `
            <li class="task-item ${task.status === 'Completed' ? 'completed' : ''}" data-id="${task.id}">
                <span class="task-content">${task.content}</span>
                <div class="task-actions">
                    ${task.status !== 'Completed' ? 
                        `<button class="complete-btn">Complete</button>` : 
                        ''}
                    <button class="delete-btn">Delete</button>
                </div>
            </li>
        `).join('');

        // Add event listeners to buttons
        attachEventListeners();
    }

    function attachEventListeners() {
        document.querySelectorAll('.complete-btn').forEach(btn => {
            btn.onclick = (e) => {
                const taskId = e.target.closest('.task-item').dataset.id;
                completeTask(taskId);
            };
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.onclick = (e) => {
                const taskId = e.target.closest('.task-item').dataset.id;
                deleteTask(taskId);
            };
        });
    }

    async function addTask(content) {
        try {
            const response = await fetch('/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, content })
            });
            if (!response.ok) throw new Error('Failed to add task');
            document.dispatchEvent(new CustomEvent('taskStatusChanged'));
            fetchTasks();
        } catch (error) {
            console.error('Error:', error);
            showError('Failed to add task');
        }
    }
    

    async function completeTask(taskId) {
        try {
            const response = await fetch(`/api/tasks/${taskId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'Completed' })
            });
            if (!response.ok) throw new Error('Failed to complete task');
            document.dispatchEvent(new CustomEvent('taskStatusChanged'));
            fetchTasks();
        } catch (error) {
            console.error('Error:', error);
            showError('Failed to complete task');
        }
    }

    async function deleteTask(taskId) {
        if (!confirm('Are you sure you want to delete this task?')) return;
        
        try {
            const response = await fetch(`/api/tasks/${taskId}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Failed to delete task');
            document.dispatchEvent(new CustomEvent('taskStatusChanged'));
            fetchTasks();
        } catch (error) {
            console.error('Error:', error);
            showError('Failed to delete task');
        }
    }

    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        taskList.prepend(errorDiv);
        setTimeout(() => errorDiv.remove(), 3000);
    }

    // Form submission handler
    taskForm.onsubmit = (e) => {
        e.preventDefault();
        const input = document.getElementById('task-input');
        const content = input.value.trim();
        if (content) {
            addTask(content);
            input.value = '';
        }
    };

    // Initial load
    fetchTasks();
});