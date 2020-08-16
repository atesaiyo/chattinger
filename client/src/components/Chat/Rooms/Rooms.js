import React from "react";

import "./Rooms.css";
import Room from "./Room";
import RoomSearch from "./RoomSearch";

const Rooms = ({
  username,
  rooms,
  switchRoom,
  createRoom,
  joinNewRoom,
  joinError,
}) => {
  return (
    <div id="rooms" className="col-3">
      <h1 className="row col-12 text-center">Chattinger</h1>
      <RoomSearch createRoom={createRoom} joinNewRoom={joinNewRoom} />
      <p id="join-error" className="row col-12 text-center">
        {joinError}
      </p>
      <div id="list-room" className="row col-12">
        <div className="rooms-scroll">
          {rooms.map((room, i) => (
            <Room
              key={i}
              username={username}
              roomname={room.roomname}
              avatar={room.avatar}
              style={room.style}
              lastMessage={room.conversation[room.conversation.length - 1]}
              messageCount={room.conversation.length}
              switchRoom={switchRoom}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rooms;
