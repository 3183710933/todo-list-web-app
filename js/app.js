document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("todo-input");
    const addBtn = document.getElementById("add-btn");
    const list = document.getElementById("todo-list");
    const taskCount = document.getElementById("task-count");
    const clearBtn = document.getElementById("clear-completed");
    const filterBtns = document.querySelectorAll(".filter-btn");
    let todos = JSON.parse(localStorage.getItem(APP_CONFIG.storageKey)) || [];
    let currentFilter = "all";

    function saveTodos() { localStorage.setItem(APP_CONFIG.storageKey, JSON.stringify(todos)); }

    function renderTodos() {
        list.innerHTML = "";
        const filtered = todos.filter(t => {
            if (currentFilter === "active") return !t.completed;
            if (currentFilter === "completed") return t.completed;
            return true;
        });
        filtered.forEach((todo) => {
            const li = document.createElement("li");
            li.className = todo.completed ? "completed" : "";
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = todo.completed;
            checkbox.addEventListener("change", () => toggleComplete(todo.id));
            const span = document.createElement("span");
            span.textContent = todo.text;
            const delBtn = document.createElement("button");
            delBtn.textContent = "x";
            delBtn.addEventListener("click", () => deleteTodo(todo.id));
            li.appendChild(checkbox);
            li.appendChild(span);
            li.appendChild(delBtn);
            list.appendChild(li);
        });
        updateCount();
    }

    function updateCount() {
        const remaining = todos.filter(t => !t.completed).length;
        taskCount.textContent = `${remaining} task${remaining !== 1 ? "s" : ""} remaining`;
    }

    function addTodo() {
        const text = input.value.trim();
        if (!text) return;
        todos.push({ id: Date.now(), text, completed: false });
        input.value = "";
        saveTodos();
        renderTodos();
    }

    function toggleComplete(id) {
        const t = todos.find(x => x.id === id);
        if (t) { t.completed = !t.completed; saveTodos(); renderTodos(); }
    }

    function deleteTodo(id) {
        todos = todos.filter(t => t.id !== id);
        saveTodos();
        renderTodos();
    }

    function clearCompleted() {
        todos = todos.filter(t => !t.completed);
        saveTodos();
        renderTodos();
    }

    addBtn.addEventListener("click", addTodo);
    input.addEventListener("keypress", (e) => { if (e.key === "Enter") addTodo(); });
    clearBtn.addEventListener("click", clearCompleted);
    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentFilter = btn.dataset.filter;
            renderTodos();
        });
    });

    if (APP_CONFIG.enableDebugLogging) {
        console.log(`[${APP_CONFIG.environment}] Todo app loaded`);
    }

    renderTodos();
});
