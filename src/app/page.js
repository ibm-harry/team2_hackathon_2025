'use client'; // This tells Next.js that this is a client component

import { useState, useEffect } from 'react';
import Card from './components/Card'; // Assuming you have a Card component
import { useSocket } from "../../hooks/useSocket";

export default function Home() {
  const { slide, comments } = useSocket();

  const slides = [
    "/Frame 2.png"
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white" style={{maxHeight: "100vh", overflow: "hidden"}}>
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
