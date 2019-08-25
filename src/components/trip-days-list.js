import {createElement} from "../util";

export default class TripDaysList {
  constructor() {
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
    return `<ul class="trip-days"></ul>`;
  }
}
