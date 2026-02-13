

export interface CookieOptions {
    expires?: number;
    path?: string;
    domain?: string;
    secure?: boolean;
    sameSite?: "strict" | "lax" | "none";
  }
  
  export class CookieService {

    static set(name: string, value: string, options: CookieOptions = {}): void {
      if (typeof window === "undefined") return;
  
      const {
        expires = 7,
        path = "/",
        secure = true,
        sameSite = "lax",
      } = options;
  
      let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
  
      if (expires) {
        const date = new Date();
        date.setTime(date.getTime() + expires * 24 * 60 * 60 * 1000);
        cookieString += `; expires=${date.toUTCString()}`;
      }
  
      cookieString += `; path=${path}`;
  
      if (secure) {
        cookieString += "; secure";
      }
  
      cookieString += `; SameSite=${sameSite}`;
  
      document.cookie = cookieString;
    }
  
    static get(name: string): string | null {
      if (typeof window === "undefined") return null;
  
      const nameEQ = encodeURIComponent(name) + "=";
      const cookies = document.cookie.split(";");
  
      for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.indexOf(nameEQ) === 0) {
          return decodeURIComponent(cookie.substring(nameEQ.length));
        }
      }
  
      return null;
    }
  
    static remove(name: string, path: string = "/"): void {
      if (typeof window === "undefined") return;
  
      document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}`;
    }
  
    static exists(name: string): boolean {
      return this.get(name) !== null;
    }
  }
  
  // Token-specific helpers
  export const TokenCookie = {
    TOKEN_KEY: "auth_token",
  
    set: (token: string, days: number = 7) => {
      CookieService.set(TokenCookie.TOKEN_KEY, token, {
        expires: days,
        secure: process.env.NEXT_PUBLIC_NODE_ENV === "production",
        sameSite: "lax",
      });
    },
  
    get: (): string | null => {
      return CookieService.get(TokenCookie.TOKEN_KEY);
    },
  
    remove: () => {
      CookieService.remove(TokenCookie.TOKEN_KEY);
    },
  
    exists: (): boolean => {
      return CookieService.exists(TokenCookie.TOKEN_KEY);
    },
  };