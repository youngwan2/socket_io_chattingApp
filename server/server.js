const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const _path = path.join(__dirname, "../frontend/");
app.use("/", express.static(_path));

app.get("/", (req, res) => {
  res.sendFile(_path + "/public/index.html");
});

// 클라이언트 소켓과 연결 시 즉시 실행 됨
io.on("connection", (socket) => {
  console.log("11", socket.id);

  socket.emit("hi", "반가워요!");

  // 유저가 메시지를 보내면 받아서 msg 변수에 담는다.
  socket.on("messages", (msg) => {
    console.log("message:", msg);

    io.emit("messages", msg); // 모든 연결된 사람에게 메시지를 전달
  });

  socket.on("disconnect", () => {
    console.log("사용자가 연결을 끊었습니다.");
  });
});

server.listen(3005, () => {
  console.log(3005, "서버 열림");
});
