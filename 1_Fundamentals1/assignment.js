const country = 'Finland';
const continent = 'Europe';
const population = 5000000;
const isIsland = false;
const language = 'finnish';

/*
const numNeighbours = Number(prompt('How many neighbours does your country have?'));

if (numNeighbours === 1){
    console.log('Only 1 border!')
} else if(numNeighbours > 1){
    console.log('Several borders!')
}else{
    console.log('No borders!')
}


if(language === 'English' && population < 50000000 && !isIsland){
    console.log('You Should live in Finland');
}else{
    console.log('Finland does not meet your criteria.');
}

switch (language){
    case 'chinese':
        console.log('MOST number of native speakers.');
        break;
    case 'spanish':
        console.log('2nd place in number of native speakers.');
        break;
    case 'english':
        console.log('3rd place.');
        break;
    case 'hindi':
        console.log('Number 4');
        break;
    case 'arabic':
        console.log('5th most spoken language.');
        break;
    default:
        console.log('Great language too.');
}
*/

console.log(`${country}'s population is ${population > 33000000 ? 'above' : 'below'} average.`)