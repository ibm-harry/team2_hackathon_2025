'use client'; // This tells Next.js that this is a client component

import { useState, useEffect } from 'react';

export default function MobileScreen() {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const ws = new WebSocket('ws://localhost:3000'); // Connect to WebSocket server

  // Handle WebSocket connection
  useEffect(() => {
    ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error', error);
    };

    // Close the WebSocket connection when the component is unmounted
    return () => {
      ws.close();
    };
  }, []);

  const updateActiveCard = (index) => {
    setActiveCardIndex(index);

    // Send the active card update via WebSocket to the server
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ activeCard: index }));
    }
  };

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