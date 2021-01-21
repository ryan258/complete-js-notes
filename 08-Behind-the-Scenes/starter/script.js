'use strict';

// function calcAge(birthYear) {
//   const age = 2020 - birthYear;
//   // console.log(firstName);
//   function printAge() {
//     let output = `You are ${age}, born in ${birthYear}`;
//     console.log(output);

//     if (birthYear >= 1981 && birthYear <= 1996) {
//       const firstName = 'Ike';
//       // reassigning outer scope's output
//       output = 'New OUTPUT!';
//       console.log(output);
//       const str = `You're a millenial, ${firstName}!`;
//       console.log(str);

//       // functions are block scoped
//       function add(a, b) {
//         return a + b;
//       }
//     }

//     // get a reference error
//     // console.log(str);

//     // functions are block scoped (for strict mode)
//     // add(10, 1);
//   }
//   printAge();

//   return age;
// }

// const firstName = 'Manny';
// calcAge(1991);

// HOISTING - see video #95

// this KEYWORD/VARIABLE
// Special variable that is created for every execution context (every function).. it's not static
// - Takes the value of (points to)
// - of the "owner' of the function
// - in which the this keyword is used.
// It's not static, and its value is only assigned when the function is actually called.
// Ways it is called
// - method - this = object that's calling the method
//            this will always point to the object that is calling it <---- it's very dynamic
// - simple function call = this = window (non-strict), undefined (strict)
// - arrow functions - this = the surrounding function (lexical this)
//                ...don't get their own this keyword
// - event listener - this = DoM element the handler is attached to
// - new, call, apply, bind - to come later on...
// THIS DOES NOT POINT TO THE FUNCTION ITSELF, and also NOT TO THE VARIABLE ENVIRONMENT of THE FUNCTION

// console.log(this);

// const calcAge = function (birthYear) {
//   console.log(2021 - birthYear);
//   console.log(this); // undefined
// };

// calcAge(1983);

// const calcAgeArrow = birthYear => {
//   console.log(2021 - birthYear);
//   console.log(this); // points to the window, the this of the parent
// };

// calcAgeArrow(1983);

// const manny = {
//   year: 2000,
//   calcAge: function () {
//     console.log(this); // points to the manny object, the object calling the method
//     console.log(2020 - this.year);
//   },
// };
// // manny is the object calling the calcAge method - calling is the key here
// manny.calcAge();

// const orson = {
//   year: 1969,
// };
// // remember a function is just a value
// orson.calcAge = manny.calcAge; // just copying over the calcAge method from manny to orson, "method borrowing"
// console.log(orson);
// orson.calcAge(); // this = it runs the copied function from manny on orson, bc Orson is calling it.

// // we can also take the function from the manny object and make it its own function
// const f = manny.calcAge;
// console.log(f);
// f(); // undefined, it's just a regular function now

// REGULAR FUNCTIONS vs ARROW FUNCTIONS
// Use Arrow Functions
// - never use an arrow function as a method
// - is you are using a function inside a method
// Use Regular Function Expression
// - use for methods

// dangerous, var creates a property on the global obj
// var firstName = 'Dumb Bear';

// const manny = {
//   firstName: 'Manuel',
//   year: 2000,
//   calcAge: function () {
//     console.log(this); // points to the manny object, the object calling the method
//     console.log(2020 - this.year);
//   },
//   // greet: () => {
//   //   console.log(this);
//   //   console.log(`Hey ${this.firstName}`);
//   // }, // doesn't have its own this, it's looking to the global scope, the window object
//   // greet: function () { // or shorthand
//   greet() {
//     console.log(this);
//     console.log(`Hey ${this.firstName}`);
//   },
// };
// manny.greet();

// look out for a function inside a method
// we'll create a function that runs if manny is a millenial
// const manny = {
//   firstName: 'Manuel',
//   year: 2000,
//   calcAge: function () {
//     console.log(this);
//     console.log(2020 - this.year);

//     // const self = this; // self or that <--- old way of doing it
//     // const isMillenial = function () {
//     //   console.log(self);
//     //   console.log(self.year >= 1981 && self.year <= 1996);
//     // };

//     const isMillenial = () => {
//       console.log(this);
//       console.log(this.year >= 1981 && this.year <= 1996);
//     };
//     isMillenial(); // becomes a regular function call
//   },
//   greet: () => {
//     console.log(this);
//     console.log(`Hey ${this.firstName}`);
//   },
// };
// manny.calcAge();

// Arguments keyword - to take more params than specified - only exists in regular functions
// but now we have a more modern way of dealing with multiple parameters
// const addExpr = function (a, b) {
//   console.log(arguments);
//   return a + b;
// };
// addExpr(2, 5);
// addExpr(2, 5, 100, 420);

// Arguments keyword - only exists in regular functions
// var addArrow = (a, b) => {
//   console.log(arguments);
//   return a + b;
// };
// addArrow(2, 5, 100, 420); // arguments not defined

// ?????? - the MODERN way of dealing with MULTIPLE PARAMETERS

// PRIMITIVES vs OBJECTS (PRIMITVE vs REFERENCE TYPES)
// let age = 30;
// let oldAge = age;
// age = 31;
// console.log(age); // 31
// console.log(oldAge); // 30 - the change in age didn't effect the value of oldAge

// const me = {
//   name: 'Jonas',
//   age: 30,
// };

// const friend = me;
// friend.age = 27;
// console.log('Friend:', friend); // age: 27
// console.log('Me', me); // age: 27

// PRIMITIVES vs OBJECTS - In practice

// all being saved in the call stack
let lastName = 'Fanth';
let oldLastName = lastName;
lastName = 'Johnson';
console.log(lastName, oldLastName); // Johnson Fanth

// ref types - it doesn't create a new object in the heap
// so we still obey const, because we're still holding on to the same value in the context stack, just the underlying object in the heap, which has nothing to do with const or let
const sierrah = {
  firstName: 'Sierrah',
  lastName: 'Fanth',
  age: 30,
};

const marriedSierrah = sierrah; // we're just copying the reference that points  to the same object
marriedSierrah.lastName = 'Johnson';
console.log('Before marraige: ', sierrah); // is over written by the new value
console.log('After marriage: ', marriedSierrah);

// can't do marriedSierrah = {} // a new object because it'll create a new place in memory
// so copy and spread into a new variable! or Object.assign() to copy
const sierrah2 = {
  firstName: 'Sierrah',
  lastName: 'Fanth',
  age: 30,
  family: ['Dawn', 'Her Brother'],
};

// a new object is created in the heap
const sierrahCopy = Object.assign({}, sierrah2);
sierrahCopy.lastName = 'Johnson';
console.log('Before marraige: ', sierrah2); // is NOT over written by the new value
console.log('After marriage: ', sierrahCopy);
// but Object.assign only works on the first level, won't get objects in objects...to detatch? point to same place
// just a shallow copy, we need a deep clone!
sierrahCopy.family.push('A cat');

console.log('Before Cat: ', sierrah2); // is NOT over written by the new value
console.log('After Cat: ', sierrahCopy);

// We use something like lodash to execute a deep clone
