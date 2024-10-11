import { GameCard } from '../types/general';

export const removeCardById = (cards: GameCard[], id: number) =>
  cards.filter((card) => card.id !== id);
