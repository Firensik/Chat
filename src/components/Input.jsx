import {
  AddPhotoAlternate,
  AttachFile,
  Send,
  ThumbUp,
} from "@mui/icons-material";
// import img from "../Img/img";
import { Box, Divider, Fab, Grid, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { ChatContext } from "./context/ChatContext";
import { AuthContext } from "./context/AuthContext";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);

    //Dodac zabezpieniecze nie wysylanie pusych wiadomosci ewentualnie zrobic like
  };
  return (
    <Box>
      <Divider />
      <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
        <Grid
          container
          style={{
            padding: "20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Grid item xs={10}>
            <TextField
              label="Type Something..."
              onChange={(e) => setText(e.target.value)}
              value={text}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid
            xs={1.5}
            gap={1}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            <Fab
              sx={{ color: "blue", height: "40px", width: "40px" }}
              aria-label="add"
            >
              <AttachFile />
            </Fab>

            <Fab sx={{ color: "blue", height: "40px", width: "40px" }}>
              <AddPhotoAlternate />
            </Fab>
            <Fab
              sx={{ color: "blue", height: "40px", width: "40px" }}
              aria-label="add"
              onClick={handleSend}
            >
              <ThumbUp />
            </Fab>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Input;
