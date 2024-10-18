import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { randomTurn } from '../../helpers';
import { Fraction, Hero, Turn, Winner } from '../../types/general';

import {
  attackCardAction,
  createDeck,
  endTurnAction,
  enemyAttackRandomCards,
  enemyPlayRandomCards,
  playCardAction,
  takeCardAction,
} from './functions';
import { GameStore } from './game.types';

type InitialGameDataType = {
  player: Hero;
  enemy: Hero;
  currentTurn: Turn;
  isGameOver: boolean;
  isGameStarted: boolean;
  winner: Winner;
  isGameReady: boolean;
};

const initialPlayerState: Hero = {
  fraction: 'monster',
  cards: createDeck('monster'),
  points: 0,
  money: 20,
};

const initialEnemyState: Hero = {
  fraction: 'elf',
  cards: createDeck('elf'),
  points: 0,
  money: 20,
};

const initialGameData: InitialGameDataType = {
  player: initialPlayerState,
  enemy: initialEnemyState,
  currentTurn: randomTurn(),
  isGameOver: false,
  isGameStarted: false,
  winner: null,
  isGameReady: true,
};

export const useGameStore = create(
  devtools<GameStore>((set, get) => ({
    ...initialGameData,
    startGame: () =>
      set({
        ...initialGameData,
        isGameStarted: true,
        currentTurn: randomTurn(),
      }),
    takeCard: (role: Turn) => set((state) => takeCardAction(state, role)),
    setUserFraction: (fraction: Fraction) =>
      set((state) => ({
        player: { ...state.player, fraction, cards: createDeck(fraction) },
      })),
    setEnemyFraction: (fraction: Fraction) =>
      set((state) => ({
        enemy: { ...state.enemy, fraction, cards: createDeck(fraction) },
      })),
    endGame: () => set({ isGameStarted: false }),
    playCard: (cardId: number) => {
      set((state) => playCardAction(state, cardId));
    },
    attackCard: (attackerId: number, targetId: number) => {
      set((state) => attackCardAction(state, attackerId, targetId));
    },

    enemyAttackRandomTargets: async () => {
      const state = get();
      await enemyAttackRandomCards(state);
      set({});
    },

    enemyPlayRandomCards: async () => {
      const state = get();
      await enemyPlayRandomCards(state);
      set({});
    },

    endTurn: async () => {
      const newState = await endTurnAction(get);
      set(newState);
    },

    setIsGameReady(value) {
      set(() => ({ isGameReady: value }));
    },
  })),
);
