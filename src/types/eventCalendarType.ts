import { z } from 'zod';

export const eventCalendarType = z.object({
  id:z.number(),
  summary: z.string(),
  start: z.string(),
  end: z.string(),
});

export type EventCalendar = z.infer<typeof eventCalendarType>;
