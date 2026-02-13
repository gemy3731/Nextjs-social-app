export interface NavigationItem {
    label: string;
    href: string;
    action?: "logout" | "custom";
  }
  
  export interface MenuProps {
    anchorEl: null | HTMLElement;
    onClose: () => void;
    isOpen: boolean;
    menuId: string;
  }