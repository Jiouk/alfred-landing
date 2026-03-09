# Alfred Landing Page

Personal AI assistant landing page with waitlist form.

## Structure

- `index.html` - Main landing page
- `README.md` - This file

## Deployment

### Option 1: Cloudflare Pages (Recommended)

1. Push to GitHub:
```bash
git remote add origin https://github.com/YOUR_USERNAME/alfred-landing.git
git push -u origin main
```

2. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
3. Workers & Pages → Create application → Pages
4. Connect to GitHub repo
5. Deploy

### Option 2: Vercel

```bash
npx vercel --prod
```

### Option 3: Netlify

Drag & drop the folder to [netlify.com](https://netlify.com)

## API Endpoint

The waitlist form submits to:
```
POST https://thee-describing-arctic-advise.trycloudflare.com/onboarding/claim-agent
```

Body:
```json
{
  "email": "user@example.com",
  "name": "user"
}
```

## Custom Domain

To use your own domain:
1. Add domain in Cloudflare Pages dashboard
2. Update DNS records
3. Update API endpoint URL in `index.html` if needed

## Credits

Built by Doable Labs