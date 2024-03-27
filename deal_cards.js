import { deck } from './deck.js';

// Shuffle the deck of cards
for (let i = deck.length - 1; i > 0; i--) {
	const j = Math.floor(Math.random() * (i + 1));
	[deck[i], deck[j]] = [deck[j], deck[i]];
}

// Log the shuffled deck of cards
console.log("Shuffled Deck: ", deck);

// Create the players hands
var players = [
	{player: "Player 1", hand: []},
	{player: "Player 2", hand: []},
	{player: "Player 3", hand: []},
	{player: "Player 4", hand: []},
];

// Give each player 11 cards from the top of the deck
for (let player = 0; player < players.length; player++) {
	for (let i = 0; i < 11; i++) {
		players[player].hand.push(deck.pop());
	};
	// Sort the players hand by value
	players[player].hand.sort((a, b) => a.value - b.value);
};

// Log the players hands and the remaining deck
console.log("Player 1's Hand: ", players[0].hand);
console.log("Player 2's Hand: ", players[1].hand);
console.log("Player 3's Hand: ", players[2].hand);
console.log("Player 4's Hand: ", players[3].hand);
console.log("Deck: ", deck);

// Take the top card from the deck and place it in the throw pile
export const pack = [];
pack.push(deck.pop());

// Print the pack and the deck
console.log("Pack: ", pack);
console.log("Deck: ", deck);

// Populate the div with the value from the pack
const packDiv = document.getElementById("throw-value");
packDiv.textContent = pack[0].rank + " of " + pack[0].suit;
deck.shift();

// Check if the last card of the pack is a wild card
if (pack[pack.length - 1].type === "wild" || pack[pack.length - 1].type === "red-three") {
	pack.push(deck.pop());
}

// Print the pack and the deck
console.log("Pack: ", pack);
console.log("Deck: ", deck);

// Create divs with the class of "hand" for each value in player1
// for (let player = 0; player < players.length; player++) {
// 	for (let i = 0; i < players[player].hand.length; i++) {
// 		let playersHand = document.createElement("button");
// 		playersHand.classList.add("hand");
// 		playersHand.textContent = players[player].hand[i].rank + " of " + players[player].hand[i].suit;
// 		playersHand.appendChild(playersHand);
// 	};
// }



// for (const card of player1_hand) {
// 	const newDiv = document.createElement("button");
// 	newDiv.classList.add("hand1");
// 	newDiv.textContent = card;
// 	player1_hand_location.appendChild(newDiv);
// }

// const player2_hand_location = document.getElementById("player2s-hand");
// for (const card of player2_hand) {
// 	const newDiv = document.createElement("button");
// 	newDiv.classList.add("hand2");
// 	newDiv.textContent = card;
// 	player2_hand_location.appendChild(newDiv);
// }

// const player3_hand_location = document.getElementById("player3s-hand");
// for (const card of player3_hand) {
// 	const newDiv = document.createElement("button");
// 	newDiv.classList.add("hand3");
// 	newDiv.textContent = card;
// 	player3_hand_location.appendChild(newDiv);
// }

// const player4_hand_location = document.getElementById("player4s-hand");
// for (const card of player4_hand) {
// 	const newDiv = document.createElement("button");
// 	newDiv.classList.add("hand4");
// 	newDiv.textContent = card;
// 	player4_hand_location.appendChild(newDiv);
// }
