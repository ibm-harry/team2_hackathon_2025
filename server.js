const { createServer } = require("node:http"); // Use HTTPS
const { readFileSync } = require("fs");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = dev ? 3000 : 80;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  let currentSlide = false; // Store slide index
  let comments = []; // Store comments

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // Send current state to newly connected clients
    socket.emit("update-slide", currentSlide);
    socket.emit("update-comments", comments);

    socket.on("change-slide", (slide) => {
      io.emit("update-slide", slide);
    });

    socket.on("add-comment", (comment) => {
      comments.push(comment);
      io.emit("update-comments", comments);
    });

    socket.on("new-comments", (newComments) => {
      comments = newComments;
      io.emit("update-comments", comments);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  httpServer.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}`);
  });
});
