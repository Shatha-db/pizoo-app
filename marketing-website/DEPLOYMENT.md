# Deployment Guide for Pizoo Marketing Website

## 🎯 Overview
This guide explains how to deploy the Pizoo marketing website to pizoo.ch domain.

---

## 📦 Build the Website

```bash
cd /app/marketing-website
yarn build
```

This creates a `build` folder with all static files ready for deployment.

---

## 🌐 Deploy to pizoo.ch

### Option 1: Static Hosting (Vercel - Recommended)

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Login to Vercel:**
```bash
vercel login
```

3. **Deploy:**
```bash
cd /app/marketing-website
vercel --prod
```

4. **Configure Custom Domain:**
   - Go to Vercel Dashboard → Your Project → Settings → Domains
   - Add `pizoo.ch`
   - Follow DNS configuration instructions

---

### Option 2: Netlify

1. **Install Netlify CLI:**
```bash
npm install -g netlify-cli
```

2. **Login:**
```bash
netlify login
```

3. **Deploy:**
```bash
cd /app/marketing-website
netlify deploy --prod --dir=build
```

4. **Configure Domain:**
   - Go to Site Settings → Domain Management
   - Add custom domain: `pizoo.ch`

---

### Option 3: Traditional Web Server (Apache/Nginx)

#### For Apache:

1. **Upload files:**
```bash
scp -r build/* user@pizoo.ch:/var/www/html/
```

2. **Configure .htaccess for React Router:**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
```

#### For Nginx:

```nginx
server {
    listen 80;
    server_name pizoo.ch www.pizoo.ch;

    root /var/www/pizoo-marketing/build;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Enable gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

---

## 🔗 Update Main App URL

Before deploying to production, update the app URL in these files:

### 1. src/components/Header.js
```javascript
const openApp = () => {
  window.open('https://app.pizoo.ch', '_blank'); // Update this URL
};
```

### 2. src/components/Hero.js
```javascript
const openApp = () => {
  window.open('https://app.pizoo.ch', '_blank'); // Update this URL
};
```

### 3. src/components/Download.js
```javascript
const openApp = () => {
  window.open('https://app.pizoo.ch', '_blank'); // Update this URL
};
```

---

## 🧪 Test Before Deployment

1. **Build locally:**
```bash
yarn build
serve -s build -p 5000
```

2. **Open:** http://localhost:5000

3. **Test:**
   - All pages load correctly
   - Language switching works
   - All buttons work
   - Responsive design on mobile
   - Blog CMS works at `/admin/blog`

---

## 📊 SEO Setup

### 1. Google Search Console
- Add property: `https://pizoo.ch`
- Submit sitemap: `https://pizoo.ch/sitemap.xml` (you need to create this)

### 2. robots.txt
Create `/public/robots.txt`:
```
User-agent: *
Allow: /

Sitemap: https://pizoo.ch/sitemap.xml
```

### 3. sitemap.xml
Create `/public/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://pizoo.ch/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://pizoo.ch/blog</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

---

## 🔒 SSL Certificate

Most hosting providers (Vercel, Netlify) provide free SSL automatically.

For custom servers:
```bash
sudo certbot --nginx -d pizoo.ch -d www.pizoo.ch
```

---

## 📱 Progressive Web App (PWA)

The site is PWA-ready! Just ensure:
1. HTTPS is enabled
2. `manifest.json` is served correctly
3. Service worker is registered (optional)

---

## 🎨 Customization for Production

### Update package.json
Add homepage field:
```json
{
  "homepage": "https://pizoo.ch",
  ...
}
```

### Environment Variables
For production-specific configs, create `.env.production`:
```
REACT_APP_MAIN_APP_URL=https://app.pizoo.ch
REACT_APP_API_URL=https://api.pizoo.ch
```

---

## 📈 Analytics (Optional)

### Google Analytics
Add to `public/index.html` before `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR_GA_ID');
</script>
```

---

## 🐛 Troubleshooting

### Issue: 404 on page refresh
**Solution:** Configure server to always serve `index.html` for all routes (see Apache/Nginx configs above)

### Issue: Styles not loading
**Solution:** Check that `homepage` in package.json matches your deployment URL

### Issue: Images not showing
**Solution:** Verify all image URLs are absolute or correctly referenced

---

## ✅ Deployment Checklist

Before going live:
- [ ] Update all app URLs to production
- [ ] Test all language versions
- [ ] Test on mobile devices
- [ ] Verify SSL certificate
- [ ] Set up Google Analytics
- [ ] Submit to Google Search Console
- [ ] Test all CTA buttons
- [ ] Verify blog CMS works
- [ ] Check page load speed (use Lighthouse)
- [ ] Test accessibility (use WAVE tool)

---

## 🚀 Quick Deploy Command

```bash
# One-line deploy to Vercel
cd /app/marketing-website && yarn build && vercel --prod
```

---

## 📞 Support

For deployment issues, contact the development team or refer to:
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [React Deployment Guide](https://create-react-app.dev/docs/deployment/)
