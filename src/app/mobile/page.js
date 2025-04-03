'use client'; // This tells Next.js that this is a client component

import { useState, useEffect, useRef } from 'react';
import { useSocket } from "../../../hooks/useSocket";

export default function MobileScreen() {
    const { slide, changeSlide } = useSocket();

  const cardsData = [
    { title: "Card Title 1", content: "Content for card 1..." },
    { title: "Card Title 2", content: "Content for card 2..." },
    { title: "Card Title 3", content: "Content for card 3..." },
    { title: "Card Title 4", content: "Content for card 4..." },
    { title: "Card Title 5", content: "Content for card 5..." },
    { title: "Card Title 6", content: "Content for card 6..." },
  ];

  return (
    <div>
      <h1>Mobile Control</h1>
      <div style={{display: "flex", alignItems: "center", overflowX: "auto"}}>
        {cardsData.map((card, index) => (
          <button
            key={index}
            onClick={() => changeSlide(index)}
            style={{
              margin: "8px",
              padding: "12px",
              backgroundColor: index === slide ? "#4caf50" : "#ccc",
              color: index === slide ? "#fff" : "#000",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            {card.title}
          </button>
        ))}
      </div>
      <div style={{display: "flex", justifyContent: "center"}}>
        <button
          onClick={() => changeSlide(slide - 1)}
          disabled={slide == 0}
          style={{
            margin: "8px",
            padding: "12px",
            backgroundColor: slide != 0 ? "#4caf50" : "#ccc",
            color: slide != 0 ? "#fff" : "#000",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }}>&larr;</button>
        <button
          onClick={() => changeSlide(slide + 1)}
          disabled={slide == 5}
          style={{
            margin: "8px",
            padding: "12px",
            backgroundColor: slide != 5 ? "#4caf50" : "#ccc",
            color: slide != 5 ? "#fff" : "#000",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }}>&rarr;</button>
        </div>
    </div>
  );
}