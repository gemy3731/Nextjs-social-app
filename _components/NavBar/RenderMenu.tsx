import { MenuItem,Menu } from "@mui/material"

interface ExpandMoreProps {
  anchorEl: null | HTMLElement;
  handleMenuClose:()=>void;
  isMenuOpen: boolean;
  menuId:string;
}
export const RenderMenu = (props:ExpandMoreProps) => {
  return (
    <Menu
      anchorEl={props.anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={props.menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={props.isMenuOpen}
      onClose={props.handleMenuClose}
    >
      <MenuItem onClick={props.handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={props.handleMenuClose}>My account</MenuItem>
    </Menu>
  )
}
