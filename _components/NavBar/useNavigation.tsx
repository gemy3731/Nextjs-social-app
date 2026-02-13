import { useMemo } from "react";
import { NavigationItem } from "./types";


 const useNavigation = (userToken: string | null) => {
  const navigationItems = useMemo<NavigationItem[]>(() => {
    const publicItems: NavigationItem[] = [
      { label: "Register", href: "/register" },
      { label: "Login", href: "/login" },
    ];

    const authenticatedItems: NavigationItem[] = [
      { label: "Home", href: "/" },
      { label: "Profile", href: "/profile" },
      { label: "Logout", href: "#", action: "logout" },
    ];

    return userToken ? authenticatedItems : publicItems;
  }, [userToken]);

  return { navigationItems };
};

export default useNavigation;