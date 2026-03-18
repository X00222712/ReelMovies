import { z } from 'zod';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { user } from './schema.js';


// User sign up
export const validateUser = z.object({
    name: z.string().nonempty("Username cannot be null").min(3, 'Username must be at least 4 characters').max(32, "Name is too long must be under 32 characters"),
    email: z.string().nonempty("Email Cannot be null").email('Must be a valid email'),
    password: z.string().nonempty("Password Cannot be null").min(5, 'Password must be at least 6 characters').max(64, "Name is too long must be under 64 characters"),
});

// User sign in
export const validateUserLogin = z.object({
    email: z.string().nonempty("Email Cannot be null").email('Must be a valid email'),
    password: z.string().nonempty("Password Cannot be null").min(5, 'Password must be at least 6 characters').max(64, "Name is too long must be under 64 characters"),
});

export const validateUserPassword = z.object({
    password: z.string().nonempty("Password Cannot be null").min(5, 'Password must be at least 6 characters').max(64, "Name is too long must be under 64 characters"),
})
export const validateUserName = z.object({
    name: z.string().nonempty("Username cannot be null").min(3, 'Username must be at least 4 characters').max(32, "Name is too long must be under 32 characters"),
})

// ID check
export const idSchema = z.object({
    id: z.number().int().positive()
});