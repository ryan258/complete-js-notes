'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov.toFixed(2)}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.ceil(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/////////////////////////////////////////////////
// CONVERTING and CHECKING NUMBERS
// - all numbers internally in JS are represented as floating point numbers
//   (there are always decimals in them numbers)
/*
console.log(23 === 23.0); // true
// BASE 10 = 0 to 9             - 1/10 = 0.1, but 3/10 = 3.33333333, which is what happens with binary
// Binary is BASE 2 = 0 to 1    -
// - can't represent 0.1
console.log(0.1 + 0.2); // .3000000000004
// JS tries itself behind the scenes to hide these problems, but sometimes it just can't, and it's not just JS
// - so just know that you can't do super precise scientific or financial calcs in JS, bc you'll run into this kind of problem
console.log(0.1 + 0.2 === 0.3); // false

// Convert a string to a number
console.log(Number('23'));
// short cut - type coercion
console.log(+'23'); // 23 (as a number)

//! These are both global functions so we don't even need to call them from Number!
// Parsing - integers - .parseInt(string, numbar base)
console.log(Number.parseInt('30px', 10)); // 30
//for this to work the string must start with a number
console.log(Number.parseInt('e23', 10)); // NaN
// if we were working with bianary
console.log(Number.parseInt('30px', 2)); // NaN

// Parsing - float - .parseFloat()
// - white space doesn't effect anything
//! .parseFloat() is your go-to whenever you need to read a value out of a string, like from CSS
console.log(Number.parseFloat('     2.5rem ')); // 2.5
console.log(Number.parseInt(' 2.5rem    ')); // 2
//! But these days it is encouraged to call these functions as methods from the Number object
// -- the Number provides a "namespace"

// Let's talk about isNaN()
// - only use to check if value is NOT a NUMBER - in practice you NEVER USE THIS
console.log(Number.isNaN(20)); //---- false
console.log(Number.isNaN('20')); //-- false
console.log(Number.isNaN(+'20X')); // true
console.log(Number.isNaN(23 / 0)); // true - because infinity is not a number

//! GO TO THE BEST WAY TO CHECK IF IT'S A NUMBER, like... a real number
// Number.isFinite() - GOOD FOR FLOATING POINT NUMBERS - opposite of NaN but also tests for finite
// - if you're just checking FOR INTERGER you can use .isInteger() as well
console.log('--- isFinite() ---');
console.log(Number.isFinite(20)); //---- true - calls a number a number
console.log(Number.isFinite('20')); //-- false - doesn't coerce values
console.log(Number.isFinite(+'20X')); // false
console.log(Number.isFinite(23 / 0)); // false - because infinity is not a number

// .isInteger() - if you're just checking FOR INTERGER
console.log('--- isInteger() ---');
console.log(Number.isInteger(20)); //---- true
console.log(Number.isInteger(21.0)); //-- true
console.log(Number.isInteger(21.3)); //-- false
console.log(Number.isInteger('20')); //-- false  - doesn't coerce values
console.log(Number.isInteger(+'20X')); // false
console.log(Number.isInteger(23 / 0)); // false - because infinity is not a number
*/

/////////////////////////////////////////////////
// MATH & ROUNDING
/*
// Math Object Methods
console.log(Math.sqrt(25)); // 5
console.log(25 ** (1 / 2)); // 5
console.log(8 ** (1 / 3)); //- 2 "a cuebic root"

console.log(Math.max(5, 18, 4, 23, 51, 12)); //--- 51
console.log(Math.max(5, 18, 4, 23, '51', 12)); //- 51 - also does type coercion
console.log(Math.max(5, 18, 4, 23, '51z', 12)); // NaN - but it doesn't parse...

console.log(Math.min(5, 18, 4, 23, 51, 12)); //------ 4
console.log(Math.min(5, 18, '4', 23, '51', 12)); //-- 4 - also does type coercion
console.log(Math.min(5, 18, '4z', 23, '51z', 12)); // NaN - but it doesn't parse...

// Math Object Constants
console.log(Math.PI); // 3.141592653589793
// get area of a circle with a radius of 10px
console.log(Math.PI * Number.parseFloat('10px') ** 2);
console.log('Math.random() - gives a random number between 0 & 1');
console.log(Math.random());
console.log(Math.random() * 6);
console.log(`--- simulate dice rolls ---`);
console.log(
  'simulate dice rolls (1-6): ' + (Math.trunc(Math.random() * 6) + 1)
);

// Method to always get a number between MIN and MAX
// - min not included
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;
// Math.random gives us a number between 0 and 1
// 0....(max-min)
// min...(max - min + min)
// min...max
console.log(randomInt(-10, 20));
// roll a 20 sided dice
console.log('--- simulated 20 sided dice rolls ---');
console.log(randomInt(1, 20));
// for (let i = 0; i < 100; i++) console.log(randomInt(1, 3));

// Rounding Integers
// - all these methods also do type coercion

// Math.trunc(num) - simply removes any decimal part
console.log(Math.trunc(23.3)); // 23
console.log(Math.trunc(23.6)); // 23
// Math.round(num) - round to the nearest integer
console.log(Math.round(23.3)); // 23
console.log(Math.round(23.6)); // 24
// Math.floor(num) - round DOWN to the nearest integer
console.log(Math.floor(23.3)); // 23
console.log(Math.floor(23.6)); // 23
// Math.ceil(num) - round UP to the nearest integer
console.log(Math.ceil(23.3)); // 24
console.log(Math.ceil(23.6)); // 24

// floor and trunc do the same when we are dealing with positive numbers
// but not so for negative numbers
//! Use Math.floor() over Math.trunc() in most cases
console.log(Math.trunc(-23.6)); // -23
console.log(Math.floor(-23.6)); //- -24

// Rounding Decimals
// .toFixed(num of decimal places)
// - it returns a string - weird, yes, but it is what it is
console.log((2.7).toFixed(0)); // (string) 3
console.log((2.7).toFixed(3)); // (string) 2.700
console.log((2.345).toFixed(2)); // (string) 2.35
console.log(+(2.345).toFixed(2)); // (number) 2.35

// numbers are primitives, and behind the scenes JS will do boxing
// boxing = transforms the number primative into a number object
//          then calls the method on that object
//          then when the method is done, converts it back to a primative
*/

/////////////////////////////////////////////////
// THE REMAINDER OPERATOR (%)
// - returns the remainder of a division
// - good for when you need to do something every (n)th time
/*
console.log(5 % 2); // 1
console.log(5 / 2); // 2.5 // 5 = 2 * 2 + 1
console.log(8 % 3); // 2
console.log(8 / 3); // 2   // 8 = 2 * 3 + 2

//! use case: is a number even or odd? - or when you need to do something every (n)th time
console.log(6 % 2); // 0 - even
console.log(6 / 2); // 3 - even
console.log(7 % 2); // 1 - odd
console.log(7 / 2); // 3.5 - odd

let oddNum = 5;
console.log(oddNum % 2 ? 'it is odd' : 'it is even');
let evenNum = 4;
console.log(evenNum % 2 ? 'it is odd' : 'it is even');

const isEven = n => n % 2 === 0;
console.log(isEven(8)); //-- true
console.log(isEven(23)); //- false
console.log(isEven(514)); // true

// add zebra striping to our transactions when you click on the balance
labelBalance.addEventListener('click', () => {
  [...document.querySelectorAll('.movements__row')].forEach((row, i) => {
    // at 0, 2, 4, 6, ...
    if (i % 2 === 0) row.style.backgroundColor = 'lightBlue';
    // let's make every 3rd row another color
    // at 0, 3, 6, 9, ...
    if (i % 3 === 0) row.style.backgroundColor = 'lightYellow';
  });
});
*/

/////////////////////////////////////////////////
// WORKING WITH BIGINT - (ES2020)
// - BIGint is a special kind of integer
// - number are represented internally as 64-bits
//   (means there are 64 1's and 0's to represent any given number)
// --- only 53 are used to store digits, others represent the position of the decimal point and assign
// --- so there's a limit as to how big numbers can be
// --- numbers bigger than this lose precision // some numbers work, others don't - hence, "unsafe numbers"

/*console.log(2 ** 53 - 1); // 9007199254740991 - largest num JS can safely represent // 2 because it is base 2, 0s and 1s
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
console.log(2 ** 53 + 0); // 9007199254740992
console.log(2 ** 53 + 1); // 9007199254740992
console.log(2 ** 53 + 2); // 9007199254740994
console.log(2 ** 53 + 3); // 9007199254740996
console.log(2 ** 53 + 4); // 9007199254740996

// BIGINT
// Just use n at the end of a number to make it big int!
// - In ES2020 we got big int
// - can be used to store numbers as large as we want
// - in practice you're not going to use it very much, but it is still good to know  how it works

console.log(745484854754745634653765444777888999000); // 7.454848547547457e+38 (probably doesn't have precision)
console.log(745484854754745634653765444777888999000n); // 745484854754745634653765444777888999000n, the n transformed it into a BIGINT number, and it looks different in the console

console.log(BigInt(745484854754745634653765444777888999000)); // 745484854754745652964038751962294910976n
// gives us kinda the same number?... JS first has to represent the number internally before it can transform it into a big int
// so i guess this constructor function should only be used with small numbers

// Operations
// - all the usual operators still work the same
console.log(10000n + 10000n); // 20000n
console.log(745484854754745652964038751962294910976n * 1000000000n); // 745484854754745652964038751962294910976000000000n
//! you cannot mix big ints with regular numbers

const huge = 745484854754745652964038751962294910976n;
const num = 10;
// console.log(huge * num); // TypeError: Cannot mix BigInt and other types, use explicit conversions.
// so we have to convert the other number to a big int
console.log(huge * BigInt(num)); // 7454848547547456529640387519622949109760n

// Exceptions to this limitation

// logical operators
console.log(20n > 15); // true
console.log(20n == 20); // true, double = does type coercion
console.log(20n == '20'); // true, double = does type coercion
console.log(20n === 20); // false, triple = does not use type coercion, the 2 different values have a different primitive time
console.log(typeof 20n); // bigint

// string concatinations
console.log(huge + ' is REALLY BIG!'); // 745484854754745652964038751962294910976 is REALLY BIG! // see, the n was stripped out

// other limitations
// console.log(Math.sqrt(16n)); // TypeError: Cannot convert a BigInt value to a number

// divisions - since bigint is an integer
// - it basically cuts the decimal part off
console.log(10 / 3); // 3.33333333333
console.log(10n / 3n); // 3n
console.log(12 / 3); // 4
*/
