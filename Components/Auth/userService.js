import { meta } from "zod/v4/core";
import { apiClient } from "./ApiClient";

export async function userProfile() {
    return apiClient("/user/profile", {
        method: "GET"
    });
}
export async function updateProfile(data) {
    return apiClient("/user/profile/updateprofile",{
        method:"PATCH",
        credentials: "include",
        body:JSON.stringify(data) 
    })
    
}