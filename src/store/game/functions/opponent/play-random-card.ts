import { GameStore } from '../../game.types';

export const enemyPlayRandomCards = (state: GameStore): Partial<GameStore> => {
  const playableCards = state.enemy.cards.filter(
    (card) => card.status === 'inHand',
  );

  if (playableCards.length === 0) {
    return {};
  }

  let money = state.enemy.money;

  while (money > 0) {
    const cardToPlay = playableCards.find((card) => card.cost <= money);

    if (!cardToPlay) break;
    money -= cardToPlay.cost;
    state.playCard(cardToPlay.id);
  }
  return {};
};
