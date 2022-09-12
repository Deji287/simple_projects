// element selector
const inputEl = document.querySelector(".input");
const prevTextEl = document.querySelector(".result .value");
const currentTextEl = document.querySelector(".operation .value");

//variables
const POWER = "POWER(";
const FACTORIAL = "FACTORIAL";
const OPERATORS = ["+", "-", "*", "/"];
let ans = 0;
let data = {
  operation: [],
  formula: [],
};

// CALCULATOR BUTTONS
let calc_btns = [
  {
    name: "deg",
    symbol: "Deg",
    formula: false,
    type: "key",
  },
  {
    name: "rad",
    symbol: "Rad",
    formula: false,
    type: "key",
  },

  {
    name: "square-root",
    symbol: "√",
    formula: "Math.sqrt",
    type: "math_function",
  },
  {
    name: "square",
    symbol: "x²",
    formula: POWER,
    type: "math_function",
  },
  {
    name: "open-parenthesis",
    symbol: "(",
    formula: "(",
    type: "number",
  },
  {
    name: "close-parenthesis",
    symbol: ")",
    formula: ")",
    type: "number",
  },
  {
    name: "clear",
    symbol: "C",
    formula: false,
    type: "key",
  },
  {
    name: "delete",
    symbol: "⌫",
    formula: false,
    type: "key",
  },
  {
    name: "pi",
    symbol: "π",
    formula: "Math.PI",
    type: "number",
  },
  {
    name: "cos",
    symbol: "cos",
    formula: "trigo(Math.cos,",
    type: "trigo_function",
  },
  {
    name: "sin",
    symbol: "sin",
    formula: "trigo(Math.sin,",
    type: "trigo_function",
  },
  {
    name: "tan",
    symbol: "tan",
    formula: "trigo(Math.tan,",
    type: "trigo_function",
  },
  {
    name: "7",
    symbol: 7,
    formula: 7,
    type: "number",
  },
  {
    name: "8",
    symbol: 8,
    formula: 8,
    type: "number",
  },
  {
    name: "9",
    symbol: 9,
    formula: 9,
    type: "number",
  },
  {
    name: "division",
    symbol: "÷",
    formula: "/",
    type: "operator",
  },
  {
    name: "e",
    symbol: "e",
    formula: "Math.E",
    type: "number",
  },
  {
    name: "acos",
    symbol: "acos",
    formula: "inv_trigo(Math.acos,",
    type: "trigo_function",
  },
  {
    name: "asin",
    symbol: "asin",
    formula: "inv_trigo(Math.asin,",
    type: "trigo_function",
  },
  {
    name: "atan",
    symbol: "atan",
    formula: "inv_trigo(Math.atan,",
    type: "trigo_function",
  },
  {
    name: "4",
    symbol: 4,
    formula: 4,
    type: "number",
  },
  {
    name: "5",
    symbol: 5,
    formula: 5,
    type: "number",
  },
  {
    name: "6",
    symbol: 6,
    formula: 6,
    type: "number",
  },
  {
    name: "multiplication",
    symbol: "×",
    formula: "*",
    type: "operator",
  },
  {
    name: "factorial",
    symbol: "×!",
    formula: FACTORIAL,
    type: "math_function",
  },
  {
    name: "exp",
    symbol: "exp",
    formula: "Math.exp",
    type: "math_function",
  },
  {
    name: "ln",
    symbol: "ln",
    formula: "Math.log",
    type: "math_function",
  },
  {
    name: "log",
    symbol: "log",
    formula: "Math.log10",
    type: "math_function",
  },
  {
    name: "1",
    symbol: 1,
    formula: 1,
    type: "number",
  },
  {
    name: "2",
    symbol: 2,
    formula: 2,
    type: "number",
  },
  {
    name: "3",
    symbol: 3,
    formula: 3,
    type: "number",
  },
  {
    name: "subtraction",
    symbol: "–",
    formula: "-",
    type: "operator",
  },
  {
    name: "power",
    symbol: "x<span>y</span>",
    formula: POWER,
    type: "math_function",
  },
  {
    name: "ANS",
    symbol: "ANS",
    formula: "ans",
    type: "number",
  },
  {
    name: "percent",
    symbol: "%",
    formula: "/100",
    type: "number",
  },
  {
    name: "comma",
    symbol: ".",
    formula: ".",
    type: "number",
  },
  {
    name: "0",
    symbol: 0,
    formula: 0,
    type: "number",
  },
  {
    name: "equals",
    symbol: "=",
    formula: "=",
    type: "equals",
  },
  {
    name: "addition",
    symbol: "+",
    formula: "+",
    type: "operator",
  },
];

// create calculator button
const createCalcBtn = () => {
  const btns_per_row = 8;
  let added_btn = 0;

  calc_btns.forEach((btn) => {
    if (added_btn % btns_per_row === 0) {
      inputEl.innerHTML += `<div class="row"></div>`;
    }

    const row = document.querySelector(".row:last-child");
    row.innerHTML += `<button id="${btn.name}">
    ${btn.symbol}
    </button>`;

    added_btn++;
  });
};
createCalcBtn();

//Deg and Rad
let RADIAN = false;

const radBtn = document.getElementById("rad");
const degBtn = document.getElementById("deg");

degBtn.classList.add("active_angle");

const angleToggler = () => {
  radBtn.classList.toggle("active_angle");
  degBtn.classList.toggle("active_angle");
};

//Input element eventlistener
inputEl.addEventListener("click", (e) => {
  const targetBtn = e.target;

  calc_btns.forEach((btn) => {
    if (btn.name === targetBtn.id) calculator(btn);
  });
});

// calculator function
const calculator = (btn) => {
  switch (btn.type) {
    case "operator":
      {
        data.operation.push(btn.symbol);
        data.formula.push(btn.formula);
      }
      break;

    case "number":
      {
        data.operation.push(btn.symbol);
        data.formula.push(btn.formula);
      }
      break;

    case "key":
      {
        if (btn.name === "clear") {
          data.operation = [];
          data.formula = [];

          updateResult(0);
        } else if (btn.name === "delete") {
          data.operation.pop();
          data.formula.pop();
        } else if (btn.name === "rad") {
          RADIAN = true;
          angleToggler();
        } else if (btn.name === "deg") {
          RADIAN = false;
          angleToggler();
        }
      }
      break;

    case "trigo_function":
      {
        data.operation.push(btn.symbol + "(");
        data.formula.push(btn.formula);
      }
      break;

    case "math_function":
      {
        let symbol, formula;
        if (btn.name === "factorial") {
          symbol = "!";
          formula = btn.formula;

          data.operation.push(symbol);
          data.formula.push(formula);
        } else if (btn.name === "power") {
          symbol = "^(";
          formula = btn.formula;

          data.operation.push(symbol);
          data.formula.push(formula);
        } else if (btn.name === "square") {
          symbol = "^(";
          formula = btn.formula;

          data.operation.push(symbol);
          data.formula.push(formula);

          data.operation.push("2)");
          data.formula.push("2)");
        } else {
          symbol = btn.symbol + "(";
          formula = btn.formula + "(";

          data.operation.push(symbol);
          data.formula.push(formula);
        }
      }
      break;

    case "equals":
      {
        formulaStr = data.formula.join("");

        // to search for power and factorial index
        let POWER_SEARCH_RESULT = search(data.formula, POWER);
        let FACTORIAL_SEARCH_RESULT = search(data.formula, FACTORIAL);

        // get power base and replace with right format
        const BASES = powerBaseGetter(data.formula, POWER_SEARCH_RESULT);

        BASES.forEach((base) => {
          let toReplace = base + POWER;
          let replacement = "Math.pow(" + base + ",";

          formulaStr = formulaStr.replace(toReplace, replacement);
        });

        // get power base and replace with right format

        const NUMBERS = factorialNumberGetter(
          data.formula,
          FACTORIAL_SEARCH_RESULT
        );

        NUMBERS.forEach((factorial) => {
          formulaStr = formulaStr.replace(
            factorial.toReplace,
            factorial.replacement
          );
        });

        console.log(formulaStr);
        // calculate
        let result;
        try {
          result = eval(formulaStr);
        } catch (err) {
          if (err instanceof SyntaxError) {
            result = "Syntax Error";
            updateResult(result);
            return;
          }
        }
        //  store ans
        ans = result;
        data.operation = [result];
        data.formula = [result];
        updateResult(result);
        return;
      }
      break;
    default:
      return;
  }

  updateOutput(data.operation.join(""));
};
//POWER BASE GETTER
const powerBaseGetter = (formula, POWER_SEARCH_RESULT) => {
  let powerBases = []; //save all the bases

  POWER_SEARCH_RESULT.forEach((powerIndex) => {
    let base = []; // current base index
    let parenthesisCount = 0;
    let prevIndex = powerIndex - 1;

    while (prevIndex >= 0) {
      if (formula[prevIndex] == "(") parenthesisCount--;
      if (formula[prevIndex] == ")") parenthesisCount++;

      let isOperator = false;
      OPERATORS.forEach((operator) => {
        if (formula[prevIndex] == operator) isOperator = true;
      });
      let isPower = formula[prevIndex] == POWER;

      if ((isOperator && parenthesisCount == 0) || isPower) break;

      base.unshift(formula[prevIndex]);
      prevIndex--;
    }
    powerBases.push(base.join(""));
  });
  return powerBases;
};

//Factorial number getter
const factorialNumberGetter = (formula, FACTORIAL_SEARCH_RESULT) => {
  let numbers = [];
  let factorialSequence = 0;

  FACTORIAL_SEARCH_RESULT.forEach((factorialIndex) => {
    let number = []; // current factorial number
    let nextIndex = factorialIndex + 1;
    let nextInput = formula[nextIndex];

    if (nextInput == FACTORIAL) {
      factorialSequence += 1;
      return;
    }

    //get the index of first factorial f unction if factorial seqence exist
    let firstFactorialIndex = factorialIndex - factorialSequence;

    //get number before it
    let previousIndex = firstFactorialIndex - 1;
    let parenthesisCount = 0;

    while (previousIndex >= 0) {
      if (formula[previousIndex] == "(") parenthesisCount--;
      if (formula[previousIndex] == ")") parenthesisCount++;

      let isOperator = false;
      OPERATORS.forEach((operator) => {
        if (formula[previousIndex] == operator) isOperator = true;
      });

      if (isOperator && parenthesisCount == 0) break;

      number.unshift(formula[previousIndex]);
      previousIndex--;
    }
    let numberStr = number.join("");
    const factorial = "factorial(";
    const closeParenthesis = ")";
    let times = factorialSequence + 1;

    let toReplace = numberStr + FACTORIAL.repeat(times);
    let replacement =
      factorial.repeat(times) + numberStr + closeParenthesis.repeat(times);
    numbers.push({
      toReplace,
      replacement,
    });
    // reset factorialSequence
    factorialSequence = 0;
  });
  return numbers;
};

//search array i.e for factorial and power
const search = (array, keyword) => {
  let searchresult = [];

  array.forEach((elem, i) => {
    if (elem === keyword) searchresult.push(i);
  });

  return searchresult;
};
// update output
const updateOutput = (operation) => {
  currentTextEl.innerHTML = operation;
};

const updateResult = (result) => {
  prevTextEl.innerHTML = result;
};

// factorial
const factorial = (num) => {
  if (num % 1 != 0) return gamma(num + 1);
  if (num === 0 || num === 1) return 1;

  let result = 1;
  for (i = 1; i <= num; i++) {
    if (result === Infinity) {
      return Infinity;
    }
    result *= i;
  }
  return result;
};

// GAMMA function for factorial of numbers less than 1
function gamma(n) {
  // accurate to about 15 decimal places
  //some magic constants
  var g = 7, // g represents the precision desired, p is the values of p[i] to plug into Lanczos' formula
    p = [
      0.99999999999980993, 676.5203681218851, -1259.1392167224028,
      771.32342877765313, -176.61502916214059, 12.507343278686905,
      -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7,
    ];
  if (n < 0.5) {
    return Math.PI / Math.sin(n * Math.PI) / gamma(1 - n);
  } else {
    n--;
    var x = p[0];
    for (var i = 1; i < g + 2; i++) {
      x += p[i] / (n + i);
    }
    var t = n + g + 0.5;
    return Math.sqrt(2 * Math.PI) * Math.pow(t, n + 0.5) * Math.exp(-t) * x;
  }
}

// trigometry function
const trigo = (callback, angle) => {
  if (!RADIAN) {
    angle = (angle * Math.PI) / 180;
  }
  return callback(angle);
};

const inv_trigo = (callback, value) => {
  let angle = callback(value);

  if (!RADIAN) {
    angle = (angle * 180) / Math.PI;
  }
  return angle;
};
