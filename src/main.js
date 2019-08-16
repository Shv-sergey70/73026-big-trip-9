import {createTripInfoTemplate} from './components/trip-info';
import {createMenuTemplate} from './components/menu';
import {createFilterTemplate} from './components/filter';
import {createTripDayTemplate} from './components/trip-day';
import {createTripPointTemplate} from './components/trip-point';
import {createTripPointEditTemplate} from './components/trip-point-edit';

const tripInfoBlock         = document.querySelector(`.trip-info`);
const tripControlsBlock     = document.querySelector(`.trip-controls`);
const switchTripViewElement = tripControlsBlock.querySelector(`.visually-hidden`);
const tripDaysBlock         = document.querySelector(`.trip-events`);

tripInfoBlock.insertAdjacentHTML(`afterbegin`, createTripInfoTemplate());
switchTripViewElement.insertAdjacentHTML(`afterend`, createMenuTemplate());
tripControlsBlock.insertAdjacentHTML(`beforeend`, createFilterTemplate());

let tripDayContent = createTripPointEditTemplate() + createTripPointTemplate() + createTripPointTemplate() + createTripPointTemplate();
tripDaysBlock.insertAdjacentHTML(`beforeend`, createTripDayTemplate(tripDayContent));

