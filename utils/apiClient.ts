import axios, { AxiosInstance, AxiosRequestConfig } from "axios";


class ApiClient {
  private client: AxiosInstance;
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      withCredentials: true
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          const isAuthRequest = 
            error.config?.url?.includes('/login') || 
            error.config?.url?.includes('/register');
          if (!isAuthRequest && typeof window !== "undefined") {
            const isAuthPage =
              window.location.pathname === "/login" ||
              window.location.pathname === "/register";

            if (!isAuthPage) {
              window.location.href = "/login";
            }
          }
        }
        return Promise.reject(error);
      }
    );
  }
  private async getServerHeaders(): Promise<Record<string, string>> {
    if (typeof window !== "undefined") return {};

    try {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      const cookieHeader = cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join("; ");

      return cookieHeader ? { Cookie: cookieHeader } : {};
    } catch {
      return {};
    }
  }

  private resolveContentType(data: unknown): Record<string, string> {
    if (data instanceof FormData) return {};
    return { "Content-Type": "application/json" };
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const serverHeaders = await this.getServerHeaders();
    const response = await this.client.get<T>(url, {
      ...config,
      headers: { ...config?.headers, ...serverHeaders },
    });
    return response.data;
  }

  public async post<T>(
    url: string,
    //eslint-disable-next-line
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {

    const serverHeaders = await this.getServerHeaders();
    const response = await this.client.post<T>(url, data, {
      ...config,
      headers: {
        ...this.resolveContentType(data),
        ...config?.headers,
        ...serverHeaders
         },
    });
    return response.data;
  }

  public async put<T>(
    url: string,
    //eslint-disable-next-line
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const serverHeaders = await this.getServerHeaders();
    const response = await this.client.put<T>(url, data, {
      ...config,
      headers: { ...this.resolveContentType(data),...config?.headers, ...serverHeaders },
    });
    return response.data;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const serverHeaders = await this.getServerHeaders();
    const response = await this.client.delete<T>(url, {
      ...config,
      headers: { ...config?.headers, ...serverHeaders, },
    });
    return response.data;
  }

  public async patch<T>(
    url: string,
    //eslint-disable-next-line
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const serverHeaders = await this.getServerHeaders();
    const response = await this.client.patch<T>(url, data, {
      ...config,
      headers: { ...this.resolveContentType(data),...config?.headers, ...serverHeaders },
    });
    return response.data;
  }
}

export const apiClient = new ApiClient(
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000"
);
