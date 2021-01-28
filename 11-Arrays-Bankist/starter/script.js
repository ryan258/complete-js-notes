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
// labels - all places where we want to put some text
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

// DISPLAY TRANSACTIONS
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
      <div class="movements__value">${mov}€</div>
    </div>
    `;

    // use .insertAdjecentHTML('position', 'html we want to insert') to place it on the screen inside .movements

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// GENERATE ACCOUNT BALANCES FOR EACH USE AND DISPLAY THEM
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = acc => {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => (acc += mov));
  // console.log(incomes);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => (acc += mov), 0);
  // console.log(out);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => deposit * (acc.interestRate / 100))
    .filter((int, i, arr) => {
      // console.log(arr); // a good place to debug by logging out the array it's filtering
      return int >= 1;
    })
    .reduce((acc, int) => (acc += int), 0);
  labelSumInterest.textContent = `${interest}€`;
};

// CREATE USERNAMES
const createUsernames = function (accs) {
  // we're going to use forEach to change the original accounts array with calc'd data, making a side effect on purpose and not returning anything!
  // SIDE EFFECTS - do some work, without returning anything
  accs.forEach(function (acc) {
    // create a new property on each of the objects
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
// console.log(createUsernames('Steven Thomas Williams')); // stw
createUsernames(accounts);
// console.log(accounts);
const updateUI = acc => {
  // display movements
  displayMovements(acc.movements);
  // display balance
  calcDisplayBalance(acc);
  // display summary
  calcDisplaySummary(acc);
};

// EVENT HANDLER
let currentAccount;

btnLogin.addEventListener('click', e => {
  e.preventDefault();
  // console.log('login!');
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and a Welcome message
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }, you lovable scamp!`;
    containerApp.style.opacity = 100;

    // Clear input fields
    // the assignment operator works from right to left, so it cascades ''s
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // update UI
    updateUI(currentAccount);

    // console.log('you hacked the grid!');
  }
});

btnTransfer.addEventListener('click', e => {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  // find the account that matches the transfer to input
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  // console.log(amount, receiverAcc);
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance > amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // console.log('Transaction completed successfully!');
    // Do the transfer!
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update the UI
    updateUI(currentAccount);
  }
});

// bank rule: only grants a loan if there is at least 1 deposit worth 10% of the requested loan amount
btnLoan.addEventListener('click', e => {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    console.log('loan approved!');
    // add movement
    currentAccount.movements.push(amount);

    updateUI(currentAccount);
    inputLoanAmount.value = '';
  }
});

btnClose.addEventListener('click', e => {
  e.preventDefault();
  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    // console.log('deleting!');
    const accToDelete = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(accToDelete);
    // delete account
    accounts.splice(accToDelete, 1);
    console.log(accounts);

    // hide UI
    containerApp.style.opacity = 0;
  }
  // clear close account inputs
  inputCloseUsername.value = inputClosePin.value = '';
});

///////////////////////////////////////
// COMPUTING USERNAMES
// const user = 'Steven Thomas Williams'; // stw
// const username = user
//   .toLowerCase() //[STRING] all letters are lowercased
//   .split(' ') //[ARRAY] names are split up
//   .map(name => name[0]) //[ARRAY of strings] get a new array that just contains the first letter of each array item
//   .join(''); //[STRING] join the first letters array into a string
// console.log(username); // display 'stw'
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

///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:
*/

// const checkDogs = (dogsJulia, dogsKate) => {
/*1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)*/
// const dogsArrayJulia = [...dogsJulia].splice(1, 2);
// console.log(dogsArrayJulia);
/*2. Create an array with both Julia's (corrected) and Kate's data*/
// const allDogs = [...dogsArrayJulia, ...dogsKate];
// console.log(allDogs);
/*3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")*/
// allDogs.forEach((age, i) => {
// if (age >= 3) {
//   console.log(`Dog number ${i + 1} is an adult, and is ${age} years old`);
// } else {
//   console.log(`Dog number ${i + 1} is a puppy, and is ${age} years old`);
// }
//     age >= 3
// ? console.log(`Dog number ${i + 1} is an adult, and is ${age} years old`)
//       : console.log(`Dog number ${i + 1} is a puppy, and is ${age} years old`);
//   });
// };

// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);
/*4. Run the function for both test datasets
TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]*/

///////////////////////////////////////
// DATA TRANSFORMATIONS: MAP, FILTER, REDUCE
// - Used to create new arays, transforming data from other arrays

// array.map()
// Maps values from an old array to a NEW array
// - like forEach() but creates a BRAND NEW array based on the original and usually way more useful.
// - loops over each iteration of the array and applies a callback function to it and adds it to a new array

// array.filter()
// Used to filter elements from the original array that meets a certain condition.

// array.reduce()
// Used to boil down all array elements down to a SINGLE VALUE
// - it has an accumulator that keeps track
// - and holds a current value, that gets added to the accumulator
// - think of it as a SNOWBALL that grows as it rolls down the hill
// then it's this single value that ultimately gets returned from the reduce method

///////////////////////////////////////
// DATA TRANSFORMATIONS: MAP (more inline with functional programming)
// Loops over each element of an array, applies a callback function and RETURNs a new value to a new array.
// arr.map(function(a[, b, c]){...})
// - a = the transformation of the current array item
// - b = the incrementor
// - c = the entire array
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const doubleMovements = movements.map(item => item * 2);
// console.log(doubleMovements);

const usd2ars = 150;

const inPesos = movements.map(dollars => dollars * usd2ars);

console.log(inPesos);

const prices = [500, 750, 1000, 1250, 1500, 2000, 2500, 3000, 3500, 4000];

const inDollars = prices.map(
  arPrice => `${arPrice} pesos is $${Math.round(arPrice / usd2ars)} in dollars`
);
inDollars.forEach(result => console.log(result));

// DO IT AS A FOR OF LOOP
// - as this philisophy is to loop and push to an array that WE MANUALLY CREATE
const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * usd2ars);
console.log(movementsUSDfor);

// FORoF LEEP FOR FUN
// - we're printing each line as we loop over the array (a side effect, where we console log as a result of each loop)
const dollarAmts = [1, 5, 10, 20, 100, 500, 750, 1000];
for (const dollarAmt of dollarAmts) {
  console.log(
    `${dollarAmt} dollars is ${Math.round(
      dollarAmt * usd2ars
    )} ars, which is ${Math.round((dollarAmt * usd2ars) / 500)} 500 notes.`
  );
}

// DEEPER WITH MAP
// - we just return each of the strings from the callback to the new array
const movementDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);
// - then we finally log the whole array to the console
console.log(movementDescriptions);
*/

///////////////////////////////////////
// DATA TRANSFORMATIONS: FILTER
// Filter for elements that satisfy a certain condition
// arr.filter(function(a[, b, c]){...})
// - a = the transformation of the current array item
//////// and return a boolean value
// - b = the incrementor // rarely used
// - c = the entire array // rarely used

// We want to use this approach as the push for functional programming continues
// - this is more practical because we can chain all these methods together

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const deposits = movements.filter(function (mov) {
//   // pass in the item
//   return mov > 0; // return item if it meets the conditional criteria
// });

// console.log(movements);
// console.log(deposits);

// DEMOSTRABLE DIFFERENCE FROM THE FORoF LOOP
// we have to manually create a new array
// impossible to do chaining with the for loop

// const depositsFor = [];
// for (const mov of movements) if (mov > 0) depositsFor.push(mov);
// console.log(depositsFor);

// const withdrawals = movements.filter(mov => mov < 0);
// console.log(withdrawals);

///////////////////////////////////////
// DATA TRANSFORMATIONS: REDUCE
// Boil down all the elements in an array into a single value
// arr.reduce(function(ACC, cur, i, arr){}, initialAccVal) - the callback function will be called for each iteration of the array
// - ACC = the ACCUMULATOR (the snowball) - REQ
// - cur = current element of the array - REQ
// - i = current index
// - arr = the entire array
// - initialAccVal = initial accumulator value - REQ

/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Let's get the global balance
// accumulator - the sum - our snowball <3
const balance = movements.reduce(function (acc, cur, i) {
  // now, what to do with each iteration
  console.log(`Iteration #${i}: ${acc}`);
  return (acc += cur);
  // return so the accumulator will be available for the next iteration of the loop
}, 0);

// SIMPLER WAY
const balance = movements.reduce((acc, cur) => (acc += cur), 0);

console.log(`Balance: $${balance}`);

// DONE WITH A FORoF LOOP
// you're always stuck using this external variable... which becomes impractical if we're using many loops for many operations
// so the data transformation methods that we're using avoid the need for this extra variable,
// they just return the value right away!
let balanceFor = 0; // like an initial accumulator value

for (const movement of movements) balanceFor += movement;

console.log(`BalanceFor: $${balanceFor}`);
*/

// OTHER STUFF with REDUCE

// Maximum Value
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const maxMovement = movements.reduce(
  (acc, curr) => (acc > curr ? acc : curr),
  movements[0] // don't just put 0 here when going for min or max value, start with the first item of the array to avoid edge cases
);
console.log(maxMovement);
*/

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:
*/

// const calcAverageHumanAge = ages => {
//   /*1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.*/
//   const humanAgesArray = ages
//     .map(
//       dogAge => (dogAge <= 2 ? dogAge * 2 : 16 + dogAge * 4)
//       // let humanAge;
//       // if (dogAge <= 2) {
//       //   humanAge = dogAge * 2;
//       // } else {
//       //   humanAge = 16 + dogAge * 4;
//       // }
//       // return humanAge;
//     )
//     /*2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)*/
//     .filter(dog => dog >= 18)
//     /*3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)*/
//     .reduce((acc, ageNum, i) => {
//       return (acc += ageNum) / (i + 1);
//     }, 0);
//   console.log(humanAgesArray);
// };
// /*4. Run the function for both test datasets*/

// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
// /*TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
// TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

// GOOD LUCK 😀
// */

// const calcAverageHumanAge2 = function (ages) {
//   const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
//   console.log(humanAges);
//   const adults = humanAges.filter(age => age >= 18);
//   console.log(adults);
//   // const average = adults.reduce((acc, age) => acc + age, 0) / adults.length;
//   // console.log(average);
//   const average = adults.reduce(
//     // 2 3. (2+3)/2 = 2.5 === 2/2 + 3/2 = 2.5
//     (acc, age, i, arr) => acc + age / arr.length,
//     0
//   );

//   console.log(average);

//   return average;
// };

// calcAverageHumanAge2([5, 2, 4, 1, 15, 8, 3]); // 44
// calcAverageHumanAge2([16, 6, 10, 5, 6, 1, 4]); // 47.3

///////////////////////////////////////
// CHAINING METHODS - our transformation pipeline
// - BUT chaining a ton of methods can cause performance issues, especially if you have huge arrays
//   - so we should try to condense things down into as few methods as possible
//   - it's common to create way more map methods than we really need
//     where we could do it all in a single .map() call --- so always keep an eye out, to look for opportunities to increase performance
// - it's also BAD PRACTICE to chain methods that mutate the underlying original array (ie. .splice() or .reverse())

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const euroToUSD = 1.1;

// // here we can keep chaining because they just keep returning arrays
// const depositsInUSD = movements
// .filter(mov => mov > 0)
// // .map(mov => mov * 1.1)
// // we can use the other params to see what's going on (item, int, arr, )
//   .map((mov, i, arr) => {
//     console.log(arr);
//     return mov * euroToUSD;
//   })
//   .reduce((acc, mov) => (acc += mov), 0);
// console.log(depositsInUSD);

///////////////////////////////////////
// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
/*
const calcAverageHumanAge = ages =>
  ages
    .map(age => (age <= 2 ? age * 2 : 16 + age * 4))
    .filter(age => {
      return age >= 18;
    })
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

console.log(avg1, avg2);
*/

///////////////////////////////////////
// (ES6) The .find() METHOD ---- returns an element of the array, unlike .filter() which returns a whole array
//                        returns undefined if there are no
// - retrieve one element of an array, based on a condition
// - will return the FIRST item in the array that satisfies this condition
// - can also accept a callback function that will be called with each loop through the array
// - it loops through but does something different
// USUALLY THE GOAL OF THE .find() IS TO FIND EXACTLY 1 ELEMENT
// - so we usually set up a condition so that only 1 element can satisfy that condition

/*const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const firstWithdrawal = movements.find(mov => mov < 0);

console.log(firstWithdrawal);

// so we can find an object in an array based on a property of that object
console.log(accounts);

// USUALLY THE GOAL OF THE .find() IS TO FIND EXACTLY 1 ELEMENT
// - so we usually set up a condition so that only 1 element can satisfy that condition
// hence that === operator
const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// so we can search an array for an object that contains a certain property that we know
console.log(account);*/

///////////////////////////////////////
// (ES6) The .findIndex() METHOD --- works like .find() but returns the index of the found element instead of the element itself
// we'll do close an account feature, remove it from the accounts array, we'll use the splice method for this, which need that index

///////////////////////////////////////
// .some() & .every()
// - while there's a .includes() method, it only checks for a simple equality, .some() lets us be more dynamic in our criteria
// - if you hear ANY in the description, it's usually a good case for the .some() method
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// EQUALITY
// .includes() - test if array includes a certain value
// -- but we can only really test for equality
// .every() is like .some() but tests that every item in the array meets a certain condition
// console.log(movements.includes(-130)); // true

// CONDITION
// .some() method
// console.log(movements.some(mov => mov === -130)); // true, same as the .includes() example
// - tests for condition instead of equality
// -example: are there any deposits on this account?
// const anyDeposits = movements.some(mov => mov > 0);
// console.log(`Are there deposits? ${anyDeposits ? 'yes!' : 'nope...'}`);

// .every() method
// - like .some() but tests that every item in the array meets a certain condition
// console.log(movements.every(mov => mov > 0)); // false
// console.log(account4.movements.every(mov => mov > 0)); // true (as it has only deposits)

// Separate callback - then we could use this all over the place where there's a callback condition
//                   - better for the DRY principle
// const deposit = mov => mov > 0;
// console.log(movements.some(deposit));
// console.log(movements.every(deposit));
// console.log(movements.filter(deposit));
