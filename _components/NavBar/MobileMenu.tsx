import { Box, Button, Menu, MenuItem } from "@mui/material"


interface ExpandMoreProps {
    mobileMenuId: string;
    handleLogOut:()=>void;
    isMobileMenuOpen: boolean;
    userToken: string|null;
    mobileMoreAnchorEl:null | HTMLElement;
    handleMobileMenuClose:()=>void
}
const MobileMenu = (prop:ExpandMoreProps) => {
  return (
    <Menu
      anchorEl={prop.mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={prop.mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={prop.isMobileMenuOpen}
      onClose={prop.handleMobileMenuClose}
    >
      <MenuItem>
        {!prop.userToken && (
          <Button
            href="/register"
            variant="text"
            sx={{ color: "black", fontWeight: "600" }}
          >
            Register
          </Button>
        )}
      </MenuItem>
      <MenuItem>
        {prop.userToken ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Button
              href="/"
              variant="text"
              sx={{ color: "black", fontWeight: "600" }}
            >
              Home
            </Button>
            <Button
              href="/profile"
              variant="text"
              sx={{ color: "black", fontWeight: "600" }}
            >
              Profile
            </Button>
            <Button
              onClick={prop.handleLogOut}
              variant="text"
              sx={{ color: "black", fontWeight: "600" }}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Button
            href="/login"
            variant="text"
            sx={{ color: "black", fontWeight: "600" }}
          >
            Login
          </Button>
        )}
      </MenuItem>
    </Menu>
  )
}

export default MobileMenu