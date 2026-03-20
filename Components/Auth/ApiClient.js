const API_BASE_URL = "/api";
// const API_BASE_URL = "http://localhost:8080";
export async function apiClient(endpoint,options={}) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`,
        {
            headers:{
                "Content-Type": "application/json",
            },
            ...options
        }
    );
    if(!response.ok){
        throw new Error("API request failed");
    }

    return response.json();

}