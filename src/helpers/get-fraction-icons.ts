import elfBack from '../assets/cards-back/elfs.png';
import monsterBack from '../assets/cards-back/monsters.png';
import nilfgaardBack from '../assets/cards-back/nilfgaard.png';
import northBack from '../assets/cards-back/north.png';
import skeligeBack from '../assets/cards-back/skelige.png';
import elfCost from '../assets/cards-front/cost_elf.png';
import monsterCost from '../assets/cards-front/cost_monster.png';
import nilfgaardCost from '../assets/cards-front/cost_nilfgaard.png';
import northCost from '../assets/cards-front/cost_north.png';
import skelligeCost from '../assets/cards-front/cost_skellige.png';
import elfPoints from '../assets/cards-front/points_elf.png';
import monsterPoints from '../assets/cards-front/points_monster.png';
import nilfgaardPoints from '../assets/cards-front/points_nilfgaard.png';
import northPoints from '../assets/cards-front/points_north.png';
import skelligePoints from '../assets/cards-front/points_skellige.png';
import { Fraction } from '../types/general';

export const getFractionIcons = (fraction: Fraction) => {
  switch (fraction) {
    case 'elf': {
      return {
        points: elfPoints,
        cost: elfCost,
        back: elfBack,
      };
    }
    case 'monster':
      return {
        points: monsterPoints,
        cost: monsterCost,
        back: monsterBack,
      };
    case 'nilfgaard':
      return {
        points: nilfgaardPoints,
        cost: nilfgaardCost,
        back: nilfgaardBack,
      };
    case 'north':
      return {
        points: northPoints,
        cost: northCost,
        back: northBack,
      };
    case 'skellige':
      return {
        points: skelligePoints,
        cost: skelligeCost,
        back: skeligeBack,
      };
    default:
      return {
        points: monsterPoints,
        cost: monsterCost,
        back: monsterBack,
      };
  }
};
