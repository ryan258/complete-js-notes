'use strict';

//////////////////////////
// WHAT IS OOP?

//! /////////////////////////////////////////////
//! CONSTRUCTOR FUNCTIONS AND THE NEW OPERATOR
// - function constructors aren't a feature of JS, they're just a pattern
// - JS doesn't have classes in the traditional way, but constructor functions have been used since the beginning of JS to simulate classes
// - constructor functions always start w/ a capital letter
// - an arrow function would not work as a function constructor because it doesn't have its own 'this' keyword
// - only difference between a constructor function and a regular function is the use of the 'new' keyword
// - you basically create objects from a constructor function

/*//! BLUEPRINT (PROTOTYPE)
const Person = function (firstName, birthYear) {
  // console.log(this); // Person {}
  // at the end of this function, the 'this' keyword will be returned, so whatever we add to the empty object will ultimately be returned by the function
  // and that returned object is what we'll be trying to build here
  //! WILL BECOME INSTANCE PROPERTIES - because they'll be properties on every instance
  this.firstName = firstName; // we'll add firstName to the empty object as firstName
  this.birthYear = birthYear; // same ^

  //! NEVER CREATE A METHOD INSIDE A CONSTRUCTOR FUNCTION
  //! EACH OBJECT WOULD BE CARRYING AROUND ITS OWN COPY OF THE FUNCTION, so think about if we had 1000s of objects...
  //! AND THIS IS WHY WE WANT TO USE PROTOTYPES AND PROTOTYPAL INHERITANCE
  // this.calcAge = () => console.log(2021 - this.birthYear);
};

//!!! the NEW keyword
//! 'new' - calls the Person function, but does a whole lot more than just that
// - behind the scenes there are 4 steps to creating a new object with 'new'  --- this is all happening because we are use the 'new' operator
//! -- 1. New empty {} is created
//! -- 2. afterwards, the function is called, and the 'this' keyword will be set to the new instance
//!       this = {} // the new empty object, instance
//! -- 3. the newly created object {} is linked to its prototype
//! -- 4. the object that was created in the beginning is then automatically returned from the constructor function
// -------- now the object no longer needs to be empty
// -------- so we'll store the new object we pieced together with the data we gave it in a variable
const orson = new Person('Orson', 2012); // HOUSE (INSTANCE)
console.log(orson); // Person {firstName: "Orson", birthYear: 2012}

// now we can create as many objects as we want
const ike = new Person('Ike', 2000); // HOUSE (INSTANCE)
const snowball = new Person('Snowball', 2021); // HOUSE (INSTANCE)
console.log(ike, snowball);

// test if an object is an instance of a particular class/prototype
console.log(orson instanceof Person); // true
const jay = 'jay';
console.log(jay instanceof Person); // false*/

//! ////////////////////////
//! PROTOTYPES
// - the prototype property is actually an object
// - every function in JS has a property called 'prototype', even constructor functions
// - every object created by a constructor function will gain access to all the methods and props that we define on the constructor's prototype property

//! all objects created by Person will inherit, access to all methods and properties on the prototype property.
// example
/*const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2021 - this.birthYear); // 'this' will refer to the object that is calling the method
};

console.log(Person.prototype); // (constructor: calcAge: f)

const orson = new Person('Orson', 2012);
// So now we can use this method on the object, even though it's not on the object itself
orson.calcAge(); // 9
// you'll see here that it does not contain the calcAge method itself
console.log(orson); // Person
// but it still has access to the method because of prototypal inheritance! 👻
//! Each Object has a special property called __proto__
console.log(orson.__proto__); // see prototype, which is basically the prototype property
console.log(orson.__proto__ === Person.prototype); // true, the Person.prototype is not actually the prototype of person, but it is what will be used by all objects created with the Person constructor function
// other built in methods to prove this
// - is this a prototype of another object?
console.log(Person.prototype.isPrototypeOf(orson)); // true - Person.prototype is the prototype of orson
console.log(Person.prototype.isPrototypeOf(Person)); //! false - this confusions comes from bad naming of this property, it's just not the prototype of Person --- it should be called protoTypeOfLinkedObjects or something.

//! Where does __proto__ actually come from?
console.log(orson.__proto__);
// it contains step #3 of the 'new' creation
// -- 3. the newly created object {} is linked to its prototype
// and sets .__proto__ to the Person.prototype
// and this is how JS knows internally that the obect is connected to Person.prototype
console.log(orson); // Person { __proto__ : calcAge: f()

//! We can also set properties on the prototype!
Person.prototype.species = 'Critter';
console.log(orson); // Person { __proto__ : calcAge: f(), species: "Critter"
console.log(orson.species); // Critter

// own properties are properties that are declared directly on the object itself, not including the inherited properties
// check for has own properties
console.log(orson.hasOwnProperty('firstName')); // true
console.log(orson.hasOwnProperty('species')); // false - since it's not really inside the orson object, it just has access bc of its prototype
*/

//! //////////////////////////////////////////////////////////////////
//! PROTOTYPAL INHERITANCE & THE PROTOTYPE CHAIN & BUILT IN OBJECTS

/*console.log(orson.__proto__); // === Person.prototype
// Object.prototype (top of the prototype chain)
console.log(orson.__proto__.__proto__); // === Person.prototype.prototype (JS's Object prototype)
console.log(orson.__proto__.__proto__.__proto__); // NULL, Object.prototype was the top of the scope chain

// Person.prototype also has its own constructor property,
console.log(Person.prototype.constructor); // which will just point back at the Person itself, the function itself
// to inspect the function use console.dir(...)
console.dir(Person.prototype.constructor);

//! Look at prototype of arrays
const arr = [3, 4, 6, 5, 5, 5, 7]; // this shorthand is the same as using new Array() === []
console.log(arr.__proto__); // we see all the array methods, each array doesn't have all these methods, they're inherited from its prototype
console.log(arr.__proto__ === Array.prototype); // true
// but things go on... go up the chain and we're looking at the object prototype
console.log(arr.__proto__.__proto__); // and we see all the methods available for objects
// this all chains together because __proto__ itself is also an object that has access to all those methods
//! so note how on MDN they refer to it as Array.prototype.filter()
//!- extend functionality of Arrays even further

//! DO NOT DO !// EXTENDING THE PROTOTYPE OF A BUILT IN OBJECT IS NOT A GOOD IDEA!
// - next version might use that same name, but it works in a different way... hello broken code
// - working w/ a team bc if multiple devs implement the same method with a different name, rough bug city awaits you all...
Array.prototype.unique = function () {
  return [...new Set(this)]; // this === the array this method is being run on
};
console.log(arr.unique()); // [3, 4, 6, 5, 7]

//! Look at some dom objects
const h1 = document.querySelector('h1');
console.dir(h1); // actual object - w/
//                                   __proto__: HTMLHeadingElement:...>
//                                   __proto__: HTMLElement:...>
//                                   __proto__: Element:...>
//                                   __proto__: node:...>
//                                   __proto__: EventTarget...>
//                                   __proto__: Object
// as we can see, BTS these different elements are really just different constructor functions

// Let's take a look at the prototype of a function (since a function is also an object, therefore, has a prototype)
console.dir(x => x + 1);
// anonymous().__proto__: f().__proto__: Object (no more __proto__)
//! so this is why we can call methods on functions, bc they're objects, and objects have prototypes
*/

///////////////////////////////////////
// Coding Challenge #1

/*// 1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

// 2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`'${this.make}' going at ${this.speed} km/h`);
};

// 3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`'${this.make}' going at ${this.speed} km/h`);
};

// 4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

bmw.accelerate()
bmw.accelerate()
bmw.brake()

// DATA CAR 1: 'BMW' going at 120 km/h
// DATA CAR 2: 'Mercedes' going at 95 km/h*/

//////////////////////////
//

//////////////////////////
//
