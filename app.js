//Declare global variables
let toggledCards = [];
const deck = document.querySelector(".deck"); //Create an array containing all cards

//function to open or close the cards
function toggleCards(card){
    card.classList.toggle("open");
}

//function to add opened card to array containing toggled cards
function addToggledCard(card){
    toggledCards.push(card);
    console.log(toggledCards);
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
            toggledCards[0].classList.toggle("open");
            toggledCards[1].classList.toggle("open");
            toggledCards = []}, 800)
       }
}

// Add event listener to perform an action when clicking on cards
deck.addEventListener("click",function(evt){
    let clickTarget = evt.target;
    if (clickTarget.classList.contains("card") && toggledCards.length<2){
        toggleCards(clickTarget);
        //console.log(clickTarget);
        addToggledCard(clickTarget);
    }
    if (toggledCards.length===2){
        checkMatch()
    }
})