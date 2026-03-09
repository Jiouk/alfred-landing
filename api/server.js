const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

app.post('/api/waitlist', async (req, res) => {
  try {
    const { email, name } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email required' });
    }

    const response = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_TOKEN}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28'
      },
      body: JSON.stringify({
        parent: { database_id: NOTION_DATABASE_ID },
        properties: {
          'Email': { title: [{ text: { content: email } }] },
          'Name': { rich_text: [{ text: { content: name || email.split('@')[0] } }] },
          'Source': { select: { name: 'Alfred Landing Page' } },
          'Status': { select: { name: 'New Lead' } },
          'Date': { date: { start: new Date().toISOString() } }
        }
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Notion error:', error);
      return res.status(500).json({ error: 'Failed to save to Notion' });
    }

    res.json({ success: true });
  } catch (e) {
    console.error('Error:', e);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/', (req, res) => {
  res.send('Alfred Landing Page API');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
