import { z } from "zod";

export const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  location: z.string().min(3),
  phoneNumber: z.string().min(10),
});

export const BookSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  categoryId: z.string().uuid(),
  quantity: z.number().int().positive(),
  price: z.number().positive(),
});

export const CategorySchema = z.object({
  name: z.string().min(1),
});

export const RentalSchema = z.object({
  bookId: z.string().uuid(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
});

export const WalletSchema = z.object({
  amount: z.number().positive(),
});
