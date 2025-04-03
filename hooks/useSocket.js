import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const dev = process.env.NODE_ENV !== "production";
const SOCKET_SERVER_URL = dev ? "https://localhost:3000" : "https://13.41.230.83" ;
let socket = null; // Store a single socket instance

export function useSocket() {
  const [slide, setSlide] = useState(0);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(true);

  useEffect(() => {
    if (!socket) {
      socket = io(SOCKET_SERVER_URL, { transports: ["websocket"] }); // Reuse existing socket
    }

    socket.on("update-slide", (newSlide) => {
      setSlide(newSlide);
    });

    socket.on("update-comments", (newComments) => {
      setComments(newComments);
    });

    return () => {
      // Don't disconnect here to prevent multiple reconnections
    };
  }, []);

  const changeSlide = (slide) => {
    if (socket) socket.emit("change-slide", slide);
  };

  const addComment = (comment) => {
    if (socket) socket.emit("add-comment", comment);
  };

  const toggleComments = () => {
    setShowComments(prev => !prev);
  };

  return { slide, changeSlide, comments, addComment, showComments, toggleComments };
}
