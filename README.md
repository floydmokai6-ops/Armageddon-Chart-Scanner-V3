# Armageddon Scanner (PWA)

Standalone confluence scanner + AI screenshot analyzer, powered by a faithful client-side port of Armageddon_Trading_Robot.mq5's full strategy engine. Analysis only — it never places trades.

## Files
- `index.html` — the app
- `manifest.webmanifest`, `sw.js`, `icon-*.png` — PWA scaffolding (installable, works offline for the app shell)

## Host it (pick one)
- **Quickest test:** open `index.html` directly in a mobile browser — everything works except "Add to Home Screen" and offline caching, which need it served over http(s), not `file://`.
- **Real hosting (free, minutes):** drag the whole `armageddon-scanner` folder into Netlify Drop (app.netlify.com/drop), or `npx serve armageddon-scanner` on your own machine, or push it to GitHub Pages / Vercel / any static host. No build step — it's plain files.
- Once hosted, open the URL on your phone → browser menu → **Add to Home Screen** (iOS Safari) or the install prompt (Android Chrome) → it runs full-screen like a native app.

## What you'll need at first run
- A free **Twelve Data** API key (twelvedata.com) for live candles — pasted into the app, kept in your browser only.
- To use Screenshot Analysis: it calls `api.anthropic.com` directly from the browser. If you want that working outside of environments that proxy the key for you, you'll need to point it at your own backend/key — right now it assumes the call is authorized the same way Claude-in-artifacts calls are. Flag it if screenshots stop working once hosted standalone and I'll wire in a proper key field.

## What's faithfully ported from the EA
SMC, Trendline Breakout, CRT, Price Action, Supply & Demand, Shadow Hunter/Zero Float, Scalping Momentum, and News Breakout — same asset-class routing, same style→timeframe mapping, same H4+H1 bias filter, same confluence vote threshold, same tuned news-window/delay/buffer/one-shot logic. Differences, by necessity: MT5 spread/session filters don't apply (no live broker feed), and News Mode's release time is entered manually instead of read from MT5's calendar.
