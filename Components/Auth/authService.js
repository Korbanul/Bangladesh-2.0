import { apiClient } from "./ApiClient";

export async function signUpUser(data){
    return apiClient("/auth/signUp",{
        method:"POST",
        body:JSON.stringify(data) //convert object into a JSON string
    });
}