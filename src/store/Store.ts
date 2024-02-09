import { makeAutoObservable } from 'mobx';
import { GameStore } from './GameStore';

export class Store {
   public gameStore: GameStore;

   constructor() {
      makeAutoObservable(this);

      this.gameStore = new GameStore();
   }
}
