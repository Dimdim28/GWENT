import cardElf from '../assets/cards-back/elfs.png';
import cardMonster from '../assets/cards-back/monsters.png';
import cardNilfgaard from '../assets/cards-back/nilfgaard.png';
import cardNorth from '../assets/cards-back/north.png';
import cardSkellige from '../assets/cards-back/skelige.png';
import { Fraction } from '../types/general';

export const FRACTIONS: { name: Fraction; back: string }[] = [
  {
    name: 'elf',
    back: cardElf,
  },
  {
    name: 'monster',
    back: cardMonster,
  },
  {
    name: 'nilfgaard',
    back: cardNilfgaard,
  },
  {
    name: 'north',
    back: cardNorth,
  },
  {
    name: 'skellige',
    back: cardSkellige,
  },
];
