// Import the deck of cards
import { deck } from './deck.js';

var pack = [];
const players = [
    {player: "Player 0", hand: [], handValue: 0},
    {player: "Player 1", hand: [], handValue: 0},
    {player: "Player 2", hand: [], handValue: 0},
    {player: "Player 3", hand: [], handValue: 0},
];
var playersTurn = 0;

function setupGame() {
    // Shuffle the deck of cards and log the result
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    console.log("Shuffled Deck: ", deck);

    // Give each player 11 cards from the top of the deck
    for (let player = 0; player < players.length; player++) {
        for (let i = 0; i < 11; i++) {
            players[player].hand.push(deck.pop());
        };
        sortHand();
    };

    // Log the players hands and the remaining deck
    for (let i = 0; i < players.length; i++) {
        // Print the value of the players hand
        console.log(`Player ${i}'s Hand:`, players[i].hand);
    }
    
    // Print the deck after dealing
    console.log("Deck after deal: ", deck);

    // Pop, remove the last value from the deck
    // Push, add the value that was removed from the deck to the pack
    // Value removed was deck.length - 1
    pack.push(deck.pop());

    // Populate the pack div with the value from the pack
    const packDiv = document.getElementById("pack-value");
    packDiv.textContent = pack[0]?.rank + pack[0]?.suit;

    // Check if the last card of the pack is a wild card
    // If it is, draw another card from the deck and add it to the pack
    if (pack[0]?.type === "wild" || pack[0]?.type === "red-three") {
        console.log("The frist card was a wild card", pack[0]);
        pack.push(deck.pop());
        packDiv.textContent = pack[pack.length - 1]?.rank + pack[pack.length - 1]?.suit;
        console.log("The new pack is: ", pack);
    }

    renderHand();
}

function sortHand() {
    for (let player = 0; player < players.length; player++) {
        // Sort the players hand by rank in alphabetical order
        players[player].hand.sort((a, b) => a.rank.localeCompare(b.rank));
    }
}

function renderHand() {
    // Create a loop for each player
    for (let x = 0; x < players.length; x++) {
        // Get the div for each players hand
        let handContainer = document.getElementById(`player-${x}`);

        // Clear the handContainer before rendering new elements
        handContainer.innerHTML = '';

        // Create a loop to render each card in the players hand
        for (let y = 0; y < players[x].hand.length; y++) {
            // Assign each card to a button
            let card = document.createElement("button");

            // Add classes to the card
            card.classList.add("card-button");
            card.classList.add(`orientation-${x}`);
            card.classList.add(players[x].hand[y].color);

            // Add the text content to the card and push
            card.textContent = players[x].hand[y].rank + " " + players[x].hand[y].suit;
            handContainer.appendChild(card);
        }
    }
}

function drawCard() {
    console.log("Drawn Card: ", deck[deck.length - 1]);
    players[playersTurn].hand.push(deck.pop());
    // console.log("Player 0's Hand: ", players[0].hand);
    console.log("Deck after draw: ", deck);
    sortHand();
    renderHand();
}

function throwCard() {
    // Get the div for the current player's hand
    let handContainer = document.getElementById(`player-${playersTurn}`);

    // Add event listener to each card button in the hand
    handContainer.addEventListener("click", function(event) {
        // Check if the clicked element is a card button
        if (event.target.classList.contains("card-button")) {
            // Get the index of the clicked card in the player's hand
            let cardIndex = Array.from(handContainer.children).indexOf(event.target);

            // Remove the clicked card from the player's hand and add it to the pack
            let thrownCard = players[playersTurn].hand.splice(cardIndex, 1)[0];
            pack.push(thrownCard);

            // Update the pack value in the UI
            const packDiv = document.getElementById("pack-value");
            packDiv.textContent = pack[pack.length - 1]?.rank + pack[pack.length - 1]?.suit;

            // Render the updated hand
            renderHand();

            // Move to the next player's turn
            nextTurn();
        }
    });
}

function pickUpPack() {
    // Get the value for the last card in the pack
    var packCard = pack[pack.length - 1];
    console.log("Pack Card: ", packCard);

    // Get the rank values from all the cardss in the players hand
    const rankValues = players[playersTurn].hand.map(card => card.rank);
    console.log("Rank Values: ", rankValues);
    
    // Check if there are 2 instances of the pack card in the rankValues
    if (rankValues.filter(rank => rank === packCard.rank).length === 2) {
        // Add the pack to the current player's hand
        players[playersTurn].hand = players[playersTurn].hand.concat(pack);
        pack = [];

        // Update the pack value in the UI
        const packDiv = document.getElementById("pack-value");
        packDiv.textContent = "";

        // Render the updated hand
        renderHand();

        // Move to the next player's turn
        nextTurn();
    } else {
        console.log("There are not 2 instances of the pack card in the player's hand.");
    }
}

function nextTurn() {
    // console.log("Player's Turn: ", playersTurn);
    playersTurn = playersTurn + 1
    // console.log("Players Turn: ", playersTurn);
    if (playersTurn > players.length - 1) {
        playersTurn = 0;
    }
}

// Game
setupGame();

// Add event listener to the deck
document.getElementById("deck").addEventListener("click", drawCard);

// Add event listener to the pack
document.getElementById("pack").addEventListener("click", pickUpPack);
