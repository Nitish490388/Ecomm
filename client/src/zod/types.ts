import z from "zod";

export const signupInput = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    ),
});

export const signinInput = z.object({
  email: z.string(),
  password: z.string(),
});

export const productInput = z.object({
  id: z.string().optional(),
  createdAt: z.string().optional(),
  name: z.string(),
  descriptin: z.string(),
  category: z.string(),
  basePrice: z.number(),
  discount: z.number(),
});

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
  altPhone: z.string().optional(),
});

// Define the schema for User
const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  password: z.string(),
  name: z.string(),
  role: z.enum(["USER", "ADMIN"]), // If roles are fixed, it's better to use an enum
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// Define the schema for Product
const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  basePrice: z.string(),
  discountPercentage: z.number(),
  stock: z.number(),
  description: z.string(),
  createdAt: z.string().datetime(),
  categoryName: z.string(),
});

// Define the schema for Address
const addressSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  phone: z.string(),
  address: z.string(),
  district: z.string(),
  state: z.string(),
  landmark: z.string().optional(), // optional field
  altPhone: z.string().optional(), // optional field
  status: z.enum(["PENDING", "COMPLETED", "CANCELLED"]), // Example status
});

// Define the schema for Order
const orderSchema = z.object({
  id: z.string(),
  userId: z.string(),
  productId: z.string(),
  quantity: z.number().min(1), // minimum quantity is 1
  totalPrice: z.string(),
  purchasedAt: z.string().datetime(),
  addressId: z.string(),
  user: z.object({
    id: z.string(),
    email: z.string().email(),
    password: z.string(),
    name: z.string(),
    role: z.enum(["USER", "ADMIN"]), // If roles are fixed, it's better to use an enum
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  }), // Nested schema
  product: z.object({
    id: z.string(),
    name: z.string(),
    basePrice: z.string(),
    discountPercentage: z.number(),
    stock: z.number(),
    description: z.string(),
    createdAt: z.string().datetime(),
    categoryName: z.string(),
  }), // Nested schema
  address: z.object({
    id: z.string(),
    userId: z.string(),
    name: z.string(),
    phone: z.string(),
    address: z.string(),
    district: z.string(),
    state: z.string(),
    landmark: z.string().optional(), // optional field
    altPhone: z.string().optional(), // optional field
    status: z.enum(["PENDING", "COMPLETED", "CANCELLED"]), // Example status
  }), // Nested schema
});

export type AddressInputType = z.infer<typeof AddressInput>;
export type orderType = z.infer<typeof orderSchema>;
