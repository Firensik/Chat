import {
  AppBar,
  Avatar,
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  Fab,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Toolbar,
  Typography,
  alpha,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  ChatIcons,
  theme,
  StyledToolbar,
  TypographyMain,
  TypographyTitle,
  ChatText,
} from "../theme";
import polar from "../Img/polar.webp";
import {
  Call,
  Info,
  Videocam,
  Send,
  AddPhotoAlternate,
  AttachFile,
} from "@mui/icons-material";
import User from "./User";

import Message from "./Message";

const BoxFeed = styled(Box)({
  position: "sticky",
  backgroundColor: "#2b2a2a",
  borderLeft: "2px solid gray",
  flex: 7,
  p: 2,
  marginLeft: "0 !important",
});

const Feed = () => {
  return (
    <BoxFeed>
      <User />

      <Message />
    </BoxFeed>
  );
};

export default Feed;
