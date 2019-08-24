import {getRandomInt} from "../util";

const DAY_MILLISECOND = 86400000;

const getDescription = () => {
  const splittedDescription = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`.split(`. `);

  return splittedDescription.sort(() => 0.5 - Math.random()).slice(0, getRandomInt(1, 3)).join(`. `);
};

export const generateTripPointData = () => {
  const timestampStart = Date.now() + getRandomInt(7, 1) * DAY_MILLISECOND;
  const timestampFinish = timestampStart + getRandomInt(1) + (+Math.random().toFixed(3)) * DAY_MILLISECOND;
  return {
    icon: [
      `bus.png`,
      `check-in.png`,
      `drive.png`,
      `flight.png`,
      `restaurant.png`,
      `ship.png`,
      `sightseeing.png`,
      `taxi.png`,
      `train.png`,
      `transport.png`,
      `trip.png`
    ][getRandomInt(10)],
    description: getDescription(),
    dateStart: timestampStart,
    dateFinish: timestampFinish,
    cost: getRandomInt(900, 100),
    additions: [
      {
        name: `Add luggage`,
        cost: 10,
        isApplied: Math.round(Math.random())
      },
      {
        name: `Switch to comfort class`,
        cost: 150,
        isApplied: Math.round(Math.random())
      },
      {
        name: `Add meal`,
        cost: 2,
        isApplied: Math.round(Math.random())
      },
      {
        name: `Choose seats`,
        cost: 9,
        isApplied: Math.round(Math.random())
      },
      {
        name: `Travel by train`,
        cost: 40,
        isApplied: Math.round(Math.random())
      }
    ],
    city: [
      `Amsterdam`,
      `Saint-Petersburg`,
      `London`,
      `Bali`,
      `Milan`
    ][getRandomInt(4)],
    photos: new Array(getRandomInt(4)).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`),
    isFavorite: Math.round(Math.random())
  };
};
