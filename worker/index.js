export default {
  async fetch(request, env) {
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    try {
      const data = await request.json();
      const email = data.email;
      const name = data.name || email.split('@')[0];
      
      if (!email) {
        return new Response(JSON.stringify({ error: 'Email required' }), { 
          status: 400,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      }

      // Add to Notion
      const notionResponse = await fetch('https://api.notion.com/v1/pages', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.NOTION_TOKEN}`,
          'Content-Type': 'application/json',
          'Notion-Version': '2022-06-28'
        },
        body: JSON.stringify({
          parent: { database_id: env.NOTION_DATABASE_ID },
          properties: {
            'Email': { title: [{ text: { content: email } }] },
            'Name': { rich_text: [{ text: { content: name } }] },
            'Source': { select: { name: 'Alfred Landing Page' } },
            'Status': { select: { name: 'New Lead' } },
            'Date': { date: { start: new Date().toISOString() } }
          }
        })
      });

      if (!notionResponse.ok) {
        const error = await notionResponse.text();
        console.error('Notion error:', error);
        return new Response(JSON.stringify({ error: 'Failed to save to Notion' }), { 
          status: 500,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      }

      return new Response(JSON.stringify({ success: true }), { 
        status: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    } catch (e) {
      console.error('Error:', e);
      return new Response(JSON.stringify({ error: 'Server error' }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }
  }
};
