'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [
    200,
    455.23,
    -306.5,
    25000,
    -642.21,
    -133.9,
    79.97,
    1300,
    22,
    3,
    4,
    5,
    4000,
  ],
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
    '2020-09-11T10:51:36.790Z',
    '2020-10-11T10:51:36.790Z',
    '2021-01-29T10:51:36.790Z',
    '2021-01-30T10:51:36.790Z',
    '2021-01-31T10:51:36.790Z',
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

const account3 = {
  owner: 'Lucas Diaz',
  movements: [420, 24, -420, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 3333,

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
  locale: 'es-AR',
};

const accounts = [account1, account2, account3];

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
const formatMovementDate = (date, locale) => {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  // console.log(daysPassed);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();

  // return `${day}/${month}/${year}`;

  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    // new Intl.NumberFormat(acc.locale, {
    //   style: 'currency',
    //   currency: acc.currency,
    // }).format(mov);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div className="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  // const formattedMov = formatCur(acc.balance, acc.locale, acc.currency);

  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
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
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;
// FAKE ALWAYS LOGGED IN
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    // Create current date and time
    // const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    // Internationalize it!
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      // weekday: 'long',
    };
    // const locale = navigator.language;
    // console.log(locale);
    // we'll us the language specified in the user's account
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // containerApp.style.opacity = 100;

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

    // Add Transfer Date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

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

    // Add Loan Date
    currentAccount.movementsDates.push(new Date().toISOString());

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
    // console.log(index);
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

/////////////////////////////////////////////////
// CREATING DATES

// Create a Date - there are 4 ways...
// - they all use the new Date() constructor function, but they can accept different parameters
/*
// Way 1
const now1 = new Date();
console.log(now1); // Mon Feb 01 2021 08:50:06 GMT-0600 (Central Standard Time)

// Way 2 - parse the date from a string
const now2 = new Date('Feb 01 2021 08:47:25');
console.log(now2); // Mon Feb 01 2021 08:47:25 GMT-0600 (Central Standard Time)

// Way 3 - write a string ourselves - generally not a good idea bc it can be unreliable - but if string is made by JS itself, it should be safe
const now3 = new Date('December 24, 2015');
console.log(now3); // Thu Dec 24 2015 00:00:00 GMT-0600 (Central Standard Time)

// let's take a date from our bankist app - Z in a time date means universal time, no time zone nor day light savings
console.log(new Date(account1.movementsDates[0])); // Mon Nov 18 2019 15:31:17 GMT-0600 (Central Standard Time)

// we can also throw whatever in the constructor - the MONTH is JS is 0 BASED
console.log(new Date(2037, 10, 19, 15, 23, 5)); // Thu Nov 19 2037 15:23:05 GMT-0600 (Central Standard Time)
// JS also auto corrects the date
console.log(new Date(2037, 10, 31)); // Tue Dec 01 2037 00:00:00 GMT-0600 (Central Standard Time)
// amount of milliseconds since the UNIX time - January 1st, 1970
console.log(new Date(0)); // Wed Dec 31 1969 18:00:00 GMT-0600 (Central Standard Time)
// convert from 3 days to milliseconds
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // Sat Jan 03 1970 18:00:00 GMT-0600 (Central Standard Time)
// 3 * 24 * 60 * 60 * 1000 = 259200000 - the time stamp

// DATES ARE THEIR OWN TYPE OF OBJECT - SO THEY HAVE THEIR OWN SPECIAL METHODS
// - so we can get or set different components of the string

// Working with dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(future); // Thu Nov 19 2037 15:23:00 GMT-0600 (Central Standard Time)
console.log(future.getFullYear()); //! 2037 - never use .getYear() - always use .getFullYear()
console.log(future.getMonth()); // 10 - months are 0 based
console.log(future.getDate()); // 19 - day of the month, yeah, weird
console.log(future.getDay()); //! 4 - the day of the week (0 is Sunday)
console.log(future.getHours()); // 15
console.log(future.getMinutes()); // 23
console.log(future.getSeconds()); // 0

// get a nicely formatted string
// - good for converting a date that you want to store somewhere
console.log(future.toISOString()); // 2037-11-19T21:23:00.000Z
// get time stamp for the date
console.log(future.getTime()); // 2142278580000
// then we can decode it
console.log(new Date(2142278580000)); // Thu Nov 19 2037 15:23:00 GMT-0600 (Central Standard Time)

// special method to get this very moment - as a timestamp
console.log(Date.now()); // 1612192933367

// there are also set versions for all these things, and they do auto-correction
future.setFullYear(2040);
console.log(future); // Mon Nov 19 2040 15:23:00 GMT-0600 (Central Standard Time)
*/

/////////////////////////////////////////////////
// OPERATIONS W/ DATES

/*const future = new Date(2037, 10, 19, 15, 23);
console.log(Number(future)); // 2142278580000
console.log(+future); // 2142278580000
// so as we see, we can do operations with it
// like, convert two days to milliseconds, take the result, and covert it back to days and get days, hours, mins, etc between

// a function that takes 2 dates and finds the days between them
const calcDaysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

const days1 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 4));
console.log(days1);

// if you're doing complicated things that involve day light savings time an such, use a date library like moment.js
*/

/////////////////////////////////////////////////
// INTERNATIONALIZING DATES
// SEE: MDN's Intl - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl
// - allows us to easily format numbers and strings according to different languages
// - ie currencies and dates are different

// Experimenting with i18n API

// const now = new Date();
// const options = {
//   hour: 'numeric',
//   minute: 'numeric',
//   day: 'numeric',
//   month: 'long',
//   year: 'numeric',
//   weekday: 'long',
// };

// Intl.DateTimeFormat(localstring, )
// will create a formatter for the language
// then we can call a method .format(dateWeWantToFormat)
// - language code table - http://www.lingoes.net/en/translator/langcode.htm

// labelDate.textContent = new Intl.DateTimeFormat('pt-PT', options).format(now);

// in many cases it makes more sense to not define the local manually, but pick it up from the user's browser

// const local = navigator.language;
// console.log(local);
// labelDate.textContent = new Intl.DateTimeFormat(local, options).format(now);

/////////////////////////////////////////////////
// INTERNATIONALIZING NUMBERS

// experiment
/*const num = 1605.99;

const options = {
  // style: 'unit',
  // unit: 'mile-per-hour',
  // unit: 'celsius',
  // style: 'percent',
  style: 'currency', // important to note that the currency is not determined by the local
  currency: 'EUR',
  useGrouping: false, // no seperators
};

console.log('US: ' + new Intl.NumberFormat('en-US', options).format(num)); // 1,605.99 mph
console.log('Germany: ' + new Intl.NumberFormat('de-DE', options).format(num)); // 1.605,99 mi/h
console.log('Syria: ' + new Intl.NumberFormat('ar-SY', options).format(num)); // ١٬٦٠٥٫٩٩ ..?
// format based on user's browser settings
console.log(
  'Browser: ' + new Intl.NumberFormat(navigator.language, options).format(num)
); // 1,605.99 mph*/
