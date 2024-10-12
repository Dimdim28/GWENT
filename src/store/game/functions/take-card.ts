import { GameCard, Turn } from '../../../types/general';
import { GameStore } from '../game.types';

export const takeCardAction = (
  state: GameStore,
  role: Turn,
): Partial<GameStore> => {
  const cards = role === 'Player' ? state.player.cards : state.enemy.cards;

  const index = cards.findIndex((card) => card.status === 'inDeck');

  if (index !== -1) {
    const updatedCard: GameCard = { ...cards[index], status: 'inHand' };

    const updatedCards = [...cards];
    updatedCards[index] = updatedCard;

    if (role === 'Opponent') {
      return {
        enemy: {
          ...state.enemy,
          cards: updatedCards,
        },
      };
    }

    return {
      player: {
        ...state.player,
        cards: updatedCards,
      },
    };
  }

  return {};
};
