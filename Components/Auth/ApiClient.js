const API_BASE_URL = "/api";
export async function apiClient(endpoint, options = {}) {
    const isFormData = options.body instanceof FormData;
    const response = await fetch(`${API_BASE_URL}${endpoint}`,
        {
            ...options,                         
            headers: {                           
                ...(isFormData ? {} : { "Content-Type": "application/json" }),
                ...options.headers          
            }
        }
    );
    // First convert response into text than json. else emptyString.json throw error.
    const text = await response.text();
    const responseData = text ? JSON.parse(text) : {};

    if (!response.ok) {
        throw responseData;  // ← throw the plain object {statusCode, error, errorMessage, timeStamp}
    }
    return responseData;

}