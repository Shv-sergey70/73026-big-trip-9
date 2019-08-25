import {createElement} from "../util";

export default class TripDay {
  constructor({dayTimestamp, dayNumber}) {
    this._dayTimestamp = dayTimestamp;
    this._dayNumber = dayNumber;

    this._element = null;
  }

  getElement() {
    if (this._element === null) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  getTemplate() {
    return `<li class="trip-days__item  day">
            <div class="day__info">
              <span class="day__counter">${this._dayNumber}</span>
              <time class="day__date" datetime="2019-03-18">${new Date(this._dayTimestamp).toDateString()}</time>
            </div>
          
            <ul class="trip-events__list"></ul>
          </li>`;
  }
}
