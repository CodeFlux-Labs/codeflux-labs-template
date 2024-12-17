import { z } from "zod";

export const userSchema = z.object({
    name: z.string().min(2, "Name must have at least 2 characters"),
    email: z.string().email("Invalid email"),
});
