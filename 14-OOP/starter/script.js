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

//! ////////////////////////
//! ES6 CLASSES
// - they let us do the same thing as we were doing with constructor functions, but it allows us a nicer syntax
// - classes in JS are just syntactic sugar
//   it's still doing prototypal inheritance BTScenes
//   it just hides the true nature of prototypal inheritance in JS

/*// pick whichever style suits you, claases are just special types of functions, bts classes are still functions

// class expression
// const CritterCl = class {}

// class declaration
class CritterCl {
  // first thing we need to do is create a constructor method
  // properties
  constructor(firstName, birthYear) {
    // this will be set to the newly created empty object
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
  // methods
  //! Methods will be added to .prototype property of the class
  calcAge() {
    console.log(2021 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.firstName} is here!`);
  }
}

// when we use the NEW key word the constructor function will be called and return a new object that will then be stored in the ike variable
const ike = new CritterCl('Ike', 2000);
console.log(ike);
// it will also inherit those methods
ike.calcAge(); // 21
// the obj's __proto__ is equal to the class's prototype v
console.log(ike.__proto__ === CritterCl.prototype); // true
//! class works like any other function constructor, but looks nicer
//! - we don't have to manually mess with the prototype property!

// we can also add a method to the class property from outside the declaration
// CritterCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName} is here!`);
// };
ike.greet(); // Hey Ike is here!

//! CLASSES ARE NOT HOISTED
//! CLASSES ARE FIRST CLASS CITIZENS
//  - so we can pass them into functions
//  - can return them from functions
//    because classes are really just special kinds of functions BTS
//! BODY OF A CLASS IS ALWAYS EXECUTED IN STRICT MODE

// CONSTRUCTOR FUNCTIONS are not old or depricated syntax, so it's totally fine to keep using them
// - but you should continue to know how prototypal inheritance works
// some people will say class syntax is bad because it hides to true functionality of what's going on in JS, but just understand what's going on with the prototypes and you're good.
// - it's really nice that all the code is together, properties and behaviors
// -- function constructors just kinda look like a big mess
*/

//! ///////////////////
// GETTERS & SETTERS
//! basically these are just functions that get and set a value, but on the outside they still look like regular properties
// - Every object in JS can have getter and setter properties
// - we call these assesor properties
//   unlike the others that we just call data properties
// GETTERS are useful for when we want to treat something like a property, but we still want to do some calculations first
// - these will also appear on the prototype as a method, and ... means it will only be calculated once you click it (in dev tools console)
// - GETTERS aND SETTERS can be very useful for DATA VALIDATION as well
//! WE DON'T NEED TO USE GETTERS OR SETTERS, MANY PEOPLE DON'T BUT SOMETIMES THEY CAN COME IN HANDY, FOR VALIDATION WHEN CREATING A NEW OBJECT

/*//!! OBJECT EXAMPLE
const account = {
  owner: 'Orson',
  movements: [100, 400, 250, 300],

  // add a getter
  get latest() {
    return this.movements.slice(-1).pop();
  },

  // add a setter
  // - can only have 1 parameter
  // - it's not mandatory to have a setter when you have a getter for the same property
  set latest(mov) {
    this.movements.push(mov);
  },
};

// use the getter - by simply using it as a property
console.log(account.latest);

// if it was a regular method we'd have to do something like this
// account.latest(50); // but with set it's more of a property than a method so...

// use a setter
account.latest = 50;
console.log(account.movements); // [..., 50]

//!! CLASS EXAMPLE
class CritterCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2021 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.firstName} is here!`);
  }

  get age() {
    return 2021 - this.birthYear;
  }

  //! IMPORTANT PATTERN FOR WHEN TRYING TO SET A PROPERTY THAT ALEADY EXISTS
  // create a setter to validate that it's a full name (by looking for a space)
  // - so we're creating a setter, for a property name, that already exists...
  //! - we are creating a setter, for a property name, that already exists
  //! - now each time the code in the constructor for fullName is executed, the setter will be executed
  set fullName(name) {
    console.log(name);
    //! when we're trying to set a property that already exists, we add an underscore (convention)
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }
  //! then we use a getter to return our property back to fullName again
  get fullName() {
    return this._fullName;
  }
}

const manny = new CritterCl('Manny Flipper', 2010);
console.log(manny);
console.log(manny.age);

const bufalo = new CritterCl('Bufalo Roamer', 1812);
console.log(bufalo);*/

//! ///////////////////
//! STATIC METHODS

// think of the built in Array.from() method
// - converts any array like structure into a real array
// Array.from(document.querySelectorAll('h1')); // returns a [h1]

// the .from is a method that is attached to the array constructor
// ... so we can really use it directly on an array
// [1, 2, 3].from(); // so this doesn't work

// So the from method is really just attached to the Array contructor and not the prototype property of the constructor
// - so all the arrays DO NOT inherit this method, it's not on their prototype
// -- it's simply attached to the constructor itself

// We say that the 'from' method is in the Array namespace

// Another example is
// Number.parseFloat(12);
// it's not available on numbers, but it is available on the Number structure

//! Let's add a static method to a constructor function
// - obviously static methods are not inherited
// -- it's not in the prototype

/*const Critter = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Critter.boo = function () {
  console.log('boo!');
  console.log(this); // prints out the constructor function it's a part of, because that is the object that is calling the method
};

const ralph = new Critter('Ralph', 2006);

// Critter.boo();

//! Let's add a static method to a class
class ImaginaryFriend {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  // INSTANCE METHODS - methods that will be added to the prototype property
  calcAge() {
    console.log(2021 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.firstName} is here!`);
  }

  get age() {
    return 2021 - this.birthYear;
  }

  set fullName(name) {
    console.log(name);
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }
  get fullName() {
    return this._fullName;
  }

  // STATIC METHOD - method that will be attached to the class
  static hello() {
    console.log('hello...');
    console.log(this);
  }
}

const sam = new ImaginaryFriend('Sam', 1969);

ImaginaryFriend.hello(); // hello...
//                          printout of the ImaginaryFriend class
*/

//! ///////////////////
//! OBJECT.CREATE
// - 3rd way of implementing prototypal inheritance, delegation (more straight forward and natural)
//   BUT in practice, this is the least used way of implementing prototypal inheritance
// - works in a different way
// -- the prototype chain works pretty much the same, with the difference of:
// --- there just aren't any prototype properties involved,
// --- no constructor functions,
// --- and no "new" operator
// -- you still have prototypal inheritance
// - so we can use this to manually set the prototype of an object to any other object that we want
/*
const CritterProto = {
  calcAge() {
    console.log(2021 - this.birthYear);
  },
  //! we'll create a function that acts like a constructor in functions
  // - yet has nothing to do with the constructor function bc we aren't using new to call this
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

//! the better way to create an object
//! v this Object.create() is the main point v
const snowball = Object.create(CritterProto);
snowball.init('Snowball', 1882);
console.log(snowball);
snowball.calcAge();
console.log(snowball.__proto__);

// not so good way to do it
// create a critter object
const theCokeBear = Object.create(CritterProto); // pass in the Object that we want to be the prototype of the new object
console.log(theCokeBear); // we see __proto__: calcAge()

// let's add some properties to the new object
// - the non ideal way
theCokeBear.name = 'Ike';
theCokeBear.birthYear = '1776';
theCokeBear.calcAge(); // 245

console.log(theCokeBear); // name, birthYear
console.log(theCokeBear.__proto__); // calcAge // we get the proto
console.log(theCokeBear.__proto__ === CritterProto); //! true
*/

//! /////////////////////////////////////
//! Coding Challenge #2
/*
// 1. Re-create challenge 1, but this time using an ES6 class;
class CarCL {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`'${this.make}' going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`'${this.make}' going at ${this.speed} km/h`);
  }

  // 2. Add a getter called 'speedUS'
  //    which returns the current speed in mi/h (divide by 1.6);
  get speedUS() {
    // we basically transform a method into a property on the prototype
    return this.speed / 1.6;
  }

  // 3. Add a setter called 'speedUS'
  //    which sets the current speed in mi/h
  //    - but converts it to km/h before storing the value,
  //    - by multiplying the input by 1.6);
  set speedUS(speed) {
    // this will allow us to do ford.speedUS = 50
    this.speed = speed * 1.6;
  }
}
// 4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

// DATA CAR 1: 'Ford' going at 120 km/h
const ford = new CarCL('Ford', 120);

// console.log(ford.speedUS); // 75
// console.log(ford);
// ford.accelerate(); // increase speed by 10km/hr
// console.log(ford.speedUS); // 81.75
// ford.brake();
// ford.brake();
// console.log(ford.speedUS); // 75
// thanks to the setter

ford.speedUS = 50;
console.log(ford); // 80
*/

//! ///////////////////////////////////////////////////////
//! INHERITANCE BETWEEN "CLASSES": CONSTRUCTOR FUNCTIONS
// - usually we want the child class to have the same functionality as the parent class with additional functionality
// -- so pass in same properties, along with additional ones
/*
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2021 - this.birthYear);
};

// now we'll build a constructor function for the student

const Student = function (firstName, birthYear, course) {
  // DRY!
  //this.firstName = firstName;
  //this.birthYear = birthYear;
  // let's call the Person function instead
  // - the .call() will set 'this' for us
  Person.call(this, firstName, birthYear);
  this.course = course;
};

//! STUDENT INHERIT FROM PERSON CLASS
// create this first
Student.prototype = Object.create(Person.prototype);
// now we can create more methods to the student prototype

// THEN add a method to the student prototype
//! do that prev step first otherwise it'll overwrite prior methods you attach to the child class
Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const otto = new Student('Otto', 2020, 'Evilogy');
console.log(otto);
otto.introduce();
otto.calcAge(); // 1

console.log(otto.__proto__); // introduce
console.log(otto.__proto__.__proto__); // calcAge, constructor

console.log(otto instanceof Student); // true,
console.log(otto instanceof Person); // true,
console.log(otto instanceof Object); // true,

console.dir(Student.prototype.constructor); // Person(firstName, birthYear) - this is because we're using Object.create
// FIX
Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor); // Student(firstName, birthYear, course)
*/

//! /////////////////////////////////////
//! Coding Challenge #3
/*
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};
// 1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car.
//  Besides a make and current speed, the EV also has the current
//  battery charge in % ('charge' property);
const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};
//! LINK THE PROTOTYPES - inherit from car
EV.prototype = Object.create(Car.prototype);
// 2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};
// 3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `'${this.make}' going at ${this.speed} km/h, with a charge of ${this.charge}%`
  );
};

// 4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉
const ottoRacer = new EV('Tesla', 120, 23);
ottoRacer.chargeBattery(66); // charge bumped up to 66%
console.log(ottoRacer);
// console.log(
//   `'${ottoRacer.make}' going at ${ottoRacer.speed} km/h, with a charge of ${ottoRacer.charge}%`
// );
ottoRacer.accelerate();
ottoRacer.accelerate();
ottoRacer.accelerate();
ottoRacer.brake();
// DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%
*/

//! ////////////////////////////////////////////
//! INHERITANCE BETWEEN "CLASSES" - ES6 CLASSES - WHAT THE WORLD PREFERS TO USE
// - again the class syntax hides a lot of details behind the scenes
// -- it's an abstraction over construction functions
// -- but given how we saw how things worked behind the scenes in the last examples, we're good
//! To implement inheritance between 2 classes we only need two ingredients
//  1) The extend keyword
//  2) super()
//! FYI: A WARNING! THIS CAN BE PROBLEMATIC IN THE REAL WORLD
// - this will be addressed in the functional programming section

/*class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Instance methods
  calcAge() {
    console.log(2021 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    return 2021 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  // Static method
  static hey() {
    console.log('Hey there 👋');
  }
}

//! To implement inheritance between 2 classes we only need two ingredients
//!  1) The extends keyword
//     - this will link the prototypes behind the scenes, w/o us having to think about it
//!  2) super()
//     - we don't need to call PersonCl.call() like we did before
//     - super() is basically the constructor function of the parent class
//!    -- must always be the first thing in the constructor!
//     -- super() is responsible for creating the 'this' keyword in the subclass
//     --- if we didn't need 'this' we wouldn't need the constructor function at all because the super() would have automatically been called w/ all the arguments

class StudentCl extends PersonCl {
  // we still have to pass all the properties to inherit to the constructor
  constructor(fullName, birthYear, course) {
    // now we don't need to call PersonCl.call() like we did before
    super(fullName, birthYear); // pass in the properties of the parent class
    // super() also now enables us to use 'this'
    this.course = course;
  }

  // methods can go in the class
  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  //! let's override a parent method
  //! - this works because this version of the method appears first in the prototype chain!
  //! - we can also say that it is "shadowing" the one in the parent class
  calcAge() {
    console.log(
      `I'm ${
        2021 - this.birthYear
      } years old! But as a student I feel more like ${
        2121 - this.birthYear
      }...👻`
    );
  }
}

const lostOtto = new StudentCl('Lost Otto', 2012, 'Theftology');
console.log(lostOtto); // StudentCl: _fullname:... birthYear:... course: "Theftology"

// call the method on the StudentCl
lostOtto.introduce(); // My name is Lost Otto and I study Theftology
// call the calcAge() that's in the parent class
lostOtto.calcAge(); // I'm 9 years old! 
*/

//! ////////////////////////////////////////////////
//! INHERITANCE BETWEEN "CLASSES" - OBJECT.CREATE - BEAUTIFUL!
// - We're not faking classes - but ES6 Classes and constructor functions are way more used in the real world...
// With this approach we don't worry at all about constructors or prototype properties or 'new'
// it's just objects linked to other objects
// - define a PersonProto
// - Object.create a  prototype StudentProto out of PersonProto
// - Object.create an Object                 out of StudentProto
// -- so you see the prototype chain

/*const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const theBob = Object.create(PersonProto);

// we want to make student inherit directly from PersonProto

// make a prototype called student
const StudentProto = Object.create(PersonProto);

// create 2 methods
// let's create an init() so we don't have to manually define properties on new student Objects.
StudentProto.init = function (firstName, birthYear, course) {
  // we need to set the 'this' keyword to this method, not the parent, with .call(this)
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

// Add a method to the StudentProto
StudentProto.introduce = function () {
  console.log(
    `My name is ${this.firstName}. Don't f*ck with me, I studied ${
      this.course
    } in school! Oh... and tell the cops it's my birthday, I'm ${
      2021 - this.birthYear
    } years old now!`
  );
};

// now we can use this StudentProto to create new students
const superBob = Object.create(StudentProto);
console.log(superBob); // we don't see the details, just the init() method
superBob.init('Super Bob', 2015, 'Carjackology');
console.log(superBob); // we see the new details and the init() method
superBob.introduce();
*/

//! ////////////////////////////////////////////////
//! ANOTHER CLASS EXAMPLE
// -- THE POINT IS THAT WE NEED ENCAPLUATION!

/*class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.pin = pin;
    this.movements = []; // we'll always start an account with an empty array
    this.locale = navigator.language;

    // we can execute any code in here that we want
    console.log(`Thanks for opening an account!`);
    // so when someone creates a 'new' acount they will be greeted
  }

  //! here we're creating a PUBLIC interface - an "API"
  deposit(val) {
    this.movements.push(val);
  }

  withdraw(val) {
    // we can just call that deposit method
    this.deposit(-val);
  }

  approveLoan(val) {
    return true;
  }

  // We only want to make this method public
  requestLoan(val) {
    if (this.approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan Approved!`);
    }
  }
}

// create a new account
const acc1 = new Account('Ryan', 'ARS', 1111);
// console.log(acc1);

// what about deposits and withdrawls?
//! Approach #1 - NOT A GOOD IDEA AT ALL
// deposit
// acc1.movements.push(250);
// withdraw
// acc1.movements.push(-40);
// console.log(acc1);
//! Approach #2 - Much better to create methods that interact with these properties
// - Expecially true for important things like deposits and withdrawls
// -- SO ABOVE WE'RE GOING TO CREATE A DEPOSIT AND WITHDRAWL METHOD
//! here we're using a public interface
acc1.deposit(100);
acc1.withdraw(10);
console.log(acc1);
// - but having those public methods still doesn't prevent people from doing things the other way
// same goes for the pin, it can be accessed from outside the accounr
console.log(acc1.pin); // but this shouldn't be accessible from outside the class
// and the same goes for methods... see the requestLoan() method above
acc1.requestLoan(1000);
console.log(acc1);
*/

//! //////////////////////////////////////////////////
//! ENCAPSULATION: PROTECTED PROPERTIES AND METHODS
// - keeping some properties/methods private, inside the class
// - this is essential to do in anything more than a toy application
//! 2 REASONS WE NEED ENCAPSULATION
// - 1) To prevent code from outside of a class from accidentally manipulating the data inside the class
//      Which is why we implement a public interface
// - 2) When we expose a small interface, then we can change all the other internal methods with more confidence bc we don't have to worry about external code relying on the classes methods and things won't break when we do internal changes
//! but JS classes don't yet support real data privacy and encapsulation
//... there's a proposal in the works though...

// if we wanted to give access to a private property
// we would need to do it through a public method

// SO IN THIS LECTURE WE WILL FAKE ENCAPSULATION - using a convention (_)
// - this doesn't make the info truly private, but it's a convention...
// -- since it's not truly private, it's "protected"
/*class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    // protect the pin
    this._pin = pin;
    // a protected property, flagged by a convention (_)
    this._movements = [];
    this.locale = navigator.language;

    // we can execute any code in here that we want
    console.log(`Thanks for opening an account!`);
    // so when someone creates a 'new' acount they will be greeted
  }

  // Public Interface
  //! here we're creating a PUBLIC interface - an "API"
  //..we could also us a getter here, but for simplicity sake
  //..it's common to just use get or set as part of the method name instead
  getMovements() {
    return this._movements;
  }

  deposit(val) {
    this._movements.push(val);
  }

  withdraw(val) {
    // we can just call that deposit method
    this.deposit(-val);
  }
  // "Protect the method" - just to be used internally
  // aka NOT part of the public API
  _approveLoan(val) {
    return true;
  }

  // We only want to make this method public
  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan Approved!`);
    }
  }
}

const acc1 = new Account('Ryan', 'ARS', 1111);

acc1.deposit(100);
acc1.withdraw(10);
console.log(acc1.getMovements()); // [100, -10]
// - so everyone can still access the movements and not override them
console.log(acc1);
*/

//! //////////////////////////////////////////////////
//! ENCAPSULATION: PRIVATE CLASS FIELDS AND METHODS
// - these are still under proposal
// - "Class fields" - stg 3 - when stage 4 it'll be part of JS
// - this will be a move to indicate that classes are more than just syntactic sugar
// why is it called class fields?
// - bc in OOP properties are usually called 'fields'
// there will be 4 kinds of fields and methods, well, 8 (there's also a static version of each)
// - 1) Public fields - aka public instance field
// - 2) Private fields - so far only supported by Google Chrome
// - 3) Public methods
// - 4) Private Methods

/*class Account {
  //! - 1) PUBLIC FIELDS - think of it as a property that will be PRESENT on all instances, NOT ON A PROTOTYPE, they are referenceable by the 'this' keyword
  //      aka public instance field
  locale = navigator.language;
  //! - 2) PRIVATE FIELDS - these properties will be truly unaccessible from the outside
  // the (#) makes it private
  // - these will be available on the instances themselves, not the prototypes
  #movements = [];
  #pin; // creates an empty variable

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    // Protected property
    this.#pin = pin;
    // this._movements = [];
    // this.locale = navigator.language;

    console.log(`Thanks for opening an account!`);
  }

  //! - 3) PUBLIC METHODS
  // Public Interface
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
  }

  withdraw(val) {
    this.deposit(-val);
  }

  // We only want to make this method public
  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan Approved!`);
    }
  }

  //! - 4) PRIVATE METHODS - useful for hiding the implementation details from the outside
  //    - currently, no browser supports this
  _approveLoan(val) {
    return true;
  }
}

const acc1 = new Account('Ryan', 'ARS', 1111);

acc1.deposit(100);
acc1.withdraw(10);
console.log(acc1.getMovements()); // [100, -10]
// - so everyone can still access the movements and not override them
console.log(acc1);

// console.log(acc1.#movements); // Uncaught SyntaxError: Private field '#movements' must be declared in an enclosing class
// Hurray we can't access #movements! :D
// console.log(acc1.#pin); // hurray, it's private!

// console.log(acc1.#approveLoan(100));
// Chrome is basically seeing this as a private class field... so we wait... and go back to protecting _approveLoan
*/

//! //////////////////////////////////////////////////
//! CHAINING METHODS
// - returning 'this' makes the method chainable
// - just requires us to return a 'this', the current object from each method
//! -- this makes the most sense in methods that actually set some property

/*class Account {
  locale = navigator.language;
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;

    console.log(`Thanks for opening an account!`);
  }

  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val); // this sets the movements
    //! all we have to do to make it chainable is return this
    return this; // bc this == current object
  }

  withdraw(val) {
    this.deposit(-val); // this sets the movements
    //! all we have to do to make it chainable is return this
    return this; // bc this == current object
  }

  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan Approved!`);
      //! all we have to do to make it chainable is return this
      return this; // bc this == current object
    }
  }

  static helper() {
    console.log('Helper...');
  }

  _approveLoan(val) {
    return true;
  }
}

const acc1 = new Account('Ryan', 'ARS', 1111);

acc1.deposit(100);
acc1.withdraw(10);
console.log(acc1.getMovements()); // [100, -10]
console.log(acc1);

Account.helper();

//! the chaining
acc1.deposit(10000).deposit(69).withdraw(42).requestLoan(20).withdraw(40);
console.log(acc1.getMovements()); // we see all them movements
*/

//! /////////////////////////////////////
//! Coding Challenge #4

// 1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  // 3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!
  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }
}

class EVCl extends CarCl {
  // 2. Make the 'charge' property private;
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  accelerate() {
    this.speed += 10;
    this.#charge--;
    console.log(
      `${this.make} is going at ${this.speed} km/h... btw your charge is at ${
        this.#charge
      }`
    );
    return this;
  }

  brake() {
    this.speed -= 5;
    console.log(
      `${this.make} is going at ${this.speed} km/h... btw your charge is at ${
        this.#charge
      }`
    );
    return this;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    console.log(`Your charge is now at ${this.#charge}`);
    return this;
  }
}
// DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%
const gogoSpeedRacer = new EVCl('Rivian', 120, 23);
console.log(gogoSpeedRacer);
gogoSpeedRacer
  .accelerate()
  .brake()
  .brake()
  .brake()
  .accelerate()
  .chargeBattery(99)
  .accelerate()
  .brake()
  .accelerate()
  .brake()
  .accelerate()
  .brake();

// console.log(gogoSpeedRacer.#charge); // error! :D
