'use strict';

///////////////////////////
// DEFAULT PARAMETERS
// - they can contain any expression
//   so we can use the params BEFORE it
//   and we cannot skip arguments before the calculation

// const bookings = [];

// const createBooking = function (
//   flightNum,
//   numPassengers = 1,
//   price = 100 * numPassengers
// ) {
// (ES5 )old way of doing default params
// numPassengers = numPassengers || 1;
// price = price || 100;

//   const booking = {
//     flightNum,
//     numPassengers,
//     price,
//   };

//   console.log(booking);
//   bookings.push(booking);
// };

// createBooking('LH123');
// createBooking('LH123', 2, 200);
// createBooking('LH123', 2); // price 200
// createBooking('LH123', 5); // price 500
// createBooking('LH123', 1000); // price 100000
// createBooking('LH123', undefined, 1000); // price 1000, as it's using the default of 1

///////////////////////////
// HOW PASSING ARGUMENTS WORKS: VALUE vs REFERENCE
// - primitive types don't change (value is simply copied)
// - changing objects also mutates the original ryan object (need to be careful with this behavior)
//   passing a ref type is just passing the reference
// - pass by value: JS ONLY has passing by value, even though it looks like passing by reference
// - pass by reference: JS does not have passing by reference, the reference itself is still a value, a memory address, we pass a reference, we don't pass via reference

// const flight = 'LH234';
// const ryan = {
//   name: 'Ryan Johnson',
//   passport: 12345678,
// };

// const checkIn = function (flightNum, passenger) {
//   flightNum = 'LH999';
//   // same as manipulating the ryan object in the memory heap
//   passenger.name = 'Mr. ' + passenger.name;

//   if (passenger.passport === 12345678) {
//     console.log('check in');
//   } else {
//     console.log('wrong passport');
//   }
// };

// checkIn(flight, ryan);
// console.log(flight); // 'LH234' // basically it's    const flightNum = flight
// console.log(ryan); // {name: "Mr. Ryan Johnson", ...} // basically     const passenger = ryan

// Having 2 Functions That Change the Same Object Can Be Trouble
// example that will change the passport

// const newPassport = function (person) {
//   person.passport = Math.trunc(Math.random() * 10000000);
// };

// newPassport(ryan); // ``changes ryan.passport to something else
// checkIn(flight, ryan); // wrong passport

///////////////////////////
// FIRST CLASS & HIGHER-ORDER FUNCTIONS
// - Having first class functions allows --- It's just a feature a language either has, or doesn't have --- all functions are values -- just a concept
//   - JS treats functions as first-class citizens - A VERY IMPORTANT FEATURE OF THE LANGUAGE
//   - This mean that functions are simply values, so we can store them in variables and object.properties
//     - We can also pass functions as arguments to other functions, like adding functions to event handlers
//     - We can also RETURN functions from functions
//   - Functions are just another "TYPE" OF OBJECT
//     - Call methods on functions! ie. counter.inc.bind()
// - us to have higher order functions --- these you have in practice
//   - A function that receives another function as an argument, that returns a new function, or both
//   - This is only possible because of first-class functions
//     - btnClose.addEventListener('click', greet);
//       - addEventListener() is the higher order function
//       - greet is the callback function - bc it's the function that'll be called later by the higher-order function
//         - "call me back when you're ready"
//   - Function that returns a new function
//     - function count() {         // <-- higher-order function
//         let counter = 0
//         return function() {      // <-- returned function
//           counter++
//         }
//       }

///////////////////////////
// FUNCTIONS ACCEPTING CALLBACK FUNCTIONS
// - Why are callback so useful?
//   - They allow us to split up our code into smaller and reusable pieces
//   - Abstraction - we hide away implementation details that we don't need to bother ourselves with
//     - transformer() doesn't care at all about HOW the string is transformed
//     - so the higher-level function delegates that concern to the lower-level functions

// 2 LOWER-LEVEL functions we'll pass into another function
// const oneWord = function (str) {
//   return str.replace(/ /g, '').toLowerCase();
// };

// const upperFirstWord = function (str) {
//   const [first, ...others] = str.split(' ');
//   return [first.toUpperCase(), ...others].join(' ');
// };

// now create the HIGHER ORDER function
// const transformer = function (str, fn) {
//   console.log(`Original string: ${str}`);
//   console.log(`Transformed string: ${fn(str)}`);

//   console.log(`Transformed by: ${fn.name}`);
// };

// transformer('Javascript is awesome!', upperFirstWord); // Transformed string JAVASCRIPT is awesome!
// transformer('Javascript is awesome!', oneWord); // Javascriptisawesome!

// higher order functions are used all over the place in JS
// in .forEach()
// const high5 = function () {
//   console.log('🤚');
// };

// ['Ryan', 'Manny', 'Orson'].forEach(high5);

///////////////////////////
// FUNCTIONS RETURNING FUNCTIONS
// - this works because of closures, stay tuned...
// - very important in the functional program paradigm

// const greet = function (greeting) {
//   return function (name) {
//     console.log(`${greeting} ${name}`);
//   };
// };

// CHALLENGE: rewrite as arrow function
// const greet = greeting => name => console.log(`${greeting} ${name}`);

// const greeterHey = greet('Hey'); // greeterHey is now a function!
// greeterHey('Manny'); // 'Hey Manny'
// greeterHey('Orson'); // 'Hey Orson'
// const greeterFU = greet('FU');
// greeterFU('Ralph'); // 'FU Ralph'

// we can also do it all in one go!
// greet('HELLO')('IKE'); // 'HELLO IKE'

///////////////////////////
// .CALL() & .APPLY() METHODS
// - .call() will allow us to explicitly define the this keyword in any function that we want
// - but .bind() is more important and like these two

// const lufthansa = {
//   airline: 'Lufthansa',
//   iataCode: 'LH',
//   bookings: [],
//   book(flightNum, name) {
//     console.log(
//       `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
//     );
//     this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
//   },
// };
// lufthansa.book(755, 'Ryan'); // 'Ryan booked a seat on Lufthansa LH755'
// lufthansa.book(666, 'Ralph'); // 'Ralph booked a seat on Lufthansa LH666'
// console.log(lufthansa);

// // lets say lufthansa created a new airline
// const eurowings = {
//   airline: 'Eurowings',
//   iataCode: 'EW',
//   bookings: [],
// };

// const book = lufthansa.book;

// // book(23, 'Scooty') // doesn't work because the 'this' is pointing to undefined

// // remember a function is really just an obj and obj have methods, and functions have the call method

// // .CALL() METHOD
// // call(x) - explicitly set the 'this' keyword
// // - x = what we want 'this' to point to
// // - y, z, ... - the rest of the args
// book.call(eurowings, 23, 'Homer Simpson');
// console.log(eurowings);

// book.call(lufthansa, 219, 'Ike the bear');
// console.log(lufthansa);

// // now we can go on to create more airlines from the Lufthasa Group
// const swiss = {
//   airline: 'Swiss Airlines',
//   iataCode: 'LX',
//   bookings: [],
// };

// book.call(swiss, 755, 'Otto');
// console.log(swiss);

// // .APPLY() METHOD (not really used any more in modern JS...)
// // - does exactly the same thing as .CALL() except that .APPLY() does not receive a list of args after the 'this' keyword,
// // - but takes an ARRAY if data as the SECOND ARGUMENT
// const flightData = [777, 'Búfalo'];
// // book.apply(swiss, flightData);
// // console.log(swiss);

// // WE DON'T REALLY USE THE APPLY METHOD ANYMORE BECAUSE NOW WE HAVE A BETTER WAY OF DOING THE SAME THING
// // CALL WITH A SPREAD OPPERATOR! 🤗
// book.call(swiss, ...flightData);
// console.log(swiss);

///////////////////////////
// THE .BIND() METHOD
// - just like the call method, .bind() allows us to manually set the 'this' keyword for any function call
// - difference is that .bind() doesn't immediately call the function
//   instead it returns a new function where the 'this' keyword is bound
//   so it is set to whatever value that we pass into .bind()
// - used in a common pattern called: "PARTIAL APPLICATION"
//   - Part of the arguments of the original function have already been applied, already set

// const lufthansa = {
//   airline: 'Lufthansa',
//   iataCode: 'LH',
//   bookings: [],
//   book(flightNum, name) {
//     console.log(
//       `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
//     );
//     this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
//   },
// };
// const eurowings = {
//   airline: 'Eurowings',
//   iataCode: 'EW',
//   bookings: [],
// };
// const book = lufthansa.book;
// // book.call(eurowings, 23, 'Homer Simpson');

// // create a new function where 'this' is set to eurowings
// // does not call the book function, but creates a NEW function
// const bookEW = book.bind(eurowings);
// console.log(bookEW);
// // now the 'this' keyword is already set in stone for bookEW
// bookEW(23, 'Cat Stevens');
// console.log(eurowings);

// so now we can create a booking function for each of the airlines
// const bookLH = book.bind(lufthansa)
// const bookLX = book.bind(swiss)

// with call we can go even further

// const bookEW666 = book.bind(eurowings, 666); // now this function will only need the name as the other arguments are set in stone
// bookEW666('White Squirrel #1');
// bookEW666('White Squirrel #2');

// // THERE ARE ALSO OTHER CASES FOR THIS
// // Like when we we use objects together with event listeners

// lufthansa.planes = 300;

// lufthansa.buyPlane = function () {
//   console.log(this);
//   this.planes++;
//   console.log(this.planes);
// };

// w/ event handlers this is pointing to the element that the event handler is on...
// document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane); // NaN // so it's pointing to the button element with the class of "buy"..., object calling the function
// so we need the 'this' keyword to point at the lufthansa object itself...
// which means we must manually define the this keyword
// document
//   .querySelector('.buy')
//   .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));
// booya! console loggin 301, 302, 303, 304...

// partial application example
// - meaning preset parameters
// - be sure to be mindful of the order of the arguments
// const addTax = (rate, value) => value + value * rate;
// console.log(addTax(0.1, 200)); // 220
// // preset the rate
// const addVAT = addTax.bind(null, 0.23); // (null - no this keyword, rate = 0.23) // SAME AS THE FOLLOWING EXERCISE
// // addVAT = value => value + value * .23
// console.log(addVAT(100)); // 123
// console.log(addVAT(23)); // 28.29

// this exercise is to show you that you can create a more specific function out of a general function
// using .bind() straight up, gives us a new function

// rewrite the example as one function returning another function
// const addTaxRate = function (rate) {
//   return function (amount) {
//     return rate * amount + amount;
//   };
// };

// const addVAT23 = addTaxRate(0.23);
// const totalBill = addVAT23(1000);

// console.log(totalBill); // 1230

///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:
*/
/*
1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
*/
// const poll = {
//   question: 'What is your favorite programming language?',
//   options: ['0: Javascript', '1: Python', '2: Rust', '3: C++'],
//   answers: new Array(4).fill(0),
//   registerNewAnswer() {
//     // Get answer
//     const answer = Number(
//       window.prompt(
//         `${this.question}\n${this.options.join('\n')}(Write option number)`
//       )
//     );
//     // Register answer
//     typeof answer === 'number' &&
//       answer < this.answers.length &&
//       this.answers[answer]++;
//     // console.log(this.answers);
//     this.displayResults();
//     this.displayResults('string');
//   },
//   displayResults(type = 'array') {
//     if (type === 'string') {
//       console.log(`Poll results are ${this.answers.join(', ')}`);
//     } else if (type === 'array') {
//       console.log(this.answers);
//     }
//   },
// };

// poll.registerNewAnswer();
/*
1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
*/

/* 2. Call this method whenever the user clicks the "Answer poll" button. */
// document
//   .querySelector('.poll')
//   .addEventListener('click', poll.registerNewAnswer.bind(poll));

/* 3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". */

/* 4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

*/
// poll.displayResults.call({ answers: [5, 2, 3] }, 'string');
// poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');
// poll.displayResults.call({ answers: [5, 2, 3] });
// poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });

/*


GOOD LUCK 😀
*/

///////////////////////////////////////
// Immediately Invoked Function Expressions - it's a pattern
// - A function that runs right away, just once.

// Why do this?
// - outer scope doesn't have access to variables of an inner scope
// - this is good for protecting our variables
// - since there's no need for scoping of IIFE now that we have let and const
// - but if you need a function to fire once and done, IIFE is still the way to go

// (function () {
//   console.log('This will never run again!');
// })();

// (() => console.log('This will ALSO never run again!'))();

// {
//   // these variables are scoped to this block
//   const name = 'ryan';
//   let bear = 'ike';
//   // var is not, it's just scoped to functions
//   var cow = 'Orson';
// }
// console.log(cow);

///////////////////////////////////////
// CLOSURES
// THE SECRET : any function always has access to the variable environment of the execution context in which the function was created
// - It's not a feature we explicitly use, we don't create them manually, they happen automatically depending on the situation. We just need to recognize them
// - A closure makes a function remember all the variables that existed at the functions birth place
//   - The function being returned remembers everything in its birth place by the time it was created
// - the returned function basically closed over the scope of the function that returned it
// - thanks to a closure a function doesn't lose connection to variables that existed at the functions birth place
// - we can't access closed over variables
// - a closure is just an internal property of a function
//   - but can take a look at the internal property

// const secureBooking = function () {
//   // we'll be able to manipulate it from the inside
//   let passengerCount = 0;

//   // what's special is that it returns a new function
//   return function () {
//     // this function updates the outer variable
//     passengerCount++;
//     console.log(`${passengerCount} passengers`);
//   };
// };

// the returned function will now be stored in this booker variable
// booker here is located in the global scope

// const booker = secureBooking();
// // the secureBooking() execution context with the passenger count is no longer on the call stack
// booker();

// a new empty booker() execution context is put on the call stack - there are no variables declared in this function
//but booker() is in a child scope of the global scope
// THE SECRET : any function always has access to the variable environment of the execution context in which the function was created
// booker();
// booker();

// console.dir(booker); // see [[Scopes]]:>Scopes.Closure (secureBooking) {passengerCount: 3} - [[]]'s mean it's an internal property we cannot access from our code

///////////////////////////////////////
// CLOSURES - MORE EXAMPLES
// closures can change as the variable is reassigned
// closures always make sure the function doesn't lose connection to variables that were present at its birth place, it'll always remember them

// 1. EXAMPLE 1 - not even returning the function, but merely assigning it creates a closure
//  - We don't need to return a function from a function to create a closure
//  - Even if the variable used was defined outside the function

// let f;

//BORN HERE
// const g = function () {
//   // variable environment, the a variable is inside the backpack of the f variable
//   const a = 23;
//   f = function () {
//     // it's still closing over the variable
//     console.log(a * 2);
//   };
// };

// f(); // error, not a function yet
// console.log(g()); // undefined
// g(); // called, makes f a function that can be called
// f(); // 46
// console.dir(f); // [[Scopes]]: Scopes[3] 0: Closure (f) a: 46

// - when you reassign a new closure the old closure disappears
// REBORN HERE
// const h = function () {
//   const b = 777;
//   f = function () {
//     // it's still closing over the variable
//     console.log(b * 2);
//   };
// };

// g(); // called, makes f a function that can be called
// f(); // 46
// h(); // reassigns the f function
// f(); // 1554 (777*2) - this is now a different function than the first one
// console.dir(f); // [[Scopes]]: Scopes[3] 0: Closure (h) b: 777

// 2. EXAMPLE 2 - Timer
// const boardPassengers = function (n, wait) {
//   const perGroup = n / 3; // we're boarding in 3 groups - 1a)*** This variable is created when we call the function

//   setTimeout(function () {
//     // executed completely independently of th boardPassengers(), but still able to use all the variables in the environment it was created in: n and perGroup
//     // 2)*** setTimeOut is called AND this callback function will be registered
//     console.log(`We are now boarding all ${n} passengers`);
//     console.log(`There are 3 groups, each with ${perGroup} passengers`);
//   }, wait * 1000); // 3)*** Callback function called/executed after 3 seconds

//   console.log(`Will start boarding in ${wait} seconds`); // 1b)*** BUT IMMEDIATELY THIS WILL BE CALLED, will not wait for callback to finish
// };

// boardPassengers(180, 3); // 0)*** We call this function

//see the closure have priority over the scope chain, but if you remove the const perGroup in boardPassengers() it will reach out and use the following one
// const perGroup = 1000;
// boardPassengers(180, 3); // 0)*** We call this function // There are 3 groups; each with 1000 passengers

///////////////////////////////////////
// Coding Challenge #2

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();

// It was the closure I tell ya! The closure made it possible!
// when the addEventListener callback is run the iffy already ran its course
// the closure still gives access to the variables where that callback function was born
