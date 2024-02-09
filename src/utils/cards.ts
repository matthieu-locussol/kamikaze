import { Card } from '../models/Card';
import { GameState } from '../models/GameState';

export const makeDefaultDeck = (): GameState['deck'] => {
   const suits = ['S', 'H', 'C', 'D'] as const;
   const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'] as const;

   return suits.flatMap((suit) => values.map((value) => ({ type: suit, value })));
};

export const shuffleDeck = (deck: GameState['deck']): GameState['deck'] => {
   const newDeck = [...deck];

   for (let i = newDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
   }

   return newDeck;
};

export const getCardValue = (card: GameState['deck'][0]): number => {
   if (card.value === 'J') {
      return 11;
   }

   if (card.value === 'Q') {
      return 12;
   }

   if (card.value === 'K') {
      return 13;
   }

   if (card.value === 'A') {
      return 14;
   }

   return parseInt(card.value);
};

const CardTypeNames: Record<Card['type'], string> = {
   S: 'Pique',
   H: 'Coeur',
   C: 'Trèfle',
   D: 'Carreau',
};

const CardValueNames: Record<Card['value'], string> = {
   A: 'As',
   J: 'Valet',
   Q: 'Dame',
   K: 'Roi',
   10: '10',
   9: '9',
   8: '8',
   7: '7',
   6: '6',
   5: '5',
   4: '4',
   3: '3',
   2: '2',
};

export const getCardName = (card: GameState['deck'][0]): string =>
   `${CardValueNames[card.value]} de ${CardTypeNames[card.type]}`;
