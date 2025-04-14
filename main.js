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

let result = calculate("96,000");


function saveHistoryToLocal() {
  localStorage.setItem("calcHistory", history_container.innerHTML);
}

window.addEventListener('DOMContentLoaded', () => {
  let savedHistory = localStorage.getItem("calcHistory");
  if (savedHistory) {
    history_container.innerHTML = savedHistory;
  }
});


//
//
//Add the value to display
//
//

btn.forEach((btns) => {
  btns.addEventListener("click", (event) => {
    let screenVal = screen.value;
    let text = event.target.innerText;

    if (shouldClear) {
      screen.value = "";
      if (btns.value !== ".") {
        shouldClear = false;
      }
    }

    if (btns.value === ".") {
      if (shouldClear) {
        screen.value = "0";
        screen.value += btns.value;
        console.log("screen after adding dot : ", screen.value);
        shouldClear = false;
      } else if (!screen.value.includes(".")) {
        screen.value += btns.value;
        console.log("first dot input : ", screen.value);
      }
    } else {
      if (screen.value === "0") {
        screen.value = "";
      }
    }
    screen.value += text;
  });
});

//
//
// main function which do calculation
//
//

function calculation(opr) {
  if (currentOperator && screen.value !== "" && shouldClear === false) {
    let secValue = screen.value;
    let result = calculate(firstValue, currentOperator, secValue);

    result = result.toString();
    if (result.includes(".")) {
      result = Number(result);
      result = result.toFixed(3);
    }
    result = Number(result);

    let resultVal;
    resultVal = addQouma(
      result,
      resultVal,
      firstValue,
      currentOperator,
      secValue
    );

    currentOperator = opr;
    screen.value = resultVal;
    uperScreen.textContent = `${result} ${currentOperator}`;
    resultVal = result;
    // console.log("result val : ", resultVal);
    // console.log("first val : ", firstValue);
    // console.log("secValue : ", secValue);
    // console.log("result : ", result);

    firstValue = result;

    // console.log("firstValue after : ", firstValue);

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

//
//
//calculate's the value when user click any function
//
//

operators.forEach((op_btn) => {
  op_btn.addEventListener("click", (event) => {
    let opr = event.target.value;
    calculation(opr);
  });
});

//
//
//function which clears the history
//
//

function clearHistory() {
  history_container.innerHTML = "";
  localStorage.removeItem("calcHistory");
}

//
//
// Function which clear the the value in screen whec clicking on C button
//
//

function clearScreen() {
  screen.value = "0";
  uperScreen.textContent = "";
  shouldClear = false;
  currentOperator = undefined;
  firstValue = "";
}

//
//
// function which shows the history on small devices when clicking on the bars icon
//
//

function showHis() {
  history.classList.add("hisShow");
}

//
//
//function which hides the history on small devices when clicking on the x icon
//
//

function hideHis() {
  history.classList.remove("hisShow");
}
//
//
//function which create the history element and append it to the history_container's div
//
//

function createHistoryElem(firstValue, currentOperator, secValue, result) {
  let history = document.createElement("div");
  history.classList.add("histories", "flex");
  history.innerHTML = `<p class="operationVal">${firstValue} ${currentOperator} ${secValue} = </p>
                      <p class="operationResult"> ${result} </p>`;
  hisP.style.display = "none";
  
  history_container.prepend(history);

  saveHistoryToLocal();
}

//
//
// function which add Qouma accourding to the value like 1,000 or 10,000
//
//

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
  } else if (result > 999999) {
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
    resultVal = resultVal.slice(0, 3) + "," + resultVal.slice(3);
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

//
//
//del num
//
//

function decreasLast() {
  if (shouldClear) {
    screen.value = 0;
    shouldClear = false;
  } else {
    let screenVal = screen.value;

    if (screenVal) {
      if (screenVal !== "0") {
        screenVal = screenVal.slice(0, screenVal.length - 1);

        if (screenVal === "") {
          screenVal = "0";
        }

        screen.value = screenVal;
      }
    } else {
      screen.value = "0";
    }
  }
}

//
//
// function which perform the calculation according to the oprator or this is a alternate function to the eval() bcz that func is risky,
//
//

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

    case "%":
      result = (secValue / firstValue) * 100;
      break;
    default:
      result = "Invalid Operator";
  }

  return result;
}

// document.addEventListener("keypress", (key) => {
//   if (key.keyCode === 13) {
//     try {
//       let screenVal = screen.value;

//       let cal = calculate(firstValue, currentOperator, screenVal);

//       let resultVal;
//       resultVal = addQouma(
//         cal,
//         resultVal,
//         firstValue,
//         currentOperator,
//         screenVal
//       );
//       screen.value = resultVal;

//       resultVal = cal;
//       screen.value = cal;

//       firstValue = cal;
//     } catch (error) {
//       screen.value = error;
//       console.log(history_container.childNodes);
//     }
//   }
// });
