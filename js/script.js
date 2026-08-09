const expression = document.getElementById("expression");
const resultDisplay = document.getElementById("result");
const buttons = document.querySelectorAll(".btn");

let firstNumber = null;
let operator = null;
let justCalculated = false;
let waitingForSecondNumber = false;

buttons.forEach(function (button) {
    button.addEventListener("click", function () {

        // AC Block
        if (button.textContent === "AC") {

            expression.textContent = "0";
            resultDisplay.textContent = "0";

            firstNumber = null;
            operator = null;
            justCalculated = false;
            waitingForSecondNumber = false;

        } else if (button.textContent === "DEL") {

            if (resultDisplay.textContent.length > 1) {
                resultDisplay.textContent = resultDisplay.textContent.slice(0, -1);
            } else {
                resultDisplay.textContent = "0";
            }
        }

        // Operator Block
        else if (button.classList.contains("operator")) {

            // Percentage
            if (button.textContent === "%") {
                let number = Number(resultDisplay.textContent);
                let percentage = number / 100;

                expression.textContent = number + " %";
                resultDisplay.textContent = percentage;

                justCalculated = true;

                return;
            }

            if (waitingForSecondNumber) {
                operator = button.textContent;
                expression.textContent = firstNumber + " " + operator;
                return;
            }
            firstNumber = Number(resultDisplay.textContent);
            operator = button.textContent;

            expression.textContent = firstNumber + " " + operator;


            waitingForSecondNumber = true;
            justCalculated = false;
        }

        // Decimal Block
        else if (button.textContent === ".") {
            if (!resultDisplay.textContent.includes(".")) {
                if (resultDisplay.textContent === "0") {
                    resultDisplay.textContent = "0.";
                } else {
                    resultDisplay.textContent += ".";
                }
            }
        }

        // Equal Block
        else if (button.textContent === "=") {
            let secondNumber = Number(resultDisplay.textContent);
            let result;

            if (operator === "+") {
                result = firstNumber + secondNumber;
            }

            if (operator === "-") {
                result = firstNumber - secondNumber;
            }

            if (operator === "×") {
                result = firstNumber * secondNumber;
            }

            if (operator === "/") {
                if (secondNumber === 0) {
                    resultDisplay.textContent = "Error";
                    expression.textContent = "Error";
                    return;
                }

                result = firstNumber / secondNumber;
            }

            resultDisplay.textContent = result;
            expression.textContent =
                firstNumber + " " + operator + " " + secondNumber;
            justCalculated = true;
            waitingForSecondNumber = false;
        }

        // Number Block
        else {
            if (
                resultDisplay.textContent === "0" ||
                resultDisplay.textContent === "Error" ||
                justCalculated || waitingForSecondNumber
            ) {
                resultDisplay.textContent = button.textContent;
                justCalculated = false;
                waitingForSecondNumber = false;

            } else{

                resultDisplay.textContent += button.textContent;
            }
        }

    });

});

// Keyboard Function
document.addEventListener("keydown", function (event) {

    const key = event.key;

    if (key === "Enter") {
        event.preventDefault();

        buttons.forEach(function (button) {
            if (button.textContent === "=") {
                button.click();
            }
        });

        return;
    }

    if (key === "%") {
        event.preventDefault();

        buttons.forEach(function (button) {
            if (button.textContent === "%") {
                button.click();
            }
        });

        return;
    }

    if (key === "Backspace") {

        buttons.forEach(function (button) {
            if (button.textContent === "DEL") {
                button.click();
            }
        });

        return;
    }

    // Escape =
    if (key === "Escape") {

        buttons.forEach(function (button) {
            if (button.textContent === "AC") {
                button.click();
            }
        });

        return;
    }
    if (key === "*") {

        buttons.forEach(function (button) {

            if (button.textContent === "×") {
                button.click();
            }

        });

        return;
    }

    // Keyboard operators and decimal
    if (key === "+" || key === "-" || key === "/" || key === "." || key === "%") {

        buttons.forEach(function (button) {

            if (button.textContent === key) {
                button.click();
            }

        });

        return;
    }

    // Keyboard numbers
    if (key >= "0" && key <= "9") {

        buttons.forEach(function (button) {

            if (button.textContent === key) {
                button.click();
            }

        });

    }

});