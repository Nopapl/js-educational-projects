(() => {
  const container = document.querySelector('.container');
  const table = document.createElement('table');
  const tableBody = document.createElement('tbody');
  const addBtn = document.querySelector('.add-button');


  let students = [
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
    {
      name: 'Олег',
      surname: 'Пропусков',
      patronymic: 'Евгеньевич',
      dob: new Date('2000.12.22'),
      startStudy: '2020',
      faculty: 'Информатика',
    },
    {
      name: 'Елизавета',
      surname: 'Жданова',
      patronymic: 'Борисовна',
      dob: new Date('1996.07.30'),
      startStudy: '2019',
      faculty: 'Курника',
    },
  ];

  let filteredStudents = [];

  function createFilters() { // Add search filters
    const filtersForm = document.createElement('div');
    const filtersFormHeader = document.createElement('h4');
    const nameFilter = document.createElement('input');
    const facultyFilter = document.createElement('input');
    const startStudyFilter = document.createElement('input');
    const endStudyFilter = document.createElement('input');

    filtersForm.classList.add('filters');
    filtersFormHeader.classList.add('filters-header');
    nameFilter.classList.add('name-filter', 'form-control');
    facultyFilter.classList.add('faculty-filter', 'form-control');
    startStudyFilter.classList.add('start-study-filter', 'form-control');
    endStudyFilter.classList.add('end-study-filter', 'form-control');

    filtersFormHeader.innerHTML = 'Найти студента в таблице';
    nameFilter.placeholder = 'Имя, фамилия или отчество';
    facultyFilter.placeholder = 'Факультет';
    startStudyFilter.placeholder = 'Год начала обучения';
    endStudyFilter.placeholder = 'Год окончания обучения';    

    function addEventFilters(...args) { // Add a filter function for each input
      args.forEach((input) => {
        input.addEventListener('input', () => {

            filteredStudents = [];

          if (input.classList.contains('name-filter')) {
            if (filteredStudents.length > 0) {
              filtrationTable(filteredStudents, input, 'name', 'surname', 'patronymic')
            } else {
              filtrationTable(students, input, 'name', 'surname', 'patronymic')
            }
          } 

          if (input.classList.contains('faculty-filter')) {   
            if (filteredStudents.length > 0) {
              filtrationTable(filteredStudents, input, 'faculty')
            } else {
              filtrationTable(students, input, 'faculty')
            }  
          } 

          if (input.classList.contains('start-study-filter')) {  
            if (filteredStudents.length > 0) {
              filtrationTable(filteredStudents, input, 'startStudy')
            } else {
              filtrationTable(students, input, 'startStudy')
            }    
          } 

          if (input.classList.contains('end-study-filter')) { 
            if (filteredStudents.length > 0) {
              filtrationTable(filteredStudents, input, 'startStudy')
            } else {
              filtrationTable(students, input, 'startStudy')
            }  
          } 

          const tr = document.querySelectorAll('.table-body-row');

          tr.forEach((elem) => elem.parentNode.removeChild(elem));
          createStunentsList(filteredStudents);
        })
      })
    };



    function filtrationTable(studentsArr, filter, key1, key2, key3) { // Search for a student by the entered filter
      studentsArr.forEach((student) => {
        const fullKeys = student[key1] + student[key2] + student[key3];
        let fullFilterable = fullKeys.replace(/undefinedundefined/i, '').toLowerCase();
        const x = +fullKeys.replace(/undefinedundefined/i, '').toLowerCase()

        if (isNaN(x) === false) {
          fullFilterable = x + 4;
        }

        const fullFilterableString = String(fullFilterable);
        if (fullFilterableString.indexOf(filter.value.toLowerCase().trim()) !== -1 && filteredStudents.indexOf(student) < 0) {
          filteredStudents.push(student);
        }
      })
    }

    addEventFilters(nameFilter, facultyFilter, startStudyFilter, endStudyFilter);

    filtersForm.append(filtersFormHeader, nameFilter, facultyFilter, startStudyFilter, endStudyFilter);
    container.prepend(filtersForm);
  }

  function createTable() { // Creating table of students
    const tableHead = document.createElement('thead');
    const tableRow = document.createElement('tr');


    function createTableHeader () { // Creating header of table
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

  function createStunentsItem(studentObj, i) { // Displaying a student in a table
    const tableRow = document.createElement('tr');
    const studentIndex = document.createElement('th');
    const studentName = document.createElement('td');
    const studentFaculty = document.createElement('td');
    const studentDOB = document.createElement('td');
    const studyingTime = document.createElement('td');

    tableRow.classList.add('table-body-row')

    const now = new Date(); // Now date
    const course = now.getFullYear() - studentObj.startStudy;
    const dobDate = new Date(studentObj.dob);

    function getStudentAge(dob) { // Student age calculation
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Current date without time
      const dobnow = new Date(today.getFullYear(), dob.getMonth(), dob.getDate()); // Birthday this year
      let age;

      age = today.getFullYear() - dob.getFullYear(); // Student age
      
      if (today < dobnow) { // If the birthday is yet to come this year, then subtract one year from age
        age = age - 1;
      }

      switch (age%100) { // Declension of age
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

    studentDOB.innerHTML = `${dobDate.getDate()}.${dobDate.getMonth() + 1}.${dobDate.getFullYear()}, ${getStudentAge(dobDate)}`;
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

  function createStunentsList(studentsArr) { // Iterating over an array with students    
    studentsArr.forEach((student, i) => {
      tableBody.append(createStunentsItem(student, i));
    }); 
  };

  const sortTable = ({ target }) => { // Sort table by column heading
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

  function valideteAddForm() { // Form validation
    const addForm = document.querySelector('.add-form');
    const name = addForm.name;
    const surname = addForm.surname;
    const patronymic = addForm.patronymic;
    const dob = addForm.dob;
    const startStudy = addForm.startStudy;
    const faculty = addForm.faculty;
    const minAge = 16;
    const minDOB = new Date('01.01.1900');
    const minStartStudy = new Date('01.01.2019');
    const today = new Date();

    let errorInput = []; // "nothing entered" errors
    let validateIs = true;
    let newTableEl = {};

    function validateTextInput(...args) { // Checking text fields for emptiness
      args.forEach((item) => {
        if (item.value.trim() == '' || !isNaN(item.value.trim())) {
          errorInput.push(item.name)
        }
      });
    }

    validateTextInput(name, surname, patronymic, faculty);

    function createErrorMsg(text) { // Error message generation
        const errorText = document.createElement('span');
        const errorSelection = document.createElement('div');

        errorSelection.classList.add('error-selection');
        errorText.classList.add('error-text');
        errorText.textContent = text;

        errorSelection.append(errorText);

        setTimeout(() => {
          errorSelection.classList.add('error-selection--active')      
        }, 10);

        setTimeout(() => {
          errorText.classList.add('error-text--active')      
        }, 300);
        
        return errorSelection;
    }

    if (dob.value.length === 0) {
      errorInput.push(dob.name);

    } else if (today.getFullYear() - dob.valueAsDate.getFullYear() < minAge) {
        dob.parentNode.append(createErrorMsg('Возраст студента не может быть меньше 16!'));
        validateIs = false;
    } else if (dob.valueAsDate < minDOB) {
      dob.parentNode.append(createErrorMsg('Дата рождения не может быть меньше 01.01.1900!'));
      validateIs = false;
    } else if (dob.valueAsDate > today) {
      dob.parentNode.append(createErrorMsg('Дата рождения не может быть больше текущей!'));
        validateIs = false;
    }

    if (startStudy.value.length === 0) {
      errorInput.push(startStudy.name);

    } else if (startStudy.valueAsDate < minStartStudy) {
      startStudy.parentNode.append(createErrorMsg('Год начала обучения не может быть меньше 2019!'));
        validateIs = false;
    } else if (startStudy.valueAsDate > today) {
      startStudy.parentNode.append(createErrorMsg('Год начала обучения не может быть больше текущего!'));
        validateIs = false;
    }
    
    if (errorInput.length !== 0) {
      for (let i = 0; i < errorInput.length; i++) {
        const elem = document.getElementsByName(errorInput[i]);
        if (!isNaN(elem[0].value) && elem[0].name !== 'dob' && elem[0].name !== 'startStudy' && elem[0].value !== '') {
          elem[0].parentNode.append(createErrorMsg('В этом поле можно вводить только текст!'));
        } else {
          elem[0].parentNode.append(createErrorMsg('Это поле обязательно для заполнения!'));

        }
      }
      validateIs = false;
    } // Input validation

    if (validateIs) {
      return newTableEl = {
        name: name.value.trim(),
        surname: surname.value.trim(),
        patronymic: patronymic.value.trim(),
        dob: dob.valueAsDate,
        startStudy: startStudy.valueAsDate.getFullYear(),
        faculty: faculty.value.trim(),
      };
    } else {return false}
  }

  addBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const errors = document.querySelectorAll('.error-selection');
    if (errors.length > 0) {
      errors.forEach((el) => el.remove())
    }

    const newStudent = valideteAddForm()
    if (newStudent) {
      const inpust = document.querySelectorAll('.form-control');
      const index = document.querySelectorAll('.index');
      tableBody.append(createStunentsItem(newStudent, index.length));
      students.push(newStudent);
      localStorage.setItem('students', JSON.stringify(students));


      inpust.forEach((el) => el.value = '');
    }
    
    if (document.querySelectorAll('.table').length === 0) {
      document.querySelector('.no-students').remove();
      createTable();
      createFilters();
    }
  });

  if (JSON.parse(localStorage.getItem('students')) == undefined || JSON.parse(localStorage.getItem('students')).length === 0) {
    localStorage.setItem('students', JSON.stringify(students));
  } else {
    students = JSON.parse(localStorage.getItem('students'));
  }




  if (students.length === 0) {
    const noStudetns = document.createElement('div');
    noStudetns.innerHTML = 'Данные о студентах не найдены!';
    noStudetns.classList.add('no-students')
    container.prepend(noStudetns);
  } else {
    createStunentsList(students);
    createTable();
    createFilters();
  }

})();
