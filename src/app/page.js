'use client'; // This tells Next.js that this is a client component

import { useState, useEffect } from 'react';
import Card from './components/Card'; // Assuming you have a Card component
import { useSocket } from "../../hooks/useSocket";

export default function Home() {
  const { slide } = useSocket();

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
          <img
            key={index}
            style={{width: '10000px', height: '1000px'}}
            src={img}
            alt={`Slide ${index}`}
            className={`h-32 mx-2 cursor-pointer transition ${
              index === slide ? "border-4 border-blue-500" : "opacity-50"
            }`}
            onClick={() => changeSlide(index > slide ? "next" : "prev")}
          />
        ))}
      </div>
    </div>
  );
}
