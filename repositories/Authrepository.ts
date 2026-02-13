import { AuthResponse, LoginCredentials, RegisterCredentials } from "@/types/auth.types";
import { apiClient } from "@/utils/apiClient";



export class AuthRepository {
  private readonly basePath = "/users";

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>(
        `${this.basePath}/signin`,
        credentials
      );
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }


  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>(
        `${this.basePath}/signup`,
        credentials
      );
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }


  async logout(): Promise<void> {
    try {

      return;
    } catch (error) {
      throw this.handleError(error);
    }
  }

//eslint-disable-next-line
  async getCurrentUser(): Promise<any> {
    try {
      const response = await apiClient.get(`${this.basePath}/profile`);
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

//eslint-disable-next-line
  private handleError(error:any): Error {
    if (error.response) {

      const message = error.response.data?.error || error.response.data?.message || "An error occurred";
      const err = new Error(message);
      //eslint-disable-next-line
      (err as any).statusCode = error.response.status;
      return err;
    } else if (error.request) {
      return new Error("Network error. Please check your connection.");
    } else {
      return new Error(error.message || "An unexpected error occurred");
    }
  }
}

export const authRepository = new AuthRepository();