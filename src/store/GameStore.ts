import { makeAutoObservable } from 'mobx';
import { Card } from '../models/Card';
import { GameState, zGameState } from '../models/GameState';
import { getCardValue, makeDefaultDeck, shuffleDeck } from '../utils/cards';

const NORMAL_HIDDEN_INDEXES = [2];
const HARDCORE_HIDDEN_INDEXES = [0, 1, 2, 3, 4];

export class GameStore {
   public state: GameState;

   public resetModalOpen = false;

   constructor() {
      makeAutoObservable(this);

      this.state = this.loadState();
   }

   private getInitialState(): GameState {
      const deck = shuffleDeck(makeDefaultDeck());
      const board = deck.splice(0, 5);

      return {
         mode: null,
         deck,
         board,
         currentBoardIndex: 0,
         sips: 0,
         lastSips: 0,
         culSecs: 0,
         oneShot: true,
         openWinModal: false,
         openLoseModal: false,
         openSnackbar: false,
         openDrinkModal: false,
         openCulSecsModal: false,
         lastDrawnCard: null,
         lastLostCard: null,
      };
   }

   private loadState(): GameState {
      const state = localStorage.getItem('gameState');

      if (state !== null) {
         try {
            const gameState = zGameState.parse(JSON.parse(state));
            return gameState;
         } catch (e) {
            console.error('Error parsing saved gameState:', e);
         }
      }

      return this.getInitialState();
   }

   public saveState() {
      localStorage.setItem('gameState', JSON.stringify(this.state));
   }

   public chooseMode(mode: GameState['mode']) {
      this.state = {
         ...this.state,
         mode,
      };

      this.saveState();
   }

   public drawCard(): Card {
      const [card, ...deck] = this.state.deck;

      const newBoard = [...this.state.board];
      newBoard[this.state.currentBoardIndex] = card;

      this.state = {
         ...this.state,
         deck,
         board: newBoard,
      };

      return card;
   }

   public isIndexHidden(index: number): boolean {
      if (this.state.currentBoardIndex > index) {
         return false;
      }

      if (this.state.mode === 'Normal') {
         return NORMAL_HIDDEN_INDEXES.includes(index);
      } else if (this.state.mode === 'Hardcore') {
         return HARDCORE_HIDDEN_INDEXES.includes(index);
      }

      throw new Error('Invalid mode');
   }

   public guessMore() {
      const { board, currentBoardIndex } = this.state;

      const cardToGuess = board[currentBoardIndex];
      const cardDrawn = this.drawCard();

      const cardToGuessValue = getCardValue(cardToGuess);
      const cardDrawnValue = getCardValue(cardDrawn);

      this.setLastDrawnCard(cardDrawn);

      if (cardDrawnValue > cardToGuessValue) {
         this.executeCorrectGuess();
      } else if (cardDrawnValue < cardToGuessValue) {
         this.executeIncorrectGuess();
      } else {
         this.executeEqualityGuess();
      }
   }

   public guessLess() {
      const { board, currentBoardIndex } = this.state;

      const cardToGuess = board[currentBoardIndex];
      const cardDrawn = this.drawCard();

      const cardToGuessValue = getCardValue(cardToGuess);
      const cardDrawnValue = getCardValue(cardDrawn);

      this.setLastLostCard(cardToGuess);
      this.setLastDrawnCard(cardDrawn);

      if (cardDrawnValue < cardToGuessValue) {
         this.executeCorrectGuess();
      } else if (cardDrawnValue > cardToGuessValue) {
         this.executeIncorrectGuess();
      } else {
         this.executeEqualityGuess();
      }
   }

   public executeCorrectGuess() {
      this.state = {
         ...this.state,
         currentBoardIndex: this.state.currentBoardIndex + 1,
      };

      if (this.won) {
         this.openWinModal();
      }

      this.saveState();
   }

   public executeIncorrectGuess() {
      const newSips = this.state.currentBoardIndex + 1;

      this.state = {
         ...this.state,
         sips: this.state.sips + newSips,
         lastSips: newSips,
         currentBoardIndex: 0,
         openDrinkModal: true,
         oneShot: false,
      };

      if (this.lost) {
         this.openLoseModal();
      }

      this.saveState();
   }

   public executeEqualityGuess() {
      this.state = {
         ...this.state,
         currentBoardIndex: 0,
         culSecs: this.state.culSecs + 1,
         openCulSecsModal: true,
         oneShot: false,
      };

      if (this.lost) {
         this.openLoseModal();
      }

      this.saveState();
   }

   public openWinModal() {
      this.state = {
         ...this.state,
         openWinModal: true,
      };

      this.saveState();
   }

   public closeWinModal() {
      this.state = {
         ...this.state,
         openWinModal: false,
      };

      this.saveState();
   }

   public get remainingCardsCount() {
      return this.state.deck.length;
   }

   public get drawnCardsCount() {
      return 52 - this.remainingCardsCount - this.state.board.length;
   }

   public openLoseModal() {
      this.state = {
         ...this.state,
         openLoseModal: true,
      };

      this.saveState();
   }

   public closeLoseModal() {
      this.state = {
         ...this.state,
         openLoseModal: false,
      };

      this.saveState();
   }

   public setLastDrawnCard(card: Card) {
      this.state = {
         ...this.state,
         lastDrawnCard: card,
         openSnackbar: true,
      };

      this.saveState();
   }

   public closeSnackbar() {
      this.state = {
         ...this.state,
         openSnackbar: false,
      };

      this.saveState();
   }

   public get lost() {
      return this.state.deck.length === 0;
   }

   public get won() {
      return this.state.currentBoardIndex === 5;
   }

   public resetGame() {
      this.state = this.getInitialState();
      this.saveState();
   }

   public setResetModalOpen(open: boolean) {
      this.resetModalOpen = open;
   }

   public openDrinkModal() {
      this.state = {
         ...this.state,
         openDrinkModal: true,
      };

      this.saveState();
   }

   public closeDrinkModal() {
      this.state = {
         ...this.state,
         openDrinkModal: false,
      };

      this.saveState();
   }

   public openCulSecsModal() {
      this.state = {
         ...this.state,
         openCulSecsModal: true,
      };

      this.saveState();
   }

   public closeCulSecsModal() {
      this.state = {
         ...this.state,
         openCulSecsModal: false,
      };

      this.saveState();
   }

   public setLastLostCard(card: Card) {
      this.state = {
         ...this.state,
         lastLostCard: card,
      };

      this.saveState();
   }
}
