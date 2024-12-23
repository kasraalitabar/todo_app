const body = document.body;
const input = document.getElementById("todo-input");
const btn = document.getElementById("submit-button");
const root = document.getElementById("root");
const todosData = JSON.parse(localStorage.getItem("todos"))



const todos = todosData || [];
let editableitemId = null;

function handleAddTodo() {

    const inputVal = input.value;

    if (inputVal) {
        const newTodo = {
            id: todos.length > 0 ? todos.at(-1).id + 1 : 1,
            title: inputVal,
            time:getTimeInput(),
            isDone: false,
        }

        todos.push(newTodo);
        input.value = "";
        document.getElementById("timeInput")
        renderTodos()
    }
}

function renderTodos() {

    localStorage.setItem("todos", JSON.stringify(todos));

    const template = todos.map(item => {
        return `
        <li id="${item.id}" style="color:#f1edb3;">
            <input onchange="handleChangeCheckbox(this,${item.id})" type="checkbox" ${item.isDone ? "checked" : ""} />
            ${item.id === editableitemId ? `<input id="editInput" value="${item.title}" />` : `<span>${item.title}</span>`}
            <button style="background-color:red;border:red;padding:4px 8px;border-radius:5px;margin-bottom:5px" onclick="deleteItem(${item.id})">delete</button>
            ${item.id === editableitemId ? `<button  onclick="saveEdit()">save</button>` : `<button  onclick="editItem(${item.id}) ">edit</button>`}
            <span>${item.time}</span>
        </li>
        `
    })

    const temp = template.join("")

    root.innerHTML = temp
}

renderTodos()

function handleChangeCheckbox(element, id) {
    const foundIndex = todos.findIndex(item => item.id === id);

    todos[foundIndex].isDone = element.checked;
    renderTodos();
}

function saveEdit() {
    const editInputValue = document.getElementById("editInput").value;

    if (editInputValue) {
        const foundIndex = todos.findIndex(item => item.id === editableitemId);
        todos[foundIndex].title = editInputValue;
    }

    editableitemId = null;

    renderTodos();

}

function editItem(id) {
    editableitemId = id;
    renderTodos();
}


function deleteItem(itemId) {
    const foundIndex = todos.findIndex(item => item.id === itemId);

    todos.splice(foundIndex, 1);

    renderTodos();

}

function handleKeyPress(evt) {
    if (evt.key === "Enter") {
        handleAddTodo();
    }
}

input.addEventListener("keypress", handleKeyPress)


function switchTheme() {
    body.classList.toggle('dark')
}
function getTimeInput(){
    const timeInput = document.getElementById("timeInput");
    const timeval = timeInput.value;
    if(timeval ===""){
        const date = new Date();
        const result= date.getHours() + ":" + date.getMinutes();
        return result
    }else{
        return timeval
    }
}