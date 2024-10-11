import { create } from 'zustand';

import { Hero, Turn } from '../../types/general';

import {
  attackCardAction,
  createDeck,
  endTurnAction,
  PlayCardAction,
} from './functions';
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

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialGameData,
  startGame: () => set(initialGameData),
  endGame: () => {},
  playCard: (cardId: number) => {
    set((state) => PlayCardAction(state, cardId));
  },
  attackCard: (attackerId: number, targetId: number) => {
    set((state) => attackCardAction(state, attackerId, targetId));
  },
  endTurn: () => {
    set(endTurnAction(get));
  },
}));
