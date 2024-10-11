import { GameCard } from '../types/general';

export const findCardById = (cards: GameCard[], id: number) =>
  cards.find((card) => card.id === id);
