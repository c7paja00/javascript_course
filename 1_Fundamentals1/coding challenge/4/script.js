// Coding challenge 4

const bill = 430;
const tipPercent = bill < 50 || bill > 300 ? 0.2 : 0.15;
const tip = bill * tipPercent;

console.log (`The bill was ${bill}, the tip was ${tip}, and the total value ${bill + tip}.`);
