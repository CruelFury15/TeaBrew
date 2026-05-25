import { z } from 'zod';

// Reusable password rule — enforces strong entropy
const strongPassword = z.string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password must be less than 128 characters')
  .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Must contain at least one special character')
  .refine((val) => !/\s/.test(val), 'Password must not contain spaces');

export const signInSchema = z.object({
  email: z.string()
    .min(1, 'Email is required')
    .max(254, 'Email is too long')
    .email('Invalid email address')
    .transform((v) => v.trim().toLowerCase()),
  password: strongPassword,
});

export const signUpSchema = z.object({
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Only letters, numbers, and underscores allowed')
    .refine((v) => !/^[_]/.test(v), 'Username cannot start with an underscore'),
  email: z.string()
    .min(1, 'Email is required')
    .max(254, 'Email is too long')
    .email('Invalid email address')
    .transform((v) => v.trim().toLowerCase()),
  phone: z.string()
    .regex(/^\+?[1-9][0-9]{9,14}$/, 'Enter a valid phone number (10–15 digits, optional +)'),
  password: strongPassword,
});

export const otpSchema = z.object({
  email: z.string()
    .min(1, 'Email is required')
    .max(254, 'Email is too long')
    .email('Invalid email address')
    .transform((v) => v.trim().toLowerCase()),
  otp: z.string()
    .length(6, 'OTP must be exactly 6 digits')
    .regex(/^[0-9]{6}$/, 'OTP must contain only digits'),
});
