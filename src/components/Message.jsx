import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "./context/AuthContext";
import { ChatContext } from "./context/ChatContext";
import Input from "./Input";
import { Avatar, Box, Grid, ListItem } from "@mui/material";
import { ChatText } from "../theme";
import polar from "../Img/polar.webp";
import { ref } from "firebase/storage";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  console.log(message);
  return (
    <div
    // ref={ref}
    // className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        {/* <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        /> */}
        <span>just now</span>
      </div>
      <div className="messageContent">
        {/* <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />} */}
      </div>
      <Input />
    </div>
  );
};

export default Message;
