# Publish Spendly to GitHub

### First push

Create a new **empty public** repository named `spendly` at https://github.com/new. Open this project directory in PowerShell:

```powershell
npm.cmd install
npm.cmd run build
git init
git add .
git commit -m "Launch Spendly web expense tracker"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/spendly.git
git push -u origin main
```

Replace `YOUR-USERNAME`. Configure **Settings → Pages → Build and deployment → Source: GitHub Actions**. Your live URL will be `https://YOUR-USERNAME.github.io/spendly/`.

### Update an existing repository

Replace the old project files with these web-only files **without deleting `.git`**. Remove files from the old Electron version if they remain, including `.github/workflows/windows-desktop.yml`, `electron/`, and `DESKTOP_AND_WEB.md`. Then:

```powershell
git add -A
git commit -m "Switch Spendly to web-only local storage"
git push origin main
```

If the live site shows an old version, reload and clear *only* the service worker cache, not site storage. On Chrome/Edge: DevTools → Application → Service Workers → Unregister, then refresh. **Do not click Clear site data**, because that deletes saved expenses.

### Check deployment

Repository **Actions** → **Deploy Spendly to GitHub Pages**. Successful deployment will list a GitHub Pages URL. No GitHub token or secrets are needed for the standard Pages workflow.

### Important

Browser-local records are attached to the website origin. Changing from `localhost` to `github.io`, or switching domains, will not automatically transfer those records. Use **Settings → Export backup** on the old site and **Import backup** on the new one.
