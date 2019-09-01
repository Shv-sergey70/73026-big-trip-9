import Menu from './components/menu';
import Filter from './components/filter';
import {generateTripPointData} from "./data/trip-point-data";
import {Position, renderElementIn} from "./util";
import TripController from "./controllers/trip-controller";

const tripPoints = new Array(7).fill(``).map(generateTripPointData).sort();

const tripControlsBlock = document.querySelector(`.trip-controls`);
const menuHeading       = tripControlsBlock.querySelector(`h2`);
const tripEventsSection = document.querySelector(`.trip-events`);

renderElementIn(menuHeading, new Menu().getElement(), Position.AFTEREND);
renderElementIn(tripControlsBlock, new Filter().getElement());

new TripController(tripEventsSection, tripPoints).init();
