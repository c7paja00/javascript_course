'use strict';
// Coding challenge 1
/*
const calcAverage = (value1, value2, value3) => (value1 + value2 + value3) / 3;
//console.log(calcAverage(2, 3, 4));

let avgDolphins = calcAverage(44, 23, 71);
let avgKoalas = calcAverage(65, 54, 49);
//console.log(avgDolphins, avgKoalas);

const checkWinner = function (dolphins, koalas) {
    if (dolphins >= koalas * 2){
        console.log(`Dolphins win (${dolphins} vs. ${koalas})` );
    } else if(koalas >= dolphins *2){
        console.log(`Koalas win (${koalas} vs. ${dolphins})`);
    }else {
        console.log(`Neither team has enough points to win`)
    }
}

checkWinner(avgDolphins, avgKoalas);

avgDolphins = calcAverage(85, 54, 41);
avgKoalas = calcAverage(23, 34, 27);

checkWinner(avgDolphins, avgKoalas);


// Coding challenge 2

const calcTip = function(bill){
    let tip;
    if (bill >= 50 && bill <= 300){
        tip = bill * 0.15;
    } else {
        tip = bill * 0.2;
    }
    return tip;
}

//const calcTip = function (bill){
//    return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
//}
//console.log(calcTip(400));

const bills = [125, 555, 44];
const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2]) ];
console.log(bills, tips);
const total = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2], ];
console.log(total);


// Coding challenge 3

const MarkObject = {
    firstName: 'Mark',
    lastName: 'Miller',
    mass: 78,
    height: 1.69,
    calcBMI: function(){
        this.bmi = this.mass / this.height ** 2;
        return this.bmi;
    }
}
const JohnObject = {
    firstName: 'John',
    lastName: 'Smith',
    mass: 92,
    height: 1.95,
    calcBMI: function(){
        this.bmi = this.mass / this.height ** 2;
        return this.bmi;
    }
}

if (MarkObject.calcBMI() > JohnObject.calcBMI()){
    console.log(`${MarkObject.firstName} ${MarkObject.lastName}'s BMI(${MarkObject.bmi}) is higher than ${JohnObject.firstName} ${JohnObject.lastName}'s BMI(${JohnObject.bmi})`);
}else {
    console.log(`${JohnObject.firstName} ${JohnObject.lastName}'s BMI(${JohnObject.bmi}) is higher than ${MarkObject.firstName} ${MarkObject.lastName}'s BMI(${MarkObject.bmi})`);
}


// Coding challenge 4

const calcTip = function (bill){
   return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
}

const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const totals = [];

for( let i = 0; i < bills.length; i++){
    tips.push(calcTip(bills[i]));
    totals.push(bills[i] + tips[i]);
}
console.log(tips);
console.log(totals);


const calcAverage = function(arr){
    let sum = 0;
    let averageSum = 0;
    for( let i = 0; i < arr.length; i++){
        sum += arr[i];
    }
    averageSum = sum / arr.length;
    return averageSum;
}

console.log(calcAverage(totals));

*/