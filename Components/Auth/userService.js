import { meta } from "zod/v4/core";
import { apiClient } from "./ApiClient";

export async function userProfile() {
    return apiClient("/user/profile", {
        method: "GET"
    });
}
export async function updateProfile(data) {
    return apiClient("/user/profile/updateprofile", {
        method: "PATCH",
        credentials: "include",
        body: JSON.stringify(data)
    })

}
export async function getAllActivePaymentMethod() {
    return apiClient("/donate/active-payment-method", {
        method: "GET",
        credentials: "include",

    })

}

export async function guestDonate(params) {
    return apiClient("/donate/guest/",{
    method:"POST",
    credentials: "include",
    body:JSON.stringify(params)
    })
}
export async function userDonate(params) {
    return apiClient("/donate/user/",{
    method:"POST",
    credentials: "include",
    body:JSON.stringify(params)
    })
}
export async function userDonationHistoryList() {
    return apiClient("/user/donation-list/",{
    method:"GET",
    credentials: "include",
    })
}

export async function getAllNewsUser(){
    return apiClient("/admin/all-news",{
        method:"GET",
        credentials:"include"
    })
}
export async function getRecentThreeNews(){
    return apiClient("/home/recent-news",{
        method:"GET",
        credentials:"include"
    })
}
export async function getTotalNewsCount(){
    return apiClient("/home/total-news",{
        method:"GET",
        credentials:"include"
    })
}