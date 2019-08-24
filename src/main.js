import {createTripInfoTemplate} from './components/trip-info';
import {createMenuTemplate} from './components/menu';
import {createFilterTemplate} from './components/filter';
import {createSortTemplate} from './components/sort';
import {createTripDayTemplate} from './components/trip-day';
import {createTripPointTemplate} from './components/trip-point';
import {createTripPointEditTemplate} from './components/trip-point-edit';
import {generateTripPointData} from "./data/trip-point-data";

const tripPoints = new Array(4).fill(``).map(generateTripPointData).sort();

const tripInfoBlock         = document.querySelector(`.trip-info`);
const tripControlsBlock     = document.querySelector(`.trip-controls`);
const switchTripViewElement = tripControlsBlock.querySelector(`.visually-hidden`);
const tripEventsSection     = document.querySelector(`.trip-events`);

tripInfoBlock.insertAdjacentHTML(`afterbegin`, createTripInfoTemplate({
  cities: Array.from(new Set(tripPoints.map((tripPoint) => tripPoint.city))),
  minStartDate: Math.min.call(null, ...tripPoints.map((tripPoint) => tripPoint.dateStart)),
  maxFinishDate: Math.max.call(null, ...tripPoints.map((tripPoint) => tripPoint.dateFinish)),
  totalCost: tripPoints.reduce((accumulator, tripPoint) => accumulator + tripPoint.cost + tripPoint.additions.filter((addition) => addition.isApplied).reduce((acc, addition) => acc + addition.cost, 0), 0)
}));
switchTripViewElement.insertAdjacentHTML(`afterend`, createMenuTemplate());
tripControlsBlock.insertAdjacentHTML(`beforeend`, createFilterTemplate());
tripEventsSection.insertAdjacentHTML(`beforeend`, createSortTemplate());

const tripDaysBlock = document.createElement(`ul`);
tripDaysBlock.classList.add(`trip-days`);

const dayContent = createTripPointEditTemplate(tripPoints.shift()) + tripPoints.map((tripPoint) => createTripPointTemplate(tripPoint)).join(``);
tripDaysBlock.insertAdjacentHTML(`beforeend`, createTripDayTemplate(dayContent));

tripEventsSection.appendChild(tripDaysBlock);
