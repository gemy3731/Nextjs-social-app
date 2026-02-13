"use client";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreIcon from "@mui/icons-material/MoreVert";
import Image from "next/image";
import LPLogo from "@/public/images/lp-logo.png";
import { useDispatch, useSelector } from "react-redux";
import { store } from "@/lib/Redux/Store";
import { clearUserToken } from "@/lib/Redux/tokenSlice/TokenSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import NavigationMenu  from "./NavigationMenu";
import useNavigation from "./useNavigation";

export default function NavBar() {
  const { userToken } = useSelector(
    (reduxStore: ReturnType<typeof store.getState>) =>
      reduxStore.userTokenReducer
  );
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const { navigationItems } = useNavigation(userToken);

  const handleLogOut = () => {
    dispatch(clearUserToken());
    router.push("/login");
  };

  const handleMobileMenuToggle = (event?: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event?.currentTarget ?? null);
  };
  const handleCloseMobileMenu = () => {
    setMobileMenuAnchor(null);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 900 && mobileMenuAnchor) {
        setMobileMenuAnchor(null);
      }
    };
  
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuAnchor]);

  return (
    <Box sx={{ flexGrow: 1, zIndex: "10" }}>
      <AppBar position="fixed" sx={{ backgroundColor: "#252728", px: 4 }}>
        <Toolbar>
          <Link href="/">
            <Typography
              noWrap
              component="div"
              sx={{ display: { borderRadius: "50%", overflow: "hidden" } }}
            >
              <Image src={LPLogo || null} alt="LPLogo" width={40} height={40} />
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          
          {/* Desktop Navigation */}
          <NavigationMenu
            items={navigationItems}
            onLogout={handleLogOut}
            display={{ xs: "none", md: "flex" }}
          />
          
          {/* Mobile Menu Icon */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls="mobile-navigation-menu"
              aria-haspopup="true"
              onClick={handleMobileMenuToggle}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      
      {/* Mobile Navigation Menu */}
      <NavigationMenu
        items={navigationItems}
        onLogout={handleLogOut}
        anchorEl={mobileMenuAnchor}
        onClose={handleCloseMobileMenu}
        menuId="mobile-navigation-menu"
      />
    </Box>
  );
}