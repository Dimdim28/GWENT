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

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const endTurnAction = async (
  get: () => GameStore,
): Promise<Partial<GameStore>> => {
  const state = get();
  const winner = checkWinner(state);
  const newTurn: Turn =
    state.currentTurn === 'Opponent' ? 'Player' : 'Opponent';

  if (winner) {
    const audio = new Audio(winner === 'Enemy' ? loserAudio : winnerAudio);
    audio.preload = 'auto';
    audio.play();
    return {
      currentTurn: newTurn,
      winner,
      player: { ...state.player, points: 0 },
      enemy: { ...state.enemy, points: 0 },
    };
  }

  await delay(100);
  const endTurnAudioInstance = new Audio(endTurnAudio);
  endTurnAudioInstance.preload = 'auto';
  endTurnAudioInstance.play();
  await delay(100);

  const newPlayerMoney = getNewMoney('Opponent', newTurn, state.player.money);
  const newEnemyMoney = getNewMoney('Player', newTurn, state.enemy.money);

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
