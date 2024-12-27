import { z } from 'zod';

export const TaskSchema = z.object({
  title: z.string().max(50).min(1),
  description: z.string(),
  important: z.boolean().optional(),
  status: z.enum(['pending', 'in-progress', 'completed']),
});

export type TaskFormValuesTypes = z.infer<typeof TaskSchema>;
