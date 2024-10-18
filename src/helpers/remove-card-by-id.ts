import { GameCard } from '../types/general';

export const removeCardById = (cards: GameCard[], id: number): GameCard[] =>
  cards.map((card) => (card.id === id ? { ...card, status: 'inGrave' } : card));
