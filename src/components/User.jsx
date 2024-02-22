import { Avatar, Box, IconButton, ListItemText } from "@mui/material";

import {
  ChatIcons,
  StyledToolbar,
  TypographyMain,
  TypographyTitle,
  BoxAvatar,
} from "../theme";
import polar from "../Img/polar.webp";
import { Call, Info, Videocam } from "@mui/icons-material";
import { useContext } from "react";
import { ChatContext } from "./context/ChatContext";

const User = () => {
  const { data } = useContext(ChatContext);
  return (
    <Box sx={{ height: "78.3vh" }}>
      <StyledToolbar sx={{ borderBottom: "2px solid #303130" }}>
        <BoxAvatar>
          <Avatar
            src={data.photoURL}
            sx={{
              width: 40,
              height: 40,
            }}
          />
          <ListItemText
            sx={{ paddingLeft: "5px" }}
            primary={
              <TypographyTitle
                sx={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  display: "flex",
                }}
              >
                {data.user?.displayName}
              </TypographyTitle>
            }
            secondary={
              <TypographyMain
                sx={{
                  fontSize: "11px",
                  fontWeight: "600",
                  lineHeight: "13px",
                }}
              >
                {data.chatId.date}
              </TypographyMain>
            }
          />
        </BoxAvatar>
        <ChatIcons>
          <IconButton sx={{ width: 40, height: 40 }} aria-label="Call">
            <Call sx={{ fontSize: 30, color: "blue" }} />
          </IconButton>
          <IconButton sx={{ width: 40, height: 40 }} aria-label="videocam">
            <Videocam sx={{ fontSize: 30, color: "blue" }} />
          </IconButton>
          <IconButton sx={{ width: 40, height: 40 }} aria-label="info">
            <Info sx={{ fontSize: 30, color: "blue" }} />
          </IconButton>
        </ChatIcons>
      </StyledToolbar>
    </Box>
  );
};

export default User;
