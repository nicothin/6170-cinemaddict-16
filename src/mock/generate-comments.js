import { getRandomInteger } from '../utils';

export const generateCommentsIds = () => {
  const counter = getRandomInteger(0, 5);
  const res = [];

  for (let i = 0; i <= counter; i++) {
    res.push(i);
  }

  return res;
};
