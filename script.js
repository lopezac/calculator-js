const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".btn");

buttons.forEach(btn => btn.addEventListener("click", (e) => {
    selectInputOperation(e.target.textContent)
}));

document.addEventListener("keydown", (e) => selectInputOperation(e.key));

function selectInputOperation(btn) {
    if (btn === "=") {
        doCalculation();
    } else if (btn === "Clear") {
        clearDisplay();
    } else if (btn === "Undo") {
        undoLastAction();
    } else if (isNum(btn) || isOperator(btn) || btn === ".") {
        if (isValidInput(btn)) addToDisplay(btn);
    }
}

function isValidInput(btn) {
    let calculation = display.textContent;
    let last = calculation[calculation.length - 1];
    let lastTwo = calculation[calculation.length - 2];
    if ((isOperator(last) && isOperator(lastTwo) && isOperator(btn)) ||
        (isOperator(last) && isMultiplyOperator(btn)) ||
        (isOperator(last) && btn === ".") ||
        (last === "." && isOperator(btn)) ||
        (lastCalcNum(calculation).includes(".") && btn === ".")
        ) {
        return false;
    }
    return true;
}

function lastCalcNum(calc) {
    let majorIdx = 0;
    for (operator of ["*", "/", "+", "-"]) {
        let lastIdx = calc.lastIndexOf(operator);
        majorIdx = (lastIdx > majorIdx) ? lastIdx : majorIdx;
    }
    return calc.slice(majorIdx + 1);
}

function doCalculation() {
    let calculation = formatCalculation();
    console.log(calculation);

    doOperatorsCalc(calculation, ["*", "/"]);
    doOperatorsCalc(calculation, ["+", "-"]);
    updateDisplay(calculation);
    
    return calculation;
}

function doOperatorsCalc(calc, operators) {
    let i = 1;
    while (i < calc.length) {
        calc[i] = doOperation(calc, operators, i);
        if (isDecimal(calc[i])) roundDecimal(calc, i);
        
        if (isNum(calc[i])) {
            calc.splice(i - 1, 1);
            calc.splice(i, 1);
        } else {
            i += 2;
        }
    }
    return calc;
}

function doOperation(calc, operators, i) {
    let operator = calc[i];
    let num1 = calc[i - 1];
    let num2 = calc[i + 1];
    
    if (operators.includes("*")) {
        if (operator === "*") {
            return multiply(num1, num2);
        } else if (operator === "/") {
            return divide(num1, num2);
        }
    } else if (operators.includes("+")) {
        if (operator === "+") {
            return add(num1, num2);
        } else if (operator === "-") {
            return subtract(num1, num2);
        }
    }
    return operator;
}

function formatCalculation() {
    let fCalc = display.textContent.split("");
    let i = 0;
    while (i < fCalc.length) {
        if (isNum(fCalc[i]) || fCalc[i] === ".") {
            joinDigits(fCalc, i);
            joinOperators(fCalc, i);
        }
        i += 1;
    }
    return fCalc;
}

function joinDigits(calc, i) {
    let nextOpIdx = getNextOperator(calc, i);
    let finalNum = calc.slice(i, nextOpIdx).join("");
    if (finalNum) calc.splice(i, finalNum.length, finalNum);
}

function joinOperators(calc, i) {
    if (isSumOperator(calc[i-1])) {
        if (!calc[i-2] || isOperator(calc[i-2])) {
            calc[i] = calc[i-1] + calc[i];
            calc.splice(i - 1, 1);
        }
    }
}

function getNextOperator(calc, numIndex) {
    for (let i = numIndex; i < calc.length; i++) {
        if (isOperator(calc[i])) return i;
    }
    return calc.length;
}

function roundDecimal(calc, numIdx) {
    let num = calc[numIdx].toString();
    let decimalLength = num.slice(num.indexOf(".")+1, num.length).length;
    if (decimalLength > 2) calc[numIdx] = calc[numIdx].toFixed(2);
}

function addToDisplay(btn) {
    display.textContent += btn;
}

function updateDisplay(text) {
    display.textContent = text;
}

function clearDisplay() {
    display.textContent = "";
}

function undoLastAction() {
    let dText = display.textContent;
    display.textContent = dText.slice(0, dText.length - 1) 
}

function isDecimal(number) {
    number.indexOf(".") !== -1;
}

function isNum(string) {
    return !isNaN(string);
}

function isOperator(string) {
    return ["*", "/", "+", "-"].includes(string);
}

function isDecimal(num) {
    return num.toString().indexOf("*") !== "-1";
}

function isSumOperator(string) {
    return ["+", "-"].includes(string);
}

function isMultiplyOperator(text) {
    return ["*", "/"].includes(text);
}

function add(num1, num2) {
    return Number(num1) + Number(num2);
}

function subtract(num1, num2) {
    return Number(num1) - Number(num2);
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}