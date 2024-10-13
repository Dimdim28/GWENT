import { Fraction, Hero, Turn } from '../../types/general';

export interface GameStore {
  player: Hero;
  enemy: Hero;
  currentTurn: Turn;
  isGameOver: boolean;
  isGameStarted: boolean;
  startGame: () => void;
  endTurn: () => void;
  takeCard: (role: Turn) => void;
  playCard: (cardId: number) => void;
  attackCard: (attacker: number, target: number) => void;
  setUserFraction: (fraction: Fraction) => void;
  setEnemyFraction: (fraction: Fraction) => void;
  enemyAttackRandomTargets: () => void;
  enemyPlayRandomCards: () => void;
}
