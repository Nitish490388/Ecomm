
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

export const productInput = z.object({
  id: z.string().optional(),
  createdAt: z.string().optional(),
  name: z.string(),
  descriptin: z.string(),
  category: z.string(),
  basePrice: z.number(),
  discount: z.number(),

})

export type ProductTypes = z.infer<typeof productInput>;

export const AddressInput = z.object({
  name: z.string(),
  phone: z.string(),
  pincode: z.string(),
  address: z.string(),
  state: z.string(),
  landmark: z.string(),
  altPhone: z.string().optional(),
});

export type AddressInputType = z.infer<typeof AddressInput>;
