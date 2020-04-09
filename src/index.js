document.addEventListener('DOMContentLoaded', function () {
  createBoard()
  signUpModal.style.display = "block"

  let firstOne = ''
  let flippedCards = []
  let matched = document.getElementsByClassName("matched")
    board.addEventListener('click', function (event) {
    if (event.target.classList.contains('card__face')) {
      if (flippedCards.length === 0) { firstOne = event.target.parentNode.childNodes[1].childNodes[1] }
      event.target.parentNode.classList.toggle("is-flipped")
      flippedCards.push(event.target.parentNode.childNodes[1].childNodes[1].src)
      if (firstOne != event.target.parentNode.childNodes[1].childNodes[1]) {
        if (flippedCards.length === 2) {
          if (flippedCards[0] === flippedCards[1]) {
            let matchedPair = document.getElementsByClassName(flippedCards[0])
            matchedPair[0].parentNode.parentNode.classList.add("matched")
            matchedPair[1].parentNode.parentNode.classList.add("matched")
            flippedCards = []
          } else if (flippedCards[0] !== flippedCards[1]) {
            setTimeout(function () {
              let flippedOne = document.getElementsByClassName(flippedCards[0])
              let flippedTwo = document.getElementsByClassName(flippedCards[1])
              if (flippedOne[0].parentNode.parentNode.classList.contains("is-flipped")) { flippedOne[0].parentNode.parentNode.classList.toggle("is-flipped") }
              if (flippedOne[1].parentNode.parentNode.classList.contains("is-flipped")) { flippedOne[1].parentNode.parentNode.classList.toggle("is-flipped") }
              if (flippedTwo[0].parentNode.parentNode.classList.contains("is-flipped")) { flippedTwo[0].parentNode.parentNode.classList.toggle("is-flipped") }
              if (flippedTwo[1].parentNode.parentNode.classList.contains("is-flipped")) { flippedTwo[1].parentNode.parentNode.classList.toggle("is-flipped") }
              flippedCards = []
            }, 600)
          } else {
            flippedCards = []
          }
        }
        console.log(flippedCards.length)
      }//end of second if statement
      if (flippedCards.length === 2 && flippedCards[0] === flippedCards[1]) { flippedCards = [] }
    }//end of first if statement
    if (matched.length === 24){
      console.log("I finished the game")
      let duration = counter.innerText
      resetTimer()
      
      postGame(duration)




    }
  })//end of board event listener

})//end of DOM event listener
