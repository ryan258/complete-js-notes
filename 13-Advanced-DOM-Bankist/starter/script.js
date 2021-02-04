'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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

///////////////////////////////////////
// SELECTING, CREATING, AND DELETING ELEMENTS

// Selecting elements
// console.log(document.documentElement); // log the HTML dom node
// console.log(document.head);
// console.log(document.body);

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

///////////////////////////////////////
// STYLES, ATTRIBUTES, AND CLASSES

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
