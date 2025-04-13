let screen = document.getElementById("screen");
let uperScreen = document.getElementById("uperScreen");
let history = document.getElementById("history");
let operators = document.querySelectorAll(".opr-btn");
let btn = document.querySelectorAll(".btn");
let history_container = document.querySelector("#history-container");
let hisP = history_container.querySelector('#hisP');

let currentOperator;
let firstValue = "";
let shouldClear = false;

btn.forEach((btns) => {
  btns.addEventListener("click", (event) => {
    let screenVal = screen.value;
    let text = event.target.innerText;

    if (shouldClear) {
      screen.value = "";
      shouldClear = false;
    }

    if (screen.value === "0") {
      screen.value = "";
    }
    screen.value += text;
    // firstValue += text;
  });
});



function calculation(opr) {
    if (currentOperator && screen.value !== "" && shouldClear === false) {
        let secValue = screen.value;
        let result = calculate(firstValue, currentOperator, secValue);
  
        let history = document.createElement("div");
        history.classList.add("histories", "flex");
        history.innerHTML = `<p class="operationVal">${firstValue} ${currentOperator} ${secValue} = </p>
                      <p class="operationResult"> ${result} </p>`;
  
  
        hisP.style.display = 'none';              
        history_container.appendChild(history);
  
        currentOperator = opr;
        screen.value = result;
        uperScreen.textContent = `${result} ${currentOperator}`;
        firstValue = result;
  
        shouldClear = true;
      } else {
        firstValue = screen.value;
        uperScreen.textContent = `${firstValue} ${opr}`;
        currentOperator = opr;
        shouldClear = true;
      }
}

operators.forEach((op_btn) => {
  op_btn.addEventListener("click", (event) => {
    let opr = event.target.value;
    calculation(opr);
  });
});

function calculate(firstValue, currentOperator, secValue) {
  firstValue = parseFloat(firstValue);
  secValue = parseFloat(secValue);

  if (isNaN(firstValue) || isNaN(secValue)) return "Error";

  let result;

  switch (currentOperator) {
    case "+":
      result = firstValue + secValue;
      break;
    case "-":
      result = firstValue - secValue;
      break;
    case "*":
      result = firstValue * secValue;
      break;
    case "/":
      if (secValue === 0) {
        result = "Error"; // Prevent division by zero
      } else {
        result = firstValue / secValue;
      }
      break;
    case '^': 
      result = Math.pow(firstValue, secValue);
      break;
    default:
      result = "Invalid Operator";
  }

  return result;
}


function clearHistory(){
    history_container.innerHTML = '';
}


function clearScreen(){
    screen.value = '0';
    uperScreen.textContent = '';
    shouldClear = false;
    currentOperator = undefined;
    firstValue = '';
}

function showHis() {
    history.classList.add('hisShow');
}

function hideHis() {
    history.classList.remove('hisShow');
}