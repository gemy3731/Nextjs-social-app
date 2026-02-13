
import { authRepository } from "@/repositories/Authrepository";
import { TokenCookie } from "../utils/cookies";
import {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
} from "@/types/auth.types";


export class AuthService {

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await authRepository.login(credentials);
      
      if (response.token) {
        TokenCookie.set(response.token, 7);
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  }

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    try {
      const response = await authRepository.register(credentials);
      
      if (response.token) {
        TokenCookie.set(response.token, 7);
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await authRepository.logout();
      TokenCookie.remove();
    } catch (error) {
      TokenCookie.remove();
      throw error;
    }
  }

  isAuthenticated(): boolean {
    return TokenCookie.exists();
  }

  getToken(): string | null {
    return TokenCookie.get();
  }
//eslint-disable-next-line
  async getCurrentUser(): Promise<any> {
    try {
      if (!this.isAuthenticated()) {
        throw new Error("User not authenticated");
      }
      
      return await authRepository.getCurrentUser();
    } catch (error) {
      throw error;
    }
  }
}

export const authService = new AuthService();