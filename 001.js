
const input = document.getElementById("todo-input");
const btn = document.getElementById("submit-button");
const root = document.getElementById("root");

const todos = []

function handleAddTodo() {
    const inputVal = input.value

    todos.push(inputVal)

    if (inputVal) {
        const template = `
        <li id="${inputVal}" style="color:black;margin-bottom:15px;">
            <span>
            ${inputVal}
            </span>
            <button onclick="deleteItem(this)">delete</button>
            <button onclick="edit(this)">edit</button>
        </li>
        `

        root.innerHTML += template
    }
}

function renderTodos() {
    const template = todos.map(item => {
        return `
        <li id="${item}" style="color:red">
            <span>
            ${item}
            </span>
            <button onclick="deleteItem(this)">delete</button>
            <button onclick="edit(this)">edit</button>
        </li>
        `
    })

    const temp = template.join("")

    root.innerHTML = temp
}


function deleteItem(clickedElement) {
    clickedElement.parentElement.remove()

}

function edit(clickedElement){
    clickedElement.parentElement.edit()
}


