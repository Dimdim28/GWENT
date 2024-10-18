import { GameCard } from '../types/general';

export const getCardIndex = (
  cards: GameCard[],
  id: GameCard['id'],
  status: GameCard['status'],
) => {
  const cardsWithSameStatus = cards.filter((card) => card.status === status);

  const index = cardsWithSameStatus.findIndex(
    (filteredCards) => filteredCards.id === id,
  );

  return index;
};
