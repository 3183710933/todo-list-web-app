document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("todo-input");
    const addBtn = document.getElementById("add-btn");
    const list = document.getElementById("todo-list");

    let todos = [];

    function renderTodos() {
        list.innerHTML = "";
        todos.forEach((todo, index) => {
            const li = document.createElement("li");
            li.className = todo.completed ? "completed" : "";
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = todo.completed;
            checkbox.addEventListener("change", () => toggleComplete(index));
            const span = document.createElement("span");
            span.textContent = todo.text;
            li.appendChild(checkbox);
            li.appendChild(span);
            list.appendChild(li);
        });
    }

    function addTodo() {
        const text = input.value.trim();
        if (!text) return;
        todos.push({ text, completed: false });
        input.value = "";
        renderTodos();
    }

    function toggleComplete(index) {
        todos[index].completed = !todos[index].completed;
        renderTodos();
    }

    addBtn.addEventListener("click", addTodo);
    input.addEventListener("keypress", (e) => { if (e.key === "Enter") addTodo(); });
});
