import endTurnAudio from '../../../assets/audio/change_turn.m4a';
import loserAudio from '../../../assets/audio/loser.m4a';
import winnerAudio from '../../../assets/audio/winner.m4a';
import { GameStore } from '../game.types';

import { GameCard, Turn, Winner } from './../../../types/general';

const getNewMoney = (role: Turn, newTurn: Turn, money: number) =>
  newTurn === role ? Math.min(money + 10, 30) : money;

const resetAttack = (deck: GameCard[]) =>
  deck.map((card) => ({ ...card, isCanAttack: card.status === 'onTable' }));

const checkWinner = (state: GameStore): Winner => {
  const playerHasCards = state.player.cards.some(
    (card) => card.status === 'inHand' || card.status === 'onTable',
  );
  const enemyHasCards = state.enemy.cards.some(
    (card) => card.status === 'inHand' || card.status === 'onTable',
  );

  if (!playerHasCards || !enemyHasCards) {
    const playerPoints = state.player.points;
    const enemyPoints = state.enemy.points;

    if (playerPoints > enemyPoints) {
      return 'Player';
    } else if (enemyPoints > playerPoints) {
      return 'Enemy';
    } else {
      return null;
    }
  }

  return null;
};

export const endTurnAction = (get: () => GameStore): Partial<GameStore> => {
  const state = get();

  const winner = checkWinner(state);

  const newTurn: Turn =
    state.currentTurn === 'Opponent' ? 'Player' : 'Opponent';

  if (winner) {
    if (winner === 'Enemy') {
      const audio = new Audio();
      audio.src = loserAudio;
      audio.preload = 'auto';
      audio.play();
    } else {
      const audio = new Audio();
      audio.src = winnerAudio;
      audio.preload = 'auto';
      audio.play();
    }

    return {
      currentTurn: newTurn,
      winner,
    };
  }

  const newPlayerMoney = getNewMoney('Opponent', newTurn, state.player.money);
  const newEnemyMoney = getNewMoney('Player', newTurn, state.enemy.money);

  const audio = new Audio();
  audio.src = endTurnAudio;
  audio.preload = 'auto';
  audio.play();

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
