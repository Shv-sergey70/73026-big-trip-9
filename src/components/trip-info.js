export const createTripInfoTemplate = ({cities, minStartDate, maxFinishDate, totalCost}) => `
<div class="trip-info__main">
  <h1 class="trip-info__title">${cities.length > 3 ? cities[0] + ` &mdash; ... &mdash; ` + cities[cities.length - 1]  : cities.join(`&mdash;`) }</h1>

  <p class="trip-info__dates">${new Date(minStartDate).getDate()} ${new Date(minStartDate).toLocaleString(`en`, {month: `short`})} &nbsp;&mdash;&nbsp; ${new Date(maxFinishDate).getDate()} ${new Date(maxFinishDate).toLocaleString(`en`, {month: `short`})}</p>
</div>
<p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
</p>`;
