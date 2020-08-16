import React, { useState } from "react";

const RoomInput = ({ joinNewRoom, createRoom }) => {
  const [value, setValue] = useState("");
  
  return (
    <div id="room-search-outer" className="row col-12">
      <div id="room-search-inner" className="col-12 center-row space-around">
        <img
          src="./images/icon/icons8_search_more_32.png"
          alt="create"
          onClick={() => {
            if (value) {
              joinNewRoom(value);
              setValue("");
            }
          }}
        />
        <input
          className="col-8"
          type="text"
          value={value}
          placeholder="Enter room name"
          onChange={(e) => setValue(e.target.value)}
          onKeyUp={(e) => {
            if (e.keyCode === 13 && value) {
              joinNewRoom(value);
              setValue("");
            }
          }}
        />
        <img
          src="./images/icon/icons8_add.ico"
          alt="join"
          onClick={() => {
            if (value) {
              createRoom(value);
              setValue("");
            }
          }}
        />
      </div>
    </div>
  );
};

export default RoomInput;
