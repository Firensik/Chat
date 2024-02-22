import React, { useContext, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Divider,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { LibraryBooks, Pending, Search } from "@mui/icons-material";
import polar from "../Img/polar.webp";
import { theme, TypographyMain, TypographyTitle } from "../theme";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "./context/AuthContext";
import Chats from "./Chats";

const ChatToolbar = styled(Toolbar)({
  display: "flex",
  alignItems: "start",
  justifyContent: "space-between",
  margin: "0 -25px 0 -15px",
});
const IconsSidebar = styled(Box)(({ theme }) => ({
  display: "flex",
}));

const SearchSidebar = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "30px",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  marginRight: "30px",
  [theme.breakpoints.up("xs")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
    marginRight: "30px",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",

  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

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

const Sidebar = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      setError(true);
      console.log(error + "catch");
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      console.log(error);
    }

    setUser(null);
    setUsername("");
  };
  console.log(error);
  return (
    <Box
      position={"static"}
      flex={1.5}
      padding={2}
      paddingRight={0}
      width={100}
      sx={{ bgcolor: "#2b2a2a" }}
    >
      <ChatToolbar>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "white" }}>
          Czaty
        </Typography>
        <IconsSidebar>
          <Button>
            <Pending
              sx={{
                fontSize: "2rem",
                borderRadius: "50%",
                color: "white",
                bgcolor: "gray",
              }}
            />
          </Button>
          <Button>
            {" "}
            <LibraryBooks
              sx={{
                fontSize: "2rem",
                borderRadius: "50%",
                color: "white",
                bgcolor: "gray",
              }}
            />
          </Button>
        </IconsSidebar>
      </ChatToolbar>
      <SearchSidebar>
        <SearchIconWrapper>
          <Search />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Find user"
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKey}
          value={username}
          // inputProps={{ "aria-label": "search" }}
        />
      </SearchSidebar>
      {error && <Typography>User not found!</Typography>}
      <ListSidebar>
        {user && (
          <ListItemSidebar onClick={handleSelect}>
            <ListItemAvatar>
              <AvatarSidebar alt="" src={user.photoURL} />
            </ListItemAvatar>
            <ListItemText
              primary={<TypographyTitle>{user.displayName}</TypographyTitle>}
            />
          </ListItemSidebar>
        )}
      </ListSidebar>

      <Divider />

      <ListSidebar>
        <Chats />
      </ListSidebar>
    </Box>
  );
};

export default Sidebar;
