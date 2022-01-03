/*
// Lecture 20: Type conversion and coercion----------------

// Type conversion
const inputYear = '1991';
console.log(Number(inputYear), inputYear);
console.log(Number(inputYear) + 18);

console.log(Number('Jonas'));
console.log(typeof NaN);

console.log(String(23), 23);


// type coercion

console.log('I am ' + 23 + ' years old');
console.log('23' - '10' - 3);
console.log('23' * '2');
console.log('23' > '18');

let n = '1' + 1; // 11
n = n - 1; // 10
console.log(n);

// Lecture 21: Truthy and falsy values-----------------

// 5 falsy values 0, '', undefined, null, NaN

console.log(Boolean(0));
console.log(Boolean(undefined));
console.log(Boolean('Jonas'));
console.log(Boolean({}));
console.log(Boolean(''));

const money = 0;

if(money){
    console.log("Don't spend it all.")
} else {
    console.log("You should get a job.")
}

let height;
if (height){
    console.log('Yay, height is defined')
} else {
    console.log('Heigth is UNDEFINED')
}

// Lecture 22: Equality operators == vs === ----------------------------

const age = '18';

if(age === 18) console.log('You just became an adult(strict)');

if(age == 18) console.log('You just became an adult(loose)'); 

const favourite = Number(prompt("Whtat's yout favorite number"));
console.log(favourite);

if(favourite === 23) { // '23' == 23 -> true
    console.log('Cool! 23 is an amazing number!');
} else if(favourite === 7){
    console.log('7 is also a cool number.');
}else {
    console.log('Number is not 23 or 7.');
}

if(favourite !== 23){
    console.log('Why not 23?');
}


// Lecture 23: Boolean logic ----------------------------------------

// AND -> true when all variables are true
// OR -> true when one variable is true
// NOT -> inverts true/false value

// Lecture 24: Logical operators-------------------------------

const hasDriversLicense = true;
const hasGoodVision = true;

console.log(hasDriversLicense && hasGoodVision);
console.log(hasDriversLicense  || hasGoodVision);
console.log(!hasDriversLicense);

if(hasDriversLicense && hasGoodVision) {
    console.log('Sarah is able to drive.');
} else {
    console.log('Somenone else should drive...');
}

const isTired = false; // variable C

console.log(hasDriversLicense  && hasGoodVision && isTired);
 
if(hasDriversLicense && hasGoodVision && !isTired) {
    console.log('Sarah is able to drive.');
} else {
    console.log('Somenone else should drive...');
}


// Lecture 26: The switch statement--------------------------------

const day = 'thursday';
switch(day){
    case 'monday': // day === 'monday'
        console.log('Plan course structure');
        console.log('Go to coding meetup');
        break;
    case 'tuesday':
        console.log('Prepare theory videos');
        break;
    case 'wednesday':
    case 'thursday':
        console.log('Write code examples');
        break;
    case 'friday':
        console.log('Record videos')
        break;
    case 'saturday':
    case 'sunday':
        console.log('Enjoy the weekend')
        break;
    default:
        console.log('Not a valid day')     
}       

if(day === 'monday'){
    console.log('Plan course structure');
    console.log('Go to coding meetup');
} else if( day === 'tuesday'){
    console.log('Prepare theory videos');
} else if( day === 'wednesday' || day === 'thursday'){
    console.log('Write code examples');
} else if( day === 'friday'){
    console.log('Record videos');
} else if( day === 'saturday' || day === 'sunday'){
    console.log('Enjoy the weekend');
} else{
    console.log('Not a valid day')
}
*/

// Lecture 28: The conditional (Ternary) Operator----------------------------

const age = 23;
//age >= 18 ? console.log('I like to drink wine.') : console.log('I like to drink water.');

const drink = age >= 18 ? 'wine' : 'water';
console.log(drink)

let drink2;
if(age >= 19){
    drink2 = 'wine';
}else {
    drink2 = 'water'
}
console.log(drink2)

console.log(`I like to drink ${age >= 18 ? 'wine' : 'water'}`);

