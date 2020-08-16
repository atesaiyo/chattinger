import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./SignIn.css";

const Join = ({ history }) => {
  const [username, setUsername] = useState("");
  return (
    <div id="signin-outer" className="center-mid">
      <div id="signin-inner" className="center-mid">
        <div className="center-col">
          <h1 className="heading">Join room and chat now!</h1>
          <div>
            <img src="./images/icons8_chat.ico" alt="chat" />
          </div>
          <input
            id="signin-input"
            className="text-center"
            type="text"
            placeholder="your username is ..."
            onChange={(e) => setUsername(e.target.value)}
            onKeyUp={(e) => {
              if (e.keyCode === 13 && username)
                history.push(`/chat?username=${username}`);
            }}
          />
          <Link
            onClick={(e) => (!username ? e.preventDefault() : null)}
            to={`/chat?username=${username}`}
          >
            <button id="signin-button" type="submit">
              Join
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Join;
