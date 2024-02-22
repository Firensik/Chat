import { onSnapshot, doc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import { db } from "../firebase";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { TypographyMain, TypographyTitle, theme } from "../theme";
import { ChatContext } from "./context/ChatContext";

const AvatarSidebar = styled(Avatar)(({ theme }) => ({
  display: "flex ",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "60px",
  width: "60px",
  marginRight: "10px",
}));
const ListItemSidebar = styled(ListItem)({
  alignItems: "center",
  backgroundColor: alpha(theme.palette.primary.main, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  padding: "5px 5px",
  borderRadius: "15px",
  marginBottom: "3px",
  maxWidth: "400px",
  cursor: "pointer",
});

const ListSidebar = styled(List)({
  height: "400",
  width: "100%",
  maxHeight: 580,
  maxWidth: "400px",
  overflow: "auto",
  backgroundColor: "3e3e3e",
});

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <Box>
      <ListSidebar>
        {Object.entries(chats)
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((chat) => (
            <ListItemSidebar
              key={chat[0]}
              onClick={() => handleSelect(chat[1].userInfo)}
            >
              <ListItemAvatar>
                <AvatarSidebar src={chat[1].userInfo.photoURL} alt />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <TypographyTitle>
                    {chat[1].userInfo.displayName}
                  </TypographyTitle>
                }
                secondary={
                  <TypographyMain>{chat[1].lastMessage?.text}</TypographyMain>
                }
              />
            </ListItemSidebar>
          ))}
      </ListSidebar>
    </Box>
  );
};

export default Chats;
