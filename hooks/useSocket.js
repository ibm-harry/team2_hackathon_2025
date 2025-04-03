import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const dev = process.env.NODE_ENV !== "production";
const SOCKET_SERVER_URL = dev ? "https://localhost:3000" : "https://13.41.230.83" ;
let socket = null; // Store a single socket instance

export function useSocket() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    if (!socket) {
      socket = io(SOCKET_SERVER_URL, { transports: ["websocket"] }); // Reuse existing socket
    }

    socket.on("update-slide", (newSlide) => {
      setSlide(newSlide);
    });

    return () => {
      // Don't disconnect here to prevent multiple reconnections
    };
  }, []);

  const changeSlide = (slide) => {
    if (socket) socket.emit("change-slide", slide);
  };

  return { slide, changeSlide };
}
