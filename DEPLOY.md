# Alfred Waitlist API

One-click deploy to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Falfred-waitlist&env=NOTION_TOKEN&envDescription=Notion%20Integration%20Token&envLink=https%3A%2F%2Fwww.notion.so%2Fmy-integrations)

## Manual Setup

1. Fork this repo or download files
2. Create Vercel account (free)
3. Import project
4. Add environment variable: `NOTION_TOKEN=ntn_...`
5. Deploy

## API Endpoint

POST `/api/submit`
```json
{
  "email": "user@example.com",
  "name": "User Name",
  "source": "alfred-landing"
}
```

## Notion Database

Database ID: `4dd9e6450fd843e9982c6784b539dbc6`

Required properties:
- Name (title)
- Email (email)
- Source (select)
- Status (select)
- Date Added (date)