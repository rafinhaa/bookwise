import { z } from "zod";

export const rateBodySchema = z.object({
  description: z.string().max(450),
  rate: z.number().min(1).max(5),
});

export const userIdSchema = z.object({
  userId: z.string().uuid(),
});

export const bookIdSchema = z.object({
  bookId: z.string().uuid(),
});

export const booksExploreSchema = z.object({
  category: z
    .string()
    .nullable()
    .optional()
    .transform((category) => {
      if (category === "null") return null;
      return category;
    }),
  name: z
    .string()
    .optional()
    .nullable()
    .transform((name) => {
      if (name && name !== "null") return `%${name}%`;
      return null;
    }),
});
