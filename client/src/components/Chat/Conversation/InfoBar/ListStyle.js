import React from "react";

const ListStyle = ({ changeStyle }) => {
  const listStyle = [
    "default",
    "love",
    "nature",
    "light-sky",
    "banana",
    "dark",
  ];

  return (
    <div id="select-style" style={{ display: "none" }}>
      <p className="row col-12">Choose other style</p>
      <hr />
      <div className="row col-12">
        {listStyle.map((style) => (
          <div key={style} className="col-4 center-mid style-outer">
            <div
              className={"style-inner " + style}
              onClick={() => changeStyle({ style: style })}
            >
              Hi
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListStyle;
