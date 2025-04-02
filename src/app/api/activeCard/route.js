import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ noServer: true });
let activeCardIndex = 0; // Store active card index in memory

wss.on('connection', (ws) => {
  console.log('Client connected to WebSocket');

  // Send the current active card to the newly connected client
  ws.send(JSON.stringify({ activeCard: activeCardIndex }));

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      if (typeof data.activeCard !== 'undefined') {
        activeCardIndex = data.activeCard;

        // Broadcast the updated active card to all clients
        wss.clients.forEach((client) => {
          if (client.readyState === 1) {
            client.send(JSON.stringify({ activeCard: activeCardIndex }));
          }
        });

        console.log(`Active card updated to: ${activeCardIndex}`);
      }
    } catch (error) {
      console.error('Error processing message:', error);
    }
  });

  ws.on('close', () => console.log('Client disconnected'));
});

// Handle Next.js request and WebSocket upgrade
export async function GET(req) {
  if (req.headers.get('upgrade') !== 'websocket') {
    return new Response('Expected WebSocket', { status: 426 });
  }

  const { socket, response } = Deno.upgradeWebSocket(req);
  wss.handleUpgrade(req, socket, Buffer.alloc(0), (ws) => {
    wss.emit('connection', ws, req);
  });

  return response;
}