import React from "react";

import "./Messages.css";
import Message from "./Message";

const Messages = ({ username, conversation, style }) => {
  const count = (pre, cur, nex) => {
    if (!pre && !nex) return 0;
    if (!pre)
      return cur.username === nex.username
        ? nex.type === "notice"
          ? 0
          : 1
        : 0;
    if (!nex)
      return pre.username === cur.username
        ? pre.type === "notice"
          ? 0
          : 2
        : 0;
    return pre.type === "notice"
      ? cur.username === nex.username
        ? nex.type === "notice"
          ? 0
          : 1
        : 0
      : pre.username === cur.username
      ? cur.username === nex.username
        ? nex.type === "notice"
          ? 2
          : 3
        : 2
      : cur.username === nex.username
      ? nex.type === "notice"
        ? 0
        : 1
      : 0;
  };

  return (
    <div id="messages" className="row col-12">
      <div className="row col-12 messages-scroll">
        {conversation.map((message, i) => {
          return (
            <Message
              key={i}
              username={username}
              message={message}
              count={count(
                conversation[i - 1],
                conversation[i],
                conversation[i + 1]
              )}
              style={style}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Messages;
