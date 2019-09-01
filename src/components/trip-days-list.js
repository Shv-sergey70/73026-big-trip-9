import AbstractComponent from "./abstract-component";

export default class TripDaysList extends AbstractComponent{
  getTemplate() {
    return `<ul class="trip-days"></ul>`;
  }
}
