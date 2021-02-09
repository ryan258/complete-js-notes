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
// SLIDER
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();
///////////////////////////////////////
// Slider
// temporary styles to make dev easier
// const slider = document.querySelector('.slider');
// slider.style.transform = 'scale(0.3) translateX(-300px)';
// slider.style.overflow = 'visible';
/*
//!!! Put Everything in a function as not to pollute the global
// always start with those selections
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

let currentSlide = 0;
const maxSlides = slides.length;

//! FUNCTIONS
// let's create the dots dynamically
const createDots = () => {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

const activateDot = slide => {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

// do a slide function
const goToSlide = slide => {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};

// immediately go to current slide 0 when the page loads

// Next Slide
const nextSlide = () => {
  if (currentSlide === maxSlides - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }

  goToSlide(currentSlide);
  activateDot(currentSlide);
};

// Previous Slide
const prevSlide = () => {
  if (currentSlide === 0) {
    currentSlide = maxSlides - 1;
  } else {
    currentSlide--;
  }

  goToSlide(currentSlide);
  activateDot(currentSlide);
};
//!
const init = () => {
  goToSlide(0);
  createDots();

  activateDot(0);
};

//! EVENT HANDLERS
// slider arrow clicks
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);
// keyboard slider nav
document.addEventListener('keydown', e => {
  console.log(e);
  if (e.key === 'ArrowLeft') prevSlide();
  // if (e.key === 'ArrowRight') nextSlide();
  // or we can do it with short circuiting
  e.key === 'ArrowRight' && nextSlide();
});

// make dots navigable with EVENT DELEGATION!
dotContainer.addEventListener('click', e => {
  if (e.target.classList.contains('dots__dot')) {
    // console.log('Monster DOT!');
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});*/
///////////////////////////////////////
// Lazy Loading

// select lazy images
const imgTargets = document.querySelectorAll('img[data-src');
// console.log(imgTargets);

// const loadImg = (entries, observer) => {
//   const [entry] = entries;
//   console.log(entry);

//   if (!entry.isIntersecting) return;

//   // replace src w/ data-src
//   entry.target.src = entry.target.dataset.src;
//   // on switch/loading of a new image an event will be emitted
//   // so use an event listener to catch these change to remove the blur class
//   entry.target.addEventListener('load', () => {
//     entry.target.classList.remove('lazy-img');
//   });

//   observer.unobserve(entry.target);
// };

// an approach for multiple images in view
const loadImg = (entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', () => {
      entry.target.classList.remove('lazy-img');
    });
  });
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px', // load 200px before they reach the viewport
});

imgTargets.forEach(img => imgObserver.observe(img));

///////////////////////////////////////
// Reveal Sections on Scroll

// we can apply this to all 4 sections

const allSections = document.querySelectorAll('.section');

// reveal function
const revealSection = (entries, observer) => {
  // use destructuring to get a single entry
  const [entry] = entries;
  // console.log(entry);
  // identify the target that scrolled into view
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  // unobserve so things aren't bouncing around forever
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null, // usually we'll make root: null bc it's the viewport
  threshold: 0.15, // when item is 15% visible in the viewport
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
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

////////////////////////////////////////////////
// Sticky Navigation w/ Intersection Observer
//!MUCH MORE PERFORMANT
// - rootMargin is an important measure to mind as well
// 0- get the target
const header = document.querySelector('.header');
// 0a- get header dimensions - better approach when considering responsive design
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);
// 1- create observer
// 3- configure callback for intersectionObserver
const stickyNav = entries => {
  const [entry] = entries; // same as const entry = entries[0]
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null, // null = viewport
  threshold: 0, // scrolls completely out of view, when 0% is visible
  rootMargin: `-${navHeight}px`, // a box of 90 pixels applied outside of our element, in this case, 90px is the height of our navigation, so think of it as a header amount of space before the threshold was reached
});
// 2- make observer observe header
headerObserver.observe(header);

///////////////////////////////////////
// Sticky Navigation

//! Horrible for performance because this will shoot on every bit of scroll.
// 1- we'll work with the scroll event first
// - scroll happens on the window, not document
// -- it fires on every bit of scroll and is considered inefficient and should be avoided
/*const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords);

window.addEventListener('scroll', function () {
  // on scroll the event object is unneeded, useless...
  // console.log(e);
  console.log(window.scrollY); // difference between the top of the viewport, and top of the page
  // when should navigation become sticky? first section!
  if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});*/

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

///////////////////////////////////////////////////////
// IMPLEMENTING A STICK NAVIGATION: The Scroll Event
// -- attach navigation to the top of the page when we scroll to a certain point
// -- add a "sticky" class when the scroll reaches a certain position

/////////////////////////////////////////////////
// A Better Way: The Intersection Observer API - It's more efficient
// - Observes changes to the way a certain raget element intersects another element or viewport.
// 2 most important data points
// - isIntersecting()
// - intersectionRatio()

// first thing, you have to create a new intersection observer
// then pass in arguments
// - callback function - will get called each time the target element intersects with the root element at a certain %
// - entries = an array of the threshold entries
/*const obsCallback = (entries, observer) => {
  entries.forEach(entry => {
    console.log(entry);
  });
};
// - object of options
const obsOptions = {
  root: null, // the element the target is intersecting
  threshold: [0, 0.2], // the %age of intersection at which the observer callback will be called, we can have multiples, it's like how much we want visible in the thing
  // 0 will trigger every time it enters the view
  // 1 will only trigger when the target is 100% in the view port

};
// store the observe in a function
const observer = new IntersectionObserver(obsCallback, obsOptions);

// use the observer to observer a target w/ (.observe())
observer.observe(section1);*/

///////////////////////////////////////
// REVEALING ELEMENTS ON SCROLL
// Goal is to reveal each section as you approach it
// - get sections to slide in
// - just adding a class because CSS will handle the animation
// - as things move up they'll translateY to 0rem

// All sections will have this class
// .section--hidden {
//   opacity: 0;
//   transform: translateY(8rem);
// }

// All sections will have the class section--hidden added to them through JS
// else we're looking at a user w/ JS disabled not seeing our sections

// at the point the target is important
// and we'll want to manipulate the class name

// a first intersectionOberver is always called
// - so the first entry won't trigger
// -- so we'll set things to trigger when they are actually intersecting

// make sure to unobserve so you don't have things perpetually bouncing around

///////////////////////////////////////
// LAZY LOADING IMAGES
// - Images take up the bulk of web page weight so they're important to optimize.
// - lazy loading can be a good strategy, so here's that
// -- as we approach the image it will begin to load
// the main ingredient is that we have a really low res img that we load at the beginning - or really small and stretched out (src="img/card-lazy.jpg")
// then we reference the full img in the data-src (data-src="img/card.jpg")
// - we'll also have a class that makes the img blurred (class="features__img lazy-img")

// Here's the html
{
  /* <img
  src="img/card-lazy.jpg"
  data-src="img/card.jpg"
  alt="Credit card"
  class="features__img lazy-img"
/> */
}

// The CSS
// .lazy-img {
//   filter: blur(20px);
// }

// remember that the sections are already shifted 8rem down for the reveal feature

// when lazy loading loads the new img it emits an event and we should listen for that event to trigger removal of the class that is providing the blur

/////////////////////////////////
// BUILDING A SLIDER COMPONENT

// In the slider component we have
// - .slider - the container component
// -- .slide - individual slide
//    they are all side by side and we use translateX to move them
//! mainly we'll be adjusting the translateX %ages
// so initially we want
// - 1st slide @ 0%, then 100%, 200%, 300%, ...

///////////////////////////////////////
//
