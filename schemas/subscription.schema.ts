import { z } from "zod";

export const subscriptionSchema = z.object({
    name: z
    .string()
    .min(2, "Subscription namme must be at least two characters"),
    price: z
    .coerce.number(),
    currency: z
    .enum(["USD", "NGN", "EUR", "GBP"]),
    frequency: z
    .enum(["daily", "weekly", "monthly", "yearly"]),
    category: z
    .enum(["Entertainment", "News", "Lifestyle", "Technology", "Finance", "Politics", "Others"]),
    paymentMethod: z
    .string(),
    startDate: z
    .coerce.date()
})