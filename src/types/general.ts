export type Fraction = 'elf' | 'monster' | 'nilfgaard' | 'north' | 'skellige';
export type Turn = 'Player' | 'Opponent';
export type CardStatus = 'onTable' | 'inDeck' | 'inHand' | 'inGrave';
export type Winner = 'Player' | 'Enemy' | null;

export type Card = {
  fraction: Fraction;
  cost: number;
  value: number;
  image: string;
};

export type GameCard = Card & {
  status: CardStatus;
  id: number;
  isCanAttack: boolean;
};

export type Hero = {
  fraction: Fraction;
  cards: GameCard[];
  points: number;
  money: number;
};
