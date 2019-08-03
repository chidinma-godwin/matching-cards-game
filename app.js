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

// Add event listener to perform an action when clicking on cards
deck.addEventListener("click",function(evt){
    let clickTarget = evt.target;
    if (clickTarget.classList.contains("card")){
        toggleCards(clickTarget);
        //console.log(clickTarget);
        addToggledCard(clickTarget);
    }
})