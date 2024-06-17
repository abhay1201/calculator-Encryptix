document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '';
    let isResultDisplayed = false;

    function clearDisplay() {
        currentInput = '';
        display.textContent = '0';
    }

    function updateDisplay(value) {
        if (isResultDisplayed) {
            currentInput = value;
            isResultDisplayed = false;
        } else {
            currentInput += value;
        }
        display.textContent = currentInput || '0';
    }

    function calculateExpression() {
        try {
            currentInput = currentInput.replace(/÷/g, '/').replace(/×/g, '*');
            const result = eval(currentInput);  // Use of eval for simplicity; caution in real-world applications
            display.textContent = result;
            currentInput = result.toString();
            isResultDisplayed = true;
        } catch (error) {
            display.textContent = 'Error';
            currentInput = '';
        }
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.classList.contains('number')) {
                updateDisplay(button.dataset.number);
            } else if (button.classList.contains('operator')) {
                updateDisplay(button.dataset.operator);
            } else if (button.classList.contains('clear')) {
                clearDisplay();
            } else if (button.classList.contains('equals')) {
                calculateExpression();
            } else if (button.classList.contains('dot')) {
                if (!currentInput.includes('.')) {
                    updateDisplay(button.dataset.dot);
                }
            }
        });
    });
});
