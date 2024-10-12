import {
  ELF_CARDS,
  MONSTERS_CARDS,
  NILFGAARD_CARDS,
  NORTH_CARDS,
  SKELLIGE_CARDS,
} from '../../../constants/cards';
import { Card, Fraction, GameCard } from '../../../types/general';

function getCardsByFraction(fraction: Fraction): Card[] {
  switch (fraction) {
    case 'elf':
      return ELF_CARDS;
    case 'monster':
      return MONSTERS_CARDS;
    case 'nilfgaard':
      return NILFGAARD_CARDS;
    case 'north':
      return NORTH_CARDS;
    case 'skellige':
      return SKELLIGE_CARDS;
    default:
      return [];
  }
}

function getRandomCards(cards: Card[], count: number = 8): Card[] {
  if (cards.length <= count) {
    return cards;
  }

  const shuffledCards = cards.sort(() => 0.5 - Math.random());
  return shuffledCards.slice(0, count);
}

export function createDeck(fraction: Fraction): GameCard[] {
  const cards = getCardsByFraction(fraction);
  const randomCards = getRandomCards(cards, 14);

  return randomCards.map((card, index) => ({
    ...card,
    id: index + 1,
    status: 'inDeck',
    isCanAttack: false,
  }));
}
