import { EMOTIONS } from '../constants';
import { getRandomInteger } from '../utils';
import { generateHumanName, generateText } from './utils';

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
  emotion: EMOTIONS[getRandomInteger(0, EMOTIONS.length - 1)],
});
