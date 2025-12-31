function add(num1, num2) {
    return num1 + num2;
}

function sub(num1, num2) {
    return num1 - num2;
}

function mul(num1, num2) {
    return num1 * num2;
}

function div(num1, num2) {
    if (num2 === 0) {
        alert("Infinity? Not today!");
        throw new Error("Division by zero is not allowed.");
    }
    return num1 / num2;
}

function operate(num1, op, num2) {
    switch (op) {
        case "+":
            return add(num1, num2);
        case "-":
            return sub(num1, num2);
        case "*":
            return mul(num1, num2);
        case "/":
            return div(num1, num2).toFixed(5);
        case "=":
            return num1;
    }

    return null;
}


const buttons = document.querySelectorAll(".btn");
const display = document.querySelector(".display_screen");
let first_number = "";
let second_number = "";
let operator = ""; 
let isFirstNum = true;
let isSecondNum = false;
let complete = false;
let result = 0;


buttons.forEach((button) => {
    button.addEventListener('click', () => {
        // reset !! 
        if (complete) {
            first_number = "";
            second_number = "";
            display.innerHTML = "";
            operator = "";
            complete = false;
            isFirstNum = true;
            isSecondNum = false;
            result = 0;
        }
        // check what is the content of clicked button
        if (button.innerHTML != "+" 
            && button.innerHTML != "-"
            && button.innerHTML != "/"
            && button.innerHTML != "*"
            && button.innerHTML != "="
            && button.innerHTML != "Clear"
        ) {
            if (isFirstNum) {
                first_number += button.innerHTML;
            } else {
                second_number += button.innerHTML;
            }
            display.innerHTML += button.innerHTML;
        }
        // handle Clear
        else if (button.innerHTML == "Clear") {
            first_number = "";
            second_number = "";
            display.innerHTML = "";
            operator = "";
            complete = false;
            isFirstNum = true;
            isSecondNum = false;
            result = 0;
        }
        // handle =
        else if (button.innerHTML == "=")
        {
            if (first_number === "" || second_number === "" || operator === "") {
                // ignore the calculation if not enough numbers and operator
                return;
            }
            result = operate(Number(first_number), operator, Number(second_number));
            // display the result
            display.innerHTML = "";
            display.innerHTML += String(result);
            complete = true;
        }
        // handle normal operatos
        else {
            if (isSecondNum) {
                first_number = String(operate(Number(first_number), operator, Number(second_number)));
                second_number = "";
                display.innerHTML = first_number;
                operator = button.innerHTML;
            }
            if (isFirstNum) {
                isFirstNum = false;
                isSecondNum = true;
                operator = button.innerHTML;
            }


            display.innerHTML += button.innerHTML; 
        }
    })
});