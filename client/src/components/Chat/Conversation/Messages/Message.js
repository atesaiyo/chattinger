import React from "react";

const Message = ({ username, message, count, style }) => {
  const zoom = (src) => {
    document.getElementById("zoom").style.display = "flex";
    document.getElementById("image-zoom").setAttribute("src", src);
  };

  return (
    <div className="row col-12">
      {message.type === "notice" ? (
        <div className="center-mid notice-message">{message.message}</div>
      ) : message.username === username ? (
        <div className="user-pos">
          {count === 0 || count === 2 ? (
            <p
              className={"date " + (count === 0 || count === 1 ? "combo" : "")}
            >
              {message.date}
            </p>
          ) : null}
          {message.type === "image" ? (
            <div className="image-message-outer">
              <img
                className="image-auto user image-message-inner fl-right"
                src={message.src}
                alt="img"
                onClick={(e) => zoom(e.target.src)}
              />
            </div>
          ) : (
            <div
              className={
                "message user fl-right center-mid " +
                style +
                " " +
                (count === 0
                  ? "user-one combo"
                  : count === 1
                  ? "user-top combo"
                  : count === 2
                  ? "user-bottom"
                  : "")
              }
              title={message.username}
            >
              {message.message}
            </div>
          )}
        </div>
      ) : (
        <div style={{ position: "relative" }}>
          {count === 0 || count === 2 ? <div className="avatar-other" /> : null}
          <div className="center-row">
            {message.type === "image" ? (
              <div className="other-image image-message-outer">
                <img
                  className="image-auto image-message-inner"
                  src={message.src}
                  alt="img"
                  onClick={(e) => zoom(e.target.src)}
                />
              </div>
            ) : (
              <div
                className={
                  "message other center-mid " +
                  (count === 0
                    ? "other-one combo"
                    : count === 1
                    ? "other-top combo"
                    : count === 2
                    ? "other-bottom"
                    : "")
                }
                title={message.username}
              >
                {message.message}
              </div>
            )}
            {count === 0 || count === 2 ? (
              <p
                className={
                  "date " + (count === 0 || count === 1 ? "combo" : "")
                }
              >
                {message.date}
              </p>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
