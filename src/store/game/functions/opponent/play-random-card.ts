import { GameStore } from '../../game.types';

export const enemyPlayRandomCards = (state: GameStore): Partial<GameStore> => {
  let playableCards = state.enemy.cards.filter(
    (card) => card.status === 'inHand',
  );

  if (playableCards.length === 0) {
    return {};
  }

  let money = state.enemy.money;

  while (money > 0 && playableCards.length > 0) {
    console.log('money', money, 'playableCards', playableCards);

    const affordableCards = playableCards.filter((card) => card.cost <= money);

    if (affordableCards.length === 0) break;

    const randomIndex = Math.floor(Math.random() * affordableCards.length);
    const cardToPlay = affordableCards[randomIndex];

    state.playCard(cardToPlay.id);

    money -= cardToPlay.cost;

    playableCards = playableCards.filter((card) => card.id !== cardToPlay.id);
  }

  return {};
};
