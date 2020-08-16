import React, { useState, useEffect } from "react";

const Room = ({
  username,
  roomname,
  avatar,
  lastMessage,
  messageCount,
  switchRoom,
}) => {
  const [oldCount, setOldCount] = useState(messageCount);
  let shortMessage = `${lastMessage.username}: ${lastMessage.message}`;

  useEffect(() => {
    if (messageCount - oldCount && lastMessage.username !== username)
      document.getElementById(roomname).classList.add("notice");
    setOldCount(messageCount);
  }, [username, lastMessage, messageCount, oldCount, roomname]);

  const readMessage = () => {
    switchRoom(roomname);
    document.getElementById(roomname).classList.remove("notice");
  };

  return (
    <div id={roomname} className="row center-row room " onClick={readMessage}>
      <img className="avatar" src={avatar} alt="avatar" />
      <div>
        <h4>{roomname}</h4>
        <p>
          {shortMessage.length > 22
            ? shortMessage.slice(0, 22) + "..."
            : shortMessage}
        </p>
      </div>
    </div>
  );
};

export default Room;
