import { findCardById, removeCardById } from '../../../helpers';
import { GameStore } from '../game.types';

export const attackCardAction = (
  state: GameStore,
  attackerId: number,
  targetId: number,
): Partial<GameStore> => {
  const isPlayerAttack = state.currentTurn === 'Player';

  const attacker = isPlayerAttack
    ? findCardById(state.player.cards, attackerId)
    : findCardById(state.enemy.cards, attackerId);

  const target = isPlayerAttack
    ? findCardById(state.enemy.cards, targetId)
    : findCardById(state.player.cards, targetId);

  if (attacker && target && attacker.isCanAttack) {
    target.value -= Math.min(attacker.value, target.value);

    if (target.value <= 0) {
      if (isPlayerAttack) {
        state.enemy.cards = removeCardById(state.enemy.cards, targetId);
      } else {
        state.player.cards = removeCardById(state.player.cards, targetId);
      }
    }
  }

  return { player: state.player, enemy: state.enemy };
};
