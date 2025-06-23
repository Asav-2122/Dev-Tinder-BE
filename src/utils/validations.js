const { z } = require("zod");

const userSignUpValidationSchema = z.object({
  firstName: z
    .string()
    .min(3, "First name must be at least 3 characters")
    .max(50, "First name cannot exceed 50 characters")
    .regex(/^[a-zA-Z]+$/, "First name should only contain letters"),

  lastName: z
    .string()
    .min(3, "Last name must be at least 3 characters")
    .max(50, "Last name cannot exceed 50 characters")
    .regex(/^[a-zA-Z]+$/, "Last name should only contain letters"),

  userName: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username cannot exceed 30 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),

  email: z.string().email("Invalid email address"),

  photoUrl: z.string().url("Invalid URL format").optional(),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password cannot exceed 50 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    ),

  age: z
    .number()
    .int("Age must be an integer")
    .min(18, "Minimum age is 13")
    .max(120, "Maximum age is 120"),

  gender: z.enum(["male", "female", "other"], {
    errorMap: () => ({
      message: "Gender must be 'male', 'female', or 'other'",
    }),
  }),

  skills: z.array(z.string()).max(20, "Maximum 20 skills allowed"),
});

const userSignInValidationSchema = z.object({
  email: z.string().email("Invalid email or password"),
  password: z.string().min(1, "Invalid email or password"),
});

const userEditProfileSchema = z.object({
  firstName: z
    .string()
    .min(3, "First name must be at least 3 characters")
    .max(50, "First name cannot exceed 50 characters")
    .regex(/^[a-zA-Z]+$/, "First name should only contain letters")
    .optional(),
  lastName: z
    .string()
    .min(3, "Last name must be at least 3 characters")
    .max(50, "Last name cannot exceed 50 characters")
    .regex(/^[a-zA-Z]+$/, "Last name should only contain letters")
    .optional(),
  userName: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username cannot exceed 30 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    )
    .optional(),
  skills: z.array(z.string()).max(20, "Maximum 20 skills allowed").optional(),
  photoUrl: z.string().url("Invalid URL format").optional(),
});

module.exports = {
  userSignUpValidationSchema,
  userSignInValidationSchema,
  userEditProfileSchema,
};
