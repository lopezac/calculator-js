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

    return calculation;
}

function addToDisplay(btn) {
    display.textContent += btn;
}

function formatCalculation() {
    let formattedCalc = display.textContent.split("");
    for (let i = 0; i < formattedCalc.length; i++) {
        if (isNum(formattedCalc[i]) && isNum(formattedCalc[i + 1])) {
            formattedCalc[i + 1] += formattedCalc[i];
            formattedCalc.splice(i, 1);
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