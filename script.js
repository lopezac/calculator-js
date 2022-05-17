const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".btn");

buttons.forEach(btn => btn.addEventListener("click", (e) => {
    selectInputOperation(e.target.textContent)
}));

function selectInputOperation(btn) {
    if (btn === "=") {
        doCalculation();
    } else if (btn === "Clear") {
        console.log("Do clear operation");
    } else if (btn === "Undo") {
        console.log("Do undo operation");
    } else {
        addToDisplay(btn);
    }
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
        // if (isDecimal(calc[i])) {
        //     let decimalLength = calc[i].toString().slice(calc[i].indexOf(".") + 1, calc.length).length;
        //     if (decimalLength > 2) calc[i] = calc[i].toFixed(2);
        // }

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

function addToDisplay(btn) {
    display.textContent += btn;
}

function updateDisplay(text) {
    display.textContent = text;
}

function formatCalculation() {
    let fCalc = display.textContent.split("");
    let i = 0;
    while (i < fCalc.length) {
        if (isNum(fCalc[i])) {
            
            if (isNum(fCalc[i + 1])) {
                // let nextOperator = getNextOperator(fCalc, i);
                if(fCalc[i + 1] === "0") {
                    fCalc[i + 1] = fCalc[i].toString() + fCalc[i + 1].toString();
                } else {
                    fCalc[i + 1] = fCalc[i] + fCalc[i + 1];
                }
                fCalc.splice(i, 1);
                continue;
            }

            if (isSumOperator(fCalc[i - 1]) && 
            ((fCalc[i - 2] === undefined) || isOperator(fCalc[i - 2]))) {
                fCalc[i] = fCalc[i - 1] + fCalc[i];
                fCalc.splice(i - 1, 1);
            } else {
                i += 1;
            }
        } else {
            i += 1;
        }

    }
    return fCalc;
}

function getNextOperator(calc, numIndex) {
    for (let i = numIndex; i < calc.length; i++) {
        if (isOperator(calc[i])) return i;
    }
}

function isNum(string) {
    return !isNaN(string);
}

function isOperator(string) {
    return ["*", "/", "+", "-"].includes(string);
}

function isDecimal(num) {
    return num.indexOf("*") !== "-1";
}

function isSumOperator(string) {
    return ["+", "-"].includes(string);
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