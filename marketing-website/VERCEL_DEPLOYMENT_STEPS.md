# 🚀 Vercel Deployment - Schritt-für-Schritt Anleitung

## ✅ Was bereits vorbereitet wurde

- ✅ Git Repository bereinigt (alter backup branch gelöscht)
- ✅ `vercel.json` Konfigurationsdatei erstellt
- ✅ `.vercelignore` Datei erstellt
- ✅ `package.json` mit homepage aktualisiert
- ✅ Build erfolgreich getestet (84.53 kB)
- ✅ Alle Komponenten funktionieren

---

## 📋 Schritt 1: Alte Vercel Projekte löschen

### Option A: Über Vercel Dashboard (Empfohlen)

1. Gehen Sie zu: https://vercel.com/dashboard
2. Für jedes alte Projekt:
   - Klicken Sie auf das Projekt
   - Settings → General → Delete Project
   - Bestätigen Sie mit dem Projektnamen

**Zu löschende Projekte:**
- `pizooo` (pizoo.ch)
- `pizoo.vercel.app`
- `pizoo-app`
- `pizoo-subscription`
- Alle `conflict_*` Projekte

### Option B: Über Vercel CLI

```bash
# Liste alle Projekte
vercel list

# Lösche ein Projekt
vercel remove <project-name>
```

---

## 📋 Schritt 2: GitHub Repository vorbereiten (bereits erledigt ✅)

Das Repository ist bereit unter:
```
Repository: Shatha-db/Pizooo
Branch: main
Pfad: /marketing-website
```

---

## 📋 Schritt 3: Neues Vercel Projekt erstellen

### Methode 1: Über Vercel Dashboard (Einfacher)

1. **Gehen Sie zu:** https://vercel.com/new

2. **Import Git Repository:**
   - Wählen Sie: `Shatha-db/Pizooo`
   - Falls nicht sichtbar: "Adjust GitHub App Permissions"

3. **Configure Project:**
   ```
   Project Name: pizoo-marketing
   Framework Preset: Create React App
   Root Directory: marketing-website
   Build Command: yarn build
   Output Directory: build
   Install Command: yarn install
   ```

4. **Environment Variables:**
   - REACT_APP_BACKEND_URL: `https://app.pizoo.ch` (später aktualisieren)
   - GENERATE_SOURCEMAP: `false`

5. **Deploy** klicken

---

### Methode 2: Über Vercel CLI

```bash
# 1. Vercel CLI installieren (falls nicht vorhanden)
npm install -g vercel

# 2. Login
vercel login

# 3. Zum Projekt-Ordner navigieren
cd /path/to/Pizooo/marketing-website

# 4. Deploy
vercel

# Bei Fragen:
# - Set up and deploy? → Yes
# - Which scope? → Wählen Sie Ihren Account
# - Link to existing project? → No
# - What's your project's name? → pizoo-marketing
# - In which directory is your code located? → ./
# - Want to override settings? → Yes
#   - Build Command: yarn build
#   - Output Directory: build
#   - Development Command: yarn start

# 5. Production Deploy
vercel --prod
```

---

## 📋 Schritt 4: Domain pizoo.ch verbinden

### Im Vercel Dashboard:

1. **Gehen Sie zu Ihrem Projekt:**
   - https://vercel.com/dashboard
   - Wählen Sie `pizoo-marketing`

2. **Settings → Domains:**
   - Klicken Sie auf "Add"
   - Geben Sie ein: `pizoo.ch`
   - Klicken Sie "Add"

3. **DNS Konfiguration:**

Vercel zeigt Ihnen die DNS-Einträge. Sie müssen diese in Ihrem DNS-Provider (z.B. Cloudflare, GoDaddy) einrichten:

**Für Apex Domain (pizoo.ch):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**Für www Subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

4. **Warten auf DNS Propagation:**
   - Normalerweise 5-10 Minuten
   - Maximal 24-48 Stunden

5. **SSL/HTTPS:**
   - Wird automatisch von Vercel aktiviert
   - Nach DNS-Propagation

---

## 📋 Schritt 5: Weiterleitungen konfigurieren

In Vercel Dashboard → Settings → Domains:

1. **www → non-www Weiterleitung:**
   - Klicken Sie auf `www.pizoo.ch`
   - "Redirect to": `pizoo.ch`
   - Speichern

---

## 📋 Schritt 6: Verifikation

### Deployment Status prüfen:

1. **Vercel Dashboard:**
   - Gehen Sie zu: https://vercel.com/<your-username>/pizoo-marketing
   - Deployments Tab
   - Status sollte "Ready" sein

2. **Website testen:**
   ```
   https://pizoo-marketing.vercel.app (temporäre URL)
   https://pizoo.ch (nach DNS-Update)
   ```

3. **Was zu testen:**
   - ✅ Alle Seiten laden
   - ✅ Sprachumschaltung funktioniert (10+ Sprachen)
   - ✅ Alle Bilder laden
   - ✅ Buttons funktionieren
   - ✅ Mobile Responsive
   - ✅ SSL/HTTPS aktiv

---

## 📋 Schritt 7: Continuous Deployment aktivieren

Vercel aktiviert automatisch CD:
- Jeder Push zu `main` → Automatic Production Deploy
- Pull Requests → Preview Deployments

---

## 🔧 Troubleshooting

### Problem: Build fehlschlägt

**Lösung:**
```bash
# Lokal testen
cd marketing-website
yarn install
yarn build

# Falls erfolgreich, Vercel Build Logs prüfen
```

### Problem: "Cannot find module"

**Lösung:**
- Vercel → Settings → General
- Node.js Version: 18.x
- Speichern und neu deployen

### Problem: Routing funktioniert nicht (404)

**Lösung:**
- Vercel sollte `vercel.json` automatisch nutzen
- Falls nicht: Settings → Rewrites
- Add: `/* → /index.html`

### Problem: Domain zeigt alte Version

**Lösung:**
```bash
# Browser Cache leeren
Ctrl + Shift + R (Windows)
Cmd + Shift + R (Mac)

# Oder
Inkognito-Modus testen
```

---

## 📊 Monitoring & Analytics

### Vercel Analytics aktivieren:

1. Vercel Dashboard → Settings → Analytics
2. Enable Analytics
3. Kostenlos bis 100k Requests/Monat

### Google Analytics:

Die Website ist bereits vorbereitet.
**Wichtig:** In `public/index.html` müssen Sie noch ersetzen:
```html
<!-- Von: -->
G-XXXXXXXXXX

<!-- Zu: -->
G-YOUR_REAL_ID
```

---

## 🎯 Final Checklist

Nach erfolgreichem Deployment:

- [ ] Alte Projekte gelöscht
- [ ] Neues Projekt erstellt
- [ ] Build erfolgreich
- [ ] Domain verbunden (pizoo.ch)
- [ ] DNS konfiguriert
- [ ] SSL aktiv (HTTPS)
- [ ] www → non-www Redirect
- [ ] Alle 10 Sprachen funktionieren
- [ ] Mobile funktioniert
- [ ] Google Analytics ID aktualisiert
- [ ] iOS App ID aktualisiert (falls vorhanden)
- [ ] Backend URLs aktualisiert (von pizoo-debug... zu app.pizoo.ch)

---

## 📧 Support

Bei Problemen:
- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
- GitHub: https://github.com/Shatha-db/Pizooo/issues

---

## ✅ Erwartete URLs nach Deployment

**Temporär:**
- https://pizoo-marketing.vercel.app
- https://pizoo-marketing-git-main-<username>.vercel.app

**Production:**
- https://pizoo.ch
- https://www.pizoo.ch (→ redirect zu pizoo.ch)

---

**Geschätzte Deployment-Zeit:** 15-30 Minuten
**DNS Propagation:** 5 Minuten bis 24 Stunden

🚀 Viel Erfolg!
