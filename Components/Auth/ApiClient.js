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
    const responseData = await response.json();

    if (!response.ok) {
        throw responseData;  // ← throw the plain object {statusCode, error, errorMessage, timeStamp}
    }
    return responseData;

}