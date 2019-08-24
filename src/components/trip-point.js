import {getRandomInt} from "../util";

const fillZero = (timeValue) => {
  return timeValue < 10 ? `0${timeValue}` : timeValue;
};

export const createTripPointTemplate = ({icon, description, dateStart, dateFinish, cost, additions}) => `
<li class="trip-events__item">
  <div class="event">
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${icon}" alt="Event type icon">
    </div>
    <h3 class="event__title">${description}</h3>

    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="2019-03-18T12:25">${fillZero(new Date(dateStart).getHours())}:${fillZero(new Date(dateStart).getMinutes())}</time>
        &mdash;
        <time class="event__end-time" datetime="2019-03-18T13:35">${fillZero(new Date(dateFinish).getHours())}:${fillZero(new Date(dateFinish).getMinutes())}</time>
      </p>
      <p class="event__duration">1H 30M</p>
    </div>

    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${cost}</span>
    </p>

    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
    ${additions.filter((addition) => addition.isApplied).slice(0, getRandomInt(2)).map((addition) => `
      <li class="event__offer">
        <span class="event__offer-title">${addition.name}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${addition.cost}</span>
       </li>`).join(``)}
    </ul>

    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`;
