// Get references to all elements
const screen = document.querySelector('.screen');
const buttons = document.querySelectorAll('.button');
const clearButton = document.querySelector('.clear');
const equalButton = document.querySelector('.equal');
const decimalButton = document.querySelector('.decimal');
const plusMinusButton = document.querySelector('.plus-minus');
const percentButton = document.querySelector('.percent');

// Initialize the screen content
let currentInput = "";

// Function to update the screen with the current input
function updateScreen() {
    screen.value = currentInput;
}

// Add event listeners to the buttons
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const buttonValue = e.target.innerText;

        // Handle different button clicks
        if (buttonValue === 'C') {
            currentInput = ""; // Clear the screen
        } else if (buttonValue === '=') {
            try {
                currentInput = eval(currentInput).toString(); // Evaluate the expression
            } catch (error) {
                currentInput = "Error"; // If there's an error, display 'Error'
            }
        } else if (buttonValue === '+/-') {
            // Toggle positive/negative sign
            currentInput = (parseFloat(currentInput) * -1).toString();
        } else if (buttonValue === '%') {
            // Calculate percentage
            currentInput = (parseFloat(currentInput) / 100).toString();
        } else {
            currentInput += buttonValue; // Add the button value to the current input
        }

        updateScreen(); // Update the screen with the latest input
    });
});

// Event listener for the clear button (C)
clearButton.addEventListener('click', () => {
    currentInput = ""; // Clear the screen
    updateScreen();
});

// Event listener for the equal button (=)
equalButton.addEventListener('click', () => {
    try {
        currentInput = eval(currentInput).toString(); // Evaluate the expression
    } catch (error) {
        currentInput = "Error"; // If there's an error, display 'Error'
    }
    updateScreen();
});

// Event listener for the decimal button
decimalButton.addEventListener('click', () => {
    if (!currentInput.includes('.')) {
        currentInput += '.'; // Add a decimal point if not already present
    }
    updateScreen();
});

// Event listener for the percent button
percentButton.addEventListener('click', () => {
    currentInput = (parseFloat(currentInput) / 100).toString(); // Calculate percentage
    updateScreen();
});

// Event listener for the plus-minus button
plusMinusButton.addEventListener('click', () => {
    currentInput = (parseFloat(currentInput) * -1).toString(); // Toggle positive/negative sign
    updateScreen();
});
