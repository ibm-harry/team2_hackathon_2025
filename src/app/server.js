const express = require('express');
const next = require('next');
const WebSocket = require('ws');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

console.log('Starting Next.js app...');

app.prepare().then(() => {
  console.log('Next.js app is ready');
  const server = express();

  // Set up WebSocket server
  const wss = new WebSocket.Server({ noServer: true });

  let activeCard = 0;
  let clients = [];

  // Broadcast the active card to all connected WebSocket clients
  const broadcastActiveCard = () => {
    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ activeCard }));
      }
    });
  };

  // Upgrade HTTP connection to WebSocket
  server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  });

  // Handle WebSocket connections
  wss.on('connection', (ws) => {
    console.log('New WebSocket connection established');
    clients.push(ws);

    // Send the current active card when a new client connects
    ws.send(JSON.stringify({ activeCard }));

    ws.on('message', (message) => {
      try {
        const data = JSON.parse(message);
        if (typeof data.activeCard !== 'undefined') {
          activeCard = data.activeCard;
          console.log(`Received activeCard update: ${activeCard}`);
          broadcastActiveCard(); // Notify all connected clients
        }
      } catch (error) {
        console.error('Error processing WebSocket message:', error);
      }
    });

    // Remove client from the list on close
    ws.on('close', () => {
      console.log('WebSocket connection closed');
      clients = clients.filter((client) => client !== ws);
    });
  });

  // Handle POST request to update the active card
  server.post('/api/activeCard', express.json(), (req, res) => {
    const { activeCard: newActiveCard } = req.body;
    if (typeof newActiveCard === 'number') {
      activeCard = newActiveCard;
      broadcastActiveCard(); // Notify all connected clients
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ error: 'Invalid activeCard value' });
    }
  });

  // Handle all other requests via Next.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // Start the server
  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});