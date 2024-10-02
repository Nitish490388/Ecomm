
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
  name: z.string().min(1, { message: "Name is required" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(10, { message: "Phone number must not exceed 10 digits" })
    .regex(/^[0-9]+$/, { message: "Phone number must contain only digits" }),
  locality: z.string().min(1, { message: "Locality is required" }),
  district: z.string().min(1, { message: "District is required" }),
  pincode: z
    .string()
    .length(6, { message: "Pincode must be exactly 6 digits" })
    .regex(/^[0-9]+$/, { message: "Pincode must contain only digits" }),
  address: z.string().min(1, { message: "Address is required" }),
  state: z.string().min(1, { message: "State is required" }),
  landmark: z.string().min(1, { message: "Landmark is required" }),
  altPhone: z
    .string()
    .optional()
});

export type AddressInputType = z.infer<typeof AddressInput>;
