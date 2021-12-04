import { getRandomInteger, getUnique } from '../utils';
import { generateHumanName, generateText } from './utils';
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

export const generateMovie = () => ({
  filmInfo: {
    title: generateTitle(),
    alternativeTitle: generateTitle(),
    totalRating: getRandomInteger(10, 100) / 10,
    poster: generatePoster(),
    ageRating: 0,
    director: generateHumanName(),
    writers: generateHumanName('more people to sacrifice to Cthulhu'),
    actors: generateHumanName('more people to sacrifice to Cthulhu'),
    release: {
      date: '2003-09-22T22:36:09.967Z',
      releaseCountry: 'Germany'
    },
    runtime: getRandomInteger(15, 180),
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
