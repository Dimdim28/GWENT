import { GameStore } from '../../game.types';

export const enemyAttackRandomCards = (
  state: GameStore,
): Partial<GameStore> => {
  const availableAttackerCards = state.enemy.cards.filter(
    (card) => card.status === 'onTable' && card.isCanAttack,
  );

  const availableDefenderCards = state.player.cards.filter(
    (card) => card.status === 'onTable',
  );

  console.log(
    'availableAttackerCards',
    availableAttackerCards,
    'availableDefenderCards',
  );

  availableAttackerCards.forEach((attackerCard) => {
    if (availableDefenderCards.length > 0) {
      const randomDefenderIndex = Math.floor(
        Math.random() * availableDefenderCards.length,
      );
      const randomDefenderCard = availableDefenderCards[randomDefenderIndex];

      state.attackCard(attackerCard.id, randomDefenderCard.id);
    }
  });

  state.endTurn();

  return {};
};
