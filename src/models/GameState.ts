import { z } from 'zod';

export const zGameState = z.object({
   mode: z.union([z.literal('Normal'), z.literal('Hardcore')]).nullable(),
});

export type GameState = z.infer<typeof zGameState>;
