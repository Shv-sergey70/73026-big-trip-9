import {Position, renderElementIn, sortType} from "../util";
import TripInfo from "../components/trip-info";
import Sort from "../components/sort";
import TripDay from "../components/trip-day";
import TripPoint from "../components/trip-point";
import TripPointEdit from "../components/trip-point-edit";
import TripDaysList from "../components/trip-days-list";
import NoTripPoints from "../components/no-trip-points";
import PointController from "./point";

export default class TripController {
  constructor(container, tripPoints) {
    this._container = container;
    this._tripPoints = tripPoints;
    this._tripDaysList = new TripDaysList();

    this._tripMainBlock = document.querySelector(`.trip-main`);

    this._onDataChange = this._onDataChange.bind(this);
  }

  init() {
    if (this._isNoTripPoints()) {
      document.querySelector(`.trip-main__event-add-btn`).disabled = true;
      renderElementIn(this._container, new NoTripPoints().getElement());
    } else {
      renderElementIn(this._tripMainBlock, new TripInfo({
        cities: Array.from(new Set(this._tripPoints.map((tripPoint) => tripPoint.city))),
        minStartDate: Math.min.call(null, ...this._tripPoints.map((tripPoint) => tripPoint.dateStart)),
        maxFinishDate: Math.max.call(null, ...this._tripPoints.map((tripPoint) => tripPoint.dateFinish)),
        totalCost: this._tripPoints.reduce((accumulator, tripPoint) => accumulator + tripPoint.cost + tripPoint.additions.filter((addition) => addition.isApplied).reduce((acc, addition) => acc + addition.cost, 0), 0)
      }).getElement(), Position.AFTERBEGIN);

      const sortElement = new Sort().getElement();
      sortElement.addEventListener(`click`, (evt) => {
        if (evt.target.dataset.sort === undefined) {
          return;
        }

        this._tripDaysList.getElement().textContent = ``;

        switch (true) {
          case evt.target.dataset.sort === sortType.DEFAULT: {
            this._renderTripPointsByDefault();

            break;
          }
          case evt.target.dataset.sort === sortType.TIME: {
            let sortedPoints = this._tripPoints.sort((firstPoint, secondPoint) => (secondPoint.dateFinish - secondPoint.dateStart) - (firstPoint.dateFinish - firstPoint.dateStart));
            this._renderDay(null, sortedPoints, null);

            break;
          }
          case evt.target.dataset.sort === sortType.PRICE: {
            let sortedPoints = this._tripPoints.sort((firstPoint, secondPoint) => secondPoint.cost - firstPoint.cost);
            this._renderDay(null, sortedPoints, null);

            break;
          }
        }
      });

      renderElementIn(this._container, sortElement);

      this._renderTripPointsByDefault();

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

    groupedTripPoints.forEach((tripPoint) => this._renderTripPoint(dayItemTripList, tripPoint));

    renderElementIn(this._tripDaysList.getElement(), dayItem.getElement());
  }

  _renderTripPoint(dayItemTripList, tripPointData) {
    new PointController(dayItemTripList, tripPointData, this._onDataChange).init();
  };

  _isNoTripPoints() {
    return this._tripPoints.length === 0;
  }

  _renderTripPointsByDefault() {
    [...this._getEventsByDayMap().entries()].forEach(([dayTimestamp, groupedTripPoints], i) => this._renderDay(dayTimestamp, groupedTripPoints, i + 1));
  }

  _onDataChange(newData, oldData) {

  }
}
