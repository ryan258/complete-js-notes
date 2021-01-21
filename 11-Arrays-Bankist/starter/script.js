'use strict';
// WE USE A CALLBACK FUNCTION TO TELL A HIGHERORDER FUNCTION WHAT IT SHOULD DO
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

// it's best practice to pass the data into a function instead of having a function work with a global variable.
// template literals are amazing for creating html templates
const displayMovements = function (movements) {
  // clear out container contents
  containerMovements.innerHTML = '';

  movements.forEach(function (mov, i) {
    // if we're going to need it twice, combine it into 1 variable
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}</div>
    </div>
    `;

    // use .insertAdjecentHTML('position', 'html we want to insert') to place it on the screen inside .movements

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovements(account1.movements);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// Simple Array Methods
// - Why do arrays have methods?
//   Methods basically functions that we can call on objects
//   - so arrays themselves are also objects
//   - so these array methids are functions that are attached to all arrays we have in JS
//

// let arr = ['a', 'b', 'c', 'd', 'e'];

// SLICE - extract part of an array WITHOUT affecting the original array
//       - very much like the slice method we have on strings
//       - "take a slice of an array"
//       - RETURNS a NEW ARRAY
// arr.slice(a, [b])
// -   = (no params) returns a shallow copy of an array
// - a = (start param) index from which we will start extracting
// - b = (end param) [optional] the index of the end of the slice (UPTO not including)
//       - if missing it'll assume to the end of the array
// negative parameters are counting from the end of the array

// console.log(arr.slice(2)); //  start extracting at index 2 (until the end) // ["c", "d", "e"]
// console.log(arr.slice(2, 4)); //  start extracting at index 2 (UNTIL the forth) // ["c", "d"], so really just 2, 3
// console.log(arr.slice(-2)); // start extracting from the second to last index // ["d", "e"]
// console.log(arr.slice(-1)); // start extracting from the last index // ["e"]
// console.log(arr.slice(1, -2)); // start extracting from index 1 UNTIL the second to last // ["b", "c"]
// // can also be used to create a shallow copy of an array
// console.log(arr.slice()); // ["a", "b", "c", "d", "e"] // only really need this when you're chaining multiple methods together
// console.log([...arr]); // same as createing a new array and spreading into it, it's up to you how you want to do it

// SPLICE - works like .slice() BUT IT CHANGES THE ORIGINAL ARRAY (MUTATES)
//        - in practice, the values the .slice method returns doesn't even interest us, we just want to delete elements with it usually
//          like removing the last element of an array
// arr.splice(a, [b])
// -   = (no params) returns a shallow copy of an array
// - a = (start param) index from which we will start extracting
// - b = (delete count) [optional] the number of array spots to delete
// console.log(arr.splice(2)); // ["c", "d", "e"] (only ["a", "b"] remain in that actual array)

// arr.splice(-1); // remove last element of an array
// console.log(arr); // ["a", "b", "c", "d"]
// arr.splice(1, 2); // from index 1, remove 2 array entries // b and c are deleted
// console.log(arr); // ["a", "d"]

// REVERSE - reverse the items of an array, CHANGES THE ORIGINAL ARRAY (MUTATES)
// arr.reverse()

// arr = ['a', 'b', 'c', 'd', 'e']; // restore array after all that slicing
// const arr2 = ['j', 'i', 'h', 'g', 'f'];
// console.log(arr2.reverse());
// console.log(arr2); // CHANGES THE ORIGINAL ARRAY (MUTATES)

// CONCAT - concatenate two arrays together (DOES NOT MUTATE aka Immutable!)
// arr.concat(a)
// - a = the second array to tack on to the end of the first, target array
// you can also use [...arrayA, ...arrayB] to do the same, just personal preference

// const letters = arr.concat(arr2);  // immutable
// console.log(letters);
// console.log([...arr, ...arr2]);    // immutable

// JOIN - creates a string by combining all the items of an array with a seperator
// arr.join(a);
// - a = 'seperator'

// console.log(letters.join(' - ')); // "a - b - c - d - e - f - g - h - i - j"

///////////////////////////////////////
// Looping Arrays: forEach - a HIGHER ORDER method
// - Fundamentally different from the for of loop
//   - You CANNOT BREAK out of a forEach loop (continue & break; don't work at all)
//   - otherwise, personal preference
//   - much easier to get the current index
//   - note that the first item destructured is the index, where as in forEach(function()) the second parameter is the iterator
// - Loops over an array and  each iteration executes the function
//   but also pass in the current element of the array as an argument
// - It's technically a higher order function
// arr.forEach(a(a1, a2, a3)) --- order matters!
// - a = Callback function (contains the instructions to perform on each array item)
// - a1 = element's value
// - a2 = iteration #
// - a3 = [the entire array that we are looping!]

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// We'll deposit or withdraw some money depending if the number is - or not.

// doing it as a for of loop

// for (const movement of movements) { // if we're just using the value
// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`Movement ${i + 1}: You deposited ${movement}`);
//   } else {
//     console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
//   }
// }

// This can be done in an easier way with .forEach()

// console.log('---- FOREACH ----');
// movements.forEach(function (mov, i, arr) {
//   // more real world parameter names
//   if (mov > 0) {
//     console.log(`Movement ${i + 1}: You deposited ${mov} - Array: ${arr}`);
//   } else {
//     console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
//   }
// });

// 0: function(200)
// 1: function(450)
// 2: function(400)
// ...

// most of the following higher order methods will follow a very familiar pattern
// forEach is also available on maps and sets!

///////////////////////////////////////
// forEach With Maps and Sets
// - much like the array

// Map
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function (value, key, map) {
//   // note the 3 parameters
//   // console.log(`${key}: ${value} in ${[...map]}`);
//   console.log(`${key}: ${value}`);
// });

// Set
// - key is the same as the value
// - indexes don't have values because Sets are unordered
// const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
// console.log(currenciesUnique); // Set(3): {"USD", "GBP", "EUR"}

// currenciesUnique.forEach(function (value, _, set) {
//   // an underscore (_) means a throw away variable, completely unnecessary
//   // note the 3 parameters
//   console.log(`${value}: ${value} in ${[...set]}`);
// });

// 'USD: USD'
// 'GBP: GBP'
// 'EUR: EUR'
