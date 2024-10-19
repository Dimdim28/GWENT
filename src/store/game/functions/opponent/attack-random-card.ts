import { GameStore } from '../../game.types';

export const enemyAttackRandomCards = async (
  state: GameStore,
): Promise<Partial<GameStore>> => {
  const availableAttackerCards = state.enemy.cards.filter(
    (card) => card.status === 'onTable' && card.isCanAttack,
  );

  let availableDefenderCards = state.player.cards.filter(
    (card) => card.status === 'onTable',
  );

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  for (const attackerCard of availableAttackerCards) {
    if (availableDefenderCards.length === 0) {
      break;
    }

    const randomDefenderIndex = Math.floor(
      Math.random() * availableDefenderCards.length,
    );
    const randomDefenderCard = availableDefenderCards[randomDefenderIndex];

    state.setAttackedCard(null);

    await delay(300);

    state.setAttackedCard({
      isEnemy: false,
      id: randomDefenderCard.id,
      decreasedPointsOn: Math.min(randomDefenderCard.value, attackerCard.value),
    });

    if (attackerCard.value >= randomDefenderCard.value) {
      availableDefenderCards = availableDefenderCards.filter(
        (card) => card.id !== randomDefenderCard.id,
      );
    }

    state.attackCard(attackerCard.id, randomDefenderCard.id);

    await delay(1000);
  }

  await state.endTurn();

  return {};
};
