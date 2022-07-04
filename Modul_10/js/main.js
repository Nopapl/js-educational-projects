(() => {
  const container = document.querySelector('.container');
  const table = document.createElement('table');
  const tableBody = document.createElement('tbody');
  const addBtn = document.querySelector('.add-button');


  const students = [
    {
      name: 'Олег',
      surname: 'Пропусков',
      patronymic: 'Евгеньевич',
      dob: new Date('2000.12.22'),
      startStudy: '2020',
      faculty: 'Физика',
    },
    {
      name: 'Мария',
      surname: 'Малинова',
      patronymic: 'Борисовна',
      dob: new Date('1996.09.12'),
      startStudy: '2019',
      faculty: 'Математика',
    },
    {
      name: 'Евгений',
      surname: 'Захаров',
      patronymic: 'Сергеевич',
      dob: new Date('1992.02.05'),
      startStudy: '2020',
      faculty: 'Иностранные языки',
    },
    {
      name: 'Андрей',
      surname: 'Шатов',
      patronymic: 'Алексеевич',
      dob: new Date('1993.10.23'),
      startStudy: '2021',
      faculty: 'Информатика',
    },
    {
      name: 'Елизавета',
      surname: 'Жданова',
      patronymic: 'Денисовна',
      dob: new Date('1996.07.30'),
      startStudy: '2019',
      faculty: 'Биология',
    },
  ];

  function createTable() { // Создание таблицы студентов
    const tableHead = document.createElement('thead');
    const tableRow = document.createElement('tr');


    function createTableHeader () { // Создание шапки таблицы
      const tableHeaderContent = ['#', 'ФИО студента', 'Факультет', 'Дата рождения, возраст', 'Годы обучения'];
      tableHeaderContent.forEach((item) => {
        const tableHeaderItem = document.createElement('th');
        tableHeaderItem.innerHTML = item;
        tableHeaderItem.scope = 'col';
        tableHeaderItem.classList.add('col-header');
        tableHeaderItem.addEventListener('click', () => sortTable(event));
        tableRow.append(tableHeaderItem);
      })
    }

    createTableHeader();

    table.classList.add('table');
    tableHead.append(tableRow);
    table.append(tableHead);
    table.append(tableBody);
    container.prepend(table);
  };

  function createStunentsItem(studentObj, i) { // Вывод студента в таблицу
    const tableRow = document.createElement('tr');
    const studentIndex = document.createElement('th');
    const studentName = document.createElement('td');
    const studentFaculty = document.createElement('td');
    const studentDOB = document.createElement('td');
    const studyingTime = document.createElement('td');

    const now = new Date(); //Текущя дата
    const course = now.getFullYear() - studentObj.startStudy;

    function getStudentAge(dob) { // Вычисление возраста студента
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); //Текущя дата без времени
      const dobnow = new Date(today.getFullYear(), dob.getMonth(), dob.getDate()); //ДР в текущем году
      let age; //Возраст

      //Возраст = текущий год - год рождения
      age = today.getFullYear() - dob.getFullYear();
      //Если ДР в этом году ещё предстоит, то вычитаем из age один год
      if (today < dobnow) {
        age = age - 1;
      }

      switch (age%100) { // Склонение возраста
        case 11: case 12: case 13: case 14:return age + ' лет';
        default:
            switch (age%10){
                case 0:case 5:case 6:case 7:case 8:case 9:return age + ' лет';
                case 1: return age + ' год';
                case 2:case 3:case 4: return age + ' года';
            }
      }

      return age;
    }

    studentIndex.innerHTML = i + 1;
    studentIndex.scope = 'row';
    studentIndex.classList.add('index');

    studentName.innerHTML = studentObj.surname + ' ' + studentObj.name + ' ' + studentObj.patronymic;
    studentName.classList.add('name');

    studentFaculty.innerHTML = studentObj.faculty;
    studentFaculty.classList.add('faculty');

    studentDOB.innerHTML = `${studentObj.dob.getDate()}.${studentObj.dob.getMonth() + 1}.${studentObj.dob.getFullYear()}, ${getStudentAge(studentObj.dob)}`;
    studentDOB.classList.add('dob');
    
    studyingTime.innerHTML = `${studentObj.startStudy} - ${+studentObj.startStudy + 4} (${course > 0 ? course : course + 1} курс)`;
    studyingTime.classList.add('studyin-time');

    tableRow.append(studentIndex);
    tableRow.append(studentName);
    tableRow.append(studentFaculty);
    tableRow.append(studentDOB);
    tableRow.append(studyingTime);

    return tableRow;
  };

  function createStunentsList(studentsArr) { // Перебор массива со студентами
    studentsArr.forEach((student, i) => {
      tableBody.append(createStunentsItem(student, i));
    }); 
  };

  const sortTable = ({ target }) => { // Сортировка таблицы по заголовку колонки
    const order = (target.dataset.order = -(target.dataset.order || -1));
    const index = [...target.parentNode.cells].indexOf(target);
    const collator = new Intl.Collator(['en', 'ru'], { numeric: true });
    const comparator = (index, order) => (a, b) => order * collator.compare(
        a.children[index].innerHTML,
        b.children[index].innerHTML
    );
    
    for(const tBody of target.closest('table').tBodies)
        tBody.append(...[...tBody.rows].sort(comparator(index, order)));

    for(const cell of target.parentNode.cells)
        cell.classList.toggle('sorted', cell === target);
  };

  function valideteAddForm() {
    const addForm = document.querySelector('.add-form');
    const name = addForm.name;
    const surname = addForm.surname;
    const patronymic = addForm.patronymic;
    const dob = addForm.dob;
    const startStudy = addForm.startStudy;
    const faculty = addForm.faculty;
    const minDOB = new Date('01.01.1900');
    const minStartStudy = new Date('01.01.2000');
    const today = new Date();

    let errorInput = []; // ошибки ничего не введено

    function validateTextInput(...args) {
      args.forEach((item) => {
        if (item.value.trim() == '') {
          errorInput.push(item.name)
        }
      });
    }
    validateTextInput(name, surname, patronymic, faculty);

    if (dob.value.length === 0) {
      errorInput.push(dob.name);

    } else if (dob.valueAsDate < minDOB || dob.valueAsDate > today) {
      console.log(1) // добавить ошибку
    }

    if (startStudy.value.length === 0) {
      errorInput.push(startStudy.name);

    } else if (startStudy.valueAsDate < minStartStudy || startStudy.valueAsDate > today) {
      console.log(1) // добавить ошибку
    }
    
    if (errorInput.length !== 0) {
      const errorInputMsg = document.createElement('div');
      errorInputMsg.classList.add('error-input');
      errorInputMsg.textContent = 'Это поле обязательно для заполнения!';

      for (let i = 0; i < errorInput.length; i++) {
        const elem = document.getElementsByName(errorInput[i]);
        elem[0].parentNode.append(errorInputMsg)
        console.log(errorInput[i])
      }

      // errorInput.forEach((item) => {
      //   const elem = document.getElementsByName(item);
      //   // errorInputMsg.insertAdjacentElement('afterend', elem[0]);
      //   elem[0].parentNode.append(errorInputMsg)
      //   // console.log(elem[0].parentNode);
      // });
    }
  }

  addBtn.addEventListener('click', (event) => {
    event.preventDefault();
    valideteAddForm();
  })



  createStunentsList(students);

  createTable();

})();
