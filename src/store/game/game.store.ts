import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { Fraction, Hero, Turn } from '../../types/general';

import {
  attackCardAction,
  createDeck,
  endTurnAction,
  playCardAction,
  takeCardAction,
} from './functions';
import { GameStore } from './game.types';

const initialPlayerState: Hero = {
  fraction: 'monster',
  cards: createDeck('monster'),
  points: 0,
  money: 10,
};

const initialEnemyState: Hero = {
  fraction: 'elf',
  cards: createDeck('elf'),
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

export const useGameStore = create(
  devtools<GameStore>((set, get) => ({
    ...initialGameData,
    startGame: () => set({ ...initialGameData, isGameStarted: true }),
    takeCard: (role: Turn) => set((state) => takeCardAction(state, role)),
    setUserFraction: (fraction: Fraction) =>
      set((state) => ({
        player: { ...state.player, fraction, cards: createDeck(fraction) },
      })),
    setEnemyFraction: (fraction: Fraction) =>
      set((state) => ({
        enemy: { ...state.enemy, fraction, cards: createDeck(fraction) },
      })),
    endGame: () => {},
    playCard: (cardId: number) => {
      set((state) => playCardAction(state, cardId));
    },
    attackCard: (attackerId: number, targetId: number) => {
      set((state) => attackCardAction(state, attackerId, targetId));
    },
    endTurn: () => {
      set(endTurnAction(get));
    },
  })),
);
