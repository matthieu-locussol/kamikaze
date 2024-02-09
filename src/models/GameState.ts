import { z } from 'zod';
import { zCard } from './Card';

export const zGameState = z.object({
   mode: z.union([z.literal('Normal'), z.literal('Hardcore')]).nullable(),
   deck: z.array(zCard),
   board: z.array(zCard),
   currentBoardIndex: z.number(),
   sips: z.number(),
   lastSips: z.number(),
   culSecs: z.number(),
   oneShot: z.boolean(),
   openWinModal: z.boolean(),
   openLoseModal: z.boolean(),
   openSnackbar: z.boolean(),
   openDrinkModal: z.boolean(),
   openCulSecsModal: z.boolean(),
   lastDrawnCard: zCard.nullable(),
   lastCard: zCard.nullable(),
});

export type GameState = z.infer<typeof zGameState>;
