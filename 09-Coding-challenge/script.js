"use strict";

// Coding challenge 4----------------------------
document.body.append(document.createElement("textarea"));
document.body.append(document.createElement("button"));

const textA = document.querySelector("textarea");
const btn = document.querySelector("button");
let testData = [];

btn.addEventListener("click", function () {
  testData = textA.value;
  convertToCamelCase(testData);
});

const convertToCamelCase = function (data) {
  const dataArray = data.toLowerCase().split("\n");
  let dataArrayCapital = [];
  for (const trimData of dataArray) {
    let dataArrayTrimmed = trimData.trim().replaceAll("_", " ");
    const [first, second] = dataArrayTrimmed.split(" ");
    let newStr = first + second.replace(second[0], second[0].toUpperCase());
    newStr = newStr.padEnd(20, " ");
    dataArrayCapital.push(newStr);
  }
  for (let i = 0; i < dataArrayCapital.length; i++) {
    console.log(dataArrayCapital[i] + `${"✅".repeat(i + 1)}`);
  }
};
/*
//  Opettajan versio
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value;
  const rows = text.split('\n');

  for (const [i, row] of rows.entries()) {
    const [first, second] = row.toLowerCase().trim().split('_');

    const output = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;
    console.log(`${output.padEnd(20)}${'✅'.repeat(i + 1)}`);
  }
});

// Coding challenge 3-------------------------------------

const gameEvents = new Map([
  [17, "GOAL"],
  [36, "Substitution"],
  [47, "GOAL"],
  [61, "Substitution"],
  [64, "Yellow card"],
  [69, "Red card"],
  [70, "Substitution"],
  [72, "Substitution"],
  [76, "GOAL"],
  [80, "GOAL"],
  [92, "Yellow card"],
]);

// 1.
const uniqueEvents = [...new Set(gameEvents.values())];
console.log(uniqueEvents);

// 2.
gameEvents.delete(64);
console.log(gameEvents);

// 3.
console.log(
  `An event happened, on average, every ${Math.trunc(
    90 / gameEvents.size
  )} minutes.`
);

//4.
const events = [...gameEvents];
console.log(events);
//console.log(gameEvents.get(47));
// for (let i = 0; i < events.size; i++) {
//   console.log(
//     events[i].
//       ? `[FIRST HALF] ${events[i].keys}: ${events[i].values()}`
//       : `[SECOND HALF] ${events[i].keys()}: ${events[i].values()}`
//   );

for (const [key, value] of gameEvents) {
  if (key <= 45) {
    console.log(`[FIRST HALF] ${key}: ${value}`);
  } else {
    console.log(`[SECOND HALF] ${key}: ${value}`);
  }
}

// Open versio
for (const [min, event] of gameEvents) {
  const half = min <= 45 ? "FIRST" : "SECOND";
  console.log(`[${half} HALF] ${min}: ${event}`);
}


const game = {
  team1: "Bayern Munich",
  team2: "Borrussia Dortmund",
  players: [
    [
      "Neuer",
      "Pavard",
      "Martinez",
      "Alaba",
      "Davies",
      "Kimmich",
      "Goretzka",
      "Coman",
      "Muller",
      "Gnarby",
      "Lewandowski",
    ],
    [
      "Burki",
      "Schultz",
      "Hummels",
      "Akanji",
      "Hakimi",
      "Weigl",
      "Witsel",
      "Hazard",
      "Brandt",
      "Sancho",
      "Gotze",
    ],
  ],
  score: "4:0",
  scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
  date: "Nov 9th, 2037",
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// Coding challenge 2
// 1.
for (const [i, player] of game.scored.entries()) {
  console.log(`Goal ${i + 1}: ${player}`);
}
// 2.
const averageOdds = function (odd) {
  const odds = Object.values(odd);
  //console.log(odds);
  let sum = 0;
  for (let i = 0; i < odds.length; i++) {
    sum += odds[i];
  }
  //console.log(sum);
  return sum / odds.length;
};
console.log(`average odd is ${averageOdds(game.odds)}`);

// Open vastaus

const oddsOpe = Object.values(game.odds);
let average = 0;
for (const odd of oddsOpe) {
  average += odd;
}
average /= oddsOpe.length;
console.log(average);
//-------------------
// 3.

const odds = Object.entries(game.odds);
console.log(odds);

console.log(`Odd for victory ${game.team1}: ${odds[0][1]}`);
console.log(`Odd of draw: ${odds[1][1]}`);
console.log(`Odd for victory ${game.team2}: ${odds[2][1]}`);

// open vastaus

for (const [team, odd] of Object.entries(game.odds)) {
  const teamStr = team === "x" ? "draw" : `victory ${game[team]}`;
  console.log(`Odd for ${teamStr}: ${odd}`);
}
// Bonus
let scorers = [];
for (let i = 0; i < game.scored.length; i++) {
  if (scorers[game.scored[i]]) {
    scorers[game.scored[i]]++;
  } else {
    scorers[game.scored[i]] = 1;
  }
}
// Open vastaus
// So the solution is to loop over the array, and add the array elements as object properties, and then increase the count as we encounter a new occurence of a certain element
const scorers = {};
for (const player of game.scored) {
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}

//scorers = { ...game.scored };
console.log(scorers);


//Coding challenge 1---------------------------------

// const players1 = [...game.players[0]];
// console.log(players1);
// const players2 = [...game.players[1]];
// console.log(players2);

const [players1, players2] = game.players;
console.log(players1, players2);

const [gk, ...fieldplayers] = game.players[0];
console.log(gk, fieldplayers);

const allplayers = [...game.players[0], ...game.players[1]];
console.log(allplayers);

const Players1final = [...players1, "Thiago", "Coutinho", "Perisic"];
console.log(Players1final);

//const { team1, x: draw, team2 } = game.odds;
const {
  odds: { team1, x: draw, team2 },
} = game;
console.log(team1);
console.log(draw);
console.log(team2);

const printGoals = function (...goalMakers) {
  for (let i = 0; i < goalMakers.length; i++) {
    console.log(`Goal ${i + 1} was made by ${goalMakers[i]}`);
  }
};

printGoals("Davies", "Muller", "Lewandowski", "Kimmich");
printGoals(...game.scored);

console.log(
  ((game.odds.team1 < game.odds.team2 && game.team1) ||
    (game.odds.team2 < game.odds.team1 && game.team2)) +
    " is the probable winner."
);
team1 < team2 && console.log("Team 1 is the probable winner.");
team1 > team2 && console.log("Team 2 is the probable winner.");
*/
