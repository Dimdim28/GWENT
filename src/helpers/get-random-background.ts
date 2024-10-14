import bg1 from '../assets/background/background-1.jpg';
import bg2 from '../assets/background/background-2.png';
import bg3 from '../assets/background/background-3.png';
import bg4 from '../assets/background/background-4.png';
import bg5 from '../assets/background/background-5.png';
import bg6 from '../assets/background/background-6.png';
import bg7 from '../assets/background/background-7.png';
import bg8 from '../assets/background/background-8.png';
import bg9 from '../assets/background/background-9.png';
import bg10 from '../assets/background/background-10.png';
import bg11 from '../assets/background/background-11.png';
import bg12 from '../assets/background/background-12.png';
import bg13 from '../assets/background/background-13.png';
import bg14 from '../assets/background/background-14.png';

export const getRandomBackground = () =>
  [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9, bg10, bg11, bg12, bg13, bg14][
    Math.floor(Math.random() * 14)
  ];
