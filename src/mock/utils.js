import { getRandomInteger } from '../utils/common';

export const generateHumanName = (several = false) => {
  const data = [
    'Alejandro Gonsales Inarritu',
    'Robert Zemeckis',
    'Stephen Spielberg',
    'Quentin Tarantino',
    'Martin Scorsese',
    'Hayao Miazaki',
    'Robert Rodrigues',
    'Brad Bird',
    'Robert De Niro',
    'Michael Caine',
    'Leonardo DiCaprio',
    'Matt Damon',
    'Christian Bale',
    'Edward Norton',
    'Takeshi Kitano',
    'Gary Oldman',
    'Tom Hanks',
    'Harrison Ford',
    'Ralph Fiennes'
  ];

  if (!several) {
    return data[getRandomInteger(0, data.length - 1)];
  }

  const counter = getRandomInteger(1, 5);
  const result = [];

  for (let i = 1; i <= counter; i++) {
    result.push(
      data[getRandomInteger(0, data.length - 1)]
    );
  }
  return result;
};

export const generateText = () => {
  const data = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra. ',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. ',
    'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus',
  ];

  const counter = getRandomInteger(1, 5);
  const result = [];

  for (let i = 1; i <= counter; i++) {
    result.push(
      data[getRandomInteger(0, data.length - 1)]
    );
  }
  return result.join(' ');
};
