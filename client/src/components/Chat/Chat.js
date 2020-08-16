import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";
import io from "socket.io-client";

import "./Chat.css";
import Rooms from "./Rooms";
import Conversation from "./Conversation";

let socket;
let server = "localhost:5000";
const Chat = ({ location }) => {
  const [signError, setSignError] = useState("");
  const [joinError, setJoinError] = useState("");

  const [username, setUsername] = useState("");
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState({});

  //Connect and disconnect
  useEffect(() => {
    const { username } = queryString.parse(location.search);
    socket = io(server);
    socket.emit("signin", { username }, ({ error, rooms }) => {
      if (error) return setSignError(error);
      setUsername(username);
      setRooms(rooms);
    });
    return () => {
      socket.emit("disconnect", { username });
      socket.off();
    };
  }, [location.search]);

  //Listen new message
  useEffect(() => {
    socket.on("message", ({ room }) => {
      if (room.roomname === currentRoom.roomname) setCurrentRoom(room);
      setRooms([
        room,
        ...rooms.filter((checkRoom) => checkRoom.roomname !== room.roomname),
      ]);
    });
  });

  //Switch room
  const switchRoom = (roomname) => {
    const indexJoin = rooms.findIndex((room) => room.roomname === roomname);
    if (indexJoin !== -1) {
      setCurrentRoom(rooms[indexJoin]);
      return true;
    }
    return false;
  };
  const addRoom = ({ error, room }) => {
    if (error) {
      setJoinError(error);
      return setTimeout(() => setJoinError(""), 2000);
    }
    if (switchRoom(room.roomname)) return;
    setCurrentRoom(room);
    setRooms([room, ...rooms]);
  };

  //Join new room
  const joinNewRoom = (newRoom) => {
    socket.emit("join", { username, roomname: newRoom }, addRoom);
  };
  //Create room
  const createRoom = (name) => {
    socket.emit("createRoom", { username, roomname: name }, addRoom);
  };

  const addMessage = ({ room }) => {
    setCurrentRoom(room);
    setRooms([
      room,
      ...rooms.filter((checkRoom) => checkRoom.roomname !== room.roomname),
    ]);
  };
  //Send message
  const sendMessage = ({ message }) => {
    socket.emit(
      "sendMessage",
      { username, message, roomname: currentRoom.roomname },
      addMessage
    );
  };
  //Send image
  const sendImage = ({ image }) => {
    socket.emit(
      "sendImage",
      { username, image, roomname: currentRoom.roomname },
      addMessage
    );
  };
  //Change room style
  const changeStyle = ({ style }) => {
    socket.emit(
      "changeStyle",
      { username, style, roomname: currentRoom.roomname },
      addMessage
    );
  };
  //Leave room
  const leaveRoom = ({ roomname }) => {
    socket.emit("leaveRoom", { username, roomname }, () => {
      setCurrentRoom({});
      setRooms(rooms.filter((checkRoom) => checkRoom.roomname !== roomname));
    });
  };

  return (
    <>
      {signError ? (
        <div className="center-col">
          <img src="./images/icons8_no_chat.ico" alt="error" />
          <b>Opps... {signError}</b>
          <Link to="/">
            <button id="error-button" type="submit">
              Come Back
            </button>
          </Link>
        </div>
      ) : (
        <div id="chat" className="row col-12 center-row">
          <div
            id="zoom"
            className="center-mid"
            style={{ display: "none" }}
            onClick={() =>
              (document.getElementById("zoom").style.display = "none")
            }
          >
            <img id="image-zoom" src="" alt="zoom" />
          </div>
          <Rooms
            username={username}
            rooms={rooms}
            switchRoom={switchRoom}
            createRoom={createRoom}
            joinNewRoom={joinNewRoom}
            joinError={joinError}
          />
          <Conversation
            username={username}
            currentRoom={currentRoom}
            sendMessage={sendMessage}
            sendImage={sendImage}
            changeStyle={changeStyle}
            leaveRoom={leaveRoom}
          />
        </div>
      )}
    </>
  );
};

export default Chat;
