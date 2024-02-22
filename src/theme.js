import { Button, ListItemText, createTheme } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { Toolbar, Typography, Box } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#3b3939",
    },
    secondary: {
      main: "#757575",
    },
    otherColor: {
      main: "#999",
    },
  },
});

export const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

export const TypographyTitle = styled(Typography)({
  color: "White",
  component: "span",
  variant: "body2",
  // whiteSpace: "nowrap",
  // overflow: "hidden",
  // textOverflow: "ellipsis",
});

export const TypographyMain = styled(Typography)({
  color: theme.palette.secondary.main,
  component: "span",
  variant: "body2",
  lineHeight: "24px",
  whiteSpace: "nowrap",
  maxWidth: "250px",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const ChatIcons = styled(Box)(({ theme }) => ({
  gap: "8px",
  alignItems: "center",
  justifyContent: "space-evenly",
  display: "flex",
}));

export const ChatText = styled(ListItemText)({
  color: "#f1f1f1",
  borderRadius: "0px 0 10px 10px",
});
export const BoxAvatar = styled(Button)({
  display: "flex",
  borderRadius: "10px ",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
});
