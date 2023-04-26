class Calculator {
    constructor($previousOperandTextEl, $currentOperandTextEl) {
        this.$previousOperandTextEl = $previousOperandTextEl;
        this.$currentOperandTextEl = $currentOperandTextEl;
        this.DECIMAL_PRECISION = 8;
        this.MAX_CHARACTER_LIMIT = 13;
        this.clear();
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.resultShown = false;
        this.errorShown = false;
    }

    delete() {
        if (this.resultShown) {
            this.clear();
            return;
        }
        if (this.errorShown) {
            return;
        }
        if (this.currentOperand.length === 1 || (this.currentOperand.length === 2 && this.currentOperand[0] === '-')) {
            this.currentOperand = '0'
            return;
        }
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (this.errorShown) {
            return;
        }
        if (this.resultShown) {
            this.clear();
        }
        if (this.currentOperand.length >= this.MAX_CHARACTER_LIMIT) {
            return;
        }
        if (number === '.' && this.currentOperand.includes('.')) {
            return;
        }

        if (number === '.' && (this.currentOperand === '' || this.currentOperand === '0')) {
            this.currentOperand = '0.';
            return;
        }

        if (this.currentOperand === '0') {
            this.currentOperand = '';
        }

        if ((this.currentOperand === '0' || this.currentOperand === '') && number === '00') {
            this.currentOperand = '0';
            return;
        }

        this.currentOperand += number;
    }

    changeSign() {
        if (this.errorShown) {
            return;
        }
        if (this.resultShown) {
            this.resultShown = false;
        }
        if (this.currentOperand === '0') {
            return;
        }
        this.currentOperand = `${-this.currentOperand}`;
    }

    chooseOperation(operation) {
        if (!this.currentOperand && this.previousOperand) {
            this.operation = operation;
            return;
        }

        if (this.currentOperand && this.previousOperand && this.operation) {
            this.compute();
        }

        if (this.errorShown) {
            return;
        }

        this.handleDecimalPoint();
        this.resultShown = false;
        this.operation = operation;
        this.currentOperand = '';
    }


    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) {
            return;
        }
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                if (current === 0) {
                    computation = undefined;
                } else {
                    computation = prev / current;
                }
                break;
            default:
                return;
        }
        if (computation === undefined) {
            this.clear();
            this.errorShown = true;
            return;
        }
        this.currentOperand = parseFloat(computation.toFixed(this.DECIMAL_PRECISION)).toString();
        if (this.currentOperand.length >= this.MAX_CHARACTER_LIMIT) {
            this.currentOperand = parseFloat(this.currentOperand).toExponential(this.DECIMAL_PRECISION).toString();
        }
        this.operation = undefined;
        this.previousOperand = '';
        this.resultShown = true;
    }

    getDisplayNumber(number) {
        if (this.errorShown) {
            return 'Error';
        }
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    handleDecimalPoint() {
        const dotIndex = this.currentOperand.indexOf('.');
        if (dotIndex !== -1) {
            if (this.currentOperand.length === dotIndex + 1) {
                // If there are no digits after the decimal point, remove it
                this.previousOperand = this.currentOperand.slice(0, -1);
            } else if (this.currentOperand.slice(dotIndex + 1).split('').every(char => char === '0')) {
                // If there are only zeros after the decimal point, remove them
                this.previousOperand = this.currentOperand.slice(0, dotIndex);
            } else {
                // Otherwise, keep the current operand as the previous operand
                this.previousOperand = this.currentOperand;
            }
        } else {
            // If there is no decimal point, set the previous operand to the current operand
            this.previousOperand = this.currentOperand;
        }
    }

    updateDisplay() {
        this.$currentOperandTextEl.innerText = this.getDisplayNumber(this.currentOperand);

        if (this.operation !== undefined) {
            this.$previousOperandTextEl.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.$previousOperandTextEl.innerText = '';
        }
    }


}

const $allButtons = document.querySelectorAll('button');
const $numberButtons = document.querySelectorAll('[data-number]')
const $operationButtons = document.querySelectorAll('[data-operation]')
const $signButton = document.querySelector('[data-sign]')
const $equalsButton = document.querySelector('[data-equals]')
const $deleteButton = document.querySelector('[data-delete]')
const $allClearButton = document.querySelector('[data-all-clear]')
const $previousOperandTextEl = document.querySelector('[data-previous-operand]')
const $currentOperandTextEl = document.querySelector('[data-current-operand]')

const calculator = new Calculator($previousOperandTextEl, $currentOperandTextEl)

$allButtons.forEach(button => {
    button.addEventListener('keydown', (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
        }
    })
});

$numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

$operationButtons.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
});

$equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

$signButton.addEventListener('click', () => {
    calculator.changeSign();
    calculator.updateDisplay();
});

$allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

$deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});

document.addEventListener('keydown', (event) => {
    if (event.key >= '0' && event.key <= '9' || event.key === '.') {
        calculator.appendNumber(event.key);
        calculator.updateDisplay();
    }

    if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
        calculator.chooseOperation(event.key === '/' ? '÷' : event.key);
        calculator.updateDisplay();
    }

    if (event.key === 'Enter' || event.key === '=') {
        calculator.compute();
        calculator.updateDisplay();
    }

    if (event.key === 'Backspace') {
        calculator.delete();
        calculator.updateDisplay();
    }

    if (event.key === 'Escape') {
        calculator.clear();
        calculator.updateDisplay();
    }

});