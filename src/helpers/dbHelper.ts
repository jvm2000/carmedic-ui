function getApiBaseUrl(): string {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL
  }

  return import.meta.env.DEV
    ? 'http://localhost:8000/api'
    : 'https://api.yourdomain.com/api'
}

const API_BASE_URL = getApiBaseUrl()

interface FetchOptions {
  method: string;
  data?: Record<string, any> | FormData | null;
  token?: string | null;
}

export const dbHelper = {
  async request<T = any>(endpoint: string, options: FetchOptions): Promise<T> {
    const headers: HeadersInit = {
      Accept: 'application/json',
    };

    const fetchOptions: RequestInit = {
      method: options.method,
      headers,
    };

    // Only add Content-Type for JSON (FormData sets its own)
    if (!(options.data instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    // Add token if provided
    if (options.token) {
      headers.Authorization = `Bearer ${options.token}`;
    }

    if (options.data) {
      fetchOptions.body =
        options.data instanceof FormData
          ? options.data
          : JSON.stringify(options.data);
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, fetchOptions);
      const result = await response.json();

      if (!response.ok) {
        throw { response: result }; // ✅ allows `error.response.errors` in catch
      }

      // ✅ If login succeeded, store the token
      if (endpoint === '/login' && result.token) {
        localStorage.setItem('auth_token', result.token);
      }

      return result as T;
    } catch (error: any) {
      console.error(`🚨 Fetch error: ${error.message}`);
      throw error;
    }
  },

  get<T = any>(endpoint: string, token?: string) {
    return this.request<T>(endpoint, { method: 'GET', token });
  },

  post<T = any>(endpoint: string, data?: Record<string, any> | FormData, token?: string) {
    return this.request<T>(endpoint, { method: 'POST', data, token });
  },

  put<T = any>(endpoint: string, data?: Record<string, any> | FormData, token?: string) {
    return this.request<T>(endpoint, { method: 'PUT', data, token });
  },

  delete<T = any>(endpoint: string, token?: string) {
    return this.request<T>(endpoint, { method: 'DELETE', token });
  },

  getAuthToken() {
    return localStorage.getItem('auth_token');
  }
};
