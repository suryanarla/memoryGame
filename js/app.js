// Calling Deck DOM
let deck = document.querySelector(".deck");
/*
 * Create a list that holds all of your cards
 */

let cardList = Array.prototype.slice.call(document.querySelectorAll(".card"));

// Creating a list that holds all the stars
let starList = document.querySelectorAll(".fa-star");

// Initialized move count, status and timer as 0
var moves = 0;
let status = 0;
let timer;

// Declaring starCount
var starCount;

// Getting moves DOM element
var movesDiv = document.querySelector(".moves");

// Congratulations Modal (popup)
var modal = document.getElementById('myModal');

// DOM's for Results in congratulations popup
// Moves result
var moveResult = document.querySelector("#moves");
// Time result
var timeResult = document.querySelector("#time");
// Star result
var starResult = document.querySelector("#star");


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Displaying cards after shuffled. This function works immidiately after loading the window.
window.onload = initGame();

function initGame() {
  modal.classList.add("hide");
  var shuffledCards = shuffle(cardList);
  for (var i = 0; i < shuffledCards.length; i++) {
    deck.append(shuffledCards[i]);
  }
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


// Added click event listener with viewCard function definition
cardList.map((card) => {
  card.addEventListener("click", viewCard);
})

// Initialized empty array for counting moves
var opened = [];

// Getting list of all elements with .match selector so matched become an array.
var matched = document.querySelectorAll(".match");

// vewCard function description
function viewCard() {
  this.classList.toggle("open");
  this.classList.toggle("show");
  this.classList.toggle("disabled");

  // When user clicks on a card the timer starts automatically by using below timeInterval function.
  if (status == 0) {
    timeInterval();
    status = status + 1;
  }

  // Filling opened[] array with clicked cards.
  opened.push(this);
  if (opened.length == 2) {
    moves = moves + 1;
    movesDiv.innerHTML = moves;

    // Displaying all the result in congratulations popup.
    moveResult.innerHTML = moves;
    timeResult.innerHTML = +m + " :: " + s;
    starResult.innerHTML = starCount + "<i class='fa fa-star star'></i>";

    //Checking selected cards
    if (opened[0].children[0].classList.item(1)=== opened[1].children[0].classList.item(1)) {
      
      // If the selected cards are same, the below code is executed. Added few styles to DOM elements.
      opened[0].classList.add("match", "disabled");
      opened[0].classList.remove("show", "open");
      opened[1].classList.add("match", "disabled");
      opened[1].classList.remove("show", "open");
      opened = [];
      var matched = document.querySelectorAll(".match");
      console.log(matched.length);
      if (matched.length === 16) {
        endGame();
      }
      // If the selected cards not in equal then below code block is executed. Applied few styles for indication.
    } else {
      opened[0].classList.add("unmatch");
      opened[1].classList.add("unmatch");
      cardList.map((cardItem) => {
        cardItem.classList.add("disabled");
      })
      setTimeout(() => {
        var matched = document.querySelectorAll(".match")
        opened[0].classList.remove("unmatch", "show", "open");
        opened[1].classList.remove("unmatch", "show", "open");
        //Disabling selected cards temporarily         
        opened.filter.call(cardList, function(item) {
          item.classList.remove('disabled');
          for (var i = 0; i < matched.length; i++) {
            matched[i].classList.add("disabled");
          }
        });
        opened = [];
      }, 500)
    }
    displayStar();
  }
}

// Timer
var timerDiv = document.querySelector(".timer");
var s = 0,
  m = 0;

function timeInterval() {
  timer = setInterval(() => {
    s = s + 1;
    if (s == 59) {
      s = 0;
      m = m + 1;
    }
    timerDiv.innerHTML = m + " : " + s;
  }, 1000)
}

// Rating with stars
function displayStar() {
  if (moves <= 12) {
    starCount = 3;
  } else if (moves > 12 && moves <= 16) {
    starList[2].classList.remove("star");
    starCount = 2;
  } else if (moves > 16) {
    starList[2].classList.remove("star");
    starList[1].classList.remove("star");
    starCount = 1;
  }
}

// Restart function. works when the user clicks on restarts button in popup.
function restart() {
  window.location.reload();
}

// End of the game
function endGame() {
  modal.classList.remove("hide");
  modal.classList.add("show");
  clearInterval(timer);
}
