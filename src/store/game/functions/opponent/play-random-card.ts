import { GameStore } from '../../game.types';

export async function enemyPlayRandomCards(state: GameStore) {
  let playableCards = state.enemy.cards.filter(
    (card) => card.status === 'inHand',
  );

  if (playableCards.length === 0) {
    return {};
  }

  let money = state.enemy.money;

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  while (money > 0 && playableCards.length > 0) {
    const affordableCards = playableCards.filter((card) => card.cost <= money);

    if (affordableCards.length === 0) break;

    const randomIndex = Math.floor(Math.random() * affordableCards.length);
    const cardToPlay = affordableCards[randomIndex];

    state.playCard(cardToPlay.id);

    money -= cardToPlay.cost;

    playableCards = playableCards.filter((card) => card.id !== cardToPlay.id);

    // Wait for 1 second before the next loop iteration
    await delay(1000);
  }

  return {};
}
