import { apiClient } from "./ApiClient";

export async function userProfile() {
    return apiClient("/user/profile", {
        method: "GET"
    });
}