import { GameStore } from '../game.types';

export const playCardAction = (
  state: GameStore,
  cardId: number,
): Partial<GameStore> => {
  const isPlayerTurn = state.currentTurn === 'Player';

  const currentPlayer =
    state.currentTurn === 'Opponent' ? state.enemy : state.player;

  const currentCard = currentPlayer.cards.find((card) => card?.id === cardId);

  if (currentCard && currentPlayer.money >= currentCard.cost) {
    currentCard.status = 'onTable';
    currentPlayer.money -= currentCard.cost;
    currentPlayer.points += currentCard.value;
  }

  return isPlayerTurn ? { player: currentPlayer } : { enemy: currentPlayer };
};
