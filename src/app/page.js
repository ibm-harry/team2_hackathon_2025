'use client'; // This tells Next.js that this is a client component

import { useState, useEffect } from 'react';
import Card from './components/Card'; // Assuming you have a Card component
import { useSocket } from "../../hooks/useSocket";

export default function Home() {
  const { slide } = useSocket();

  const cardsData = [
    { title: "Card Title 1", content: "Content for card 1..." },
    { title: "Card Title 2", content: "Content for card 2..." },
    { title: "Card Title 3", content: "Content for card 3..." },
    { title: "Card Title 4", content: "Content for card 4..." },
    { title: "Card Title 5", content: "Content for card 5..." },
    { title: "Card Title 6", content: "Content for card 6..." },
  ];

  return (
    <div style={{display: 'flex'}}>
      {cardsData.map((card, index) => (
        <Card
          key={index}
          title={card.title}
          content={card.content}
          isActive={index === slide}
          onClick={() => handleCardClick(index)} // Add onClick handler
        />
      ))}
    </div>
  );
}