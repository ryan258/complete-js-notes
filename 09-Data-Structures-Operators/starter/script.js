'use strict';
// Notes go in a backwards order, so lesson 1 is at the bottom!

///////////////////////////////////////
// Coding Challenge #4
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener('click', () => {
  const text = document.querySelector('textarea').value;
  // console.log(text);
  const rows = text.split('\n');
  // console.log(rows);
  let count = 0;
  for (const [i, row] of rows.entries()) {
    // console.log(row);
    const [first, second] = row.toLowerCase().trim().split('_');
    const output = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;
    console.log(`${output.padEnd(20)} ${'👻'.repeat(i + 1)}`);
  }
});

// const under2Camel = text => {
//   console.log(text);
//   const lowerText = text.toLowerCase();
//   console.log(lowerText);
//   const rows = lowerText.split('_');
//   console.log(rows);

//   const newrows = [];
//   for (const word in rows) {
//     newrows.push(word[0] + word.slice(1));
//   }
//   console.log(newrows);
// };

// under2Camel('My_DaMn_Text');

/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/

///////////////////////////////////////
// WORKING WITH STRINGS - Part 1
// ---!BTS (BOXING) when methods are called on a string, the string goes from being a primitive to an object(the "box")
// ---then when the operation is done the string is converted back to a primitive
// console.log(new String('Ryan')); // String {"Ryan"}
// console.log(typeof new String('Ryan')); // object

// const airline = 'Aerolíneas Argentinas';
// const plane = 'A320';

// String Properties
// console.log(plane[0]); // A
// console.log(plane[1]); // 3
// console.log(plane[2]); // 2
// console.log(plane[3]); // 0
// console.log('B737'[0]); // B

// console.log(airline.length); // 21
// console.log('B737'.length); //4

// String Methods - it's impossible to mutate strings, they're primitives - they ALL ALWAYS return a new string
// - all string methods return primitives

// console.log(airline.indexOf('r')); // 2
// console.log(airline.lastIndexOf('r')); // 12
// console.log(airline.indexOf('Argentinas')); // 11 - note, also case sensitive
// - why are these index useful? -
// -- slice method (begin[, end-not included in the string])
// console.log(airline.slice(11)); // Substring is Argentinas
// console.log(airline.slice(11, 20)); // Substring is Argentina
//
// console.log(airline.slice(0, airline.indexOf(' '))); // Substring is Aerolineas
// console.log(airline.slice(airline.lastIndexOf('n') + 1)); // Substring is as
// console.log(airline.slice(-3)); // nas
// console.log(airline.slice(6, -3)); // neas Argenti

// const checkMiddleSeat = seat => {
//   // console.log(seat.lastIndexOf('B'));
//   // B and E are middle seats
//   // seat.lastIndexOf('B') != -1 || seat.lastIndexOf('E') != -1
//   //   ? console.log('It is a middle seat')
//   //   : console.log('It is not a middle seat');
//   const s = seat.slice(-1);
//   if (s === 'B' || s === 'E') {
//     console.log('It is a middle seat');
//   } else {
//     console.log('It is NOT a middle seat');
//   }
// };

// checkMiddleSeat('11A');
// checkMiddleSeat('11B');
// checkMiddleSeat('23C');

// string methods always return primitves
// console.log(typeof new String('Ryan').slice(1)); // string

// Change the case of a string
// console.log(airline.toLowerCase());
// console.log(airline.toUpperCase());
// console.log('Ham-masters'.toUpperCase());

// Fix Capitalization in name
// const passanger = 'rYaN';
// const passangerLower = passanger.toLowerCase(); // 'ryan'
// const passangerFixed =
//   passangerLower[0].toUpperCase() + passangerLower.slice(1);
// console.log(passangerFixed); // 'Ryan'

// Compare emails
// const email = 'ryan@ryanleej.com';
// const loginEmail = '  RYan@RYANleej.cOm  \n';

// const loginEmailLowercase = loginEmail.toLowerCase();
// console.log(loginEmailLowercase);
// const loginEmailTrimmed = loginEmailLowercase.trim();
// console.log(loginEmailTrimmed);

// const match = email === loginEmailTrimmed ? 'They match!' : 'No dice...';
// console.log(match);

// const normalizeEmail = loginEmail.toLowerCase().trim();
// console.log(normalizeEmail);
// console.log(email === normalizeEmail); // true

// const doEmailsMatch = (email, loginEmail) => {
//   const normalizedEmail = loginEmail.toLowerCase().trim();
//   if (email === normalizedEmail) {
//     console.log('They match!!!');
//   } else {
//     console.log('wtf?');
//   }
// };

// doEmailsMatch('ryan@ryan.com', 'RyAn@RYAN.com   '); // "They match!!!"

// Replace parts of strings
// const priceCO = '600,00CBV';
// const priceUS = priceCO.replace('CBV', '$').replace(',', '.');
// console.log(priceUS);

// const announcement =
//   'All passangers come to boarding door 23. Boarding door 23!';
// // console.log(announcement.replaceAll('door', 'gate'));
// console.log(announcement.replace(/door/g, 'gate'));

// Booleans - good with conditionals
// const plane2 = 'A320neo';
// includes()
// console.log(plane2.includes('A320')); // true
// console.log(plane2.includes('X')); // false
// startsWith()
// console.log(plane2.startsWith('A3')); // true
// console.log(plane2.endsWith('neo')); // true

// Practice exercise
// const checkBaggage = items => {
//   const baggage = items.toLowerCase();
//   console.log(baggage);
//   if (baggage.includes('knife') || baggage.includes('gun')) {
//     console.log('Shoot on sight');
//   } else {
//     console.log('Enjoy your trip');
//   }
// };

// checkBaggage('I have a laptop and a PoCKEt knife.');
// checkBaggage('I have a shoe.');
// checkBaggage('I have a GUN just in case the cow gets out of hand.');

// .SPLIT() - allows us to split a string based on a divider string into an ARRAY
// console.log('a+very+nice+string+bob'.split('+')); // ["a", "very", "nice", "string", "bob"]
// console.log('Ryan Johnson'.split(' ')); // ["Ryan", "Johnson"]
// console.log('alltheseletters'.split('')); // each letter is its own array item
// fun to use with destructuring
// const [firstName, lastName] = 'Ryan Johnson'.split(' ');
// console.log(firstName);
// console.log(lastName);

// .JOIN(divider string) - the opposite of .SPLIT()
// const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
// console.log(newName);

// Exercise
// const passenger13 = 'jessica ann smith davis esquire'
// const capitalizeName = name => {
//   const names = name.toLowerCase().split(' ');
//   const namesUpper = [];

//   for (const n of names) {
//     // namesUpper.push(n[0].toUpperCase() + n.slice(1));
//     namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
//   }

//   console.log(namesUpper.join(' '));
// };

// capitalizeName('jessica ann smith davis esquire');
// capitalizeName('ralph johnson');

// Padding
// const message = 'Go to gate 23!';
// // - .padStart(total number of characters, spaces at the beginning, 'char to pad with')
// console.log(message.padStart(25, '+').padEnd(35, '!'));
// console.log(message.padEnd(25, '+'));
// console.log('Ryan'.padEnd(25, '+'));

// Example - Credit Cards
// const maskCreditCard = number => {
//   // const str = String(number)
//   const str = number + '';
//   const last = str.slice(-4);
//   console.log(last);
//   return last.padStart(str.length, '*');
// };
// console.log(maskCreditCard(999999999999));
// console.log(maskCreditCard('2342356345323424'));

// .repeat() - repeat same string multiple times
// const message2 = 'Bad weather... All Departures Delayed! ';
// console.log(message2.repeat(6));

// const planesInLine = n => {
//   console.log(`There are ${n} planes in line! ${'☠️'.repeat(n)}`);
// };

// planesInLine(5);
// planesInLine(15);
// planesInLine(3);

// CODE FOR MOST SECTIONS OF THE CHAPTER
// const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

// const openingHours = {
//   [weekdays[3]]: {
//     open: 12,
//     close: 22,
//   },
//   [weekdays[4]]: {
//     open: 11,
//     close: 23,
//   },
//   [`${weekdays[5]}`]: {
//     open: 0, // Open 24 hours
//     close: 24,
//   },
// };

// const restaurant = {
//   name: 'Classico Italiano',
//   location: 'Via Angelo Tavanti 23, Firenze, Italy',
//   categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
//   starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
//   mainMenu: ['Pizza', 'Pasta', 'Risotto'],

//   // ES6 enhanced object literal
//   openingHours,

//   order(starterIndex, mainIndex) {
//     // return 2 return values from this function to deconstruct on use
//     return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
//   },

//   // we can do destructuring right away as we pass the object to a function
//   orderDelivery({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) {
//     // console.log(obj);
//     console.log(`Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]}
//     will be delived to ${address} at ${time} ]! 👻`);
//   },

//   orderPasta(ing1, ing2, ing3) {
//     console.log(
//       `Here is your delicious pasta with ${ing1}, ${ing2}, and ${ing3}.`
//     );
//   },

//   orderPizza(mainIngredient, ...otherIngredients) {
//     console.log(mainIngredient);
//     console.log(otherIngredients);
//   },
// };

///////////////////////////////////////
// Coding Challenge #3

// const gameEvents = new Map([
//   [17, '⚽️ GOAL'],
//   [36, '🔁 Substitution'],
//   [47, '⚽️ GOAL'],
//   [61, '🔁 Substitution'],
//   [64, '🔶 Yellow card'],
//   [69, '🔴 Red card'],
//   [70, '🔁 Substitution'],
//   [72, '🔁 Substitution'],
//   [76, '⚽️ GOAL'],
//   [80, '⚽️ GOAL'],
//   [92, '🔶 Yellow card'],
// ]);

/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time). */

// 1. Create an array 'events' of the different game events that happened (no duplicates)
// const events = [...new Set(gameEvents.values())];
// console.log(events);

// 2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
// gameEvents.delete(64);
// console.log(gameEvents);

// 3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
// console.log(
//   `An event happened, on average, every ${90 / gameEvents.size} minutes.`
// );

//bonus, get more specific
//get 92
// const time = [...gameEvents.keys()].pop();
// console.log(
//   `An event happened, on average, every ${time / gameEvents.size} minutes.`
// );

// 4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
// for (const [min, event] of gameEvents) {
//   const half = min <= 45 ? 'First' : 'Second';
//   console.log(`[${half} HALF] ${min}: ${event}`);
// }
//[FIRST HALF] 17: ⚽️ GOAL

///////////////////////////////////////
// SUMMARY: WHICH DATA STRUCTURE TO USE?
//

///////////////////////////////////////
// MAPS (ES6) FUNDAMENTALS
// - a lot more useful than sets
// - it's a data structure that lets us map values to keys!
// - like an object, BUT in maps the keys can be of any type, this can be HUGE
// - each set method call returns a new set

// const restaurantMap = new Map(); // easiest way to create a map is to make an empty map
// restaurantMap.set('name', 'Classico Italiano');
// restaurantMap.set(1, 'Firenze, Italy');
// console.log(restaurantMap.set(2, 'Lisbon, Portugal'));
// restaurantMap
//   .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
//   .set('open', 11)
//   .set('close', 22)
//   .set(true, 'We are open :)')
//   .set(false, 'We are closed...👻');
// console.log(restaurantMap);
// //read data from a map, use the .get() method
// console.log(restaurantMap.get('name'));
// console.log(restaurantMap.get(true));

// const time = 21;
// // clever but not super readable...
// console.log(
//   restaurantMap.get(
//     time > restaurantMap.get('open') && time < restaurantMap.get('close')
//   )
// );

// map.() methods
// - does it contain a certain key?
// console.log(restaurantMap.has('categories'));
// restaurantMap.delete(2);
// console.log(restaurantMap);
// console.log(restaurantMap.size);
// restaurantMap.clear();
// console.log(restaurantMap.size);

// Arrays as map keys
// const arr = [1, 2];
// restaurantMap.set([1, 2], 'Test');
// restaurantMap.set(arr, 'Test');
// console.log(restaurantMap);
// console.log(restaurantMap.size);
// now to get the data...
// console.log(restaurantMap.get([1, 2])); // undefined - [1, 2] is not the same array as the one we set
// console.log(restaurantMap.get(arr)); // 'Test' - [1, 2] is now the same arr

//also useful with DOM objects
// restaurantMap.set(document.querySelector('h1'), 'heading'); // result will be an object
// console.log(restaurantMap); // {h1 => 'heading'}

///////////////////////////////////////
// MAPS: ITERATION
// - another way to populate a set

// create a new map
// const question = new Map([
//   ['question', 'what is the best programming language?'],
//   // specify options
//   [1, 'C'],
//   [2, 'Fortran'],
//   [3, 'Java'],
//   [4, 'Javascript'],
//   ['correct', 4],
//   [true, 'Correct! 🤗'],
//   [false, 'You are now a 👻'],
// ]);

// console.log(question); // we get an array of arrays
// console.log(Object.entries(openingHours)); // we get an array of arrays
// // so we can easily convert from objects to maps
// const hoursMap = new Map(Object.entries(openingHours));
// console.log(hoursMap);

// Iteration - maps are iterable
// print options to the console
// console.log(`${question.get('question')}`);
// for (const [key, value] of question) {
//   if (typeof key === 'number') console.log(`Answer: ${key}: ${value}`);
// }
// const answer = Number(prompt(`Your answer: `));
// console.log(answer);

// console.log(question[answer === question.get('correct')]);

// console.log(question.get(question.get('correct') === answer));

// sometimes we need to convert a map back to an array
// console.log([...question]); // we get back an array of arrays

// we also have .entries, .keys, .values
// console.log([...question.entries()]);
// console.log([...question.keys()]);
// console.log([...question.values()]);

///////////////////////////////////////
// SETS (ES6) - is a certain value in a set or not? (all about the .has method)
// Sets are bit meant to replace arrays at all
// - Just a collection of unique values, no duplicates
// - Looks like an array (no key-value pairs)
// - Like arrays, sets are also iterables
// - order of elements in an array is irrelevant
// - - there are no indexes
// - there's no way to get values out of a set without changing it back into an array
// - BUT SETS ARE ITERABLES!

// const ordersSet = new Set(['Pasta', 'Pizza', 'Pizza', 'People', 'People']);
// console.log(ordersSet); // Set(3) {'Pasta', 'Pizza', 'People'}

// Strings are also iterables
// console.log(new Set('Kitten')); //{"K", "i", "t", "e", "n"}

// WORK WITH sets
// console.log(ordersSet.size); // 3
// console.log(ordersSet.has('People')); // true
// ordersSet.add('Potatos');
// console.log(ordersSet); // see potatos have been added
// ordersSet.delete('People');
// console.log(ordersSet);

// ordersSet.clear();
// console.log(ordersSet); // empty set

// - BUT SETS ARE ITERABLES!
// for (const order of ordersSet) console.log(order);

// Example Use Case: To remove duplicate values of arrays
// const staff = ['Waiter', 'Waiter', 'Manager', 'Bartender', 'Chef', 'Chef'];
// const staffUnique = new Set(staff);
// const staffUnique = new Set(staff);
// console.log(staffUnique);
// console.log(staffUnique);
// - note - the spread iterator works on all iterables!
// const staffArray = [...staffUnique];
// console.log(staffArray);
// const staffUnique = [...new Set(staff)];
// console.log(staffUnique);

// Example Use Case: Count different letters in a string
// console.log(new Set('Too many puppies').size);

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/

// const game = {
//   team1: 'Bayern Munich',
//   team2: 'Borrussia Dortmund',
//   players: [
//     [
//       'Neuer',
//       'Pavard',
//       'Martinez',
//       'Alaba',
//       'Davies',
//       'Kimmich',
//       'Goretzka',
//       'Coman',
//       'Muller',
//       'Gnarby',
//       'Lewandowski',
//     ],
//     [
//       'Burki',
//       'Schulz',
//       'Hummels',
//       'Akanji',
//       'Hakimi',
//       'Weigl',
//       'Witsel',
//       'Hazard',
//       'Brandt',
//       'Sancho',
//       'Gotze',
//     ],
//   ],
//   score: '4:0',
//   scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
//   date: 'Nov 9th, 2037',
//   odds: {
//     team1: 1.33,
//     x: 3.25,
//     team2: 6.5,
//   },
// };

/* 
Let's continue with our football betting app!*/

// 1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
// for (let i = 0; i < game.scored.length; i++) {
//   console.log(`Goal ${i + 1}: ${game.scored[i]}`);
// }
// //OR
// for (const [i, player] of game.scored.entries()) {
//   console.log(`Goal ${i + 1}: ${player}`);
// }

// 2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
// const odds = Object.values(game.odds);
// console.log(odds);

// let oddsTotal = 0;

// for (let i = 0; i < odds.length; i++) {
//   oddsTotal += odds[i];
// }

// console.log(`The average odds is: ${oddsTotal / odds.length}`);
//// OR
// const odds = Object.values(game.odds);
// let average = 0;

// for (const odd of odds) average += odd;

// average /= odds.length;
// console.log(average);
/* 3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉 */
// const oddsEntries = Object.entries(game.odds);
// console.log(oddsEntries);
// for (const [team, odd] of oddsEntries) {
//   console.log(
//     `Odd of ${game[team] ? `victory ${game[team]}` : 'a draw'} is ${odd}`
//   );
// }

/* BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/

///////////////////////////////////////
// Looping Objects: Object Keys, Values, Entries
//

// Property NAMES
// print the keys of an object
// const properties = Object.keys(openingHours);
// console.log(properties); // get an array of keys ["thu", "fri", "sat"]
// console.log(properties.length); // so we can use length on it

// let openStr = `We are open on ${properties.length} days: `;

// for (const day of Object.keys(openingHours)) {
//   // console.log(day);
//   openStr += `${day}, `;
// }

// console.log(openStr);

// Property VALUES
// print the VALUES of an object
// const values = Object.values(openingHours);
// console.log(values); // get an array of objects [{open: ..., close: ...}, ...]

// let openStr2 = '';

// for (const day2 of values) {
//   openStr2 += day2.open;
// }

// console.log(openStr2); // 12 11 0

// ENTRIES - loop over an object - properties + values together (Entire Object!)
// const entries = Object.entries(openingHours);
// console.log(entries); // get an array of arrays - [["thu", {open: …, close: ,,.}]...]

// for (const x of entries) {
// and we can use destructuring in line here! i.e. [key, value]
// for (const [key, { open, close }] of entries) {
// for (const [day, { open, close }] of entries) {
//   // console.log(x);
//   console.log(`On ${day} we open at ${open} and close at ${close}`);
// }

///////////////////////////////////////
// OPTIONAL CHAINING (.?) (ES2020) - nullish
// - damn near always used with the nullish coalescing operator
// - if a certain property doesn't exist, then undefined is returned immediately (to avoid errors being thrown)
// - great for preventing all sorts of bugs
// let's get opening hours of our restaurant for monday
// console.log(openingHours.mon.open); // error: Can't read property of undefined
// - we could
// if (restaurant.openingHours.mon) console.log(openingHours.mon.open);
// if (restaurant.openingHours.fri) console.log(openingHours.fri.open); // 11
// if (restaurant.openingHours && restaurant.openingHours.mon)
//   console.log(openingHours.mon.open);
// - but there's a better way! maybe you don't always have opening hours with a restaurant!
// WITH optional chaining
// - only if the property before the ? mark exists will it, then will the following property be read, if not, BAM! undefined
// - remember: a property only exists if it is not null and not undefined
// console.log(restaurant.openingHours.mon.open); // TypeError: cannot read property 'open' of undefined
// console.log(restaurant.openingHours.mon?.open); // undefined - open only happens if everything preceding it actually exists

// we can have multiple optional chainings
// console.log(restaurant.openingHours?.mon?.open); // undefined

// Example
// const dayz = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
// for (const day of dayz) {
//   // console.log(day);
//   const open = restaurant.openingHours[day]?.open ?? 'closed';
//   console.log(`On ${day}, we open at ${open}`);
// }

// Optional chaining on methods
// - check if a method actually exists before calling it, then call it
// console.log(restaurant.order?.(0, 1) ?? 'Method does not exist!'); // ["Focaccia", "Pasta"]
// console.log(restaurant.orderRissoto?.(0, 1) ?? 'Method does not exist!'); // Method does not exist!

// Optional chaining also works on arrays!
// - to check if an array is empty
// const users = [
//   {
//     name: 'Manny',
//     email: 'the@manny.com',
//   },
// ];
// get name of first element
// console.log(users[0]?.name || 'User array empty'); // Manny
// console.log(users[1]?.name || 'User array empty'); // 'User array empty'
// - a better way to check for an empty array than
// if (users.length > 0) {
//   console.log(users[0].name);
// } else {
//   console.log('user array empty');
// }

///////////////////////////////////////
// ENHANCED OBJECT LITERALS (ES6 enhancemets)
// - introduced 3 ways to write object literals
// 1.) Instead of openingHours = openingHours, in an object we can just write openingHours,
// 2.) How we write methods, no more fn expression:
//     from: orderDelivery: function (...
//     to:   orderDelivery(...
// 3.) We can now compute property names
//     - see const weekday & opening hours
//     - sometimes extremely useful
// console.log(openingHours); // we see a thu obj

///////////////////////////////////////
// LOOPING ARRAYS: THE FOR-OF LOOP (ES6)
// - making a traditional for loop is a lot of work... so that's why we have this, a simpler way
// - no code block when you have just 1 statement to execute
// - we can still use continue and break keywords, other loops don't have that!
// - but getting the index is kind of a pain...
// let's loop over our menu
// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// for (const item of menu) console.log(`${item} is delicious!`);
// - but getting the index is kind of a pain... using entries!
// for (const item of menu.entries()) {
//   console.log(item);
// } // each item is put out as an array [key, item]
// what are you entries?
// console.log(menu.entries()); // array iterator?! {}
// console.log([...menu.entries()]); // now we get the array of arrays
// ok get it
// for (const item of menu.entries()) {
//   console.log(`${item[0] + 1}: ${item[1]}`);
// } // outputs the index + 1 for each item
// BUT! We can also just destructure where item is
// for (const [i, el] of menu.entries()) {
//   console.log(`${i + 1}: ${el}`);
// } // outputs the index + 1 for each item, like the previous example
///////////////////////////////////////
// Coding Challenge #1

/*
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:*/
// const game = {
//   team1: 'Bayern Munich',
//   team2: 'Borrussia Dortmund',
//   players: [
//     [
//       'Neuer',
//       'Pavard',
//       'Martinez',
//       'Alaba',
//       'Davies',
//       'Kimmich',
//       'Goretzka',
//       'Coman',
//       'Muller',
//       'Gnarby',
//       'Lewandowski',
//     ],
//     [
//       'Burki',
//       'Schulz',
//       'Hummels',
//       'Akanji',
//       'Hakimi',
//       'Weigl',
//       'Witsel',
//       'Hazard',
//       'Brandt',
//       'Sancho',
//       'Gotze',
//     ],
//   ],
//   score: '4:0',
//   scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
//   date: 'Nov 9th, 2037',
//   odds: {
//     team1: 1.33,
//     x: 3.25,
//     team2: 6.5,
//   },
// };
//1. Create one player array for each team (variables 'players1' and 'players2')
// const players1 = [...game.players[0]];
// const players2 = [...game.players[1]];
// const [players1, players2] = [game.players[0], game.players[1]];
// const [players1, players2] = game.players;
// console.log(players1);
// console.log(players2);
//2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
// const [gk1, ...fieldPlayers1] = players1;
// console.log(gk1);
// const [gk2, ...fieldPlayers2] = players2;
// console.log(gk2);
//3. Create an array 'allPlayers' containing all players of both teams (22 players)
// const allPlayers = [...players1, ...players2];
// console.log(allPlayers);

//4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
// const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
// console.log(players1Final);

//5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
// const [team1, x, team2] = [1.33, 3.25, 6.5];
// const {
//   odds: { team1, x: draw, team2 },
// } = game;
// console.log(team1, draw, team2);

//6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
// function printGoals(...players) {
//   console.log(`Total goals: ${players.length}`);
//   for (let i = 0; i < players.length; i++) {
//     console.log(players[i]);
//   }
// }

/* TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored */
// printGoals(...['Davies', 'Muller', 'Lewandowski', 'Kimmich']);
// printGoals(...game.scored);

//7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.
// console.log(
//   game.odds.team1 > game.odds.team2
//     ? 'Team 2 is the favorite'
//     : 'Team 1 is the favorite'
// );

// team1 < team2 && console.log('Team 1 is likely to win!'); // 'Team 1 is likely to win!'
// team2 < team1 && console.log('Team 2 is likely to WIN!?'); // nothin

////////////////////////////////////
// NULLISH COALESCING OPERATOR ?? (ES2020)
// - when we want 0 to be a legit value
// works with nullish values instead of falsy values
// - nullish: null or undefined (NOT 0 or '')
// - so only nullist values will trip the operator

// restaurant.numGUnits = 0;

// // const gGUnits2 = restaurant.numGUnits || 10;
// const gGUnits2 = restaurant.numGUnits ?? 10;
// console.log(gGUnits2); // 23

////////////////////////////////////
// SHORT CIRCUITING (&& and ||) ---- but we need to work around 0 being a falsy value but when it's real...
// - they can use any data type
// - can return any data type
// - they short-circuit evaluate
// || - or
// - if first value is a truthy value, it returns that first value, the other won't even be looked at
// && - and
// - if the first value is truthy, then the second value is returned
// console.log('------OR-----');
// console.log(3 || 'Bufalo'); // 3
// console.log('' || 'Ike'); // 'Ike
// console.log(true || 0); // true
// console.log(undefined || null); // null
// // returns first truthy value
// console.log(undefined || 0 || '' || 'Dumb bear' || 12); // Dumb bear
// //
// restaurant.numGuests = 23;
// const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
// console.log(guests1); //23 : 10

// const guests2 = restaurant.numGuests || 10;
// console.log(guests2); // 23

// console.log(6 && 'Manny'); // 'Manny'

// console.log('------AND-----');
// - short cicuits when the first value is falsy and immediately returns it
// - trip on first falsy value it encounters, or if last value
// console.log(0 && 'Scooty'); // 0
// console.log(6 && 'Scrapper'); // scrapper
// console.log('Hello' && 12 && null && 42); // null

// practical example
// if (restaurant.orderPizza) {
//   restaurant.orderPizza('meat', 'cheese');
// }
// restaurant.orderPizza && restaurant.orderPizza('meat', 'cheeses');

////////////////////////////////////
// THE REST PATTERN AND PARAMETERS - PACK INTO ARRAY
// - Does the opposite of the spread operator () but same syntax
// -- takes multiple elements and condenses them into an array
// - must always be last in the destructuring assignment
// - can only be 1 rest in a destructuring assignment
// - Rest parrern also works in OBJECTS!

// 1.) DESTRUCTURING
// Example of Spead - used on the right hand side of the =
// const arr = [1, 2, ...[3, 4]];
// console.log(arr); // [1, 2, 3, 4]

// REST Pattern - left of the =
// const [a, b, ...others] = [1, 2, 3, 4, 5, 6];
// console.log(others); // [3, 4, 5, 6]

// ... on both sides of the =
// const [pizza, , risotto, ...otherFood] = [
//   ...restaurant.mainMenu,
//   ...restaurant.starterMenu,
// ];
// console.log(pizza, risotto, otherFood);

// Rest in OBJECTS!
// - remaining elements will be collected into a new object
// example - create an object of opening hours that's only the weekdays
// const { sat, ...weekdays } = restaurant.openingHours; // we took sat out first, then collected the rest
// console.log(sat);
// console.log(weekdays);

// 2.) FUNCTIONS - "Rest parameters" - collects all unused parameters and put them in an array
// - Pass multiple arguments into a function at the same time
// const add = function (...nums) {
//   // console.log(nums); // an array of passed values
//   let sum = 0;
//   for (let i = 0; i < nums.length; i++) sum += nums[i];
//   console.log(sum);
// };
// add(2, 3, 4); // [2, 3, 4] // 9
// add(5, 6, 7, 8, 9); // [5, 6, 7, 8, 9] // 35

// const x = [23, 5, 7];
// add(...x);

// ^^^ adding the orderPizza function for this example
// restaurant.orderPizza('pepperoni', 'meat', 'extra cheese'); // pepperoni // ["meat", "cheese"]
// restaurant.orderPizza('people'); // people // []
////////////////////////////////////
// THE SPREAD OPERATOR - A COMMON OPERATION - UNPACK FROM ARRAY
// - USE CASES: used to build new arrays, or pass multiple values into a function
//   - expanded an array into individual elements
// - takes all the values out of an array and write them out individually
// - difference btw destructuring and spread is that spread is used in places separated with commas (,)
// - spread operator works on ALL ITERABLES () not objects
// - can only use when building an array or when passing values separated by a comma into a function

// const arr = [7, 8, 9];
// const badNewArray = [1, 2, arr[0], arr[1], arr[2]];
// console.log(badNewArray); // [1, 2, 7, 8, 9]

// const goodArray = [1, 2, ...arr];
// console.log(goodArray); // [1, 2, 7, 8, 9]

// console.log(...goodArray); // 1 2 7 8 9
// console.log(1, 2, 7, 8, 9); // 1 2 7 8 9

// Let's try creating a new menu - completely new array
// const newMenu = [...restaurant.mainMenu, 'Gnocci'];
// console.log(newMenu); // ["Pizza", "Pasta", "Risotto", "Gnocci"]

// COPY an array
// const mainMenuCopy = [...restaurant.mainMenu];

// JOIN 2 arrays together
// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// console.log(menu);

// Iterables: arrays, strings, maps, sets, NOT objects
// const str = 'Ryan';
// const letters = [...str];
// console.log(letters); // ['R', 'y', 'a', 'n'];
// console.log(...str); // R y a n

// Function that accepts multiple values (orderPasta method added)
// Real-world example
// const ingredients = [
//   prompt("Let's make pasta! Ingredient #1?"),
//   prompt('Ingredient #2?'),
//   prompt('Ingredient #3?'),
// ];
// restaurant.orderPasta(...ingredients);

// Object Example
// AS OF 2018 SPREAD now works on OBJECTS even though they aren't iterable...

// copies over all properties from the old restaurant to the new one, then we can add anything that we want
// const newRestaurant = { founded: 2021, ...restaurant, founder: 'Mario' };
// console.log(restaurant);
// console.log(newRestaurant);

// we can do shallow copies of objects to - instead of Object.assign()
// const restaurantCopy = { ...restaurant };
// restaurantCopy.name = "Boludo's";
// console.log(restaurant);
// console.log(restaurantCopy);

// DESTRUCTURING OBJECTS {}
// - great for dealing with API calls
// - write exact key names
// const { name, openingHours, categories } = restaurant;
// // now we have 3 brand new variables
// console.log(name, openingHours, categories);

// // RENAME the variables in destructuring - originalName: newName,
// const {
//   name: restaurantName,
//   openingHours: hours,
//   categories: tags,
// } = restaurant;
// console.log(restaurantName, hours, tags);

// // Set DEFAULTS
// const { menu = [], starterMenu: starters = [] } = restaurant;
// console.log(menu, starters);

// // MUTATING variables WHILE DECONSTRUCTING objects
// // - works a little differently than arrays
// let a = 111;
// let b = 999;
// const obj = { a: 23, b: 7, c: 14 };

// ({ a, b } = obj);
// console.log(a, b); // 23 7

// // NESTED objects - : {}
// // - open and closed, objects in objects
// // const { fri } = openingHours;
// // console.log(fri); // {open: 11, close: 23}
// const {
//   fri: { open: o, close: c },
// } = openingHours;
// console.log(o, c); // {11, 23}

// // passing an OBJECT into a function to be destructured
// // -- becomes more critical the more parameters you have
// restaurant.orderDelivery({
//   time: '22:30',
//   address: 'Via del Sol, 21',
//   mainIndex: 2,
//   starterIndex: 2,
// });

// restaurant.orderDelivery({
//   address: '123 Fake St.',
//   starterIndex: 1,
// });

// DESTRUCTURING ARRAYS
// // Destructuing - breaking things down into small data structures
// const arr = [2, 3, 4];
// const a = arr[0];
// const b = arr[1];
// const c = arr[2];
// // but there's a better way in ES^
// const [x, y, z] = arr;
// console.log(x, y, z);

// DESTRUCTURING ARRAYS
//--categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],--//

// let [first, , second] = restaurant.categories;
// console.log(first, second); // Italian Vegetarian

// // Switching variables - old way
// // const temp = first;
// // first = second;
// // second = temp;
// // console.log(first, second); // Italian Vegetarian

// // Switching variables - new way
// // reassign to switch them around
// [first, second] = [second, first];
// console.log(first, second); // Vegetarian Italian

// // a function can return an array and immediately deconstruct
// // - added order method to object
// console.log(restaurant.order(2, 0));
// // How to receive 2 return values from a function
//--starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],--//
//--mainMenu: ['Pizza', 'Pasta', 'Risotto'],--//
//--order: function (starterIndex, mainIndex) {
//--  // return 2 return values from this function to deconstruct on use
//--  return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
//--},
// const [starter, mainCourse] = restaurant.order(2, 0);
// console.log(starter, mainCourse);

// Nested Destructuring
// // what if we have a nested array?
// const nested = [2, 4, [5, 6]];

// // const [i, , j] = nested;
// // console.log(i, j);

// // destructure in destructure () nested destructuring
// const [i, , [j, k]] = nested;
// console.log(i, j, k); // 2 5 6

// Default Values
// // setting defaults (p = 1) for variables - good for when we don't know the length of the array
// // can be useful for when you're getting data from an API
// const [p = 1, q = 1, r = 1] = [8, 9];
// console.log(p, q, r);
