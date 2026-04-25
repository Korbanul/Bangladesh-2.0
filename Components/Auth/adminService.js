import { apiClient } from "./ApiClient";

//  Pass all query params
export async function userList({ page = 0, size = 10, search = "", sortBy = "id", sortDir = "asc", role = "" } = {}) {
    const params = new URLSearchParams();
    params.append("page", page);
    params.append("size", size);
    params.append("sortBy", sortBy);
    params.append("sortDir", sortDir);
    if (search) params.append("search", search);
    if (role) params.append("role", role);

    return apiClient(`/admin/users?${params.toString()}`, {
        method: "GET",
        credentials: "include",
    });
}

export async function deleteUser(id) {
    return apiClient(`/admin/deleteuser/${id}`, {
        method: "DELETE",
        credentials: "include"
        
    })
}
export async function addPaymentMethod(params) {
    return apiClient("/admin/add-payment-method/",{
        method:"PUT",
        credentials:"include",
        body:JSON.stringify(params)

    })
}
export async function getPaymentMethodList() {
    return apiClient("/donate/payment-method/",{
        method:"GET",
        credentials:"include",
    })
}
export async function getDonationList() {
    return apiClient("/admin/donation-list/",{
        method:"GET",
        credentials:"include",
    })
}
export async function uploadImage(file) {
    const formData = new FormData();
    formData.append("file", file);
    return apiClient("/admin/upload-image",{
        method:"POST",
        credentials:"include",
        body:formData
    })
}
export async function getAllImage() {
    
    return apiClient("/admin/all-images",{
        method:"GET",
        credentials:"include",
    })
}
export async function getCountImage() {
    
    return apiClient("/user/total-image",{
        method:"GET",
        credentials:"include",
    })
}
export async function getCountImageAdmin() {
    
    return apiClient("/admin/total-image",{
        method:"GET",
        credentials:"include",
    })
}
export async function getTotalDoantionAdmin() {
    
    return apiClient("/admin/total-donation",{
        method:"GET",
        credentials:"include",
    })
}
export async function getTotalDoantionUser() {
    
    return apiClient("/user/total-donation",{
        method:"GET",
        credentials:"include",
    })
}
export async function CreateNews(params) {
    const formData= new FormData();
    formData.append("title",params.title)
    formData.append("description",params.description)
    formData.append("image",params.image[0])
    return apiClient("/admin/add-news",{
        method:"POST",
        credentials:"include",
        body:formData
    })
}

export async function getAllNews(){
    return apiClient("/admin/all-news",{
        method:"GET",
        credentials:"include"
    })
}
