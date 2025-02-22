import { z } from "zod";

export const loginZodValidation = z.object({
    phone: z
        .string({ required_error: "Phone is required" }),
    password: z
        .string({ required_error: "Password is required" })
        .min(8, "Password must be at least 8 characters"),
});