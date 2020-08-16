import React, { useState } from "react";

import "./InputBar.css";

const InputBar = ({ sendMessage, sendImage, roomname }) => {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");

  const preview = (imageFile) => {
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = (e) => {
      document.getElementById("preview-section").style.display = "block";
      document
        .getElementById("image-preview")
        .setAttribute("src", e.target.result);
      setImage(e.target.result);
    };
  };
  const resetFile = () => {
    setImage("");
    document.getElementById("preview-section").style.display = "none";
    document.getElementById("image-preview").setAttribute("src", "");
  };

  return (
    <div id="input-bar-outer" className="row col-12 center-mid">
      <div
        id="preview-section"
        className="col-12 center-col"
        style={{ display: "none" }}
      >
        <div id="preview">
          <button className="remove-image" onClick={resetFile}>
            <b>x</b>
          </button>
          <img id="image-preview" src="" alt="pre" />
        </div>
      </div>
      <div
        id="input-bar-inner"
        className="col-12 center-row space-around"
        onClick={() => {
          document.getElementById(roomname).classList.remove("notice");
        }}
      >
        <input
          id="input-image"
          src="./images/icon/icons8_add.ico"
          type="file"
          title="Add image"
          onChange={(e) => preview(e.target.files[0])}
        />
        <input
          className="col-11"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter" && (message || image)) {
              if (image) {
                sendImage({ image });
                resetFile();
              } else {
                sendMessage({ message });
                setMessage("");
              }
            }
          }}
        />
        <img
          src="./images/icon/icons8_sent.ico"
          alt="sent"
          onClick={() => {
            if (message || image) {
              if (image) {
                sendImage({ image });
                resetFile();
              } else {
                sendMessage({ message });
                setMessage("");
              }
            }
          }}
        />
      </div>
    </div>
  );
};

export default InputBar;
