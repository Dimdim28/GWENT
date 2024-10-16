import cardHoverEffect1 from '../assets/audio/card_hover.mp3';
import cardHoverEffect2 from '../assets/audio/card_hover_2.mp3';
import cardHoverEffect3 from '../assets/audio/card_hover_3.mp3';

export const getRandomCardHoverAudio = () => {
  const randValue = Math.random();
  return randValue >= 0.66
    ? cardHoverEffect1
    : randValue < 0.33
      ? cardHoverEffect2
      : cardHoverEffect3;
};
