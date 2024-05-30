import { z } from 'zod';

const createEventSchema = z.object({
  summary: z.string(),
  description: z.string().optional(),
  start: z.string(),
  end: z.string(),
  timeZone: z.string().default('America/Los_Angeles'),
});

type CreateEventInput = z.infer<typeof createEventSchema>;

  

  export default createEventSchema