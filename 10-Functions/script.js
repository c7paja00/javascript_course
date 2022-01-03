'use strict';

/*
// default paramaters-----------------------------------
const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers // default arvon voi syöttää suoraan funktion muuttujiin
) {
  // ES5, vanha tyyli
  //   numPassengers = numPassengers || 1;
  //   price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123'); // antaa default arvot 2. ja 3. arvoille
createBooking('LH123', '2', 800); // ohittaa kaikki default arvot
createBooking('LH123', '5'); // 3. arvo default

createBooking('LH123', undefined, 1000); // undefinedia voi käyttää ohittamaan argumentti

// How passing arguments works: value vs. reference-------------------------

const fligth = 'LH123';
const jonas = {
  name: 'Jarmo Patsi',
  passport: 123412534,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr.' + passenger.name;

  if (passenger.passport === 123412534) {
    alert('Check in.');
  } else {
    alert('Wrong passport!');
  }
};

// checkIn(fligth, jonas);
// console.log(fligth);
// console.log(jonas);

// // same as doing...
// const flightNum = fligth; // referenssityyppinen viittaus tekee kopion alkuperäisestä, ei muuta sitä
// const passenger = jonas; // Annetaan objekti, joka osoittaa kohteeseen jonka tiedot on memory heapissa, joten sen vuoksi muutokset uudessa vaikuttavat myös alkuperäiseen.

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 1000000000);
};

newPassport(jonas);
checkIn(fligth, jonas);

// Functions accepting Callback functions----------------------------

const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// Higher-order function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Trasformed string: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`);
};

transformer('JavaScript is the best!', upperFirstWord);

transformer('JavaScript is the best!', oneWord);

//Js uses callbacks all the time
const high5 = function () {
  console.log('!!');
};
document.body.addEventListener('click', high5);

['Jonas', 'Martha', 'Adam'].forEach(high5);


// Functions returning functions-----------------------------

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};
// const greeterHey = greet('Hey');
// greeterHey('Jonas');
// greeterHey('Steven');

// greet('Hello')('Jonas');

const greetArrow = greeting => name => console.log(`${greeting} ${name}`);

const greeterHey = greetArrow('Hey');
greeterHey('jonas');
greeterHey('Steven');


// The call and apply methods-------------------------------------

const luftHansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

luftHansa.book(239, 'Jarmo Patsi');
luftHansa.book(635, 'John Smith');
console.log(luftHansa);

const eurowings = {
  name: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = luftHansa.book;

//DOES not work
//book(23, 'Sarah Williams');

// CALL method
book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings);

book.call(luftHansa, 239, 'Mary Cooper');
console.log(luftHansa);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 503, 'Mary Cooper');
//console.log(swiss);

// The APPLY method
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);

// parempi versio applysta:
book.call(swiss, ...flightData);
console.log(swiss);

// The BIND method--------------------------------------------
//book.call(eurowings, 23, 'Sarah Williams');

const bookEW = book.bind(eurowings);
const bookLH = book.bind(luftHansa);
const bookLX = book.bind(swiss);

bookEW(23, 'Steven williams');
console.log(eurowings);

const bookEW23 = book.bind(eurowings, 23);
bookEW23('Jarmo Patsi');
bookEW23('Martha Cooper');

// Event listeners

luftHansa.planes = 300;
luftHansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};
document
  .querySelector('.buy')
  .addEventListener('click', luftHansa.buyPlane.bind(luftHansa));

// Partial application

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);
// addVAT = value => value + value * 0.23;

console.log(addVAT(100));
console.log(addVAT(23));

// Challenge
// normi funktiona
const addVAT2 = function (vat) {
  console.log(vat);
  return function (value) {
    console.log(value + value * vat);
  };
};
// arrow-funktiona
const addVAT2Arr = vat => value => console.log(value + value * vat);

const calcVat = addVAT2(0.23);
const calcVarArr = addVAT2Arr(0.3);

calcVat(1000);
calcVarArr(1000);


// Coding challenge 1

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: Javascript', '1: Python', '2: Rust', '3: C++'],
  answers: new Array(4).fill(0),

  registerNewAnswer() {
    // get the answer
    const answer = Number(
      prompt(
        `${this.question} \n${this.options.join('\n')}\n(Write option number)`
      )
    );
    //Register answer

    // open versio(shortcircuiting)
    //typeof answer === 'number' && answer < this.answers.length && this.answers[answer]++;

    if (typeof answer === 'number' && answer < this.answers.length) {
      this.answers[answer]++;
    } else {
      alert('Not an option');
      this.registerNewAnswer();
    }
    this.displayResults(this.answers);
    // console.log(answer);
    // console.log(this.answers);
    // console.log(typeof this.answers);
  },
  displayResults(type) {
    const resultType = prompt('Display results as a string or array?', 'array');
    if (resultType === 'string') {
      console.log(`Poll results are ${type.toString()}`);
    } else {
      console.log(...type);
    }
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

// const testData1 = [5, 2, 3];
// const testData2 = [1, 5, 3, 9, 6, 1];

// poll.displayResults(testData1);
// poll.displayResults(testData2);


// Immediately invoked function expressions (IIFE)------------------------------
// Jos haluaa suorittaa funktion vain kerran ja heti
const runOnce = function () {
  console.log('This will never run again');
};
runOnce();

// IIFE
(function () {
  console.log('This will never run again');
  const isPrivate = 23;
})();
//console.log(isPrivate); // ei pääse käsiksi muuttujaan

(() => console.log('This will ALSO never run again'))();

{
  const isPrivate = 23;
  var notPrivate = 46;
}
//console.log(isPrivate); // ei pääse käsiksi muuttujaan
console.log(notPrivate); // var on globaali


// Closures----------------------------------------------------------

const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};
const booker = secureBooking();
booker(); // 1 passengers
booker(); // 2 passengers
booker(); // 3 passengers
// closuren avulla funktiolla on pääsy luojafunktion muuttujiin, jopa sen jälkeen kun luojafunktio on päättynyt.
console.dir(booker); // nähdään closure consolissa


// More closure examples--------------------------------------------

// example 1
let f;
const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

g();
f(); // funktio pääsee käsiksi g():n muuttujaan a closuren avulla, jonka avulla sillä on siihen pääsy

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
console.dir(f);

// Re-assigning
h();
f();
console.dir(f);

// example 2

const boardPassengers = function (number, wait) {
  const perGroup = number / 3;

  setTimeout(function () {
    console.log(`We are now boarding ${number} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};

const perGroup = 1000; // ei käytä tätä vaan funktion sisäistä closure muuttujaa
boardPassengers(180, 3);

// setTimeout(function () {
//   console.log('TIMER');
// }, 1000);
*/

// Coding challenge 2

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
