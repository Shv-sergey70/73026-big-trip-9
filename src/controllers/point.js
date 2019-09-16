import TripPoint from "../components/trip-point";
import TripPointEdit from "../components/trip-point-edit";
import {renderElementIn} from "../util";

export default class PointController {
  constructor(container, tripPointData, onDataChange) {
    this._container = container;
    this._tripPointData = tripPointData;
    this._onDataChange = onDataChange;

    this._tripPoint = new TripPoint(this._tripPointData);
    this._tripPointEdit = new TripPointEdit(this._tripPointData);
  }

  init() {
    const onEscKeydown = (evt) => {
      if ((evt.key === `Esc` || evt.key === `Escape`)) {
        this._container.replaceChild(this._tripPoint.getElement(), this._tripPointEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeydown);
        this._tripPoint.getElement().querySelector(`button.event__rollup-btn`).addEventListener(`click`, onOpenButtonClick);
      }
    };

    const onOpenButtonClick = () => {
      this._container.replaceChild(this._tripPointEdit.getElement(), this._tripPoint.getElement());
      document.addEventListener(`keydown`, onEscKeydown);
      this._tripPoint.getElement().querySelector(`button.event__rollup-btn`).removeEventListener(`click`, onOpenButtonClick);
      this._tripPointEdit.getElement().querySelector(`button.event__rollup-btn`).addEventListener(`click`, onCloseButtonClick);
    };

    const onCloseButtonClick = () => {
      this._container.replaceChild(this._tripPoint.getElement(), this._tripPointEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeydown);
      this._tripPointEdit.getElement().querySelector(`button.event__rollup-btn`).removeEventListener(`click`, onCloseButtonClick);
      this._tripPoint.getElement().querySelector(`button.event__rollup-btn`).addEventListener(`click`, onOpenButtonClick);
    };

    this._tripPoint.getElement().querySelector(`button.event__rollup-btn`).addEventListener(`click`, onOpenButtonClick);
    this._tripPointEdit.getElement().querySelector(`form`).addEventListener(`submit`, () => this._container.replaceChild(this._tripPoint.getElement(), this._tripPointEdit.getElement()));

    renderElementIn(this._container, this._tripPoint.getElement());
  }
}
