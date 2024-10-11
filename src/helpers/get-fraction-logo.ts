import monsterLogo from '../assets/icons/monster.png';
import nilfgaardLogo from '../assets/icons/nilfgaard.png';
import northLogo from '../assets/icons/northern_realms.png';
import elfLogo from '../assets/icons/scoiatael.png';
import skelligeLogo from '../assets/icons/skellige.png';
import { Fraction } from '../types/general';

export const getFractionLogo = (fraction: Fraction) => {
  switch (fraction) {
    case 'elf': {
      return elfLogo;
    }
    case 'nilfgaard': {
      return nilfgaardLogo;
    }
    case 'north': {
      return northLogo;
    }
    case 'skellige': {
      return skelligeLogo;
    }
    case 'monster': {
      return monsterLogo;
    }
  }
};
