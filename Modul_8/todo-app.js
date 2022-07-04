(function() {
    function createAppTitle(title) {
        let appTitle = document.createElement('h2');
        appTitle.innerHTML  = title;
        return appTitle;
    }

    function createTodoItemForm() {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');

        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Введите название дела';
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary');
        button.textContent = 'Добавить дело';
        button.disabled = true;

        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        return {
            form,
            input,
            button,
        };
    }

    function createTodoList() {
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }

    function createTodoItem(name, itemId) {
        let item = document.createElement('li');
        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');

        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-item-center');
        item.id = itemId;
        item.textContent = name;

        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Готово';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Удалить';

        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);

        return {
            item,
            doneButton,
            deleteButton,
        }
    }

    function addEventToButtons(element, title) {
        element.doneButton.addEventListener('click', function() {
            let itemText = element.item.textContent.replace('ГотовоУдалить', '');

            element.item.classList.toggle('list-group-item-success');
            let localSrt = JSON.parse(localStorage.getItem(title));
            
            localSrt.map(function(e) {
                if (e.name === itemText && e.done === false) {
                    e.done = true;
                } 
                else if (e.name === itemText && e.done === true) {
                    e.done = false;
                }
            })
            localStorage.setItem(title, JSON.stringify(localSrt));
        });

        element.deleteButton.addEventListener('click', function() {
            let localSrt = JSON.parse(localStorage.getItem(title));
            if (confirm('Вы уверены?')) {
                let filterTodo = localSrt.filter(item => item.id != parseInt(this.parentNode.parentNode.id));
                localStorage.setItem(title, JSON.stringify(filterTodo));
                element.item.remove();
            }
        });
    }

    function addDefaultTodo(defaultTodo, todoList, title) {
        defaultTodo.forEach((arr) => {
            let todoItemDefault = createTodoItem(arr.name, arr.id);
            if (arr.done === true) {
                todoItemDefault.item.classList.add('list-group-item-success');
            }

            todoList.append(todoItemDefault.item);
            addEventToButtons(todoItemDefault, title);
        });
    }

    function getLastTodoId(defaultTodo) {
        let lastId;
        if (defaultTodo.length === 0) {
            return lastId = 1;
        }
        let lastDefaultItem = defaultTodo[defaultTodo.length - 1];
        return lastId = lastDefaultItem.id;
    }

    function createTodoApp(container, title = 'Список дел', defaultTodo = []) {
        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();

        if (JSON.parse(localStorage.getItem(title)) == undefined || JSON.parse(localStorage.getItem(title)).length === 0) {
            localStorage.setItem(title, JSON.stringify(defaultTodo));
        } else {
            defaultTodo = JSON.parse(localStorage.getItem(title));
        }

        let lastId  = getLastTodoId(defaultTodo);

        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);
        
        if (defaultTodo.length > 0) {
            addDefaultTodo(defaultTodo, todoList, title);
        }

        todoItemForm.form.addEventListener('submit', function(e) {
            defaultTodo = JSON.parse(localStorage.getItem(title));
            e.preventDefault();

            if (!todoItemForm.input.value) {
                return;
            }

           let todoItem = createTodoItem(todoItemForm.input.value, ++lastId);

           addEventToButtons(todoItem, title);
           todoList.append(todoItem.item);
           defaultTodo.push({id: lastId, name: todoItemForm.input.value, done:false});

           localStorage.setItem(title, JSON.stringify(defaultTodo));

           todoItemForm.input.value = '';
           todoItemForm.button.disabled = true;
        })

        todoItemForm.input.addEventListener('keyup', function() {
            if (todoItemForm.input.value !== '') {
                todoItemForm.button.disabled = false;
            } else {
                todoItemForm.button.disabled = true;
            }
        })
    }

    window.createTodoApp = createTodoApp;
})();
