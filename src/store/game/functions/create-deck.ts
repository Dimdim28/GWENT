import { ALL_CARDS } from '../../../constants/cards';
import { GameCard } from '../../../types/general';

export function createDeck(): GameCard[] {
  return ALL_CARDS.map((card, index) => ({
    ...card,
    id: index + 1,
    isOnBoard: false,
    isCanAttack: false,
  }));
}
