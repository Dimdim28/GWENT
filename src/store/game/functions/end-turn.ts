import { GameStore } from '../game.types';

import { GameCard, Turn } from './../../../types/general';

const getNewMoney = (role: Turn, newTurn: Turn, money: number) =>
  newTurn === role ? Math.min(money + 1, 10) : money;

const resetAttack = (deck: GameCard[]) =>
  deck.map((card) => ({ ...card, isCanAttack: card.isOnBoard }));

export const endTurnAction = (get: () => GameStore): Partial<GameStore> => {
  const state = get();

  const newTurn: Turn =
    state.currentTurn === 'Opponent' ? 'Player' : 'Opponent';

  const newPlayerMoney = getNewMoney('Player', newTurn, state.player.money);
  const newEnemyMoney = getNewMoney('Opponent', newTurn, state.enemy.money);

  return {
    currentTurn: newTurn,
    player: {
      ...state.player,
      money: newPlayerMoney,
      cards: resetAttack(state.player.cards),
    },
    enemy: {
      ...state.enemy,
      money: newEnemyMoney,
      cards: resetAttack(state.enemy.cards),
    },
  };
};
