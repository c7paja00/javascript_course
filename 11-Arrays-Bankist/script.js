'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = ''; // Tyhjentää containerin
  // iteroidaan movements-array läpi

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal'; // onko pano vai otto
    // luodaan oma rivi jokaisesta tapahtumasta
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html); // syötetään luotu rivi conatainerin alkuun
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const createUserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUserNames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display Balance
  calcDisplayBalance(acc);

  // Display Summary
  calcDisplaySummary(acc);
};

// Eventhandlers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // ?-merkki muuttujan perässä tarkastaa onko ko. muuttujaa olemassa

    // Display UI and welcome-message
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100; // UI visible

    // Clear the Input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // update UI
    updateUI(currentAccount);

    console.log('login');
  }

  console.log(currentAccount);
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //uodate UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // add movement
    currentAccount.movements.push(amount);
    // update UI
    updateUI(currentAccount);
    inputLoanAmount.value = '';
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);

    // delete account
    accounts.splice(index, 1);

    // hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/*

// Simple array methods-------------------------------------

let arr = ['a', 'b', 'c', 'd', 'e'];

//SLICE
console.log(arr.slice(2)); // 2 loppuun on mukana
console.log(arr.slice(2, 4)); // 4 ei enää ole mukana
console.log(arr.slice(-2)); // 2 viimeistä
console.log(arr.slice(-1)); // viimeinen
console.log(arr.slice(1, -2)); // toinen ja kolmas, -2 on tässä tilanteessa lopetusargumentti, eli kahta viimeistä ei oteta mukaan
console.log(arr.slice()); // shallow copy
console.log([...arr]); // shallow copy, sama kuin yllä

// SPLICE

//console.log(arr.splice(2)); // poistaa alkuperäisestä valitun osan
arr.splice(-1); // poistaa viimeisen osan
console.log(arr); // alkuperäisestä on nyt pois yllä valitut
arr.splice(1, 2); // toinen osa kertoo kuinka monta osaa poistetaan ensimmäisen muuttujan kohdasta eteenpäin
console.log(arr);

arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse()); // muuttaa alkuperäisen myös
console.log(arr2);

// CONCAT

const letters = arr.concat(arr2); // lisää arr:n perään arr2:n
console.log(letters);
console.log(...arr, ...arr2); // toimii samalla tavalla kuin concat mutta ei muuta alkuperäisiä

// JOIN
console.log(letters.join('-')); // lisää kirjainten väliin väliviivan

// Looping arrays: foreach----------------------------------------------

// foreach käy aina koko arrayn läpi, sitä ei voi lopettaa kesken kuten 'for of'-loopilla
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  // eka muuttuja indexi, toinen elementti
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}
console.log('----FOREACH--------------');
movements.forEach(function (mov, i, arr) {
  // järjestys mitä foreach tuo mukaanaan: elementti, indexi, koko array
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
});
// 0: function(200)
// 1: function(450)
// 2: function(400)
// ...

// Foreach with maps and sets------------------------------------------------

//MAP
const currencies = new Map([
  ['USD', 'United States dollar'], // key, value
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

//SET----------------------------------------------------------------

const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);

currenciesUnique.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`); // Key on sama arvo kuin value, koska setissä ei ole key-arvoa.
});

// coding challenge 1-------------------------------------------

const julia1 = [3, 5, 2, 12, 7];
const kate1 = [4, 1, 15, 8, 3];
const julia2 = [9, 16, 6, 8, 3];
const kate2 = [10, 5, 6, 1, 4];

const checkDogs = function (dogsJulia, dogsKate) {
  const juliaCorrected = [...dogsJulia].slice(1, -2);

  // console.log(juliaCorrected);
  // console.log(dogsJulia);
  const allDogs = [...juliaCorrected, ...dogsKate];
  //const allDogs = juliaCorrected.concat(dogsKate); // Toinen tapa
  // console.log(allDogs);

  allDogs.forEach(function (age, i) {
    const adultOrPuppy =
      age < 3 ? 'still a puppy' : `an adult, and is ${age} years old`;
    console.log(`Dog number ${i + 1} is ${adultOrPuppy} `);
  });
};
console.log('Data1');
checkDogs(julia1, kate1);
console.log('Data2');
checkDogs(julia2, kate2);

// The MAP method--------------------------------------------------
const eurToUsd = 1.1;
// map-funktiolla
const movementsUSD = movements.map(function (mov) {
  return mov * eurToUsd;
});
// Arrow funktio
const movementsUSDArrow = movements.map(mov => mov * eurToUsd);
console.log(movements);
console.log('------normi------');
console.log(movementsUSD);
console.log('------Arrow------');
console.log(movementsUSDArrow);

// for of-loop
// const movementsUSDfor = [];
// for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
// console.log(movementsUSDfor);

const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);
console.log(movementsDescriptions);

// The FILTER method-------------------------------------------------

const deposits = movements.filter(function (mov, i, arr) {
  return mov > 0;
});
console.log(movements);
console.log(deposits);

// for of-loop
const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);

const withdrawals = movements.filter(mov => mov < 0); // muista, että nuolen jälkeinen on aina return-arvo
console.log(withdrawals);

// The REDUCE-method-----------------------------------------------------

console.log(movements);

// accumulator is like a snowball
// const balance = movements.reduce(function (accumulator, currentValue, i, arr) {
//   console.log(`Iteration ${i}: ${accumulator}`);
//   return accumulator + currentValue;
// }, 0); // 0 on accumulatorin alkuarvo

const balance = movements.reduce(
  (accumulator, currentValue, i) => accumulator + currentValue,
  0
); // 0 on accumulatorin alkuarvo

console.log(balance);

// for of loop
let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);

// Maximum value---------------------------------------------------

const maximum = movements.reduce(
  (acc, mov) => (acc < mov ? mov : acc),
  movements[0] // movement[0] on alkuarvo accumulatorille
);
console.log(movements);
console.log(maximum);

// Coding challenge 2-----------------------------------------

const calcAverageHumanAge = function (dogAges) {
  // 1
  const humanAges = dogAges.map(dogAge =>
    dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4
  );
  console.log(humanAges);
  // 2
  const adultDogs = humanAges.filter(humanAge => humanAge >= 18);
  console.log(adultDogs);
  // 3
  const averageHumanAge =
    adultDogs.reduce((acc, adultDog) => acc + adultDog, 0) / adultDogs.length;

  // toinen versio keskiarvon laskemiseen
  // const averageHumanAge =
  // adultDogs.reduce((acc, adultDog, i, arr) => acc + adultDog/arr.length, 0);
  console.log(averageHumanAge);
};
console.log('Data1');
calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
console.log('Data2');
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);


// The magic of chaining methods---------------------------------------

const eurToUsd = 1.1;

// Pipeline
const totalDepositsInUSD = movements
  .filter(mov => mov > 0)
  .map((mov, i, arr) => {
    //console.log(arr); // voidaan suorittaa bugitarkistus seuraavan arrayn tiedoista
    return mov * eurToUsd;
  })
  //.map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsInUSD);

// Coding challenge 3--------------------------------------------

const calcAverageHumanAge = dogAges =>
  dogAges
    .map(dogAge => (dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4))
    .filter(humanAge => humanAge >= 18)
    .reduce((acc, adultDog, i, arr) => acc + adultDog / arr.length, 0);
console.log('Data1');
console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log('Data2');
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

// the FIND-method-------------------------------------------------------

// find palauttaa ensimmäisen kohteen mikä passaa hakuehtoon
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

const accountFor = function (accounts) {
  let foundAccount;
  for (const acc of accounts) {
    if (acc.owner === 'Jessica Davis') {
      foundAccount = acc;
    }
  }
  return foundAccount;
};
console.log(accountFor(accounts));


// SOME and EVERY------------------------------------

console.log(movements);
// testing for equality
console.log(movements.includes(-130));

// SOME: testing for condition
console.log(movements.some(mov => mov > 0));

// EVERY: tests that every element passes the condition
console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

// separate callback
// Käytetään funktiota muuttujana
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));


// FLAT and FLATMAP--------------------------------------------------

const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());
const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2)); // numerolla määritetään flattauksen syvyys/kerroin

// flat
const overallBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov);
console.log(overallBalance);

// flatMap
const overallBalance2 = accounts
  .flatMap(acc => acc.movements) // map() ja flat() yhdistettynä
  .reduce((acc, mov) => acc + mov);
console.log(overallBalance2);


// Sorting Arrays---------------------------------------------------------

// Strings
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());
console.log(owners); // alkuperäinen on myös muuttunut

// Numbers
//console.log(movements);
//console.log(movements.sort()); // sort ei toimi suoraan numeroilla

// return < 0, -> A, B (keep order)
// return > 0, -> B, A (switch order)

// Ascending
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (a < b) return -1;
// });
movements.sort((a, b) => a - b);
console.log(movements);

// Descending
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (a < b) return -1;
// });
movements.sort((a, b) => b - a);
console.log(movements);


// more ways of creating and filling arrays

const arr = [1, 2, 3, 4, 5, 6, 7];

// empty arrays + fill method
const x = new Array(7); // luo 7 paikkaisen tyhjän arrayn
console.log(x);
//console.log(x.map(() => 5)); ei toimi

//x.fill(1);
//x.fill(1, 3); // fill aloittaa kohdasta 3
x.fill(1, 3, 5); // täytetään indexistä 3 indexiin 5 ykkösiä
console.log(x);

arr.fill(23, 2, 6); // 23 paikkoihin 2-6
console.log(arr);

// Array.from()
const y = Array.from({ length: 7 }, () => 1); // 7 kokoinen array täynnä ykkösiä
console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1); // Array täytetty 1-7, alaviiva on tarkoitettu sellaisille muuttujille, joita ei tarvita
console.log(z);

// challenge: 100 dice rolls to an array
const diceRolls = Array.from({ length: 100 }, () =>
  Math.trunc(Math.random() * 6 + 1)
);
console.log(diceRolls);

// Otetaan rahaliikenne suoraan nettisivulta ja muokataan se numeroiksi ilman €-merkkiä
labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );
  console.log(movementsUI);

  // Array voidaan luoda myös:
  // const movementsUI2 = [...document.querySelectorAll('.movements__value')];
  // console.log(movementsUI2);
});


// Array methods practice-----------------------------------------------------

// 1. kaikkien panojen summa
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);

const bankDepositSum2 = accounts.reduce(
  (sum, acc) =>
    sum + acc.movements.reduce((sum, cur) => (cur > 0 ? sum + cur : sum), 0),
  0
);

console.log(bankDepositSum);
console.log(bankDepositSum2);

//  2. Kuinka monta yli tonnin panoa on tileillä

// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000).length;

const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0); // ++ countin jälkeen ei toimi tässä tilanteessa, katso alla

console.log(numDeposits1000);

// prefixed ++ operator
let a = 10;
console.log(a++); // returns 10, suorittaa lisäyksen mutta palauttaa vielä 10
console.log(a); // returns 11, lisäys näkyy tässä
console.log(++a); // returns 12, ++ ennen muuttujaa palauttaa lisäyksen kanssa

// 3.

const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(deposits, withdrawals);

// 4.

//this is a nice title -> This Is a Nice Title

const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  const exceptions = ['a', 'an', 'the', 'and', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');

  return capitalize(titleCase);
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('This is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));


// Coding challenge 4

const dogs = [
  { weigth: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weigth: 8, curFood: 200, owners: ['Matilda'] },
  { weigth: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weigth: 32, curFood: 340, owners: ['Michael'] },
];
// 1.
dogs.forEach(
  dog => (dog.recommendedFood = Math.trunc(dog.weigth ** 0.75 * 28))
);
console.log(dogs);

// 2.
const sarahDog = dogs.findIndex(dog => dog.owners.includes('Sarah'));
console.log(sarahDog);

console.log(
  `Sarah's dog is eating too${
    dogs[sarahDog].curFood < dogs[sarahDog].recommendedFood
      ? ' little'
      : ' much'
  })`
);
// 3.
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recommendedFood)
  .reduce((owner, dog) => owner.concat(dog.owners), []);
// Open versio:reducen tilalla .flatMap(dog => dog.owners)
console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recommendedFood)
  .reduce((owner, dog) => owner.concat(dog.owners), []);
// Open versio:reducen tilalla .flatMap(dog => dog.owners)
console.log(ownersEatTooLittle);

// 4.
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little`);

// 5.
console.log(dogs.some(dog => dog.curFood === dog.recommendedFood));

// 6.
// current > (recommended * 0.90) && current < (recommended *1.10)
console.log(
  dogs.some(
    dog =>
      dog.curFood > dog.recommendedFood * 0.9 &&
      dog.curFood < dog.recommendedFood * 1.1
  )
);

// 7.

const eatingOkay = dogs.filter(
  dog =>
    dog.curFood > dog.recommendedFood * 0.9 &&
    dog.curFood < dog.recommendedFood * 1.1
);
console.log(eatingOkay);

// 8.
//.slice().sort((a, b) => a - b)
const sortedDogs = dogs
  .slice()
  .sort((a, b) => a.recommendedFood - b.recommendedFood);
console.log(sortedDogs);
*/
