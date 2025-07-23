const display = document.getElementById('display');
const buttons = document.querySelectorAll('.button');

let currentInput = '0';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

function updateDisplay() {
  display.textContent = currentInput;
}

function inputDigit(digit) {
  if (waitingForSecondOperand) {
    currentInput = digit;
    waitingForSecondOperand = false;
  } else {
    currentInput = currentInput === '0' ? digit : currentInput + digit;
  }
  updateDisplay();
}

function inputDecimal() {
  if (waitingForSecondOperand) {
    currentInput = '0.';
    waitingForSecondOperand = false;
  } else if (!currentInput.includes('.')) {
    currentInput += '.';
  }
  updateDisplay();
}

function clearCalculator() {
  currentInput = '0';
  firstOperand = null;
  operator = null;
  waitingForSecondOperand = false;
  updateDisplay();
}

const operations = {
  '/': (a, b) => a / b,
  '*': (a, b) => a * b,
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '=': (a, b) => b
};

function handleOperator(nextOperator) {
  const inputValue = parseFloat(currentInput);

  if (operator && waitingForSecondOperand) {
    operator = nextOperator;
    return;
  }

  if (firstOperand === null) {
    firstOperand = inputValue;
  } else if (operator) {
    if (operator === '/' && inputValue === 0) {
      currentInput = 'Error';
      updateDisplay();
      return;
    }
    const result = operations[operator](firstOperand, inputValue);
    currentInput = String(result);
    firstOperand = result;
  }

  waitingForSecondOperand = true;
  operator = nextOperator;
  updateDisplay();
}

buttons.forEach(button => {
  button.addEventListener('click', event => {
    const { id, textContent } = event.target;

    if (id === 'clear') {
      clearCalculator();
    } else if (id === 'decimal') {
