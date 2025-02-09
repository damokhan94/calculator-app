// Access DOM elements of the calculator //
const inputBox = document.getElementById('calculator-buttons');
const expressionDiv = document.getElementById('expression');
const resultDiv = document.getElementById('result');

// Define expression and result variable 
let expression = '';
let result = '';

// Define event handler for button clicks
function buttonClick(event) {
// Get values from clicked button
    const target = event.target;
    const action = target.dataset.action;
    const value = target.dataset.value;
//    console.log(target, action, value);
// Switch case to control the calculator
    switch (action) {
        case 'number':
            addValue(value);
            break;
        case 'clear':
            expression = '';
            result = '';
            break;
            case 'backspace':
                backspace();
                break;
            case 'addition':
            case 'subtraction':
            case 'multiplication':
            case 'division':
                if (expression === '' && result !== '') {
                    startFromResult(value);
                } else if (expression !== '' && !isLastCharOperator()) {
                    addValue(value);
                }
                break;
            case 'submit':
                submit();
                break;
            case 'negate':
                negate();
                break;
            case 'mod':
                percentage();
                break;
            case 'decimal':
                decimal(value);
                break;
    }

// Update display
    updateDisplay(expression, result);
}

inputBox.addEventListener('click', buttonClick);

function addValue(value) {
   if (value === '.') {
    const lastOperatorIndex = expression.search(/[+\-*/]/);
    const lastDecimalIndex = expression.lastIndexOf('.');
    const lastNumberIndex = Math.max(expression.lastIndexOf('+'), expression.lastIndexOf('-'), expression.lastIndexOf('*'), expression.lastIndexOf('/'));
    if( lastDecimalIndex < lastOperatorIndex || lastDecimalIndex < lastNumberIndex || lastDecimalIndex === -1) && (expressiona === '' || expression.slice(lastNumberIndex + 1).indexOf('-') === -1)  
    {
     expression += value;
    }
    }
}

function updateDisplay(expression, result) {
    expressionDiv.textContent = expression;
    resultDiv.textContent = result;
}

function clear() {
    expression = '';
    result = '';
    updateDisplay(expression, result);
}

function backspace() {
    expression = expression.slice(0, -1);
}

function isLastCharOperator() {
    return isNaN(parseInt(expression.slice(-1)));
}

function startFromResult(value) {
    expression += result + value;
}

function submit() {
    result = evaluateExpression();
    expression = '';  
}

function evaluateExpression() {
    const evalResult = eval(expression);
    // Checks if evalResult isNan or infinite. If it is return a space character
    return isNaN(evalResult) || !isFinite(evalResult) 
    ? ' ' 
    : evalResult < 1
    ? parseFloat(evalResult.toFixed(10))
    : parseFloat(evalResult.toFixed(2));
}

function negate() {
    // Negate the result if expression is empty and result is present
    if (expression === '' && result !== '') {
        result = -result;
    } else if (expression.startsWith('-') && expression !== '') {
        expression = '-' + expression;
    }
    else if (!expression.startsWith('-') && expression !== '') {
        expression = expression.slice(1);
    }
}

function percentage() {
// Evaluate the expression, else it will take the percentage of only the first number 
if (expression !== '') {
    result = evaluateExpression();
    expression = '';
    if (!isNaN(result) && isFinite(result)) {
        result /= 100;
    } else {
        result = '';
    }
} else if (result !== '') {
// If expression is empty but the result exists, divide by 100
    result = pargeFloat(result) / 100;
 }
}

function decimal() {
    if (!expression.endsWith('-') && !isNaN(expression.slice(-1))) {
        addValue(value);
    }
}