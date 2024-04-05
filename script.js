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
    let deckElement = document.getElementById("deck");
    deckElement.addEventListener("click", function() {
        console.log("Deck before draw: ", deck[0]);
        players[playersTurn].hand.push(deck.pop());
        console.log("Player 0's Hand: ", players[0].hand);
        console.log("Deck after draw: ", deck[0]);
        sortHand();
        renderHand();
        nextTurn();
    });
}

// function throwCard() {
//     document.addEventListener("click", function() {
//         console.log("test")
//     });
//     nextTurn();
// }

function nextTurn() {
    console.log("Player's Turn: ", playersTurn);
    playersTurn = playersTurn + 1
    console.log("Players Turn: ", playersTurn);
    if (playersTurn > players.length - 1) {
        playersTurn = 0;
    }
}

setupGame();
drawCard();
// throwCard();
