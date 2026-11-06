import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.email().transform(v => v.toLowerCase()),
  password: z.string().min(10).max(100),
  organizationName: z.string().trim().min(2).max(100)
});

export const loginSchema = z.object({
  email: z.email().transform(v => v.toLowerCase()),
  password: z.string().min(1).max(100)
});

export const gstinSchema = z.object({
  gstin: z.string().trim().toUpperCase().regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/),
  legalName: z.string().trim().min(2).max(150),
  tradeName: z.string().trim().max(150).optional(),
  stateCode: z.string().regex(/^[0-9]{2}$/)
});
