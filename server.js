const http = require("http");
const fs = require("fs");
const { Server } = require("socket.io");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    fs.readFile("index.html", (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end("Error loading index.html");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  }
});

const io = new Server(server);
const PORT = 3000;
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("send name", (username) => {
    io.emit("send name", username);
  });
  socket.on("send message", (chat) => {
    io.emit("send message", chat);
  });
});

server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
