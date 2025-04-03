import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "https://main.dj188r1lh3muh.amplifyapp.com";
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
