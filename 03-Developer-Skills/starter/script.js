// Remember, we're gonna use strict mode in all scripts now!
'use strict';

// https://prettier.io/docs/en/options.html

// const x = 23;
// if (x === 23) console.log(23);

// const calcAge = birthYear => 2037 - birthYear;

// console.log();
// console.log('👻');
// console.log(calcAge);

///////////////////////////////////////
// Using Google, StackOverflow and MDN

// PROBLEM 1:
// We work for a company building a smart home thermometer. Our most recent task is this:
//--"Given an array of temperatures of one day, calculate the temperature amplitude.
//--Keep in mind that sometimes there might be a sensor error."

const temperatures = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];

// 1) Understanding the problem
// - What is temp amplitude? Answer: difference between highest and lowest temp
// - How to compute max and min temperatures?
// - What's a sensor error? And what do do?

// 2) Breaking up into sub-problems
// - How to ignore errors?
//-----filter array out of non-number values
//// Solution for a simple array
// function findAmplitude(temperatures) {
//   const temps = temperatures.filter(val => typeof val == 'number');
//   console.log(temps);
//   // - Find max value in temp array
//   const maxTemp = Math.max(...temps);
//   console.log(maxTemp);
//   // - Find min value in temp array
//   const minTemp = Math.min(...temps);
//   console.log(minTemp);
//   // - Subtract min from max (amplitude) and return it
//   const amplitude = maxTemp - minTemp;
//   console.log(amplitude);
//   return amplitude;
// }

// findAmplitude(temperatures);

//// Solution for a huge array, 10s of 1000s of items
// const calcTempAmplitude = tempArr => {
//   let minTemp = tempArr[0];
//   let maxTemp = tempArr[0];
//   for (let i = 0; i < tempArr.length; i++) {
//     const currentTemp = tempArr[i];
//     if (typeof currentTemp !== 'number') continue;
//     if (tempArr[i] > maxTemp) maxTemp = tempArr[i];
//     if (tempArr[i] < minTemp) minTemp = tempArr[i];
//   }
//   return maxTemp - minTemp;
// };
// const amplitude = calcTempAmplitude(temperatures);
// console.log(amplitude);

// PROBLEM 2:
// Function should now receive 2 arrays of temps

// 1) Understanding the problem
// - With 2 arrays, should we implement functionality twice? NO! Just merge two arrays

// 2) Breaking up into sub-problems
// - Merge 2 arrays
// const moreTemperatures = [45, -23, 0, 1];
// const calcTempAmplitude = (tempArr1, tempArr2) => {
//   const tempArr = tempArr1.concat(tempArr2);
//   // console.log(tempArr);
//   let minTemp = tempArr[0];
//   let maxTemp = tempArr[0];
//   for (let i = 0; i < tempArr.length; i++) {
//     const currentTemp = tempArr[i];
//     if (typeof currentTemp !== 'number') continue;
//     if (tempArr[i] > maxTemp) maxTemp = tempArr[i];
//     if (tempArr[i] < minTemp) minTemp = tempArr[i];
//   }
//   return maxTemp - minTemp;
// };
// const amplitude = calcTempAmplitude(temperatures, moreTemperatures);
// console.log(amplitude);

// ////////////// Debugging Practice
// const measureKelvin = () => {
//   const measurement = {
//     type: 'temp',
//     unit: 'celcius',
//     value: prompt('Degrees celcius: '),
//   };

//   const kelvin = Number(measurement.value) + 273;
//   return kelvin;
// };

// console.log(measureKelvin());

///////////////////////////////////////
// Coding Challenge #1

/*
Given an array of forecasted maximum temperatures, the thermometer displays a string with these temperatures.

Example: [17, 21, 23] will print "... 17ºC in 1 days ... 21ºC in 2 days ... 23ºC in 3 days ..."

Create a function 'printForecast' which takes in an array 'arr' and logs a string like the above to the console.

Use the problem-solving framework: Understand the problem and break it up into sub-problems!

TEST DATA 1: [17, 21, 23]
TEST DATA 2: [12, 5, -5, 0, 4]
*/

// create a function
function printForecast(arr) {
  // we're given an array of numbers
  // take each of those numbers and use it in a string
  let forecastString = '...';
  for (let i = 1; i <= arr.length; i++) {
    forecastString += ` ${arr[i - 1]}'C in ${i} days ...`;
  }
  return forecastString;
}

console.log(printForecast([17, 21, 23]));
console.log(printForecast([12, 5, -5, 0, 4]));
