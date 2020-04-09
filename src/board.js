let edward = { imgUrl: "https://ca.slack-edge.com/T02MD9XTF-UMU3AK9R9-8066056b3b11-512" }
let maddy = { imgUrl: "https://ca.slack-edge.com/T02MD9XTF-UQ32TAFUJ-8893c2981861-512" }
let tarzy = { imgUrl: "https://ca.slack-edge.com/T02MD9XTF-UQ32TB4US-ba9634a47840-512" }
let shakil = { imgUrl: "https://ca.slack-edge.com/T02MD9XTF-UQHMQV2DV-c23ee99edefc-512" }
let tim = { imgUrl: "https://ca.slack-edge.com/T02MD9XTF-UNX1T44NQ-347b781241f1-512" }
let alex = { imgUrl: "https://ca.slack-edge.com/T02MD9XTF-UQ32T8ZGA-1d8b246a8aff-512" }
let zalmy = { imgUrl: "https://ca.slack-edge.com/T02MD9XTF-UPP8J2MN3-ccf426a8d5d4-512" }
let james = { imgUrl: "https://ca.slack-edge.com/T02MD9XTF-UQJ2R94EA-0d4d26671dd9-512" }
let kevin = { imgUrl: "https://ca.slack-edge.com/T02MD9XTF-UPMCZ4DA9-97cc68f2f97d-512" }
let natalie = { imgUrl: "https://ca.slack-edge.com/T02MD9XTF-UQJ349T2A-16c4deb69778-512" }
let saman = { imgUrl: "https://ca.slack-edge.com/T02MD9XTF-UNZCW6XHV-887f56cd0ca9-512" }
let seanE = { imgUrl: "https://ca.slack-edge.com/T02MD9XTF-UPPJWDG4E-c9644a435aff-512" }

let currentUser = {}
let currentGame = {}
let congratsSpan = document.getElementById("congrats-span")
let greeting = document.getElementById("greeting")
  greeting.textContent = "Welcome to NameErrorMatch"
// let loggedIn = false

const baseUrl = "http://localhost:3000/api/v1/"
const usersUrl = "http://localhost:3000/api/v1/users/"
const gamesUrl = "http://localhost:3000/api/v1/games/"
let counter = document.getElementById("counter")


function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
let gamePieces = [edward.imgUrl, maddy.imgUrl, tarzy.imgUrl, shakil.imgUrl, tim.imgUrl, alex.imgUrl, zalmy.imgUrl, james.imgUrl, kevin.imgUrl, natalie.imgUrl, saman.imgUrl, seanE.imgUrl, edward.imgUrl, maddy.imgUrl, tarzy.imgUrl, shakil.imgUrl, tim.imgUrl, alex.imgUrl, zalmy.imgUrl, james.imgUrl, kevin.imgUrl, natalie.imgUrl, saman.imgUrl, seanE.imgUrl]
gamePieces = shuffle(gamePieces);
function createBoard() {
  const board = document.querySelector("#board")
  board.innerHTML = ""
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 6; j++) {
      gamePieceIndex = (i * 6) + j
      board.insertAdjacentHTML("beforeend", `     
        <div class="tile">
          <div class="card">
            <div class="card__face card__face--front">
              <img class="image ${gamePieces[gamePieceIndex]}" src=${gamePieces[gamePieceIndex]}>            
            </div>
            <div class="card__face card__face--back">nameError</div>
          </div>
        </div>
        `)
    }
  }
}

// SIGN UP/IN
let signUp = document.getElementById('sign-up')
  signUp.innerText = 'Sign In/Up'

//CONGRATS MODAL
let congratsModal = document.getElementById("congratsModal")
  congratsModal.style.display = "none"


//LEADER BOARD
let leaderBoardBtn = document.getElementById("leader-board-button")
  leaderBoardBtn.innerText = `Leaderboard`
let leaderBoardModal = document.getElementById("leaderBoardModal")
  leaderBoardModal.style.display = "none"
let leaderBoardSpan = document.getElementById("leader-board-span")

leaderBoardBtn.onclick = function () {
  signUpModal.style.display = "none"
  leaderBoardModal.style.display = "block"
  // console.log('clicked sign in')
  // if (signUpModal.style.display === "none") {
  //   leaderBoardModal.style.display = "block"
  // }
  // else if (signUpModal.style.display === "block") {
  //   leaderBoardModal.style.display = "none"
  // }
  // else if (starter.innerText !== "Start Game") {
  //   leaderBoardModal.style.display = "none"
  // }
  // ol.innerHTML = ""
  getGames()
}

// console.log(allGames)
function getGames(){
  let allGames = []
  fetch(gamesUrl)
  .then(resp => resp.json())
  .then(games =>{
    games.forEach(game => allGames.push(game))

    sortGames(allGames)
  })
}
let ol = document.getElementById("leaderBoardOl")

function renderLeaderBoard(sortedGames){
  ol.innerHTML = ""
  console.log(ol)
  while (ol.hasChildNodes()) {ol.removeChild(ol.firstChild)}
  console.log(sortedGames)
  for (let i = 0; i < 10; i++){
    let li = document.createElement('li')
    li.className = "top-ten"
    li.textContent = `${sortedGames[i].user.username} - ${sortedGames[i].duration} seconds`
    ol.appendChild(li)
  }

}

function sortGames(allGames){
  
  let sortedGames = allGames.sort(function(a,b){return (a.duration - b.duration)})
  renderLeaderBoard(sortedGames)
}

// When the user clicks on <span> (x), close the leaderBoardModal
leaderBoardSpan.onclick = function () {
  leaderBoardModal.style.display = "none"
}

// When the user clicks anywhere outside of the leaderBoardModal, close it
window.onclick = function (event) {
  if (event.target == leaderBoardModal) {
    leaderBoardModal.style.display = "none"
  }
}

//SIGN UP
let signUpBtn = document.getElementById("sign-up")
let signUpModal = document.getElementById("signUpModal")
signUpModal.style.display = "none"
let signUpSpan = document.getElementById("sign-up-span")


// When the user clicks the button, open the signUpModal 
// console.log('clicked sign up')
signUpBtn.onclick = function () {
  signUpModal.style.display = "block"
  leaderBoardModal.style.display = "none"
  // let counter = document.getElementById("counter")
  // if (leaderBoardModal.style.display === "none") {
  //   signUpModal.style.display = "block"
  // }
  // else if (leaderBoardModal.style.display === "block") {
  //   signUpModal.style.display = "none"
  // }
  // else if (counter.innerText > 0) {
  //   signUpModal.style.display = "none"
  // }
}


// When the user clicks on (x), close the signUpModal
signUpSpan.onclick = function () {
  signUpModal.style.display = "none"
}
// When the user clicks anywhere outside of the signUpModal, close it
window.onclick = function (event) {
  if (event.target == signUpModal) {
    signUpModal.style.display = "none"
  }
}

//POST for sign up form
let signUpForm = document.getElementsByClassName('sign-up-form')[0]
signUpForm.addEventListener("submit", function (e) {
  e.preventDefault()
  currentUser = {}
  let username = document.getElementById("up").value.toLowerCase()
  console.log(username)
  postUser(username)
  e.target.reset()
  signUpModal.style.display = "none"
  starter.style.pointerEvents = "auto"
  greeting.textContent = `Welcome ${username.charAt(0).toUpperCase() + username.slice(1)}!`
  // alert("You have created your username!")

})

function postUser(username) {

  fetch(usersUrl, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify({username})
  })
  .then(resp => resp.json())
  .then(player => {
    currentUser = player
    currentUser.loggedIn = true})
}

function mytimer() {
  incrementCounter(1)
}

let timer 

function startTimer() {
  timer = setInterval(mytimer, 1000)
  timer
}

//START GAME BUTTON
let starter = document.getElementById("starter")
starter.innerText = 'Start Game!'
starter.addEventListener('click', function (e) {
  let board = document.getElementById("board")
  board.innerHTML = ""
  // resetTimer(timer)
  createBoard()
  board.style.pointerEvents = "auto"
  console.log('clicked starter')
  toggleCounter()
  startTimer()
  
})

function resetTimer(){
  clearInterval(timer)
}

function toggleCounter() {
  let counter = document.getElementById("counter")
  counter.innerText = 0
  let starter = document.getElementById("starter")
  counter.classList.remove("hidden")
  starter.classList.add("hidden")
}
function incrementCounter(n) {
  counter.innerText = parseInt(counter.innerText) + n
}

let gameStarter = document.getElementById('starter')
gameStarter.addEventListener('click', function (e) {
  console.log(currentUser)
  currentGame.user_id = currentUser.id
})

  // postGame(currentGame)

function postGame(duration){
  currentGame.duration = duration
  fetch(gamesUrl, {
    method: "POST",
    headers: {
      'content-type': 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify(currentGame)
  })
  .then(resp => resp.json())
  .then(gamedata => congrats(gamedata))

}

let congratsContent = document.getElementById("congrats-content")
function congrats(){
  congratsContent.innerHTML = `
  <h2> Congratulations ${currentUser.username.charAt(0).toUpperCase() + currentUser.username.slice(1)}!</h2>
  <br>
  <h3> You finished in ${currentGame.duration} seconds!</h3>
  <br>
  <br>
  <span id="congrats-span" class="big-close">&times;</span>
  `
  counter.innerText = 0
  counter.classList.add("hidden")
  starter.classList.remove("hidden")
  congratsModal.style.display = "block"
  let congratsSpan = document.getElementById("congrats-span")
    congratsSpan.onclick = function () {
      congratsModal.style.display = "none"
    }
}
