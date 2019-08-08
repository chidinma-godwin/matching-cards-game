//Declare global variables
let toggledCards = [];
const deck = document.querySelector(".deck"); //Create an array containing all cards
let time = 0;
let clockOff = true;
let moves = 0;
let clockId;

//function to shuffle cards
function shuffleCards(array){
    let currentIndex=array.length, temporaryValue, randomIndex;
    while(currentIndex>0){
        randomIndex=Math.floor(Math.random()*currentIndex);
        currentIndex--;
        temporaryValue=array[currentIndex];
        array[currentIndex]=array[randomIndex];
        array[randomIndex]=temporaryValue;
    }
    return array;
}

//function to turn the deck to an array of cards and shuffle them
function shuffleDeck(){
    let toShuffle=Array.from(document.querySelectorAll(".card"));
    let shuffledCards=shuffleCards(toShuffle);
    for(let card of shuffledCards){
        deck.appendChild(card);
    }
}

//function to open or close the cards
function toggleCard(card){
    card.classList.toggle("show");
    card.classList.toggle("open");
}

//function to add opened card to array containing toggled cards
function addToggledCard(card){
    toggledCards.push(card);
}

//function to check if the cards match
function checkMatch(){
    if(toggledCards[0].firstChild.className===
       toggledCards[1].firstChild.className){
           toggledCards[0].classList.toggle("match");
           toggledCards[1].classList.toggle("match");
           toggledCards = [];
       } else{
        setTimeout(function(){
            toggleCard(toggledCards[0]);
            toggleCard(toggledCards[1]);
            toggledCards = []}, 800)
       }
}
 
//functon to use for the one-time event listener
function onceEvent(){
    deck.removeEventListener("click",onceEvent)
    let firstCard = deck.querySelector(".first");
    firstCard.className = "card";
    toggleCard(firstCard);
    addToggledCard(firstCard);
}

//function to add time to the game
function startClock(){
    clockId = setInterval(function(){
    time++;
    displayTime();
    },1000)
}

//function to set time in the right format
function displayTime(){
    let clock = document.querySelector(".time");
    let min = Math.floor(time/60);
    let sec = time % 60;
    if(sec<10){
        calcTime = `${min}:0${sec}`;
    }
    else{
        calcTime = `${min}:${sec}`;
    }
    clock.innerHTML = calcTime;
}

//function to count the number of moves made
function countMoves(){
    let numMove = document.querySelector(".num-moves");
    if(moves<=1){
        numMove.innerHTML = `${moves} move`;
    } 
    if(moves>1){
        numMove.innerHTML = `${moves} moves`;
    }
}

//function to change the number of stars
function changeStar(){
    if(moves===8 || moves===16){
        removeStar();
    }
}

function removeStar(){
    let allStars = document.querySelectorAll(".ch-star");
    for(let star of allStars){
        if(star.style.display!=="none"){
        star.style.display = "none";
        break;
        }
    }
}

//function to stop clock
function stopClock(){
    clearInterval(clockId);
}

//Shuffle the deck at the beginning of the game
shuffleDeck();

// Add one-time event listener to add the unmatched card at the beginning to array of toggled cards
deck.addEventListener("click",onceEvent)

//function to toggle pause background
function togglePause(){
    stopClock();
    const pause = document.querySelector(".fa-pause");
    pause.style.display = "none";
    const pauseBackground = document.querySelector(".pause-background");
    pauseBackground.classList.toggle("hide");
}

//function to play game
function playGame(){
    const play = document.querySelector(".play");
    startClock();
    play.classList.toggle("pause-background");
}

document.querySelector(".fa-pause").addEventListener("click",togglePause)
document.querySelector(".play").addEventListener("click",playGame)

// Add event listener to perform an action when clicking on cards
deck.addEventListener("click",function(evt){
    let clickTarget = evt.target;
    if (clickTarget.classList.contains("card") && toggledCards.length<2){
        if(clockOff===true){
            startClock();
            clockOff=false;
        }
        toggleCard(clickTarget);
        //console.log(clickTarget);
        addToggledCard(clickTarget);
    }
    if (toggledCards.length===2){
        checkMatch();
        moves++;
        countMoves();
        changeStar();
    }
})