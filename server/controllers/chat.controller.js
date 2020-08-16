const Rooms = require("./data.json");
const OnlineUsers = [];

const addUser = ({ id, username }) => {
  username = username.trim().toLowerCase();
  if (OnlineUsers.find((user) => user.username === username))
    return { error: username + " is online!" };
  OnlineUsers.push({ id: id, username: username });
  return {
    rooms: Rooms.filter((room) => room.users.indexOf(username) != -1),
  };
};

const joinRoom = ({ username, roomname }) => {
  const roomIndex = Rooms.findIndex((room) => room.roomname === roomname);
  if (roomIndex === -1) return { error: "The room does not exist" };
  Rooms[roomIndex].users.push(username);
  return addMessage({
    username,
    message: username + " has join",
    roomname,
  });
};

const createRoom = ({ username, roomname }) => {
  const date = new Date();
  let roomIndex = Rooms.findIndex((room) => room.roomname === roomname);
  if (roomIndex !== -1) return { error: "This is exist" };
  const room = {
    roomname: roomname,
    style: "default",
    avatar: "./images/avatar/icons8_chat_room.ico",
    users: [username],
    conversation: [
      {
        username: username,
        message:
          username + " create this room at " + date.toString().slice(0, 24),
        type: "notice",
        src: "",
        date: date.toString().slice(16, 24),
        time: Date.now(),
      },
    ],
  };
  Rooms.unshift(room);
  return { room };
};

const addMessage = ({ username, type, message, src, roomname }) => {
  const roomIndex = Rooms.findIndex((room) => room.roomname === roomname);
  const date = new Date();
  const time = Date.now();
  if (
    time -
      Rooms[roomIndex].conversation[Rooms[roomIndex].conversation.length - 1]
        .time >
    20000
  )
    Rooms[roomIndex].conversation.push({
      username: username,
      type: "notice",
      message: date.toString().slice(0, 24).toUpperCase(),
      src: "",
      date: date.toString().slice(16, 24),
      time: time,
    });
  Rooms[roomIndex].conversation.push({
    username: username,
    type: type ? type : src ? "image" : "notice",
    message: src ? username + " send a image" : message,
    src: src || "",
    date: date.toString().slice(16, 24),
    time: time,
  });
  Rooms.unshift(Rooms.splice(roomIndex, 1)[0]);
  return { room: Rooms[0] };
};

const changeStyle = ({ username, style, roomname }) => {
  Rooms[Rooms.findIndex((room) => room.roomname === roomname)].style = style;
  return addMessage({
    username,
    message: username + " change style to " + style,
    roomname,
  });
};

const leaveRoom = ({ username, roomname }) => {
  const roomIndex = Rooms.findIndex((room) => room.roomname === roomname);
  if (!Rooms[roomIndex].users.length) {
    Rooms.splice(roomIndex, 1);
    return;
  }
  Rooms[roomIndex].users.splice(Rooms[roomIndex].users.indexOf(username), 1);
  return addMessage({
    username,
    message: username + " has leave",
    roomname,
  });
};

const removeUser = ({ username }) => {
  OnlineUsers.splice(
    OnlineUsers.findIndex((user) => user.username === username),
    1
  );
  const rooms = Rooms.filter((room) => room.users.indexOf(username) != -1).map(
    (room) => room.roomname
  );
  return { rooms };
};

module.exports = {
  addUser,
  joinRoom,
  createRoom,
  addMessage,
  changeStyle,
  leaveRoom,
  removeUser,
};
