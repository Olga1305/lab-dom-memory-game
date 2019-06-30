"use strict";

function main() {
  var memoryGame = new MemoryGame(cards);
  memoryGame.shuffleCards(cards);
  var html = "";
  memoryGame.cards.forEach(function(pic) {
    html += '<div class="card" data-card-name="' + pic.name + '">';
    html += '  <div class="back" name="' + pic.img + '"></div>';
    html +=
      '  <div class="front" style="background: url(img/' +
      pic.img +
      ') no-repeat"></div>';
    html += "</div>";
  });

  // Add all the div's to the HTML
  var memoryBoard = document.querySelector("#memory_board");
  if (memoryBoard) {
    // this condition is for passing the tests
    memoryBoard.innerHTML = html;
  }

  // You will need to do something to the front as well
  var front = document.querySelectorAll(".front");

  // Bind the click event of each element to a function
  var back = document.querySelectorAll(".back");
  for (var i = 0; i < back.length; i++) {
    back[i].onclick = turnCard;
  }

  var firstCard = undefined;
  var secondCard = undefined;

  function turnCard(e) {
    var clickedCard = e.target;
    while (memoryGame.pickedCards.length < 2) {
      displayClickedCard(clickedCard);
      memoryGame.pickedCards.push(clickedCard);
      firstCard = memoryGame.pickedCards[0].getAttribute("name");

      if (memoryGame.pickedCards.length === 2) {
        secondCard = memoryGame.pickedCards[1].getAttribute("name");
        var check = memoryGame.checkIfPair(firstCard, secondCard);

        printGameInfo();

        if (!check) {
          turnBackCards();
        }
        if (check) {
          memoryGame.pickedCards.forEach(function(card) {
            card.classList.replace("active", "blocked");
          });
          memoryGame.pickedCards = [];
          var win = memoryGame.isFinished();
          if (win) {
            memoryGame.pairsClicked = 0;
            memoryGame.pairsGuessed = 0;
            printGameInfo();
            main();
          }
        }
      }
      return memoryGame.pickedCards;
    }
  }

  // Helpers to create the logic of the game
  function turnBackCards() {
    setTimeout(function() {
      memoryGame.pickedCards[0].style.background = "#456783";
      memoryGame.pickedCards[1].style.background = "#456783";
      memoryGame.pickedCards[0].classList.remove("active");
      memoryGame.pickedCards[1].classList.remove("active");
      prepareNextTurn();
    }, 1000);
  }

  function prepareNextTurn() {
    memoryGame.pickedCards = [];
    back.forEach(element => element.classList.remove("blocked"));
    front.forEach(element => element.classList.remove("blocked"));
  }

  function printGameInfo() {
    document.getElementById("pairs_clicked").innerHTML =
      memoryGame.pairsClicked;
    document.getElementById("pairs_guessed").innerHTML =
      memoryGame.pairsGuessed;
  }

  function displayClickedCard(card) {
    card.className += " active";
    card.style.background =
      "url(img/" + card.getAttribute("name") + ") no-repeat";
  }
}

window.addEventListener("load", main);
