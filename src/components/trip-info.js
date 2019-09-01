import AbstractComponent from "./abstract-component";

export default class TripInfo extends AbstractComponent {
  constructor({cities, minStartDate, maxFinishDate, totalCost}) {
    super();

    this._cities = cities;
    this._minStartDate = minStartDate;
    this._maxFinishDate = maxFinishDate;
    this._totalCost = totalCost;
  }

  getTemplate() {
    return `<section class="trip-main__trip-info  trip-info">
              <div class="trip-info__main">
                <h1 class="trip-info__title">${this._cities.length > 3 ? this._cities[0] + ` &mdash; ... &mdash; ` + this._cities[this._cities.length - 1] : this._cities.join(`&mdash;`)}</h1>
              
                <p class="trip-info__dates">${new Date(this._minStartDate).getDate()} ${new Date(this._minStartDate).toLocaleString(`en`, {month: `short`})} &nbsp;&mdash;&nbsp; ${new Date(this._maxFinishDate).getDate()} ${new Date(this._maxFinishDate).toLocaleString(`en`, {month: `short`})}</p>
              </div>
              <p class="trip-info__cost">
                Total: &euro;&nbsp;<span class="trip-info__cost-value">${this._totalCost}</span>
              </p>
            </section>`;
  }
}
