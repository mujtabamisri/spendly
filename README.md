# Spendly — Money, made clear.

**A free, responsive, privacy-first expense tracker** built with React, TypeScript, Vite, Recharts, Motion, and Lucide.

Created by **Mujtaba Ali Misri**. Licensed under the **MIT License** (see [LICENSE](LICENSE)).

## Features

- Track income and expenses, search, filter, and edit transactions
- Monthly budgets, savings goals, and charts
- Themes, high contrast, large text, and reduced motion settings
- Browser-local persistence with `localStorage`
- JSON backups (export/import) and CSV export
- No registration, cloud database, OAuth, Electron, or desktop installer

## Run locally

Requires Node.js 20+ and npm.

```powershell
npm.cmd install
npm.cmd run dev
```

Open the URL shown by Vite (typically `http://127.0.0.1:5173`).

Check production output:

```powershell
npm.cmd run build
```

## Deploy free to GitHub Pages

1. Create an empty public GitHub repository named `spendly` (do not add a README or license on GitHub).
2. Commit and push this folder to its `main` branch. See [PUBLISHING.md](PUBLISHING.md) for commands.
3. In **Settings → Pages**, select **GitHub Actions** as the source.
4. Open the **Actions** tab and verify the **Deploy Spendly to GitHub Pages** workflow succeeds.
5. Visit `https://YOUR-USERNAME.github.io/spendly/`.

The workflow runs `npm install` and `npm run build`, then publishes `dist/`. No server or API key is needed.

## Privacy and persistence

Financial records are stored in the **visitor's own browser**, under the `spendly.v1` localStorage key. A GitHub Pages visitor does not upload expenses to GitHub. Other browsers and devices have separate data. Records typically survive a tab closing or computer restart, but can be erased by clearing site data, browser privacy settings, eviction, or changing the site's domain. The browser storage is **not encrypted**; anybody with access to that browser profile, or scripts allowed to run on the site, may be able to read it.

Export JSON backups periodically, especially before changing domains, clearing browser data, or switching devices. Import them on another device to transfer records. This application intentionally has **no cloud sync**.

The code does not intentionally send financial records to a server, though visiting GitHub Pages necessarily sends ordinary web requests to the hosting service. Keep the site code and dependencies updated.

## Notes

- Changing the displayed currency changes formatting, not historical conversion.
- Recurring transactions are labeled; they are not automatically charged or inserted.
- This tool is not financial advice.

## License

MIT © 2026 Mujtaba Ali Misri.
