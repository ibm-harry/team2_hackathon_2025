// This is the API route that handles the POST request to update the active card
export async function POST(req) {
    try {
      const { activeCard } = await req.json(); // Get the active card data from the request body
  
      if (typeof activeCard === 'undefined') {
        return new Response('Active card data is missing', { status: 400 });
      }
  
      // Here, you could perform logic to save the active card to a database or memory
      // For now, we'll simulate broadcasting the active card change by storing it in memory.
      
      // Broadcast the active card (could be done with WebSocket, for example)
      // For example, send the active card to all connected WebSocket clients here.
      
      console.log(`Active card updated to: ${activeCard}`);
  
      return new Response(JSON.stringify({ success: true, activeCard }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return new Response('Error processing the request', { status: 500 });
    }
  }  