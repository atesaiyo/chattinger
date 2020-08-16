import React from "react";

import "./Conversation.css";
import "./StyleList.css";
import InfoBar from "./InfoBar";
import Messages from "./Messages";
import InputBar from "./InputBar";

const Conversation = ({
  username,
  currentRoom,
  sendMessage,
  sendImage,
  changeStyle,
  leaveRoom,
}) => {
  return (
    <div id="conversation" className="col-9">
      {currentRoom.conversation ? (
        <>
          <InfoBar
            username={username}
            roomname={currentRoom.roomname}
            style={currentRoom.style}
            changeStyle={changeStyle}
            leaveRoom={leaveRoom}
          />
          <Messages
            username={username}
            conversation={currentRoom.conversation}
            style={currentRoom.style}
          />
          <InputBar
            sendMessage={sendMessage}
            sendImage={sendImage}
            roomname={currentRoom.roomname}
          />
        </>
      ) : (
        <div
          style={{ opacity: "0.2", height: "inherit" }}
          className="center-mid"
        >
          <h1 className="text-center">Chattinger</h1>
          <img src="./images/icons8_chat-2.ico" alt="img" />
        </div>
      )}
    </div>
  );
};

export default Conversation;
