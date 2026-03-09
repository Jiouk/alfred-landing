# Alfred Landing Page

Personal AI assistant landing page with waitlist form.

## 🚀 Quick Deploy

### Frontend (GitHub Pages) - ✅ LIVE
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-LIVE-brightgreen)](https://jiouk.github.io/alfred-landing/)

**URL:** https://jiouk.github.io/alfred-landing/

### Backend API (Render) - ⏳ NEEDS DEPLOY
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/Jiouk/alfred-landing)

**Βήματα:**
1. Click το παραπάνω κουμπί "Deploy to Render"
2. Δώσε τα environment variables (στείλε μου μήνυμα για τα tokens):
   - `NOTION_TOKEN`: (ζήτα το από μένα)
   - `NOTION_DATABASE_ID`: `4dd9e6450fd843e9982c6784b539dbc6`
3. Click "Create Web Service"

## 📧 Form Integration

Μετά το deploy του API, update το `index.html` με το νέο URL:
```javascript
const API_URL = 'https://alfred-landing-api.onrender.com/api/waitlist';
```

## 🗄️ Notion Database

Τα emails αποθηκεύονται αυτόματα στο Notion database:
https://www.notion.so/4dd9e6450fd843e9982c6784b539dbc6

## 📁 Structure

- `index.html` - Main landing page
- `api/` - Backend server (Express.js)
- `render.yaml` - Render deployment config

## Credits

Built by Doable Labs