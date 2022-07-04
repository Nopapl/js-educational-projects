document.addEventListener("DOMContentLoaded", function() {
    let input = document.createElement('input');
    let h2 = document.createElement('h2');
    let timer;

    document.body.append(h2);
    document.body.append(input);

    input.oninput = function() {
        clearTimeout(timer);

        timer = setTimeout(() => {
            h2.textContent = input.value;
        }, 300);
    }
});