import { Box, Button, Menu, MenuItem } from "@mui/material";
import { NavigationItem } from "./types";


interface NavigationMenuProps {
  items: NavigationItem[];
  onLogout: () => void;
  display?: object;
  anchorEl?: null | HTMLElement;
  onClose?: () => void;
  menuId?: string;
}

 const NavigationMenu = ({
  items,
  onLogout,
  display,
  anchorEl,
  onClose,
  menuId,
}: NavigationMenuProps) => {
  // Desktop navigation
  if (!anchorEl && display) {
    return (
      <Box sx={{ display, gap: 1 }}>
        {items.map((item) => (
          <Button
            key={item.label}
            href={item.href}
            onClick={item.action === "logout" ? onLogout : undefined}
            variant="text"
            sx={{ color: "white" }}
          >
            {item.label}
          </Button>
        ))}
      </Box>
    );
  }

  // Mobile navigation
  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClick={onClose}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            backgroundColor: "black",
          },
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          p: 1,
          backgroundColor: "black",
          color: "white",
        }}
      >
        {items.map((item) => (
          <MenuItem key={item.label} sx={{ p: 0 }}>
            <Button
              href={item.href}
              onClick={item.action === "logout" ? onLogout : undefined}
              variant="text"
              fullWidth
              sx={{
                color: "white",
                fontWeight: "600",
                justifyContent: "flex-start",
                textTransform: "none",
              }}
            >
              {item.label}
            </Button>
          </MenuItem>
        ))}
      </Box>
    </Menu>
  );
};

export default NavigationMenu;