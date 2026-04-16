import { z } from "zod"

export const editProfile = z.object({
    username: z.string({ required_error: "Name is required" })
        .min(3, "Name must be at least 3 characters")
        .max(26, "Name must be between 3-26 characters"),
    profession: z.string()
        .min(1, "Please select your profession"),
    gender: z.string().min(1, "Gender is required"),
    dob: z
        .string()
        .min(1, "Date of birth is required"),
    
    
})

export const adminDashboardUserSearch=z.object({
    searchUser:z
    .string()
    .max(100, "Search too long")
    .regex(/^[a-zA-Z0-9\s@._-]*$/, "Invalid characters") // blocks < > ' " ; --
})

export const adminDashboardAddPaymentMethod=z.object({
    PaymentMethodName:z
    .string()
    .min(3,"Minimum 3 Char")
    .max(20, "Name must be within 20 char")
    .regex(/^[a-zA-Z0-9\s@._-]*$/, "Invalid characters"),

    PaymentMethodImageLink:z
    .string()
    

})


