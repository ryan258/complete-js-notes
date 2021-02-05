'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// Scroll Button
btnScrollTo.addEventListener('click', e => {
  section1.scrollIntoView({
    behavior: 'smooth',
  });
});

///////////////////////////////////////
// Page Navigation - common pattern for single page scrolling navigation

//! 1.) add an event listener to a common parent element of all the elements we're interested in
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  //! 2.) determine what element originated the event
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

///////////////////////////////////////
// Tabbed Component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', e => {
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return;

  // remomve active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // add active classes
  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

///////////////////////////////////////
// Menu Fade Animation
const nav = document.querySelector('.nav');

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');

    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

///////////////////////////////////////
// SELECTING, CREATING, AND DELETING ELEMENTS

// Selecting elements
// console.log(document.documentElement); // log the HTML dom node
// console.log(document.head);
// console.log(document.body);

/*
//! most of the time you're using querySelector(All)
const header = document.querySelector('.header'); // get a dom object
const allSections = document.querySelectorAll('.section'); // get a node list of sections - doesn't update dynamically

document.getElementById('section--1');

// Selecting elements - get HTML Collections
const allButtons = document.getElementsByTagName('button'); // gets an HTML collection-  a live collection, where if the dom gets updated, this gets updated automatically
// console.log(allButtons);

const allBtn = document.getElementsByClassName('btn'); // gets an HTML collection too
// console.log(allBtn);

// CREATING AND INSERTING ELEMENTS
//!most - .insertAdjacentHTML()

const message = document.createElement('div'); // create a dom object
message.classList.add('cookie-message');
// message.textContent =
//   'We use cookies for improved functionality and analytics.';
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// header.prepend(message); // add as first element of header
// but when appended, this element goes missing because it's a live element in the dom
header.append(message); // add as last child element of header
// it can't live in 2 places at the same time, so last in, first out
// so think of it as we can use prepend and append to move elements in addition to inserting
// -- as dom elements are unique and can only exist at one place at a time

// but we can make copies!

// .cloneNode() - pass true to copy all chuldren as well
// header.append(message.cloneNode(true));

// header.before(message);
// header.after(message);

// DELETE ELEMENTS
// - before .remove() we'd have to select the parent element, and remove the child element by name
document
  .querySelector('.btn--close-cookie')
  // .addEventListener('click', () => message.parentElement.removeChild(message));
  .addEventListener('click', () => message.remove());
*/
///////////////////////////////////////
// STYLES, ATTRIBUTES, AND CLASSES
/*
// STYLES
// v set as inline styles v
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

// console.log(message.style.height); // '' - it only works for inline styles that we set ourselves
// console.log(message.style.backgroundColor); // rgb(55, 56, 61)
// just remember we can't get the definition of a style hidden in a class, or a style sheet
// but we can get it, the computed style
// console.log(getComputedStyle(message)); // we get a huge object of all the style properties
// -so pluck off a specific property
// console.log(getComputedStyle(message).color); // rgb(187, 187, 187)
// console.log(getComputedStyle(message).height); // 43px

// so let's add to the height
// message.style.height = getComputedStyle(message).height + 140 + 'px'; // but the original height has px in it...
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// STYLES -> WORKING WITH CSS VARIABLES aka "Custom Properties"
// -we can change them w/ JS!
// so they are hiding in :root, or in JS is basically document
document.documentElement.style.setProperty('--color-primary', 'orangered');
// -we can also use this to set all sorts of other properties, but usually easier to do it the other way for those

// ATTRIBUTES
const logo = document.querySelector('.nav__logo');

// ATTRIBUTES -> READ
console.log(logo); // get element
console.log(logo.alt); // get alt text string
console.log(logo.src); // get link as a string - absolute url to img
console.log(logo.getAttribute('src')); // relative url that we have in the html
console.log(logo.className); // nav__logo

// Non-standard - why it doesn't work
// javascript will automatically create these properties if they exist on the element/object (if it's a standard)
// console.log(logo.designer); // undefined
// but there is a way...
console.log(logo.getAttribute('designer')); // Orson

// ATTRIBUTES -> ASSIGN
logo.alt = 'Our minimalist logo';
// or
logo.setAttribute('company', 'Bankist'); // sets a new attribute on the logo, company="Bankist"
console.log(logo.alt); // Our minimalist logo

// ATTRIBUTES -> READ
// on links...
const link = document.querySelector('.twitter-link');
// both absolute urls
console.log(link.href);
console.log(link.getAttribute('href'));

const linkBtn = document.querySelector('.nav__link--btn');
console.log(linkBtn.href); // absolute url/#
console.log(linkBtn.getAttribute('href')); // just the #, as in the HTML

// ATTRIBUTES -> DATA ATTRIBUTES
// -atrributes that start with the word data-
// - good for when you need to store data in the user interface

// add data-version-number="3" to img
// -note the camelCase
console.log(logo.dataset.versionNumber); // 3

// CLASSES
logo.classList.add('my-class', 'my-other-class');
logo.classList.remove('my-class', 'my-other-class');
logo.classList.toggle('my-class');
logo.classList.contains('my-class'); // oddly named for includes...

// set a class //! don't use! it blows away all existing classes, with a single class...
// logo.className = 'oh-that-class';

//
*/
///////////////////////////////////////
// SMOOTH SCROLLING
/*
// 1- select trigger button and scroll to section
// moved to top of file
// const btnScrollTo = document.querySelector('.btn--scroll-to');
// const section1 = document.querySelector('#section--1');

// 2- add event listener to button
btnScrollTo.addEventListener('click', e => {
  // get coordinates of where we want to scroll to
  const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);
  console.log(e.target.getBoundingClientRect());
  //! .getBoundingClientRect() is relative to the viewport, aka changes as you scroll
  // - scrolled to the top x, y would both = 0
  // console.log(
  //   'Current Scroll (x, y): ',
  //   window.pageXOffset,
  //   window.pageYOffset
  // );

  // we can also read height and width of the viewport
  // console.log(
  //   'height/width of viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  // OLD SCHOOL WAY

  // 3- scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // ); // top is always relative to the viewport, not the document, remedy is to add scroll position

  // make better
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // NEW WAY - but only works in modern browsers
  section1.scrollIntoView({
    behavior: 'smooth',
  });
});*/

///////////////////////////////////////
// TYPES OF EVENTS and EVENT HANDLERS
// Event Reference: https://developer.mozilla.org/en-US/docs/Web/Events
// - an event is a signal emitted by a DOM node - signal = something happened

//then we listen for those events in our code with event listeners
// -events will happen whether we are listening for them or not

// const h1 = document.querySelector('h1');

// 3 WAYS TO ATTACH AN EVENT HANDLER

// WAY #1 - the current way - you can add multiple event listeners to the same event
// mouseenter - is like hover - fires when a mouse enters a certain element
// h1.addEventListener('mouseenter', e => {
//   console.log('addEventListener(): stop touching my header!');
// });
// h1.addEventListener('mouseenter', e => {
//   console.log('addEventListener()again: stop touching my header, please!');
// });

// WAY #2 - the old school way - can only do 1 event, overriding any previous ones attached it it
// h1.onmouseenter = e => {
//   console.log('onmouseenter: my header?!');
// };

// REMOVE AN EVENT LISTENER
//-- .removeEventListener('eventtype', nameOfFunction)
// - first, it has to be a named function so you can reference it
// const logh1 = e => {
//   console.log('addEventListener(): stop touching my header!');
//   // REMOVE the event handler
//   //- and it doesn't just have to be in here
//   h1.removeEventListener('mouseenter', logh1);
// };
// // - attach named function to an event listener
// h1.addEventListener('mouseenter', logh1);
// // remove event handler after a certain amount of time has passed
// setTimeout(() => {
//   h1.removeEventListener('mouseenter', logh1);
//   console.log('time for the event is over');
// }, 5000);

// WAY #3 - USING AN HTML ATTRIBUTE - this shouldn't be used
// <h1 onclick="console.log('old school!')">...</h1>

///////////////////////////////////////////////
// EVENT PROPAGATION: BUBBLING and CAPTURING
// clicks happen at the root of the document
// capturing phase happens
// by default, events can only be handled in the target & bubbling phases
// -but you can set things up so they listen during the capturing phase instead
// not all events have a capturing and bubbling phase! - but most do...
// -some are created right on the target element
// events "propagate" = capturing and bubbling = events propageting from one place to another

//-JS events have a very important property -
//--they have a
//---capturing phase - the event travels from the root to the targeted element
//                     as the event travels all the way down the tree it was through all the parent elements of the target element
//-as soon as the event hits that target event, the target phase begins
//---target phase - where events can be handled right at the target (such as the eventListener where it's waiting for an event to occur, triggering a callback function)
//-
//---bubbling phase - then the event travels all the way back up through the parents again to the document's root
//                  - just the parents, not the siblings

// Why is this important?
// - well, it's as if the event happened in all these parent elements
// - this means if we attached the same event listener to a parent element then we'd get the response from the child's eventListener as well
//   (we would have handled the same event twice!) once at its target and once at its parent
// - this allows us some very powerful patterns

///////////////////////////////////////////////
// EVENT PROPAGATION: IN PRACTICE
// - as the click event propagates up through the ancestor elements, it will trigger any of them that are listening for that event
// - the TARGET is where the event originated, where it first happened,  --- e.target
//   NOT the element which the handler is attached.
// -- so even though the event might propagate and trigger parents' listeners, the target will remain the same
// - CURRENTTARGET is where the element is attached --- e.currentTarget
// -- and it just so happens that CURRENTTARGET === THIS keyword
// - you can also STOP the event propagation --- e.stopPropagation()
//!-- in practice it is usually NOT a good idea to stopPropagation, but it can come in handy to fix problems in complex operations with many handlers for the same events, but in general, it's usually not a good idea

// so this covers phase 2(target) and 3(bubbling) - but what about phase 1 - the capture phase?
// - default behavior of event listeners is to not trigger on the capture phase (#1)
// -- because usually the cature phase is irrelevant for us
// --- whereas the bubbling phase can be useful for EVENTDELEGATION
// - to capture an event in the capture phase we can add a 3rd arg to the addEventHandler function
//   (true or false)
// -- true will listen for an event as it's coming down from the root during the capture phase
//!- again, for the most part, this bubbling v capturing exists mostly for historical reasons

// setup random color function
/*const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
console.log(randomColor());

// random color on nav link click
document.querySelector('.nav__link').addEventListener('click', function (e) {
  console.log('Link!', e.target, e.currentTarget);
  this.style.backgroundColor = randomColor();
  // console.log(e.currentTarget === this); // true
  // stop propagation - click event won't propagate up and trigger parent listeners
  e.stopPropagation();
});

// random color on nav link click
document.querySelector('.nav__links').addEventListener('click', function (e) {
  console.log('Links Container!', e.target, e.currentTarget);
  this.style.backgroundColor = randomColor();
});

// random color on nav link click
document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    console.log('Nav!', e.target, e.currentTarget);
    this.style.backgroundColor = randomColor();
  }
  //, true // so now you see the nav handler taking action before the rest because it's triggering during the first phase, even though its target is a child
);*/

////////////////////////////////////////////////////
// EVENT DELEGATION: IMPLEMENTING PAGE NAVIGATION
// - we use the fact that event bubble up, so we put the event listener on a common parent of all the elements we are interested in

// - SEE TOP OF THE FILE FOR IMPLEMENTATION
// - we're going to add smooth scrolling to our different nav links

// first solution - but inefficient
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

//! 2nd Page Navigation - common pattern for single page scrolling navigation
// - when a child of the container is clicked,
// -- the event is generated
// -- bubbles up
// --- then we can catch the event in the common parent element and handle it there
//     (and we'll also know where the event originated, event.target)
//! - steps - an IMPORTANT technique
// -- 1.) add an event listener to a common parent element of all the elements we're interested in
// -- 2.) determine what element originated the event

/*//! 1.) add an event listener to a common parent element of all the elements we're interested in
document.querySelector('.nav__links').addEventListener('click', function (e) {
  // console.log(e.target); // we see the element that triggered the event
  // we usually always want to prevent the default
  e.preventDefault();
  //! 2.) determine what element originated the event
  // Matching Strategy - need to match so we only register events emitted by children we care about
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    // console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});*/

// another case for event delegation
// - when we are working with elements that are not yet on the page when the page loads
//   (like dynamically add buttons) - you can't add eventhandlers to elements that do not yet exist
// -- but event delegation will give us a way to do just that

///////////////////////////////////////
// DOM TRAVERSING
// - walking through the dom, selecting an element based on another - relatively

/*const h1 = document.querySelector('h1');

// Going downwards: child
console.log(h1.querySelectorAll('.highlight')); // NodeList of all .highlight children in the h1 element - [span.highlight, span.highlight]
console.log(h1.childNodes); // NOT USED MUCH - gets direct children [NodeList] - includes everything, text, elements, comments, etc
console.log(h1.children); // HTMLCollection - LIVE collection of HTML elements - only works for DIRECT CHILDREN
h1.firstElementChild.style.color = 'white'; // the first child element of h1 gets the color style
h1.lastElementChild.style.color = 'orangered'; // the last child element of h1 gets the color style

// Going upwards: parents
console.log(h1.parentNode); // direct parent node, works like .children
console.log(h1.parentElement); // usually the one used - mostly the same because the parent is going to be an element
//! closest is like the opposite of querySelector
// - but most of the time we're going to need a parent element that is not a direct parent
h1.closest('.header').style.background = 'var(--gradient-secondary)'; // find the closest parent element
//! -- also note how we can use CSS variables in JS!
// if the closest is the element itself, then that's the one that gets returned
h1.closest('h1').style.background = 'var(--gradient-primary)'; 

// Going sideways: siblings - we can only access DIRECT siblings (the previous and next one)
// previous and next elements - WE'LL USE THIS THE MOST
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

// previous and next for nodes
console.log(h1.previousSibling);
console.log(h1.nextSibling);

// Work with all the sibling elements of an element
//! Trick: Move up to the parent, and get all children elements - since it's an HTMLCollection we can spread them all into an array and .forEach over them
console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});*/

///////////////////////////////////////
// BUILDING A TABBED COMPONENT

/*// Tabbed Component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// time for event delegation - eventhandler on the parent of the elements we're interested in
tabsContainer.addEventListener('click', e => {
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);
  // when we click on the content we get an error, null
  // - closest() returns null if it can't find anything
  // -- so we have to ignore any clicks where the result is null
  // Guard Clause
  if (!clicked) return; // <--- this is a "guard clause" - if a condition is matched, return early
  //                            if clicked exists, continue, //!  modern way to do it

  // remomve active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  // Remove Active Content Area
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // then add the active class to the one that was clicked

  // Active Tab
  clicked.classList.add('operations__tab--active');

  // Activate Content Area - with data attribute - "data-tab"
  // console.log(clicked.dataset.tab);
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});*/

/////////////////////////////////////////
// PASSING ARGUMENTS TO EVENT HANDLERS - a big worka round because an event handler can only to one argument
// - It's impossible to pass an argument into an event handler function and can only have 1 really argument, the event!
// - if we want to pass additional values we have to use the THIS keyword
// - Multiple values would require us to pass them in as an array or an object

// - we'll make it so when you hover over a link in the head, the other links fade out a little
// LINK NAVIGATION HOVER FADE

// 1ST TAKE

/*const nav = document.querySelector('.nav');
// mouseenter does not bubble, mouseover bubbles
// we need the event to actually bubble
nav.addEventListener('mouseover', function (e) {
  // no need for closest() because there are no child elements that we could accidently click in the link
  // - so a simple check is enough
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    // select all the other sibliing links
    // - note that each nav_link is inside a nav_item, then the nav
    // -- so closest to the rescue!
    const siblings = link.closest('nav').querySelectorAll('.nav__link');
    // const logo = document.querySelector('.nav__logo')
    // a more robusr version of the logo selector
    const logo = link.closest('.nav').querySelector('img');

    // now time to change the opacity of those siblings
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = 0.5;
    });
    logo.style.opacity = 0.5;
  }
});

nav.addEventListener('mouseout', function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    // select all the other sibliing links
    // - note that each nav_link is inside a nav_item, then the nav
    // -- so closest to the rescue!
    const siblings = link.closest('nav').querySelectorAll('.nav__link');
    // const logo = document.querySelector('.nav__logo')
    // a more robusr version of the logo selector
    const logo = link.closest('.nav').querySelector('img');

    // now time to change the opacity of those siblings
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = 1;
    });
    logo.style.opacity = 1;
  }
});*/

// 2ND TAKE - REFACTORED

/*// REFACTORING - STEP 1 - CREATE A NEW FUNCTION
// REFACTORING - STEP 2 - GO THROUGH THE FUNCTIONS, WHAT IS THE SAME v WHAT IS DIFFERENT
// well... just the opacity really...
const nav = document.querySelector('.nav');

const handleHover = function (e, opacity) {
  // no need for closest() because there are no child elements that we could accidently click in the link
  // - so a simple check is enough
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    // select all the other sibliing links
    // - note that each nav_link is inside a nav_item, then the nav
    // -- so closest to the rescue!
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    // const logo = document.querySelector('.nav__logo')
    // a more robusr version of the logo selector
    const logo = link.closest('.nav').querySelector('img');

    // now time to change the opacity of those siblings
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
};

// mouseenter does not bubble, mouseover bubbles
// we need the event to actually bubble

// passing an argument to an event handler
// these won't work...
// nav.addEventListener('mouseover', handleHover());
// nav.addEventListener('mouseout', handleHover());
// javascript expects a 2nd argument to be a function, NOT the result of calling a function
nav.addEventListener('mouseover', function (e) {
  handleHover(e, 0.5);
});
nav.addEventListener('mouseout', function (e) {
  handleHover(e, 1);
});*/

// FINAL TAKE
/*const nav = document.querySelector('.nav');

// It's impossible to pass an argument into an event handler function and can only have 1 really argument, the event!
// if we want to pass additional values we have to use the THIS keyword
// Multiple values would require us to pass them in as an array or an object
const handleHover = function (e) {
  console.log(this, e.currentTarget);
  // no need for closest() because there are no child elements that we could accidently click in the link
  // - so a simple check is enough
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    // select all the other sibliing links
    // - note that each nav_link is inside a nav_item, then the nav
    // -- so closest to the rescue!
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    // const logo = document.querySelector('.nav__logo')
    // a more robusr version of the logo selector
    const logo = link.closest('.nav').querySelector('img');

    // now time to change the opacity of those siblings
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// mouseenter does not bubble, mouseover bubbles
// we need the event to actually bubble

// passing an argument to an event handler
// these won't work...
// nav.addEventListener('mouseover', handleHover());
// nav.addEventListener('mouseout', handleHover());
// javascript expects a 2nd argument to be a function, NOT the result of calling a function

// nav.addEventListener('mouseover', function (e) {
//   handleHover(e, 0.5);
// });
// nav.addEventListener('mouseout', function (e) {
//   handleHover(e, 1);
// });

// THE BIND METHOD
// - the .bind() method creates a copy of the function that it was called on
//   and it will set the THIS keyword in the function call, to whatever value we pass into .bind()

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));*/

///////////////////////////////////////
//

///////////////////////////////////////
//

///////////////////////////////////////
//

///////////////////////////////////////
//

///////////////////////////////////////
//
