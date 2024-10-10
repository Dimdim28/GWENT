export type Fraction = 'elf' | 'monster' | 'nilfgaard' | 'north' | 'skellige';
export type Turn = 'Player' | 'Opponent';

export type Card = {
  fraction: Fraction;
  cost: number;
  value: number;
  image: string;
};

export type GameCard = Card & { isOnBoard: boolean; id: number };

export type Hero = {
  fraction: Fraction;
  cards: GameCard[];
  points: number;
  money: number;
};
