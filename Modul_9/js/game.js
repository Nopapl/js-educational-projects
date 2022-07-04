(() => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');

    const restartButton = document.createElement('button');
    restartButton.classList.add('btn');
    restartButton.textContent = 'Сыграть ещё раз';

    const input = document.createElement('input');
    input.classList.add('input');
    input.type = 'number';
    input.placeholder = 'Кол-во карточек в строке';

    const startButton = document.createElement('button');
    startButton.classList.add('btn');
    startButton.textContent = 'Начать игру';

    const timer = document.createElement('div');
    timer.classList.add('timer');
    timer.innerHTML = 'Игра &#8249;&#8249;Пары&#8250;&#8250;';

    let fieldSize;
    let fieldCounter;
    let wrapperWidth;
    let winGame = 0;
    let lossGame = 0;

    function createCardNet(amountCard) { // Создание игрового поля
        let numbersArr = createNumbersArr(amountCard);
        amountCard = amountCard * amountCard;

        for (let i = 0; i < amountCard; i++) {
            const card = document.createElement('div');
            card.classList.add('card');
            card.id = i;
            card.textContent = numbersArr[i];
            wrapper.append(card)
        }
    }

    function createNumbersArr(amountNumbers) { // Создание массива чисел для игрового поля
        let numbersArr = [];
        amountNumbers = amountNumbers * amountNumbers / 2;

        for (let i = 0; i < amountNumbers; i++) {
            numbersArr.push(i + 1);
            numbersArr.push(i + 1);
        }

        function shuffle(array) { // Перемешивание массива чисел с помощью алгоритма алгоритма Фишера-Йетса
            var m = array.length, t, i;

            while (m) {
              i = Math.floor(Math.random() * m--);
          
              t = array[m];
              array[m] = array[i];
              array[i] = t;
            }
          
            return array;
          }

          shuffle(numbersArr);
        return numbersArr;
    }

    function compareCards(card1, card2) { // Сравнение карточек
        if (card1.textContent === card2.textContent && card1.id !== card2.id) {
            fieldCounter = fieldCounter - 2;

            setTimeout(() => {
                card1.classList.add('card-disabled');
                card2.classList.add('card-disabled');
            }, 2000);
            card1.classList.remove('active-card');
            card2.classList.remove('active-card');
            
            setTimeout(() => wrapper.classList.remove('wrapper-disabled'), 300);

            if (fieldCounter === 0) setTimeout(() => wrapper.classList.add('wrapper-end-game'), 1000);
        } else {
            setTimeout(() => {
                showCard(card1);
                showCard(card2);
            }, 2500);
            setTimeout(() => wrapper.classList.remove('wrapper-disabled'), 300);
        }
    }

    function showCard(card) { // Анимированное открытие/скрытие карты
        card.classList.toggle('card-show');
        setTimeout(() => card.classList.toggle('card-show-text'), 500);
        card.classList.toggle('active-card');
        setTimeout(() => card.classList.toggle('card-show'), 1000);
    }

    function startNewGame() { // Рестарт игры после выигрыша
        while (wrapper.firstChild) {
            wrapper.removeChild(wrapper.firstChild);
        }
        wrapper.append(input);
        wrapper.append(startButton);;
    }

    function startGame() { // Старт игры
        fieldSize = input.value;
        timerCount = 60;

        input.remove();
        startButton.remove();
        timer.textContent = `Оставшееся время: ${timerCount}`

        if (fieldSize <= 10 && fieldSize >=4 && fieldSize % 2 === 0) {
            fieldCounter = fieldSize * fieldSize;
            createCardNet(fieldSize);
            wrapperWidth = fieldCounter / fieldSize;
        } else {
            createCardNet(4);
            fieldCounter = 16;
            wrapperWidth = 4;
        }
        wrapperWidth = wrapperWidth * 110;
        wrapper.style.width = wrapperWidth + 'px';

        let timeout = setInterval(() => {
            timer.textContent = `Оставшееся время: ${timerCount = timerCount - 1}`
            console.log(timerCount);
            if (timerCount === 0) { 
                clearInterval(timeout);
                lossGame += 1;
                timer.textContent = 'Время вышло!';
                wrapper.classList.add('wrapper-end-game');
                timer.append(restartButton);
            } else if (fieldCounter === 0) {
                clearInterval(timeout);
                winGame += 1;
                timer.textContent = 'Вы выиграли!';
                wrapper.classList.add('wrapper-end-game');
                timer.append(restartButton);
            }
        }, 1000);        
    }

    restartButton.addEventListener('click', () => { // Перезапуск игры
        restartButton.remove();
        timer.textContent = `Выигрышей: ${winGame}, Проигрышей: ${lossGame}`;
        wrapper.classList.remove('wrapper-end-game');
        startNewGame();
    });

    document.addEventListener('DOMContentLoaded', () => {
        let clickCount = 0;
        let card1;
        let card2;

        document.body.append(wrapper);
        document.body.prepend(timer);
        wrapper.append(input);
        wrapper.append(startButton);

        startButton.addEventListener('click', startGame);

        wrapper.addEventListener('click', (e) => {
            if (e.target !== wrapper && e.target !== input && e.target !== startButton && e.target !== restartButton) {
                clickCount++;

                if (clickCount === 1) {
                    card1 = e.target;

                    showCard(card1);

                } else if (clickCount === 2) {
                    card2 = e.target;

                    showCard(card2);

                    wrapper.classList.add('wrapper-disabled');
                    clickCount = 0;
                    compareCards(card1, card2);
                }   
            }
                   
        })
    });
})();
