import { Fraction, Hero, Turn, Winner } from '../../types/general';

export interface GameStore {
  player: Hero;
  enemy: Hero;
  currentTurn: Turn;
  isGameOver: boolean;
  isGameStarted: boolean;
  winner: Winner;
  isGameReady: boolean;
  attackedCard: {
    isEnemy: boolean;
    id: number;
    decreasedPointsOn: number;
  } | null;
  setAttackedCard: (
    object: {
      isEnemy: boolean;
      id: number;
      decreasedPointsOn: number;
    } | null,
  ) => void;
  setIsGameReady: (value: boolean) => void;
  startGame: () => void;
  endGame: () => void;
  endTurn: () => void;
  takeCard: (role: Turn) => void;
  playCard: (cardId: number) => void;
  attackCard: (attacker: number, target: number) => void;
  setUserFraction: (fraction: Fraction) => void;
  setEnemyFraction: (fraction: Fraction) => void;
  enemyAttackRandomTargets: () => void;
  enemyPlayRandomCards: () => void;
}
