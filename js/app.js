document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("todo-input");
    const addBtn = document.getElementById("add-btn");
    const list = document.getElementById("todo-list");

    function addTodo() {
        const text = input.value.trim();
        if (!text) return;
        const li = document.createElement("li");
        li.textContent = text;
        list.appendChild(li);
        input.value = "";
    }

    addBtn.addEventListener("click", addTodo);
    input.addEventListener("keypress", (e) => { if (e.key === "Enter") addTodo(); });
});
