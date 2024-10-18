import { GameCard } from '../types/general';

export const getCardsWithStatusAmount = (
  cards: GameCard[],
  status: GameCard['status'],
) => {
  const cardsWithSameStatus = cards.filter((card) => card.status === status);

  return cardsWithSameStatus.length;
};
