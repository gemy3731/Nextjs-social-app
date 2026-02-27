/**
 * Authentication Types
 * Single Responsibility: Define authentication-related types
 */

export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface RegisterCredentials extends LoginCredentials {
    name: string;
    dateOfBirth: string;
    gender: string;
    rePassword: string;
  }
  
  export interface AuthResponse {
    token: string;
    user?: User;
  }
  
  export interface ApiError {
    error: string;
    message?: string;
    statusCode?: number;
  }

  export interface User{
    id: string;
    email: string;
    name: string;
  }
  
  export enum AuthErrorType {
    INVALID_CREDENTIALS = "Invalid credentials",
    USER_EXISTS = "User already exists",
    NETWORK_ERROR = "Network error",
    VALIDATION_ERROR = "Validation error",
    UNKNOWN_ERROR = "An error occurred",
  }