

import { authRepository } from "@/repositories/Authrepository";
import {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
  User,
} from "@/types/auth.types";


export class AuthService {

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await authRepository.login(credentials);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    try {
      const response = await authRepository.register(credentials);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await authRepository.logout();
    } catch (error) {
      throw error;
    }
  }

  async isAuthenticated(): Promise<User | null> {
    try{
      const user = await authRepository.getCurrentUser();
      return user;
    }catch(error){
      console.error("Error checking authentication status:", error);
      return null;
    }
  }

}

export const authService = new AuthService();