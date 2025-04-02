"use client";

import { useState } from "react";

export default function MobileScreen() {
  const cardsData = [
    {
      title: "Card Title 1",
      content: "Content for card 1...",
    },
    {
      title: "Card Title 2",
      content: "Content for card 2...",
    },
    {
      title: "Card Title 3",
      content: "Content for card 3...",
    },
    {
      title: "Card Title 4",
      content: "Content for card 4...",
    },
    {
      title: "Card Title 5",
      content: "Content for card 5...",
    },
    {
      title: "Card Title 6",
      content: "Content for card 6...",
    },
  ];

  const [activeCardIndex, setActiveCardIndex] = useState(0); // State to track which card is active

  const updateActiveCard = (index) => {
    setActiveCardIndex(index);
    fetch("/api/activeCard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ activeCard: cardsData[index].id }), // Send active card ID to backend
    });
  };

  return (
    <div>
      <h1>Mobile Control</h1>
      <div>
        {cardsData.map((card, index) => (
          <button
            key={index}
            onClick={() => updateActiveCard(index)}
            style={{
              margin: "8px",
              padding: "12px",
              backgroundColor: index === activeCardIndex ? "#4caf50" : "#ccc",
              color: index === activeCardIndex ? "#fff" : "#000",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            {card.title}
          </button>
        ))}
      </div>
    </div>
  );
}
