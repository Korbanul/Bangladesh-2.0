// import { apiClient } from "./ApiClient";
// export async function userList() {
//     return apiClient("/admin/users",{
//         method: "GET",
//         credentials: "include",
//     })

// }
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