// Import the deck of cards
import { deck } from './deck.js';

var pack = [];
const players = [
    {player: "Player 0", hand: [], handValue: 0},
    {player: "Player 1", hand: [], handValue: 0},
    {player: "Player 2", hand: [], handValue: 0},
    {player: "Player 3", hand: [], handValue: 0},
];

function setupGame() {
    // Shuffle the deck of cards and log the result
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    // Give each player 11 cards from the top of the deck
    for (let player = 0; player < players.length; player++) {
        for (let i = 0; i < 11; i++) {
            players[player].hand.push(deck.pop());
        };
        sortHand();
    };

    // Log the players hands and the remaining deck
    for (let i = 0; i < players.length; i++) {
        console.log(`Player ${i}'s Hand:`, players[i].hand);
    }
    console.log("Deck after deal: ", deck);

    // Take the top card from the deck and place it in the throw pile
    pack.push(deck.pop());

    // Print the pack and the deck
    console.log("First Pack after deal: ", pack);
    console.log("First Deck after deal: ", deck);

    // Populate the pack div with the value from the pack
    const packDiv = document.getElementById("pack-value");
    packDiv.textContent = pack[0]?.rank + pack[0]?.suit;

    // Check if the last card of the pack is a wild card
    // If it is, draw another card from the deck and add it to the pack
    if (pack[0]?.type === "wild" || pack[0]?.type === "red-three") {
        pack.push(deck.pop());
    }

    // Print the pack and the deck
    console.log("Second Pack after deal: ", pack);
    console.log("Second Deck after deal: ", deck);

    renderHand();
}

function sortHand() {
    for (let player = 0; player < players.length; player++) {
        // Sort the players hand by rank in alphabetical order
        players[player].hand.sort((a, b) => a.rank.localeCompare(b.rank));
    }
}

function renderHand() {
    // Get the container for the players hands
    const handsDiv = document.getElementById("players-hands");

    // Create a loop for each player
    for (let x = 0; x < players.length; x++) {
        // Create a div for each player's hand
        let playersHand = document.createElement("div");

        // Add an id to the players hand
        playersHand.id = `player${x}-hand`;
        handsDiv.appendChild(playersHand);

        // Get the players hand div
        let playerHandDiv = document.getElementById(`player${x}-hand`);
        playerHandDiv.innerHTML = "";

        // Create a loop to render each card in the players hand
        for (let y = 0; y < players[x].hand.length; y++) {
            // Assign each card to a button
            let card = document.createElement("button");

            // Add classes to the card
            card.classList.add("card-button");
            card.classList.add(players[x].hand[y].color);

            // Add the text content to the card and push
            card.textContent = players[x].hand[y].rank + " " + players[x].hand[y].suit;
            playerHandDiv.appendChild(card);
        }
    }
}

function drawCard() {
    let deckElement = document.getElementById("deck");
    deckElement.addEventListener("click", function() {
        console.log("Deck before draw: ", deck[0]);
        players[0].hand.push(deck.pop());
        console.log("Player 0's Hand: ", players[0].hand);
        console.log("Deck after draw: ", deck[0]);
        sortHand();
        renderHand();
    });
}

setupGame();
drawCard();
