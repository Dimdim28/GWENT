import harpia from '../assets/Harpia_Premium.webp';
import mahakam from '../assets/redman.gif';
import regis from '../assets/regis.gif';
import skellige_warrior from '../assets/skellige_warrior.gif';
import tissaya from '../assets/tissaya.gif';

import { Card } from './../types/general';

export const ALL_CARDS: Card[] = [
  {
    fraction: 'skellige',
    cost: 9,
    value: 5,
    image: skellige_warrior,
  },
  {
    fraction: 'monster',
    cost: 0,
    value: 6,
    image: harpia,
  },
  {
    fraction: 'north',
    cost: 2,
    value: 8,
    image: regis,
  },
  {
    fraction: 'elf',
    cost: 5,
    value: 7,
    image: mahakam,
  },
  {
    fraction: 'nilfgaard',
    cost: 2,
    value: 17,
    image: tissaya,
  },
];