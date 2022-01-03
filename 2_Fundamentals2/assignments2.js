/*
// Lecture 33: functions---------------------------------------

function describeCountry(country, population, capitalCity){
    const description = `${country} has ${population} people and its capital city is ${capitalCity}.`;
    return description;
}


const country1 = describeCountry('Finland', 5000000, 'Helsinki');
console.log(country1);

const country2 = describeCountry('Sweden', 10000000, 'Stockholm');
console.log(country2);

const country3 = describeCountry('Norway', 4000000, 'Oslo');
console.log(country3);



// Lecture 34: Function declarations vs. Expressions

function percentageOfWorld1(population){
    return (population / 7900000000) * 100;
}

const country1 = percentageOfWorld1(5000000);
const country2 = percentageOfWorld1(1441000000);
const country3 = percentageOfWorld1(350000000);
console.log(country1, country2, country3);

const percentageOfWorld2 = function (population){
    return (population / 7900000000) * 100;
}
console.log(percentageOfWorld2(5000000), percentageOfWorld2(1441000000), percentageOfWorld2(350000000));


// Lecture 35: Arrow functions----------------------------
const countryPercentage = population => (population / 7900000000) * 100;

console.log(countryPercentage(5000000));

// Lecture 36: Functions calling other functions---------------------------

function percentageOfWorld1(population){
    return (population / 7900) * 100;
}

function describePopulation(country, population){
    return `${country} has ${population} million people, which is about ${percentageOfWorld1(population)}% of the world.`;
}
console.log(describePopulation('China', 1441));
console.log(describePopulation('Finland', 5));
console.log(describePopulation('USA', 350));

// Lecture 39: Intro to Arrays----------------------------

const populations = [5, 350, 1441, 10];
console.log(populations.length === 4);

function percentageOfWorld1(population){
    return (population / 7900) * 100;
}

const percentages= [percentageOfWorld1(populations[0]), percentageOfWorld1(populations[1]), percentageOfWorld1(populations[2]),percentageOfWorld1(populations[3])];
console.log(percentages);

// Lecture 40: Basic array operations-----------------------------

const neighbours = ['Sweden', 'Norway', 'Russia'];
console.log(neighbours);
neighbours.push('utopia');
console.log(neighbours);
neighbours.pop();
console.log(neighbours);
if(!neighbours.includes('Germany')){
    console.log('Probably not in the central European countries')
};
const indexSweden = neighbours.indexOf('Sweden');
console.log(indexSweden);
neighbours[0] = 'Republic of Sweden';
console.log(neighbours);

// Lecture 42: Intro to objects------------------------------

const myCountry = {
    country: 'Finland',
    capital: 'Helsinki',
    language: 'Finnish',
    population: 5,
    neighbours: ['Sweden', 'Norway', 'Russia']
}
console.log(myCountry);


// Lecture 43: Dot vs. Bracket notation---------------------
const myCountry = {
    country: 'Finland',
    capital: 'Helsinki',
    language: 'finnish',
    population: 5,
    neighbours: ['Sweden', 'Norway', 'Russia']
}

console.log(`${myCountry.country} has ${myCountry.population} million ${myCountry.language}-speaking people, ${myCountry.neighbours.length} neighbouring countries and a capital called ${myCountry.capital}.`);

myCountry.population = myCountry.population + 2;
console.log(myCountry);
myCountry['population'] = myCountry['population'] - 2;


// Lecture 44: Object methods--------------------

const myCountry = {
    country: 'Finland',
    capital: 'Helsinki',
    language: 'finnish',
    population: 5,
    neighbours: ['Sweden', 'Norway', 'Russia'],
    describe: function(){
        console.log(`${this.country} has ${this.population} million ${this.language}-speaking people, ${this.neighbours.length} neighbouring countries and a capital called ${this.capital}.`);
    }
}
myCountry.describe();


// Lecture 46: The for loop------------------------------------

for( let voter = 1; voter <= 50; voter++){
    console.log(`Voter number ${voter} is voting.`);
}

// Lecture 47: Looping arrays, breaking and continuing-------------

const populations = [5, 350, 1441, 10];

function percentageOfWorld1(population){
    return (population / 7900) * 100;
}

percentages2 = [];

for (let i = 0; i < populations.length; i++){
    percentages2[i] = percentageOfWorld1(populations[i]);
}
console.log(percentages2);

// Lecture 48: Looping backwards and loops in loops----------------

const listOfNeighbours = [['Canada', 'Mexico'], ['Spain'], ['Norway', 'Sweden', 'Russia']];
//console.log(listOfNeighbours.length);
//console.log(listOfNeighbours[0]);

for(let i = 0; i < listOfNeighbours.length; i++){
   //console.log(listOfNeighbours[i]); 
    for(let j = 0; j < listOfNeighbours[i].length; j++){
        console.log(`Neighbour: ${listOfNeighbours[i][j]}`);
    }
}
*/
// Lecture 49: The while loop----------------------

const populations = [5, 350, 1441, 10];

function percentageOfWorld1(population){
    return (population / 7900) * 100;
}

percentages3 = [];

let i = 0;
while ( i < populations.length){
    percentages3[i] = percentageOfWorld1(populations[i]);
    i++
}

// for (let i = 0; i < populations.length; i++){
//     percentages2[i] = percentageOfWorld1(populations[i]);
// }
console.log(percentages3);