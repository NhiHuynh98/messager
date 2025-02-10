// const API_BASE_URL = "https://jsonplaceholder.typicode.com";
''
const API_BASE_URL = "http://localhost:5000";

interface ApiResponse<T> {
  data: T;
}

const apiService = {
  request: async <T>(method: string, endpoint: string, data?: any): Promise<T> => {
    const url = `${API_BASE_URL}${endpoint}`;
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json() as Promise<T>;
    } catch (error) {
      console.error(`${method} request error:`, error);
      throw error;
    }
  },

  get: <T>(endpoint: string) => apiService.request<T>("GET", endpoint),
  post: <T>(endpoint: string, data: any) => apiService.request<T>("POST", endpoint, data),
  put: <T>(endpoint: string, data: any) => apiService.request<T>("PUT", endpoint, data),
  patch: <T>(endpoint: string, data: any) => apiService.request<T>("PATCH", endpoint, data),
  delete: <T>(endpoint: string) => apiService.request<T>("DELETE", endpoint),
};

export default apiService;
