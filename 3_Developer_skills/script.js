// Remember, we're gonna use strict mode in all scripts now!
'use strict';
/*
console.log('Moro');
const temperature = [1, 2, 4, 21, 5, -7, 2, 'error'];
const temperature2 = [12, 22, 10, 8, -3, -6];

const calcTempAplitudeNew = function (t1, t2) {
  const temps = t1.concat(t2);

  let max = temps[0];
  let min = temps[0];
  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];
    if (typeof curTemp !== 'number') continue;
    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
  }
  console.log(max);
  console.log(min);

  return max - min;
};

// const calcTempAplitude = function (temps) {
//   let max = temps[0];
//   let min = temps[0];
//   for (let i = 0; i < temps.length; i++) {
//     const curTemp = temps[i];
//     if (typeof curTemp !== 'number') continue;
//     if (curTemp > max) max = curTemp;
//     if (curTemp < min) min = curTemp;
//   }
//   console.log(max);
//   console.log(min);

//   return max - min;
// };
const amplitude = calcTempAplitudeNew(temperature, temperature2);
console.log(amplitude);

const measureKelvin = function () {
  const measurement = {
    type: 'temp',
    unit: 'cels',
    value: Number(prompt('Degrees Celsius:')),
  };
  //console.log(measurement);
  console.table(measurement); // Näyttää objektin taulukkona
  // console.log(measurement.value);
  //   console.warn(measurement.value); // varoitus
  //   console.error(measurement.value); // errorit

  const kelvin = measurement.value + 273;
  return kelvin;
};
console.log(measureKelvin());
*/

// coding challenge 1

const temps1 = [17, 21, 23];
const temps2 = [12, 5, -5, 0, 4];

const printforecast = function (temps) {
  let tempString = '... ';
  for (let i = 0; i < temps.length; i++) {
    tempString += `${temps[i]} C in ${i + 1} days ... `;
  }
  console.log(tempString);
};

printforecast(temps1);
printforecast(temps2);
