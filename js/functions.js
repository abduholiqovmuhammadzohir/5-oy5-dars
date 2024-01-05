function validate(form,error) {
    if (!form.value) {
        error.style.display = 'block'
        return false
    }else{
        error.style.display = 'none'
    }

    if (!form.value.trim()) {
        error.style.display = 'block';
        error.innerHTML = "Probellardan iborat bo'lmasin"
        return false
    }else{
        error.style.display = 'none';
        error.innerHTML = 'Matin kiritilishi shart'
    }

    if (form.value.length <= 4) {
        error.style.display = 'block';
        error.innerHTML = "Belgilar soni kamida 5 ta bo'lishi kerak";
        return false
    }else{
        error.style.display = 'none';
        error.innerHTML = 'Matin kiritilishi shart'
    }

    return true
}

function saveDataLocalStroge(todo) {
    let data = [];
    if (localStorage.getItem('todos')) {
        data = JSON.parse(localStorage.getItem('todos'));
    }

    data.push(todo);
    localStorage.setItem('todos', JSON.stringify(data));
}

function getDataFromStorage() {
    let data = [];
    if (localStorage.getItem('todos')) {
        data = JSON.parse(localStorage.getItem('todos'))
    }
    return data;
}

function createTodo(todo) {
    let check = '';
    let styleLine = '';
    if (todo.status == 'active') {
        check = '';
        styleLine = 'text-decoration:none'
    }
    if (todo.status == 'inactive') {
        check = 'checked';
        styleLine = 'text-decoration:line-through'
    }
    
    return`
        <li data-item = "todo_${todo.id}" >
            <div class="check-name">
                <input type="checkbox" ${check}>
                <p style = '${styleLine}'>${todo.text}</p>
            </div>
            <div class="actions">
                <i class="fa-regular fa-pen-to-square"></i>
                <i data-id = "item_${todo.id}" id="btns" class="fa-regular fa-trash-can"></i>
            </div>
        </li>
    `;
}


export{
    validate,saveDataLocalStroge,getDataFromStorage,createTodo
}