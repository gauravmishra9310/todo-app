// script.js

const apiUrl = 'http://localhost:5000/todos';

async function fetchTodos() {
    const response = await fetch(apiUrl);
    const todos = await response.json();

    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';

    todos.forEach(todo => {
        const li = document.createElement('li');

        li.innerHTML = `
            ${todo.task}
            <button class="delete-btn" onclick="deleteTodo(${todo.id})">
                Delete
            </button>
        `;

        todoList.appendChild(li);
    });
}

async function addTodo() {
    const input = document.getElementById('todoInput');

    if(input.value === ''){
        alert('Enter task');
        return;
    }

    await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            task: input.value
        })
    });

    input.value = '';
    fetchTodos();
}

async function deleteTodo(id) {
    await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    });

    fetchTodos();
}

fetchTodos();