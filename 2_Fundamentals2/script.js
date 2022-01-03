'use strict';
/*
let hasDriversLicense = false;
const passTest = true;

if(passTest) hasDriversLicense = true;
if (hasDriversLicense) console.log('I can drive')


// Lecture 33: functions---------------------------------------

function logger(){
    console.log('My name is Jonas');
}

// calling / running / invoking a function
logger();
logger();
logger();

function fruitProcessor(apples, oranges){
    const juice=`Juice with ${apples} apples and ${oranges} oranges.`;
    return juice;
}

const appleJuice = fruitProcessor(5, 0);
console.log(appleJuice);
// console.log(fruitProcessor(5, 0));

const appleOrangeJuice = fruitProcessor(2,4);
console.log(appleOrangeJuice);

// Lecture 34: Function declarations vs. expressions-----------------

// function declaration
function calcAge1(birthYear){
    return 2037 - birthYear;
}

const age1 = calcAge1(1991);
console.log(age1);

// Function expression
const calcAge2 = function (birthYear){
    return 2037 - birthYear;
}
const age2 = calcAge2(1991);
console.log(age1, age2);

// Lecture 35: Arrow functions-------------------------

// Arrow function
const calgAge3 = birthYear => 2037 - birthYear;
const age3 = calgAge3(1991)
console.log(age3);

const yearsUntilRetirement = (birthYear, firstname) => {
    const age = 2037 - birthYear;
    const retirement = 65 - age;
    //return retirement;
    return `${firstname} retires in ${retirement} years`;
}

console.log(yearsUntilRetirement(1991, 'Jonas'));
console.log(yearsUntilRetirement(1980, 'Bob'));


// Lecture 36: Functions calling other functions---------------------------

function cutFruitPieces(fruit){
    return fruit * 4;
}


function fruitProcessor(apples, oranges){
    const applePieces = cutFruitPieces(apples);
    const orangePieces = cutFruitPieces(oranges);

    const juice=`Juice with ${applePieces} pieces of apples and ${orangePieces} pieces of oranges.`;
    return juice;
}

console.log(fruitProcessor(2,3));

// Lecture 37: Reviewing functions

const calcAge = function(birthYear){
    return 2037 - birthYear;
}

const yearsUntilRetirement = function (birthYear, firstName){
    const age = calcAge(birthYear);
    const retirement = 65 - age;

    if(retirement > 0){
        console.log(`${firstName} retires in ${retirement} years`);
        return retirement;
    } else {
        console.log(`${firstName} Has already retired` );
        return -1;
    }
    
    //return `${firstname} retires in ${retirement} years`;
}

console.log(yearsUntilRetirement(1991, 'Jonas'));
console.log(yearsUntilRetirement(1950, 'Mike'));


// Lecture 39: Intro to Arrays--------------------------

const friend1 = 'Michael';
const friend2 = 'Steven';
const friend3 = 'Peter';

const friends = ['Michael', 'Steven', 'Peter'];
console.log(friends);

const y = new Array(1991, 1984, 2008, 2020);

console.log(friends[0]);
console.log(friends[2]);

console.log(friends.length);
console.log(friends[friends.length -1]);

friends[2] = 'Jay';
console.log(friends);

const firstName = 'Jonas'
const jonas = [firstName, 'Schmedtmann', 2037 - 1991, 'teacher', ['Michael', 'Steven', 'Peter']];
console.log(jonas);
console.log(jonas.length);

// Exercise

const calcAge = function (birthYear){
    return 2037 - birthYear;
} 

const years = [1990, 1967, 2002, 2010, 2018];

const age1 = calcAge(years[0]);
const age2 = calcAge(years[1]);
const age3 = calcAge(years[years.length -1]);
console.log(age1, age2, age3);

const ages = [calcAge(years[0]), calcAge(years[1]),calcAge(years[years.length -1])];
console.log(ages);

// Lecture 40: Basic array operations (Methods)--------------------

// add elements
const friends = ['Michael', 'Steven', 'Peter'];
const newLength = friends.push('jay'); // palauttaa pituuden arraysta
console.log(friends);
console.log(newLength) 

friends.unshift('John');
console.log(friends);

// remove elements

friends.pop(); // removes last
const popped = friends.pop(); // pop palauttaa poistetun elementin
console.log(friends);
console.log(popped);

friends.shift(); // poistaa ekan elementin ja palauttaa sen tarvittaessa
console.log(friends);

console.log(friends.indexOf('Steven'));
console.log(friends.indexOf('Bob'));

friends.push(23);
console.log(friends.includes('Steven'))
console.log(friends.includes('Bob'))
console.log(friends.includes('23')); // Strict, ei löydy

if(friends.includes('Steven')){
    console.log('Ypu have a friend called Steven');
}

// Lecture 42: Intro to objects------------------------------

const jonas = {
    firstName: 'Jonas', 
    lastName: 'Schmedtmann',
    age: 2037 - 1991,
    job: 'teacher',
    friends: ['Michael', 'Peter', 'Steven']
};

console.log(jonas);


// Lecture 43: Dot vs. Bracket notation---------------------

const jonas = {
    firstName: 'Jonas', 
    lastName: 'Schmedtmann',
    age: 2037 - 1991,
    job: 'teacher',
    friends: ['Michael', 'Peter', 'Steven']
};
console.log(jonas);

console.log(jonas.lastName);
console.log(jonas['lastName']);

const nameKey = 'Name';
console.log(jonas['first' + nameKey]);
console.log(jonas['last' + nameKey]);

const interestedIn =prompt('What do you want to know about Jonas? Choose between firstName, lastName, age, job and friends');

if (jonas[interestedIn]) {
    console.log(jonas[interestedIn]);
} else {
    console.log('Wrong request. Choose between firstName, lastName, age, job and friends')
};

jonas.location = 'Portugal';
jonas['twitter'] = '@jonasschmedtman';
console.log(jonas);

// Challenge
console.log(`${jonas.firstName} has ${jonas.friends.length} friends, and his best friend is called ${jonas.friends[0]}.`  );

// Lecture 44: Object methods--------------------

const jonas = {
    firstName: 'Jonas', 
    lastName: 'Schmedtmann',
    birthYear: 1991,
    job: 'teacher',
    friends: ['Michael', 'Peter', 'Steven'],
    hasDriversLicense: true,

//    calcAge: function(birthYear){
//        return 2037 - birthYear;
//   }

// calcAge: function() {
//     console.log(this);
//     return 2037 - this.birthYear;
// }
    calcAge: function() {
        this.age = 2037 - this.birthYear;
        return this.age;
    },
    summary: function() {
       console.log(`${this.firstName} is a ${this.calcAge()}-year old ${this.job}, and he has ${this.hasDriversLicense ? 'a' : 'no'} driver's license.`)
    },
    getSummary: function() {
        return `${this.firstName} is a ${this.calcAge()}-year old ${this.job}, and he has ${this.hasDriversLicense ? 'a' : 'no'} driver's license.`
     }
};

console.log(jonas.calcAge());

console.log(jonas.age);

// Challenge
jonas.summary();
console.log(jonas.getSummary());

// Lecture 46: Iteration: The for loop-------------------------


// for loop keeps running while condition is TRUE
for(let rep = 1; rep <= 10; rep++){
    console.log(`lifting weights repetition ${rep}`);
};


// Lecture 47: Looping arrays, breaking and continuing-------------

const jonas = [
    'Jonas', 
    'Schmedtmann', 
    2037 - 1991, 
    'teacher', 
    ['Michael', 'Steven', 'Peter'],
    true
];
const types = [];

for(let i = 0; i < jonas.length; i++){
    // reading from jonas array
    console.log(jonas[i], typeof jonas[i]);
    
    // filling types array
    // types[i] = typeof jonas[i];
    types.push(typeof jonas[i]);
}
console.log(types);

const years = [1991, 2007, 1969, 2020];
const ages = [];

for( let i= 0; i < years.length; i++){
    ages.push(2037 - years[i]);
}
console.log(ages);

// continue and break
console.log('--Only strings---');
for(let i = 0; i < jonas.length; i++){
    if(typeof jonas[i] !== 'string') continue;

    console.log(jonas[i], typeof jonas[i]);
}

console.log('--Break with number---');
for(let i = 0; i < jonas.length; i++){
    if(typeof jonas[i] === 'number') break;

    console.log(jonas[i], typeof jonas[i]);
}


// Lecture 48: Looping backwards and loops in loops----------------

const jonas = [
    'Jonas', 
    'Schmedtmann', 
    2037 - 1991, 
    'teacher', 
    ['Michael', 'Steven', 'Peter'],
    true
];
// for loop toisinpäin
for( let i = jonas.length -1; i >=0; i--){
    console.log(i, jonas[i]);
}

for(let exercise = 1; exercise <= 3; exercise++){
    console.log(`------Starting exercise ${exercise}-----`);
    for( let rep = 1; rep <= 5; rep++){
        console.log(`Exercise ${exercise}: Lifting weight repetition ${rep}`);
    }
}

// Lecture 49: The while loop----------------------

// for(let rep = 1; rep <= 10; rep++){
//     console.log(`FOR: lifting weights repetition ${rep}`);
// };

// let rep= 1;

// while (rep <= 10){
//     console.log(`WHILE: lifting weights repetition ${rep}`);
//     rep++;
// }

let dice = Math.trunc(Math.random() * 6) + 1;
//console.log(dice);

while(dice !== 6){
    console.log(`You rolled a ${dice}`);
    dice = Math.trunc(Math.random() * 6) + 1;
    if (dice === 6) console.log('Loop is about to end...');
}
*/