import { validate, saveDataLocalStroge, getDataFromStorage, createTodo } from "./functions.js";

const todoHeader = document.getElementById('todo-header');
const input = document.querySelector('#input');
const button = document.querySelector('#button');
const error = document.querySelector('#error');
const todoList = document.querySelector('#todo-list');


button && button.addEventListener('click', function () {
    if (validate(input, error)) {
        const todo = {
            id: Date.now(),
            text: input.value,
            status: "active"
        };
        saveDataLocalStroge(todo);

        let todoItem = createTodo(todo);
        todoList.innerHTML += todoItem;

        input.value = '';

    } else {
        console.log("Validatiyadan o'tmadi");
    }
})

input && input.addEventListener('keyup', function (event) {
    if (event.keyCode == 13) {
        if (validate(input, error)) {
            const todo = {
                id: Date.now(),
                text: input.value,
                status: "active"
            };
            saveDataLocalStroge(todo);

            let todoItem = createTodo(todo);
            todoList.innerHTML += todoItem;

            input.value = '';

        } else {
            console.log("Validatiyadan o'tmadi");
        }
    }
})

function changeStatus(id,status){
    let data = getDataFromStorage();
    if (data.length) {
        data = data.map(todo => {
            if (todo.id == id) {
                todo.status = status
            }
            return todo;
        })
    }
    localStorage.setItem('todos', JSON.stringify(data));
}

document.addEventListener('DOMContentLoaded', function () {
    let data = getDataFromStorage();
    if (data.length) {
        data.forEach(item => {
            let todo = createTodo(item);
            todoList.innerHTML += todo;
        })
        todoHeader.innerHTML = `Todos (${data.length})`;
    }

    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    if (checkboxes.length) {
        checkboxes.forEach(item => {
            item.addEventListener('change', function (event) {
                let checkedId = this?.parentNode?.parentNode?.getAttribute('data-item').slice(5);
                if (checkedId) {
                    if (event.target.checked) {
                        this.nextSibling.nextSibling.style.textDecoration = 'line-through';
                        changeStatus(checkedId,'inactive')
                        console.log("salom");
                    } else {
                        this.nextSibling.nextSibling.style.textDecoration = 'none';
                        changeStatus(checkedId,'active')
                        console.log('xayr');
                    }
                } else {
                    console.log("Element topilmadi");
                }
            })
        })
    }

    const deleteButtons = document.querySelectorAll('#btns');
    if (deleteButtons.length) {
        deleteButtons.forEach(btn =>{
            btn.addEventListener('click', function () {
                const elId = this.getAttribute('data-id').slice(5);
                if (elId) {
                    let isDelete = confirm("Rostan ham o'chirmoqchimisiz?")
                    if (isDelete) {
                        data = data.filter(el => {
                            return el.id != elId
                        })
                        localStorage.setItem('todos',JSON.stringify(data));
                        window.location.reload();
                    }
                }
            })
        })
    }

});