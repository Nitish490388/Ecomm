import z from "zod";

export const signupInput = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
});

export const signinInput = z.object({
  email: z.string(),
  password: z.string()
});

export const addProduct = z.object({
  title: z.string(),
  description: z.string(),
  category: z.string(),
  baseprice: z.number(),
  discount: z.number().optional(),
  stock: z.number(),
  images: z.array(z.string()),
});

export type AddProductInputTypes = z.infer<typeof addProduct>;
