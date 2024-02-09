import { makeAutoObservable } from 'mobx';
import { GameState, zGameState } from '../models/GameState';

export class GameStore {
   public state: GameState;

   constructor() {
      makeAutoObservable(this);

      this.state = this.loadState();
   }

   private getInitialState(): GameState {
      return {
         mode: null,
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
}
