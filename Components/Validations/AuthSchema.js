import { z } from "zod";
export const signUpSchema = z.object({

    username: z.string({ required_error: "Name is required" })
        .min(3, "Name must be at least 3 characters")
        .max(26, "Name must be between 3-26 characters"),
    profession: z.string()
        .min(1, "Please select your profession"),
    gender: z.string().min(1, "Gender is required"),
    dob: z
        .string()
        .min(1, "Date of birth is required"),
    email: z.string().email("Invalid Format"),
    password: z.string().min(6, "Minimum length is 6 charecter")

});

export const loginSchema = z.object({
    username: z.string().min(3, "Username required"),
    password: z.string().min(6, "Password must be at least 6 characters")
});