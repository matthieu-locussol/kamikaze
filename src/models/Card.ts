import { z } from 'zod';

export const zCard = z.object({
   type: z.union([z.literal('S'), z.literal('H'), z.literal('C'), z.literal('D')]),
   value: z.union([
      z.literal('A'),
      z.literal('2'),
      z.literal('3'),
      z.literal('4'),
      z.literal('5'),
      z.literal('6'),
      z.literal('7'),
      z.literal('8'),
      z.literal('9'),
      z.literal('10'),
      z.literal('J'),
      z.literal('Q'),
      z.literal('K'),
   ]),
});

export type Card = z.infer<typeof zCard>;
