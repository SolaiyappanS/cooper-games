//Initial References
const letterContainer_1 = document.getElementById("letter-container_1");
const letterContainer_2 = document.getElementById("letter-container_2");
const letterContainer_3 = document.getElementById("letter-container_3");
const hintContainer = document.getElementById("hint-container");
const userInputSection = document.getElementById("user-input-section");
const winContainer = document.getElementById("win-container");
const loseContainer = document.getElementById("lose-container");
const winButton = document.getElementById("win-button");
const loseButton = document.getElementById("lose-button");
const chosenWordContainer_1 = document.getElementById("chosenWord_1");
const chosenWordContainer_2 = document.getElementById("chosenWord_2");
const nextGameContainer = document.getElementById("next_game");
const heartContainer = document.getElementById("heart-container");
let wordsCount = 0;
var canInitialize = true;
var wordList = [];

document.addEventListener("keypress", (e) => {
  if (
    currentGame === "mortgage-quiz" &&
    canInitialize &&
    e.key.toLowerCase() === "enter"
  ) {
    if (wordsCount > 3) showGame("spin-the-wheel");
    else initializer("continue");
  }
});

//Options values for buttons
let options = {
  words: [
    {
      word: "Amortization",
      hint: "Process of gradual debt repayment, interest then principal",
    },
    {
      word: "Equity",
      hint: "The difference between your home's value and mortgage debt",
    },
    {
      word: "Contingency",
      hint: "Condition in a sales contract that must be fulfilled first",
    },
    { word: "Delinquency", hint: "Failure to make payments on time" },
    { word: "Liabilities", hint: "A person's debts or financial obligations" },
    // {
    //   word: "Prepayment",
    //   hint: "An amount paid to reduce the principal balance of a loan before the principal is due",
    // },
    // {
    //   word: "Forbearance",
    //   hint: "Temporary suspension of loan payments due to financial hardship",
    // },
    // {
    //   word: "FICO",
    //   hint: "Which score determines the eligibility of borrower?",
    // },
    // { word: "Collateral", hint: "Assets pledged as security for a loan" },
    // {
    //   word: "Escrow",
    //   hint: "Funds held by a third party until conditions are met",
    // },
  ],
};

//count
let winCount = 0;
let loseCount = 0;
updateHearts();
let gwCount = 0;

let chosenWord = "";
let chosenHint = "";

//Display option buttons
const displayOptions = () => {
  for (let value in options) {
    generateWord(`${value}`);
  }
};

//Block all the Buttons
const youWin = () => {
  canInitialize = true;
  gamePoints[1] += 50;
  showPoints(1);
  playSound("winSound");
  let optionsButtons = document.querySelectorAll(".options");
  let letterButtons = document.querySelectorAll(".letters");
  chosenWordContainer_1.innerHTML = chosenWord;
  //disable all options
  optionsButtons.forEach((button) => {
    button.disabled = true;
  });

  //disable all letters
  letterButtons.forEach((button) => {
    button.disabled.true;
  });
  winContainer.classList.remove("hide");
  if (wordsCount > 3) {
    winButton.classList.add("hide");
    nextGameContainer.classList.remove("hide");
  }
};

//Block all the Buttons
const youLost = () => {
  canInitialize = true;
  playSound("loseSound");
  let optionsButtons = document.querySelectorAll(".options");
  let letterButtons = document.querySelectorAll(".letters");
  chosenWordContainer_2.innerHTML = chosenWord;
  //disable all options
  optionsButtons.forEach((button) => {
    button.disabled = true;
  });

  //disable all letters
  letterButtons.forEach((button) => {
    button.disabled.true;
  });
  loseContainer.classList.remove("hide");
  if (wordsCount > 3) {
    loseButton.classList.add("hide");
    nextGameContainer.classList.remove("hide");
  }
};

//Word Generator
const generateWord = (optionValue) => {
  let optionsButtons = document.querySelectorAll(".options");
  //If optionValur matches the button innerText then highlight the button
  optionsButtons.forEach((button) => {
    if (button.innerText.toLowerCase() === optionValue) {
      button.classList.add("active");
    }
    button.disabled = true;
  });

  //initially hide letters, clear previous word
  if (letterContainer_1) letterContainer_1.classList.remove("hide");
  if (letterContainer_2) letterContainer_2.classList.remove("hide");
  if (letterContainer_3) letterContainer_3.classList.remove("hide");
  if (userInputSection) userInputSection.innerText = "";

  let optionArray = options[optionValue];
  //choose random word

  chosenWord = optionArray[wordsCount].word;
  if (hintContainer)
    hintContainer.innerHTML = `<p><b>Hint:</b> ${optionArray[wordsCount].hint}</p>`;
  chosenWord = chosenWord.toUpperCase();

  //replace every letter with span containing dash
  let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');

  //Display each element as span
  if (userInputSection) userInputSection.innerHTML = displayItem;
};

function updateHearts() {
  if (heartContainer)
    heartContainer.innerHTML =
      new Array(loseCount).fill("🤍").join("") +
      new Array(3 - loseCount).fill("❤️").join("");
}

//Initial Function (Called when page loads/user presses new game)
const initializer = (type) => {
  canInitialize = false;
  if (type === "new") wordsCount = 0;
  else wordsCount += 1;

  winCount = 0;
  gwCount = 0;
  loseCount = 0;
  updateHearts();

  //Initially erase all content and hide letteres and new game button
  if (userInputSection) userInputSection.innerHTML = "";
  if (letterContainer_1) letterContainer_1.classList.add("hide");
  if (letterContainer_2) letterContainer_2.classList.add("hide");
  if (letterContainer_3) letterContainer_3.classList.add("hide");
  if (winContainer) winContainer.classList.add("hide");
  if (loseContainer) loseContainer.classList.add("hide");
  if (letterContainer_1) letterContainer_1.innerHTML = "";
  if (letterContainer_2) letterContainer_2.innerHTML = "";
  if (letterContainer_3) letterContainer_3.innerHTML = "";

  const KeyBoardKeys = "QWERTYUIOP" + "ASDFGHJKL" + "ZXCVBNM";

  //For creating letter buttons
  for (let i = 0; i < KeyBoardKeys.length; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    button.setAttribute("id", "letter_" + KeyBoardKeys[i]);
    button.innerText = KeyBoardKeys[i];
    wordList.push(KeyBoardKeys[i]);
    //character button click
    button.addEventListener("click", () =>
      chooseLetter(chosenWord, button.innerText)
    );
    document.addEventListener("keypress", (e) => {
      if (
        currentGame === "mortgage-quiz" &&
        !canInitialize &&
        wordList.includes(e.key.toUpperCase())
      )
        chooseLetter(chosenWord, e.key);
    });
    if (i <= 9 && letterContainer_1) letterContainer_1.append(button);
    if (i > 9 && i <= 18 && letterContainer_2) letterContainer_2.append(button);
    if (i > 18 && letterContainer_3) letterContainer_3.append(button);
  }

  displayOptions();
};

//New Game
if (winButton)
  winButton.addEventListener("click", () => initializer("continue"));
if (loseButton)
  loseButton.addEventListener("click", () => initializer("continue"));
window.onload = initializer("new");

function chooseLetter(chosenWord1, letterText) {
  let charArray = chosenWord1.split("");
  //if array contains clciked value replace the matched dash with letter else dram on canvas
  if (
    charArray.includes(letterText.toUpperCase()) &&
    !document.getElementById("letter_" + letterText.toUpperCase()).disabled
  ) {
    let dashes = document.getElementsByClassName("dashes");
    charArray.forEach((char, index) => {
      //if character in array is same as clicked button1
      if (char === letterText.toUpperCase()) {
        //replace dash with letter
        dashes[index].innerText = char;
        //increment counter
        winCount += 1;
        //if winCount equals word lenfth
        if (winCount == charArray.length) {
          //block all button1s
          youWin();
        }
      }
    });
  } else if (
    !document.getElementById("letter_" + letterText.toUpperCase()).disabled
  ) {
    loseCount++;
    if (loseCount <= 2) playSound("heartPopSound");
    updateHearts();
    if (loseCount > 2) {
      youLost();
      loseCount = 0;
      updateHearts();
    }
  }
  //disable clicked button1
  document.getElementById("letter_" + letterText.toUpperCase()).disabled = true;
}
