import z from "zod";

export const signUpSchema=z.object({
    username: z.string({ required_error: "Name is required" }) // Add this!
           .min(3, "Name must be at least 3 characters")
           .max(26, "Name must be between 3-26 characters"),
    email:z.string().email("Invalid Format"),
    password:z.string().min(6,"Minimum length is 6 charecter")

});