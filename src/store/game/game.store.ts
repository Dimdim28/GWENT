import { create } from 'zustand';

import { Hero, Turn } from '../../types/general';

import { createDeck } from './functions';
import { GameStore } from './game.types';

const initialPlayerState: Hero = {
  fraction: 'monster',
  cards: createDeck(),
  points: 0,
  money: 10,
};

const initialEnemyState: Hero = {
  fraction: 'elf',
  cards: createDeck(),
  points: 0,
  money: 10,
};

const initialGameData: {
  player: Hero;
  enemy: Hero;
  currentTurn: Turn;
  isGameOver: boolean;
  isGameStarted: boolean;
} = {
  player: initialPlayerState,
  enemy: initialEnemyState,
  currentTurn: 'Player',
  isGameOver: false,
  isGameStarted: false,
};

export const useGameStore = create<GameStore>((set) => ({
  ...initialGameData,
  startGame: () => set(initialGameData),
  endGame: () => {},
  playCard: () => {},
  attackCard: () => {},
  endTurn: () => {},
}));
