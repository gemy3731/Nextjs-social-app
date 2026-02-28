import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { LoginCredentials, RegisterCredentials } from "@/types/auth.types";
import { authService } from "@/services/Authservice";
import { AuthState, clearUser } from "@/lib/Redux/userSlice/userSlice";


export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: { userReducer: AuthState }) => state.userReducer);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await authService.login(credentials);
        
        router.push("/");
        
        return response;
        //eslint-disable-next-line
      } catch (err: any) {
        const errorMessage = err.message || "Login failed";
        setError(errorMessage);
        
        setTimeout(() => setError(null), 5000);
        
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [ router]
  );

  const register = useCallback(
    async (credentials: RegisterCredentials) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await authService.register(credentials);
        
        
        router.push("/");
        
        return response;
        //eslint-disable-next-line
      } catch (err: any) {
        const errorMessage = err.message || "Registration failed";
        setError(errorMessage);
        
        setTimeout(() => setError(null), 5000);
        
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [ router]
  );

  const logout = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      await authService.logout();
      
      dispatch(clearUser());
      
      router.push("/login");
      //eslint-disable-next-line
    } catch (err: any) {
      const errorMessage = err.message || "Logout failed";
      setError(errorMessage);
      
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, router]);

  const isAuthenticated = Boolean(user.user);


  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isLoading,
    error,
    login,
    register,
    logout,
    isAuthenticated,
    clearError,
  };
};