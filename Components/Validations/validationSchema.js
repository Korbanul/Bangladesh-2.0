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

const ACCEPTED_IMAGE_TYPES = [ "image/jpeg", "image/png", "image/jpg","/image/svg"];
const MAX_FILE_SIZE = 5000000; 


export const adminImageUpload=z.object({
    image: z
    .custom((val) => val instanceof FileList && val.length > 0, "Please select an image.")
    .refine((val) => val[0]?.size <= MAX_FILE_SIZE, "Max image size is 5MB.")
    .refine(
        (val) => ACCEPTED_IMAGE_TYPES.includes(val[0]?.type),
        "Only .jpg, .jpeg, .png and .svg formats are supported."
    )
    
});


