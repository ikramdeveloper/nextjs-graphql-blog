import { object, string, TypeOf, z } from "zod";

const registerSchema = object({
  name: string().min(1, "Full name is required").max(100),
  email: string().min(1, "Email is required").email("Invalid email"),
  photo: string({ required_error: "Photo is required" }),
  password: string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(30, "Password should be less than 30 characters"),
  passwordConfirm: string().min(1, "Confirm password is required"),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ["passwordConfirm"],
  message: "Passwords do not match",
});

const loginSchema = object({
  email: string().min(1, "Email is required").email("Invalid email"),
  password: string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(30, "Password should be less than 30 characters"),
});

const updateUserSchema = object({
  email: z.optional(string().email("Invalid email")),
  name: z.optional(string()),
  photo: z.optional(string()),
});

export type RegisterInput = TypeOf<typeof registerSchema>;
export type LoginInput = TypeOf<typeof loginSchema>;
export type UpdateUserInput = TypeOf<typeof updateUserSchema>;

export { registerSchema, loginSchema, updateUserSchema };
