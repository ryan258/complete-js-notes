'use strict';

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

  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }
}
// but we'll never directly create a Workout object, it will either be a running or cycling object.

class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    //! Remember: We can call any code in the constructor
    this.calcPace();
    this._setDescription();
  }

  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}
class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDescription();
  }

  calcSpeed() {
    // km/hr
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

// const run1 = new Running([36, -94], 5, 25, 175);
// const cycle1 = new Cycling([36.15, -94], 15, 125, 1175);
// console.log(run1, cycle1);

//////////////////////////////
// APPLICATION ARCHITECTURE
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
  #map;
  #mapEvent;
  #mapZoomLevel = 13;
  #workouts = [];
  // this constructor method is called immediately when a new instance is created from this class
  constructor() {
    // so we can just keep things tidy by getting the position in the constructor
    this._getPosition();
    // we can also attach our event handlers to the new instance in the constructor too!
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
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
    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);
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

  _hideForm() {
    // empty inputs
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value =
      '';
    form.getElementsByClassName.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => ((form.style.display = 'grid'), 1000));
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    // submitting a form for a new workout will create a new workout
    // helper validation function
    // - spread operator returns an array
    const validInputs = (...inputs) =>
      inputs.every(input => Number.isFinite(input));

    const allPositive = (...inputs) => inputs.every(input => input > 0);

    e.preventDefault();
    // console.log(this);

    // Get data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    // If workout is Running - create running onject
    if (type === 'running') {
      const cadence = +inputCadence.value;
      // Validate data
      if (
        // !Number.isFinite(distance) ||
        // !Number.isFinite(duration) ||
        // !Number.isFinite(cadence)
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return alert('Inputs have to be positive numbers.');

      workout = new Running([lat, lng], distance, duration, cadence);
      // this.#workouts.push(workout)
    }
    // If workout is Cycling - create cycling onject
    if (type === 'cycling') {
      // Validate data
      const elevation = +inputElevation.value;
      // Validate data
      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration) // elevation can be negative
      )
        return alert('Inputs have to be positive numbers.');

      workout = new Cycling([lat, lng], distance, duration, elevation);
      // this.#workouts.push(workout)
    }
    // Add new object to workout array
    this.#workouts.push(workout);
    console.log(workout);

    // Render workout on map as a marker
    this._renderWorkoutMarker(workout);
    // Render workout on list
    this._renderWorkout(workout);

    // Hide form & Clear Input Fields
    this._hideForm();
  }

  _renderWorkoutMarker(workout) {
    // Display Marker
    // console.log(this.#mapEvent);
    // const { lat, lng } = this.#mapEvent.latlng; // we'll use this in our Running/Cycling object creation too, but we'll have to reform it into an array, so we'll move it up the document
    // L.marker([51.5, -0.09])
    // L.marker([lat, lng]).addTo(map).bindPopup('👻 👻 👻').openPopup();
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      // .setPopupContent('👻🔥 EXERCISE 🔥👻')
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup();
  }

  _renderWorkout(workout) {
    let html = `
      <li class="workout workout--${workout.type}" data-id="${workout.id}">
      <h2 class="workout__title">${workout.description}</h2>
      <div class="workout__details">
        <span class="workout__icon">${
          workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
        }</span>
        <span class="workout__value">${workout.distance}</span>
        <span class="workout__unit">km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⏱</span>
        <span class="workout__value">${workout.duration}</span>
        <span class="workout__unit">min</span>
      </div>
    `;
    if (workout.type === 'running') {
      html += `
          <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.pace.toFixed(1)}</span>
          <span class="workout__unit">min/km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">🦶🏼</span>
          <span class="workout__value">${workout.cadence}</span>
          <span class="workout__unit">spm</span>
        </div>
      </li>
      `;
    }
    if (workout.type === 'cycling') {
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.speed.toFixed(1)}</span>
          <span class="workout__unit">km/h</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⛰</span>
          <span class="workout__value">${workout.elevationGain}</span>
          <span class="workout__unit">m</span>
        </div>
      </li>
    `;
    }
    form.insertAdjacentHTML('afterend', html);
  }
  _moveToPopup(e) {
    // e.target = the element that was actually clicked
    const workoutEl = e.target.closest('.workout');
    console.log(workoutEl);

    if (!workoutEl) return; // guard clause!

    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );
    console.log(workout);
    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
  }
}

// create an instance of our app class
const app = new App();
