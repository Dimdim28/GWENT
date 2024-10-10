import { GameCard, Hero, Turn } from '../../types/general';

export interface GameStore {
  player: Hero;
  enemy: Hero;
  currentTurn: Turn;
  isGameOver: boolean;
  isGameStarted: boolean;
  startGame: () => void;
  endTurn: () => void;
  playCard: (card: GameCard) => void;
  attackCard: (attacker: number, target: number) => void;
}
