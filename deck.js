// Define the ranks and suits of the cards
const cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const suits = ["♠️", "♥️", "♦️", "♣️"];
const joker = ["Joker-Red", "Joker-Black"];

// Define the number of players
const player1_hand = [];
const player2_hand = [];
const player3_hand = [];
const player4_hand = [];

// Create an empty array to store the deck of cards
const deck = [];

// Generate the deck of cards
for (let i = 0; i < 2; i++) {
	for (const suit of suits) {
		for (const card of cards) {
			deck.push(`${card}${suit}`);
		}
	}
}

// Add 2 red jokers and 2 black jokers
deck.push(...joker);
deck.push(...joker);

// Shuffle the deck of cards
for (let i = deck.length - 1; i > 0; i--) {
	const j = Math.floor(Math.random() * (i + 1));
	[deck[i], deck[j]] = [deck[j], deck[i]];
}

// Give each player 11 cards from the top of the deck
for (let i = 0; i < 11; i++) {
	player1_hand.push(deck.pop());
	player2_hand.push(deck.pop());
	player3_hand.push(deck.pop());
	player4_hand.push(deck.pop());
}

// Print the shuffled deck of cards
console.log(deck);

// Send the first value from the deck to the throw div
const throwDiv = document.getElementById("throw-value");
throwDiv.textContent = deck[0];
deck.shift();

// Send the first value from the deck to the pack div
const packDiv = document.getElementById("pack-value");
packDiv.textContent = deck[0];
deck.shift();

// Create divs with the class of "hand" for each value in player1
const hand_location = document.getElementById("hand-location");
for (const card of player1_hand) {
	const newDiv = document.createElement("div");
	newDiv.classList.add("hand");
	newDiv.textContent = card;
	hand_location.appendChild(newDiv);
}


