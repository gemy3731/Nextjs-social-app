import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { TokenCookie } from "./cookies";

class ApiClient {
  private client: AxiosInstance;
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: false
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor - add auth token if available
    this.client.interceptors.request.use(
      (config) => {
        const token = TokenCookie.get();
        if (token) {
          // Add token header (check your API's expected header name)
          config.headers.token = token;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          const isAuthRequest = 
            error.config?.url?.includes('/signin') || 
            error.config?.url?.includes('/signup') ||
            error.config?.url?.includes('/register');
          if (!isAuthRequest && typeof window !== "undefined") {
            const isAuthPage =
              window.location.pathname === "/login" ||
              window.location.pathname === "/register";

            if (!isAuthPage) {
              TokenCookie.remove();
              window.location.href = "/login";
            }
          }
        }
        return Promise.reject(error);
      }
    );
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  public async post<T>(
    url: string,
    //eslint-disable-next-line
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  public async put<T>(
    url: string,
    //eslint-disable-next-line
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }

  public async patch<T>(
    url: string,
    //eslint-disable-next-line
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.patch<T>(url, data, config);
    return response.data;
  }
}

export const apiClient = new ApiClient(
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://linked-posts.routemisr.com"
);
