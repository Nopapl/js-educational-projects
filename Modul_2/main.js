// Задание 1

let x1 = 8;
let y1 = 1;

let x2 = 5;
let y2 = 1;

let x3 = x2;
let y3 = y1;

let x4 = x1;
let y4 = y2;

let a1 = Math.abs(x1 - x3);
let b1 = Math.abs(y1 - y4);

let s = a1 * b1;

console.log('Площадь прямоугольника =', s);

// Задание 2

let a2 = 13.890123;
let b2 = 2.891564;
let n2 = 3;

let a2Normalized = Math.floor((a2 % 1) * Math.pow(10, n2));
let b2Normalized = Math.floor((b2 % 1) * Math.pow(10, n2));

console.log('a =', a2Normalized, 'b =', b2Normalized);

console.log('Число а больше числа b,', a2Normalized > b2Normalized);
console.log('Число а меньше числа b,', a2Normalized < b2Normalized);
console.log('Число а больше, либо равно числу b,', a2Normalized >= b2Normalized);
console.log('Число а меньше, либо равно числу b,', a2Normalized <= b2Normalized);
console.log('Число а равно числу b,', a2Normalized === b2Normalized);
console.log('Число а не равно числу b,', a2Normalized !== b2Normalized);

// Задание 3

let n3 = -3;
let m3 = -10;

let range = Math.abs(m3 - n3);
let numberInRange = Math.round(Math.random() * range);
let min = Math.min(n3, m3);
let randomNumber = min + numberInRange;

if (randomNumber % 2 === 0) {
    console.log(randomNumber + 1);
} else console.log(randomNumber)
