// Задание 1

let password = '1234-';
let passwordLength = password.length;

if (password.length >= 4 && (password.includes('-') === true || password.includes('_') === true)) {
    console.log('Пароль надёжный');
} else {
    console.log('Пароль недостаточно надёжный');
}


// Задание 2

let name = 'аРсенИЙ';
let surname = 'РЯЗанОв';
let fullName = name + ' ' + surname;

let firstLetterName = name.substr(0, 1).toUpperCase();
let otherLetterName = name.substr(1).toLowerCase();
let firstLetterSurname = surname.substr(0, 1).toUpperCase();
let otherLetterSurname = surname.substr(1).toLowerCase();

let correctName = firstLetterName + otherLetterName;
let correctSurname = firstLetterSurname + otherLetterSurname;
let correctFullName = correctName + ' ' + correctSurname;

console.log(correctFullName);

fullName === correctFullName ? console.log('Имя осталось без изменений') : console.log('Имя было преобразовано');