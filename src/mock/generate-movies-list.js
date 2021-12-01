import { getRandomInteger, getUnique } from '../utils';
import { generateCommentsIds } from './generate-comments';

const generateGenre = () => {
  const data = [
    'Action',
    'Animation',
    'Thriller',
    'Sci-Fi',
  ];

  const counter = getRandomInteger(1, data.length - 1);
  const result = [];

  for (let i = 1; i <= counter; i++) {
    result.push(
      data[getRandomInteger(0, data.length - 1)]
    );
  }
  return getUnique(result);
};

const generatePoster = () => {
  const data = [
    'made-for-each-other.png',
    'popeye-meets-sinbad.png',
    'sagebrush-trail.jpg',
    'santa-claus-conquers-the-martians.jpg',
    'the-dance-of-life.jpg',
    'the-great-flamarion.jpg',
    'the-man-with-the-golden-arm.jpg',
  ];

  return data[getRandomInteger(0, data.length - 1)];
};

const generateTitle = () => {
  const data = [
    'A Shark Of The Floor',
    'A Man Of The Floor',
    'A Lion Of The Darkness',
    'A Shark Within The Wall',
  ];

  return data[getRandomInteger(0, data.length - 1)];
};

const generateHumanName = (several = false) => {
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

const generateText = () => {
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

const generateMovie = () => ({
  filmInfo: {
    title: generateTitle(),
    totalRating: getRandomInteger(10, 100) / 10,
    poster: generatePoster(),
    ageRating: 0,
    director: generateHumanName(),
    writers: generateHumanName(true),
    actors: generateHumanName(true),
    release: {
      date: '2003-09-22T22:36:09.967Z',
      releaseCountry: 'Germany'
    },
    runtime: getRandomInteger(15, 380),
    genre: generateGenre(),
    description: generateText(),
  },
  userDetails: {
    watchlist: !!getRandomInteger(0, 1),
    alreadyWatched: !!getRandomInteger(0, 1),
    watchingDate: '2021-05-09T20:51:08.844Z',
    favorite: !!getRandomInteger(0, 1)
  },
  comments: generateCommentsIds(),
});

export const generateMoviesList = (counter = 1) => {
  const res = [];

  for (let i = 0; i < counter; i++) {
    res.push( generateMovie() );
  }

  return res;
};
