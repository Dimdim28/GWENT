import attacCardAudio from '../../../assets/audio/attack_card.m4a';
import { findCardById, removeCardById } from '../../../helpers';
import { GameStore } from '../game.types';

export const attackCardAction = async (
  state: GameStore,
  attackerId: number,
  targetId: number,
): Promise<Partial<GameStore>> => {
  const isPlayerAttack = state.currentTurn === 'Player';

  const attacker = isPlayerAttack
    ? findCardById(state.player.cards, attackerId)
    : findCardById(state.enemy.cards, attackerId);

  const target = isPlayerAttack
    ? findCardById(state.enemy.cards, targetId)
    : findCardById(state.player.cards, targetId);

  if (attacker && target && attacker.isCanAttack) {
    const targetValue = target.value;
    const attackerValue = attacker.value;

    const audio = new Audio();
    audio.src = attacCardAudio;
    audio.preload = 'auto';
    audio.play();

    target.value -= Math.min(attackerValue, targetValue);

    if (target.value <= 0) {
      if (isPlayerAttack) {
        state.enemy.cards = removeCardById(state.enemy.cards, targetId);
      } else {
        state.player.cards = removeCardById(state.player.cards, targetId);
      }
    }

    attacker.isCanAttack = false;
    if (isPlayerAttack) {
      return {
        player: state.player,
        enemy: {
          ...state.enemy,
          points: (state.enemy.points -= Math.min(attackerValue, targetValue)),
        },
      };
    } else {
      return {
        player: {
          ...state.player,
          points: (state.player.points -= Math.min(attackerValue, targetValue)),
        },
        enemy: state.enemy,
      };
    }
  }
  return { player: state.player, enemy: state.enemy };
};
