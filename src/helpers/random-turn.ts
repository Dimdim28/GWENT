import { Turn } from './../types/general';

export const randomTurn = (): Turn => {
  const number = Math.random();

  return number >= 0.5 ? 'Player' : 'Opponent';
};
