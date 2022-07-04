function moveTank(roadMines) {
    let tankPosition = 0;
    let tankDamage = 0;

    for (let road in roadMines) {

        if (tankDamage < 2) {
            if (roadMines[road] !== true) {
                console.log(`Tанк переместился на ${++tankPosition}`);
            } else {
                ++tankDamage;
                if (tankDamage === 2) {
                    console.log('Танк уничтожен'); break;
                } else {
                    console.log('Танк повреждён');
                }
            }
        }
    }

}

// вызов функции
moveTank([false, true, false, false, false, false, false, false, false, false]);


// Задание 1

let n = -3;
let m = -10;
let count = 42;
let arr1 = [1, 2, 3];


let range = Math.abs(m - n);

for (let i = 0; i < count; ++i) {
    let numberInRange = Math.round(Math.random() * range);
    let min = Math.min(n, m);
    let randomNumber = min + numberInRange;
    arr1.push(randomNumber);
}


console.log(arr1);


// Решение с использованием цикла while

// let i = 0;
// while (i < count) {
//     let numberInRange = Math.round(Math.random() * range);
//     let min = Math.min(n, m);
//     let randomNumber = min + numberInRange;
//     arr1.push(randomNumber);
//     ++i;
// }
// console.log(arr1);

// Задание 2

let str = "Привет, мир!";
let newStr = "";
let strLenght = str.length -1;

while (strLenght > -1) {
    newStr += str[strLenght];
    --strLenght;
}

console.log(newStr);

// Задание 3

let roadMines = [false, false, false, false, false, false, false, false, false, false];
let tankPosition = 0;
let tankDamage = 0;

for (let road in roadMines) {

    if (tankDamage < 2) {
        if (roadMines[road] !== true) {
            console.log(`Tанк переместился на ${++tankPosition}`);
        } else {
            ++tankDamage;
            if (tankDamage === 2) {
                console.log(`Tанк переместился на ${++tankPosition}, танк уничтожен`); break;
            } else {
                console.log(`Tанк переместился на ${++tankPosition}, танк повреждён`);
            }
        }
    }
}

// Задание 4

let mountArr = [];
let dayArr = ["понедельник", "вторник", "среда", "четверг", "пятница", "суббота", "воскресенье"];
let firstMountDay = "вторник";
let firstMountDayIndex = dayArr.indexOf(firstMountDay);

for (let i4 = 1; i4 < 32; ++i4) {
    mountArr.push(i4);
}

for (let day in mountArr) {
    console.log(`${++day} января, ${dayArr[firstMountDayIndex]}`);
    ++firstMountDayIndex;
    if (firstMountDayIndex > dayArr.length - 1) {
        firstMountDayIndex = 0;
    }
}