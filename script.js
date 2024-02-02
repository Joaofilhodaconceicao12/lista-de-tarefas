document.addEventListener("DOMContentLoaded", function () {
    // Carrega tarefas do armazenamento local ao iniciar
    loadTasks();
});

function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskList = document.getElementById("taskList");

    if (taskInput.value.trim() === "") {
        alert("Por favor, insira uma tarefa.");
        return;
    }

    var li = document.createElement("li");
    li.innerHTML = '<span onclick="toggleTask(this)">' + taskInput.value + '</span>' +
        '<button onclick="removeTask(this)">Remover</button>';
    taskList.appendChild(li);

    // Salva tarefa no armazenamento local
    saveTask(taskInput.value);

    taskInput.value = "";
}

function removeTask(button) {
    var li = button.parentNode;
    var taskList = li.parentNode;
    taskList.removeChild(li);

    // Remove tarefa do armazenamento local
    removeTaskFromStorage(li.querySelector('span').innerText);
}

function toggleTask(span) {
    span.classList.toggle("completed");

    // Atualiza o armazenamento local ao marcar ou desmarcar uma tarefa
    updateTaskInStorage(span.innerText);
}

function clearTasks() {
    var taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    // Limpa todas as tarefas do armazenamento local
    clearTasksFromStorage();
}

function saveTask(task) {
    var tasks = getTasksFromStorage();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTaskFromStorage(task) {
    var tasks = getTasksFromStorage();
    var index = tasks.indexOf(task);
    if (index !== -1) {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

function editTask(span) {
    var newText = prompt("Editar Tarefa:", span.innerText);
    if (newText !== null) {
        span.innerText = newText;
        updateTaskInStorage(newText);
    }
}

function updateTaskInStorage(task) {
    var tasks = getTasksFromStorage();
    var index = tasks.indexOf(task);
    if (index !== -1) {
        tasks[index] = task;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

function clearTasksFromStorage() {
    localStorage.removeItem("tasks");
}

function getTasksFromStorage() {
    var tasks = localStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : [];
}

function loadTasks() {
    var tasks = getTasksFromStorage();
    var taskList = document.getElementById("taskList");

    tasks.forEach(function (task) {
        var li = document.createElement("li");
        li.innerHTML = '<span onclick="toggleTask(this)">' + task + '</span>' +
            '<button onclick="removeTask(this)">Remover</button>';
        taskList.appendChild(li);
    });
}
