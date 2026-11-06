import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Please enter your name (at least 2 characters).' })
    .max(80, { message: 'Name must be 80 characters or fewer.' }),
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email address is required.' })
    .email({ message: 'Please provide a valid email address (e.g., name@company.com).' }),
  subject: z
    .string()
    .trim()
    .max(120, { message: 'Subject must be 120 characters or fewer.' })
    .optional(),
  message: z
    .string()
    .trim()
    .min(10, { message: 'Please write a message with at least 10 characters.' })
    .max(2000, { message: 'Message is too long (maximum 2,000 characters).' }),
});

export const contactResolver = zodResolver(contactSchema);
