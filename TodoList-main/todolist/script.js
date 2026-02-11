let TodolistItemContainer = document.getElementById("todoItemsContainer");
let AddBtn = document.getElementById("addTodoButton");
let saveBtn = document.getElementById('saveTodoButton');

function getTodoListFromLocalstorage() {
    let stringifiedList = localStorage.getItem("chesanu");
    let ParsedTodoList = JSON.parse(stringifiedList)
    if (ParsedTodoList === null) {
        return [];
    } else {
        return ParsedTodoList;
    }
}
let todoList = getTodoListFromLocalstorage();

let TodoListLength = todoList.length;
let uniqueId = TodoListLength;

function changeTodoStatus(checkboxId, labelId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle('checked');
}

function deleteTheList(listID) {
    let ListElement = document.getElementById(listID);
    TodolistItemContainer.removeChild(ListElement);
}

function CreateAndAppendList(todo) {

    let listID = "TodoId" + todo.id;
    let checkboxId = "checkboxId" + todo.id;
    let labelId = "labelId" + todo.id;
    console.log()

    //TodoItem
    let list = document.createElement("li");
    list.classList.add('todo-item-container', 'd-flex', 'flex-row')
    list.id = listID;
    TodolistItemContainer.appendChild(list);

    //checkbox
    let InputElement = document.createElement('input');
    InputElement.type = "checkbox";
    InputElement.id = checkboxId;
    InputElement.classList.add("checkbox-input");
    //On TodoStatus Change Function
    InputElement.onclick = function() {
        changeTodoStatus(checkboxId, labelId);
    }
    list.appendChild(InputElement);

    //label container
    let labelContainer = document.createElement('div');
    labelContainer.classList.add('label-container', 'd-flex', 'flex-row')
    list.appendChild(labelContainer);

    //label Element
    let labelElement = document.createElement('label');
    labelElement.setAttribute('for', checkboxId);
    labelElement.id = labelId;
    labelElement.classList.add('checkbox-label');
    labelElement.textContent = todo.text;

    labelContainer.appendChild(labelElement);

    //Delete container
    let DeleteContainer = document.createElement('div');
    DeleteContainer.classList.add('delete-icon-container');
    labelContainer.appendChild(DeleteContainer);

    //Delete Icon
    let DeleteIcon = document.createElement('i');
    DeleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    labelContainer.appendChild(DeleteIcon);
    //Delete ICon function
    DeleteIcon.onclick = function() {
        deleteTheList(listID);
    }
}

for (let todo of todoList) {
    CreateAndAppendList(todo);
}

function OnAddTodo() {
    let UserInputEle = document.getElementById("todoUserInput").value;
    console.log(UserInputEle);
    if (UserInputEle === '') {
        alert("Enter Valid Text");
        return;
    } else {
        uniqueId += 1;
        let newTodo = {
            text: UserInputEle,
            id: uniqueId
        }
        todoList.push(newTodo)
        CreateAndAppendList(newTodo);
        document.getElementById("todoUserInput").value = '';
        console.log(newTodo)

    }

}
AddBtn.onclick = function() {
    OnAddTodo();
}
saveBtn.onclick = function() {
    localStorage.setItem("chesanu", JSON.stringify(todoList));
}