import { apiClient } from "./ApiClient";

export async function signUpUser(data){
    return apiClient("/auth/signup",{
        method:"POST",
        body:JSON.stringify(data) //convert object into a JSON string
    });
}
export async function LoginUser(data){
    return apiClient("/auth/login",{
        method:"POST",
        credentials: "include", //This line set the cookie 
        body:JSON.stringify(data) 
    });
}
export async function LogoutUser(){
    return apiClient("/auth/logout",{
        method:"POST",
        credentials: "include", //This line set the cookie 
        
    });

}