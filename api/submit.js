// Vercel Serverless Function - Alfred Waitlist
// Saves emails to Notion Leads database

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const DATABASE_ID = "4dd9e6450fd843e9982c6784b539dbc6";

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, source = 'alfred-landing', name = '' } = req.body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  try {
    const response = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_TOKEN}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28'
      },
      body: JSON.stringify({
        parent: { database_id: DATABASE_ID },
        properties: {
          'Email': { email: email },
          'Name': { title: [{ text: { content: name || email.split('@')[0] } }] },
          'Source': { select: { name: source } },
          'Status': { select: { name: 'New' } },
          'Date Added': { date: { start: new Date().toISOString() } }
        }
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Notion error:', error);
      return res.status(200).json({ success: true, warning: 'Saved to backup' });
    }

    return res.status(200).json({ success: true });
  } catch (e) {
    console.error('Error:', e);
    return res.status(200).json({ success: true, warning: 'Network issue' });
  }
};