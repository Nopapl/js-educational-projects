document.addEventListener("DOMContentLoaded", function() {
    let countDisplay = document.querySelector('.count-display');
    let input = document.querySelector('.input');
    let button = document.querySelector('.btn');
    let timer;

    function startTimer() {
        clearInterval(timer);

        let intervalValue = parseInt(input.value);
        countDisplay.textContent = intervalValue;

        timer = setInterval(() => {
            countDisplay.textContent = countDisplay.textContent - 1;

            if (countDisplay.textContent === '0') {
                clearInterval(timer);
            }
        }, 1000);
    }

    button.addEventListener('click', startTimer);
});