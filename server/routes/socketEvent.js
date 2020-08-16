const fs = require("fs");

const {
  addUser,
  joinRoom,
  createRoom,
  addMessage,
  changeStyle,
  leaveRoom,
  removeUser,
} = require("../controllers/chat.controller");

const socketEvent = (socket) => {
  console.log("We have a new connection!");
  
  socket.on("signin", ({ username }, callback) => {
    const { error, rooms } = addUser({ id: socket.id, username });
    if (error) return callback({ error });
    rooms.forEach((room) => socket.join(room.roomname));
    callback({ rooms });
  });

  socket.on("join", ({ username, roomname }, callback) => {
    const { error, room } = joinRoom({ username, roomname });
    if (error) return callback({ error });
    socket.join(room.roomname);
    socket.to(room.roomname).emit("message", { room });
    callback({ room });
  });

  socket.on("createRoom", ({ username, roomname }, callback) => {
    const { error, room } = createRoom({ username, roomname });
    if (error) return callback({ error });
    socket.join(room.roomname);
    callback({ room });
  });

  socket.on("sendMessage", ({ username, message, roomname }, callback) => {
    const { room } = addMessage({ username, type: "text", message, roomname });
    socket.to(room.roomname).emit("message", { room });
    callback({ room });
  });

  socket.on("sendImage", ({ username, image, roomname }, callback) => {
    const randomString = (length) => {
      let text = "";
      const possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
      for (let i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      return text;
    };
    const getBase64Image = (imgData) => {
      return imgData.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");
    };
    let ext = "";
    switch (image.match(/^data:image\/(png|jpeg);base64,/)[1]) {
      case "png":
        ext = ".png";
        break;
      case "jpeg":
        ext = ".jpg";
        break;
      default:
        ext = ".bin";
        break;
    }
    const src = "/images/upload/" + randomString(10) + ext;
    fs.writeFile(
      __dirname + "../../../client/public" + src,
      getBase64Image(image),
      "base64",
      (err) => {
        if (err) return console.log(err);
        const { room } = addMessage({ username, src, roomname });
        socket.to(room.roomname).emit("message", { room });
        callback({ room });
      }
    );
  });

  socket.on("changeStyle", ({ username, style, roomname }, callback) => {
    const { room } = changeStyle({ username, style, roomname });
    socket.to(room.roomname).emit("message", { room });
    callback({ room });
  });

  socket.on("leaveRoom", ({ username, roomname }, callback) => {
    const { room } = leaveRoom({ username, roomname });
    if (!room) return callback();
    socket.to(room.roomname).emit("message", { room });
    socket.emit("message", { room });
    callback();
  });

  socket.on("disconnect", ({ username }) => {
    const { rooms } = removeUser({ username });
    rooms.forEach((room) => socket.leave(room));
    console.log("User has left!");
  });
};

module.exports = { socketEvent };
