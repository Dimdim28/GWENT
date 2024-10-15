import { GameStore } from '../../game.types';

export const enemyAttackRandomCards = async (
  state: GameStore,
): Promise<Partial<GameStore>> => {
  const availableAttackerCards = state.enemy.cards.filter(
    (card) => card.status === 'onTable' && card.isCanAttack,
  );

  const availableDefenderCards = state.player.cards.filter(
    (card) => card.status === 'onTable',
  );

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  for (const attackerCard of availableAttackerCards) {
    if (availableDefenderCards.length > 0) {
      const randomDefenderIndex = Math.floor(
        Math.random() * availableDefenderCards.length,
      );
      const randomDefenderCard = availableDefenderCards[randomDefenderIndex];

      state.attackCard(attackerCard.id, randomDefenderCard.id);

      // Wait for 1 second before the next attack
      await delay(1000);
    }
  }

  state.endTurn();

  return {};
};
