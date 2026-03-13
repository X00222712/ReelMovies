import { z } from 'zod';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { user } from './schema.js';


export const validateInsertUser = z.object({
    name: z.string().min(3, 'Name must be at least 4 characters').max(32, "Name is too long must be under 32 characters"),
    email: z.string().email('Must be a valid email'),
    password: z.string().min(5, 'Password must be at least 6 characters').or(str => {!str.includes('"') || !str.includes("'")}, "Can not have quotes"),
});




