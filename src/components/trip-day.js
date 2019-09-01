import AbstractComponent from "./abstract-component";

export default class TripDay extends AbstractComponent{
  constructor({dayTimestamp, dayNumber}) {
    super();

    this._dayTimestamp = dayTimestamp;
    this._dayNumber = dayNumber;
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
