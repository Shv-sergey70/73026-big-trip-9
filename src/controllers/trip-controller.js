import {Position, renderElementIn} from "../util";
import TripInfo from "../components/trip-info";
import Sort from "../components/sort";
import TripDay from "../components/trip-day";
import TripPoint from "../components/trip-point";
import TripPointEdit from "../components/trip-point-edit";
import TripDaysList from "../components/trip-days-list";
import NoTripPoints from "../components/no-trip-points";

export default class TripController {
  constructor(container, tripPoints) {
    this._container = container;
    this._tripPoints = tripPoints;
    this._tripDaysList = new TripDaysList();

    this._tripMainBlock = document.querySelector(`.trip-main`);
  }

  init() {
    if (this._tripPoints.length === 0) {
      document.querySelector(`.trip-main__event-add-btn`).disabled = true;
      renderElementIn(this._container, new NoTripPoints().getElement());
    } else {
      renderElementIn(this._tripMainBlock, new TripInfo({
        cities: Array.from(new Set(this._tripPoints.map((tripPoint) => tripPoint.city))),
        minStartDate: Math.min.call(null, ...this._tripPoints.map((tripPoint) => tripPoint.dateStart)),
        maxFinishDate: Math.max.call(null, ...this._tripPoints.map((tripPoint) => tripPoint.dateFinish)),
        totalCost: this._tripPoints.reduce((accumulator, tripPoint) => accumulator + tripPoint.cost + tripPoint.additions.filter((addition) => addition.isApplied).reduce((acc, addition) => acc + addition.cost, 0), 0)
      }).getElement(), Position.AFTERBEGIN);

      renderElementIn(this._container, new Sort().getElement());

      [...this._getEventsByDayMap().entries()].forEach(([dayTimestamp, groupedTripPoints], i) => this._renderDay(dayTimestamp, groupedTripPoints, i + 1));

      renderElementIn(this._container, this._tripDaysList.getElement());
    }
  }

  _getEventsByDayMap() {
    const eventsByDay = new Map();

    this._tripPoints.sort((first, second) => first.dateStart - second.dateStart).forEach((tripPoint) => {
      if (eventsByDay.has(Date.parse(new Date(tripPoint.dateStart).toDateString()))) {
        eventsByDay.get(Date.parse(new Date(tripPoint.dateStart).toDateString())).push(tripPoint);
      } else {
        eventsByDay.set(Date.parse(new Date(tripPoint.dateStart).toDateString()), [tripPoint]);
      }
    });

    return eventsByDay;
  }

  _renderDay(dayTimestamp, groupedTripPoints, dayNumber) {
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

    renderElementIn(this._tripDaysList.getElement(), dayItem.getElement());
  }
}
