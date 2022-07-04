function filterValidArr(originaldArr, inValidArr) {
    let validArr = [];

    for (let arrItem of originaldArr) {
        if (inValidArr.includes(arrItem) === false) {
            validArr.push(arrItem);
        }
    }

    return validArr;
}

// filterValidArr(['1@mail.ru', '2@mail.ru', '3@mail.ru', '4@mail.ru', '5@mail.ru'], ['1@mail.ru', '5@mail.ru']);

function calculate(totalPrice, itemsInCart, promocode = null) {
    if (promocode === 'ДАРИМ300') {
        if (totalPrice > 300) {
            totalPrice = totalPrice - 300;
        } else {
            totalPrice = 0;
            return totalPrice;
        }
    }

    if (itemsInCart >= 10) {
        let discount5 = totalPrice * 0.05;
        totalPrice = totalPrice - discount5;
    }

    if (totalPrice > 50000) {
        let discountFrom = totalPrice - 50000;
        let discount20 = 1 - discountFrom / 20;
        totalPrice = totalPrice - discount20;
    }

    if (promocode === 'СКИДКА15' && totalPrice >= 20000) {
        let discount15 = 1 - totalPrice / 15;
        totalPrice = totalPrice - discount15;
    }

    return totalPrice;
}


let a = 10;
let b = 1 - a / 10;
a = a - b;

console.log(b)