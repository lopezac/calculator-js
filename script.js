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
        let operator = calc[i];
        let num1 = calc[i - 1];
        let num2 = calc[i + 1];
        
        if (operators.includes("*")) {
            if (operator === "*") {
                calc[i] = multiply(num1, num2);
            } else if (operator === "/") {
                calc[i] = divide(num1, num2);
            }
        } else {
            if (operator === "+") {
                calc[i] = add(num1, num2);
            } else if (operator === "-") {
                calc[i] = subtract(num1, num2);
            }
        }
        
        if (operator !== calc[i]) {
            calc.splice(i - 1, 1);
            calc.splice(i, 1);
        } else {
            i += 2;
        }
    }
    return calc;
}

function addToDisplay(btn) {
    display.textContent += btn;
}

function updateDisplay(text) {
    display.textContent = text;
}

function formatCalculation() {
    let formattedCalc = display.textContent.split("");
    let i = 0;
    while (i < formattedCalc.length) {
        if (isNum(formattedCalc[i]) && isNum(formattedCalc[i + 1])) {
            formattedCalc[i + 1] = formattedCalc[i] + formattedCalc[i + 1];
            formattedCalc.splice(i, 1);
        } else {
            i += 1;
        }
    }
    return formattedCalc;
}

function isNum(string) {
    return !isNaN(string);
}

function add(num1, num2) {
    return Number(num1) + Number(num2);
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}