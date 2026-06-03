# Abdulhafiz — A Naming Ceremony

A beautiful naming ceremony webpage for baby Abdulhafiz, hosted on GitHub Pages.

## Folder Structure

```
abdulhafiz/
├── index.html        ← main page
├── styles.css        ← all styling
├── script.js         ← interactivity (name rotator, share, QR)
├── README.md         ← this file
└── assets/
    ├── baby-portrait.jpg
    └── arabic-name.jpg
```

## Hosting on GitHub Pages

### Step 1 — Create a GitHub repository
1. Go to https://github.com/new
2. Name it anything e.g. `abdulhafiz-naming-ceremony`
3. Set it to **Public**
4. Click **Create repository**

### Step 2 — Upload your files
**Option A — via GitHub website (easiest):**
1. Open your new repo
2. Click **Add file → Upload files**
3. Drag and drop: `index.html`, `styles.css`, `script.js`, and the entire `assets/` folder
4. Scroll down, click **Commit changes**

**Option B — via Git (terminal):**
```bash
git clone https://github.com/YOUR_USERNAME/abdulhafiz-naming-ceremony.git
cd abdulhafiz-naming-ceremony
cp -r /path/to/abdulhafiz/* .
git add .
git commit -m "Add naming ceremony page"
git push origin main
```

### Step 3 — Enable GitHub Pages
1. Go to your repo → **Settings** tab
2. Scroll to **Pages** in the left sidebar
3. Under **Source**, select **Deploy from a branch**
4. Choose branch: **main** | folder: **/ (root)**
5. Click **Save**

### Step 4 — Your site is live!
After ~1 minute, your site will be live at:
```
https://YOUR_USERNAME.github.io/abdulhafiz-naming-ceremony/
```

> GitHub will show the exact URL in Settings → Pages once it deploys.

## Update the QR code URL

Once live, open `script.js` and update the share URL so the QR code and share buttons point to your actual GitHub Pages link:

```js
// Around line 4 — change this:
function getShareLink() {
  return window.location.href;   // ← already uses the live URL automatically
}
```

The `getShareLink()` function already uses `window.location.href` so it will automatically use whatever URL the page is hosted at — no manual update needed.

---

*With love, from the Adesoye Opeyemi family*
