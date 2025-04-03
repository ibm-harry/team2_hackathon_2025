'use client'; // This tells Next.js that this is a client component

import { useState, useEffect } from 'react';
import Card from './components/Card'; // Assuming you have a Card component
import { useSocket } from "../../hooks/useSocket";

export default function Home() {
  const { slide, comments } = useSocket();

  const slides = [
    "/Frame 2.png"
  ];

  // State to control the visibility of the overlay image
  const [showImage, setShowImage] = useState(true);

  // Function to handle 'c' key press and toggle the image visibility
  const handleKeyPress = (e) => {
    if (e.key === 'c' || e.key === 'C') {
      setShowImage((prev) => !prev);
    }
  };

  // Set up the key press listener on component mount and cleanup on unmount
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white" style={{maxHeight: "100vh", overflow: "hidden"}}>
      {/* Overlay Image */}
      {showImage && (
        <div className="fixed top-0 left-0 w-full h-full z-0" style={{backgroundImage: "url('RcX3gDMF.gif')", height: '100%', width: '100%', position: 'absolute', top: 0, left: 0}}>
        </div>
      )}


      <div
        className="flex overflow-x-scroll w-full py-4"
        style={{ scrollBehavior: "smooth", display: "flex", overflowX: "auto" }}
      >
        {slides.map((img, index) => (
          <div key={index} className="relative">
            <img
              style={{width: '10000px', height: '1000px'}}
              src={img}
              alt={`Slide ${index}`}
              className={`h-32 mx-2 cursor-pointer transition ${
                index === slide ? "border-4 border-blue-500" : "opacity-50"
              }`}
            />
            {comments
              .filter(comment => comment.slideIndex === index)
              .map(comment => (
                <div
                  key={comment.id}
                  className="absolute w-4 h-4 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 group"
                  style={{
                    left: `${comment.position.x}%`,
                    top: `${comment.position.y}%`,
                    zIndex: 10
                  }}
                >
                  <div className="absolute hidden group-hover:block bg-black text-white p-2 rounded -translate-y-full whitespace-nowrap">
                    {comment.text}
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
