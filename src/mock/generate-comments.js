import { Emotions } from '../constants';
import { getRandomInteger } from '../utils/common';
import { generateHumanName, generateText } from './utils';

// TODO[@nicothin]: убедиться, что я использую этот файл

export const generateCommentsIds = () => {
  const counter = getRandomInteger(0, 5);
  const res = [];

  for (let i = 0; i <= counter; i++) {
    res.push(i);
  }

  return res;
};

export const generateComment = (id) => ({
  id,
  author: generateHumanName(),
  comment: generateText(),
  date: '2019-05-11T16:12:32.554Z',
  emotion: Emotions[getRandomInteger(0, Emotions.length - 1)],
});
