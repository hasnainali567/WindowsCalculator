let screen = document.getElementById("screen");
let uperScreen = document.getElementById("uperScreen");
let history = document.getElementById("history");
let operators = document.querySelectorAll(".opr-btn");
let btn = document.querySelectorAll(".btn");
let history_container = document.querySelector("#history-container");
let hisP = history_container.querySelector("#hisP");

let currentOperator;
let firstValue = "";
let shouldClear = false;

let result = calculate('96,000',);



//Add the value to display

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
  });
});


// main function which do calculation


function calculation(opr) {
  if (currentOperator && screen.value !== "" && shouldClear === false) {
    let secValue = screen.value;
    let result = calculate(firstValue, currentOperator, secValue);
    let resultVal;
    resultVal =  addQouma(result, resultVal, firstValue, currentOperator, secValue);

    

    currentOperator = opr;
    screen.value = resultVal;
    uperScreen.textContent = `${result} ${currentOperator}`;
    resultVal = result;
    // console.log("result val : ", resultVal);
    // console.log("first val : ", firstValue);
    // console.log("secValue : ", secValue);
    // console.log("result : ", result);

    firstValue = result;

    console.log("firstValue after : ", firstValue);

    shouldClear = true;
  } else {
    firstValue = screen.value;
    if (firstValue.includes(",")) {
      firstValue = firstValue.replaceAll(",", "");
    }
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

function clearHistory() {
  history_container.innerHTML = "";
}

function clearScreen() {
  screen.value = "0";
  uperScreen.textContent = "";
  shouldClear = false;
  currentOperator = undefined;
  firstValue = "";
}

function showHis() {
  history.classList.add("hisShow");
}

function hideHis() {
  history.classList.remove("hisShow");
}

function createHistoryElem(firstValue, currentOperator, secValue, result) {
  let history = document.createElement("div");
  history.classList.add("histories", "flex");
  history.innerHTML = `<p class="operationVal">${firstValue} ${currentOperator} ${secValue} = </p>
                      <p class="operationResult"> ${result} </p>`;
  hisP.style.display = "none";
  history_container.appendChild(history);
}



function addQouma(result, resultVal, firstValue, currentOperator, secValue) {
  if (result > 9999999) {
    //99,999,999
    resultVal = result.toString();
    resultVal =
      resultVal.slice(0, 2) +
      "," +
      resultVal.slice(2, 5) +
      "," +
      resultVal.slice(5);
    createHistoryElem(firstValue, currentOperator, secValue, resultVal);
  }
  else if (result > 999999) {
    //99,999,999
    resultVal = result.toString();
    resultVal =
      resultVal.slice(0, 1) +
      "," +
      resultVal.slice(1, 4) +
      "," +
      resultVal.slice(4);
    createHistoryElem(firstValue, currentOperator, secValue, resultVal);
  } else if (result > 99999) {
    resultVal = result.toString();
    resultVal =
      resultVal.slice(0, 3) + "," + resultVal.slice(3);
    createHistoryElem(firstValue, currentOperator, secValue, resultVal);
  } else if (result > 9999) {
    resultVal = result.toString();
    resultVal = resultVal.slice(0, 2) + "," + resultVal.slice(2);
    createHistoryElem(firstValue, currentOperator, secValue, resultVal);
  } else if (result > 999) {
    resultVal = result.toString();
    resultVal = resultVal.slice(0, 1) + "," + resultVal.slice(1);
    createHistoryElem(firstValue, currentOperator, secValue, resultVal);
  } else {
    resultVal = result.toString();
    createHistoryElem(firstValue, currentOperator, secValue, result);
  }

  return resultVal;
}

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
    case "^":
      result = Math.pow(firstValue, secValue);
      break;
    default:
      result = "Invalid Operator";
  }

  return result;
}
