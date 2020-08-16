import React from "react";

import "./InfoBar.css";
import ListStyle from "./ListStyle";

const InfoBar = ({ username, roomname, style, changeStyle, leaveRoom }) => {
  const showStyles = () => {
    if (document.getElementById("select-style").style.display === "none")
      return (document.getElementById("select-style").style.display = "block");
    document.getElementById("select-style").style.display = "none";
  };
  const showInfo = () => {
    window.alert("No, cái cục info này chưa được làm :<<");
  };

  return (
    <div id="info-bar" className="row col-12 center-row">
      <h1 className="col-6">{username + " --> " + roomname}</h1>
      <div id="setting" className="col-6">
        <div className={"current-style " + style} onClick={showStyles}>
          Hi
        </div>
        <div className={"chat-info " + style} onClick={showInfo}>
          !
        </div>
        <img
          src="./images/icon/icons8_export.ico"
          alt="leave"
          onClick={() =>
            window.confirm(`Leave ${roomname}?`)
              ? leaveRoom({ roomname })
              : null
          }
        />
      </div>
      <ListStyle changeStyle={changeStyle} />
    </div>
  );
};

export default InfoBar;
