import TripInfo from './components/trip-info';
import Menu from './components/menu';
import Filter from './components/filter';
import Sort from './components/sort';
import TripDay from './components/trip-day';
import TripPoint from './components/trip-point';
import TripPointEdit from './components/trip-point-edit';
import {generateTripPointData} from "./data/trip-point-data";
import {Position, renderElementIn} from "./util";
import TripDaysList from "./components/trip-days-list";
import NoTripPoints from "./components/no-trip-points";

const tripPoints = new Array(7).fill(``).map(generateTripPointData).sort();

const tripMainBlock     = document.querySelector(`.trip-main`);
const tripControlsBlock = document.querySelector(`.trip-controls`);
const menuHeading       = tripControlsBlock.querySelector(`h2`);
const tripEventsSection = document.querySelector(`.trip-events`);

renderElementIn(menuHeading, new Menu().getElement(), Position.AFTEREND);
renderElementIn(tripControlsBlock, new Filter().getElement());

const tripDaysList = new TripDaysList().getElement();

const getEventsByDayMap = () => {
  const eventsByDay = new Map();

  tripPoints.sort((first, second) => first.dateStart - second.dateStart).forEach((tripPoint) => {
    if (eventsByDay.has(Date.parse(new Date(tripPoint.dateStart).toDateString()))) {
      eventsByDay.get(Date.parse(new Date(tripPoint.dateStart).toDateString())).push(tripPoint);
    } else {
      eventsByDay.set(Date.parse(new Date(tripPoint.dateStart).toDateString()), [tripPoint]);
    }
  });

  return eventsByDay;
};

const renderDay = (dayTimestamp, groupedTripPoints, dayNumber) => {
  const dayItem = new TripDay({dayTimestamp, dayNumber});
  const dayItemTripList = dayItem.getElement().querySelector(`.trip-events__list`);

  const renderTripPoint = (tripPointData) => {
    const tripPoint = new TripPoint(tripPointData);
    const tripPointEdit = new TripPointEdit(tripPointData);

    const onEscKeydown = (evt) => {
      if ((evt.key === `Esc` || evt.key === `Escape`)) {
        dayItemTripList.replaceChild(tripPoint.getElement(), tripPointEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeydown);
      }
    };

    tripPoint.getElement().querySelector(`button.event__rollup-btn`).addEventListener(`click`, () => {
      dayItemTripList.replaceChild(tripPointEdit.getElement(), tripPoint.getElement());
      document.addEventListener(`keydown`, onEscKeydown);
    });
    tripPointEdit.getElement().querySelector(`form`).addEventListener(`submit`, () => dayItemTripList.replaceChild(tripPoint.getElement(), tripPointEdit.getElement()));

    renderElementIn(dayItemTripList, tripPoint.getElement());
  };

  groupedTripPoints.forEach(renderTripPoint);

  renderElementIn(tripDaysList, dayItem.getElement());
};

if (tripPoints.length === 0) {
  document.querySelector(`.trip-main__event-add-btn`).disabled = true;
  renderElementIn(tripEventsSection, new NoTripPoints().getElement());
} else {
  renderElementIn(tripMainBlock, new TripInfo({
    cities: Array.from(new Set(tripPoints.map((tripPoint) => tripPoint.city))),
    minStartDate: Math.min.call(null, ...tripPoints.map((tripPoint) => tripPoint.dateStart)),
    maxFinishDate: Math.max.call(null, ...tripPoints.map((tripPoint) => tripPoint.dateFinish)),
    totalCost: tripPoints.reduce((accumulator, tripPoint) => accumulator + tripPoint.cost + tripPoint.additions.filter((addition) => addition.isApplied).reduce((acc, addition) => acc + addition.cost, 0), 0)
  }).getElement(), Position.AFTERBEGIN);

  renderElementIn(tripEventsSection, new Sort().getElement());

  [...getEventsByDayMap().entries()].forEach(([dayTimestamp, groupedTripPoints], i) => renderDay(dayTimestamp, groupedTripPoints, i + 1));

  renderElementIn(tripEventsSection, tripDaysList);

}
