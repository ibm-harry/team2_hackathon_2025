'use client'; // This tells Next.js that this is a client component

import { useState, useEffect, useRef } from 'react';

export default function MobileScreen() {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const wsRef = useRef(null); // Use a ref to store the WebSocket instance

  // Handle WebSocket connection
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3000'); // Connect to WebSocket server
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (typeof data.activeCard !== 'undefined') {
          setActiveCardIndex(data.activeCard); // Update active card from server
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    // Clean up WebSocket connection when the component is unmounted
    return () => {
      ws.close();
    };
  }, []);

  const updateActiveCard = (index) => {
    setActiveCardIndex(index);

    // Send the active card update via WebSocket to the server
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ activeCard: index }));
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