import {
  AppBar,
  Box,
  Toolbar,
  InputBase,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  FacebookOutlined,
  GroupOutlined,
  Groups2Outlined,
  Home,
  Notifications,
  OndemandVideo,
  SearchOutlined,
  Storefront,
  WidgetsOutlined,
} from "@mui/icons-material";
import polar from "../Img/polar.webp";
import { signOut } from "firebase/auth";
import { StyledToolbar } from "../theme";
import { auth } from "../firebase";
import { AuthContext } from "./context/AuthContext";

const Search = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  position: "relative",
  backgroundColor: "white",
  padding: "0 40px 0 40px",
  margin: "0 10px",
  borderRadius: "30px",
  width: "100%",
  height: "35px",
}));
const Icons = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "20px",
  alignItems: "center",
}));
const IconsFb = styled(Box)(({ theme }) => ({
  display: "none",
  gap: "30px",
  alignItems: "center",
  justifyContent: "space-evenly",
  margin: "0 50px",
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: "#2b2a2a",
        borderBottom: "2px solid gray",
        maxHeight: "100vh",
      }}
    >
      <StyledToolbar>
        <StyledToolbar>
          <FacebookOutlined sx={{ fontSize: "40px", color: "blue" }} />

          <Search>
            <SearchOutlined
              sx={{
                position: "absolute",
                color: "#3e3e3e",
                opacity: "0.7",
                top: "50%",
                transform: "translateY(-50%)",
                left: "10px",
              }}
            />
            <InputBase placeholder="Szukaj na Facebooku" />
          </Search>
        </StyledToolbar>

        <IconsFb>
          <Home sx={{ width: 35, height: 35 }} />
          <GroupOutlined sx={{ width: 35, height: 35 }} />
          <OndemandVideo sx={{ width: 35, height: 35 }} />
          <Storefront sx={{ width: 35, height: 35 }} />
          <Groups2Outlined sx={{ width: 35, height: 35 }} />
        </IconsFb>

        <Icons>
          <WidgetsOutlined sx={{ width: 35, height: 35 }} />

          <Badge badgeContent={4} color="error">
            <Notifications sx={{ width: 35, height: 35 }} />
          </Badge>
          <Typography sx={{ color: "White" }}>
            {currentUser.displayName}
          </Typography>
          <Avatar
            onClick={(e) => setOpen(true)}
            src={currentUser.photoURL}
            sx={{ width: 35, height: 35, cursor: "pointer" }}
          />
        </Icons>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem onClick={() => signOut(auth)}>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
