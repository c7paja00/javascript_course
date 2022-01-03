// Coding challenge 3
/*
const dolphinScore1 = 96;
const dolphinScore2 = 108;
const dolphinScore3 = 89;

const koalasScore1 = 88;
const koalasScore2 = 91;
const koalasScore3 = 110;

const averageScoreDolphin = (dolphinScore1 + dolphinScore2 + dolphinScore3) / 3;
const averageScoreKoala = (koalasScore1 + koalasScore2 + koalasScore3) / 3;

console.log(averageScoreDolphin, averageScoreKoala);

if(averageScoreDolphin > averageScoreKoala) {
    console.log('The Dolphins wins the trophy!');
} else {
    console.log('The Koalas wins the trophy!');
}
if (averageScoreDolphin === averageScoreKoala){
    console.log('The result is a draw');
}
*/
// Bonus 1:

const dolphinScore1 = 97;
const dolphinScore2 = 112;
const dolphinScore3 = 82;

const koalasScore1 = 109;
const koalasScore2 = 95;
const koalasScore3 = 86;

const averageScoreDolphin = (dolphinScore1 + dolphinScore2 + dolphinScore3) / 3;
const averageScoreKoala = (koalasScore1 + koalasScore2 + koalasScore3) / 3;

console.log(averageScoreDolphin, averageScoreKoala);

if(averageScoreDolphin >= 100 || averageScoreKoala >= 100) {
    if(averageScoreDolphin > averageScoreKoala){
        console.log('The Dolphins wins the trophy!');
    } else if(averageScoreKoala > averageScoreDolphin) {
        console.log('The Koalas wins the trophy!');
    } else if (averageScoreDolphin === averageScoreKoala){
        console.log('The result is a draw');
    }
}else {
    console.log('The score did not exceed 100.')
}

    

