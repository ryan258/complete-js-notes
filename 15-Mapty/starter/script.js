'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class Workout {
  date = new Date();
  // any object should have a uid
  //! - usually we would use a library to create unique id's and never create UIDs on our own
  id = (Date.now() + '').slice(-10);
  // takes in data that is relavent to both workouts
  constructor(coords, distance, duration) {
    // this.date = ... // old way to do it
    // this.id = ...   // old way to do it
    this.coords = coords; // [lat, lng]
    this.distance = distance; // kms
    this.duration = duration; // mins
  }
}
// but we'll never directly create a Workout object, it will either be a running or cycling object.

class Running extends Workout {
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    //! Remember: We can call any code in the constructor
    this.calcPace();
  }

  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}
class Cycling extends Workout {
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
  }

  calcSpeed() {
    // km/hr
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

const run1 = new Running([36, -94], 5, 25, 175);
const cycle1 = new Cycling([36.15, -94], 15, 125, 1175);
console.log(run1, cycle1);

//////////////////////////////
// APPLICATION ARCHITECTURE
class App {
  #map;
  #mapEvent;
  // this constructor method is called immediately when a new instance is created from this class
  constructor() {
    // so we can just keep things tidy by getting the position in the constructor
    this._getPosition();
    // we can also attach our event handlers to the new instance in the constructor too!
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
  }

  _getPosition() {
    if (navigator.geolocation) {
      // JS will callback _loadmap as soon as the _loadMap's position is identified
      //! bind to give this._loadMap definition
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this), //! bind this to the current object
        function () {
          alert('Could not get your position.');
        }
      );
    }
  }

  _loadMap(position) {
    // position object automatically comes from .getCurrentPosition()
    // console.log(position);
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    // console.log(`Lat: ${latitude}\nLong: ${longitude}`);
    // console.log(`https://www.google.com/maps/@${latitude},${longitude}z`);

    const coords = [latitude, longitude];

    console.log(L);
    // const map = L.map('map').setView([51.505, -0.09], 13);
    // Error: ... cannot set property '#map' of undefined
    // - something must be wrong with the 'this' keyword
    console.log(this); // undefined, because _loadMap() is being called by _getPosition as .getCurrentPosition's callback function and is called as a regular function call, which sets 'this' to undefined.
    this.#map = L.map('map').setView(coords, 13);
    // console.log(map);
    // the map is made up of small tiles - from open street map
    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // this .on() is coming from the leaflet library
    //! Handle clicks on map
    this.#map.on('click', this._showForm.bind(this));
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    // submitting a form for a new workout will create a new workout
    e.preventDefault();
    // console.log(this);

    // Clear Input Fields
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value =
      '';

    // Display Marker
    // console.log(this.#mapEvent);
    const { lat, lng } = this.#mapEvent.latlng;
    // L.marker([51.5, -0.09])
    // L.marker([lat, lng]).addTo(map).bindPopup('👻 👻 👻').openPopup();
    L.marker([lat, lng])
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: 'running-popup',
        })
      )
      .setPopupContent('👻🔥 EXERCISE 🔥👻')
      .openPopup();
  }
}

// create an instance of our app class
const app = new App();
