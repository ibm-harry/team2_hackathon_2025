const { createServer } = require("node:https"); // Use HTTPS
const { readFileSync } = require("fs");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = dev ? 3000 : 443;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

const httpsOptions = {
  key: readFileSync("./ssl/key.pem"),
  cert: readFileSync("./ssl/cert.pem"),
};

app.prepare().then(() => {
  const httpServer = createServer(httpsOptions, handler);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  let currentSlide = 0; // Store slide index

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // Send the current slide to newly connected clients
    socket.emit("update-slide", currentSlide);

    socket.on("change-slide", (slide) => {
      io.emit("update-slide", slide); // Broadcast slide change
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  httpServer.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}`);
  });
});
