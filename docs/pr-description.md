# Big cleanup + Clear button + Socket.IO v4

**Overview**
- Big cleanup and modernization: server moved to `server/`, Socket.IO upgraded to v4, clear-canvas added, and docs refreshed.
- Focused on making the app easier to run, tweak, and deploy without breaking the vibe.

**What’s In**
- Server reorg: `server/app.js` + `server/config.js` with env-driven config.
- Socket.IO v4 everywhere: server + client CDN.
- Clear Canvas button: wipes the board for everyone and resets undo/redo.
- Centralized socket handling: `public/js/socket-manager.js` to keep events tidy.
- Safety stuff: CORS, basic input checks, tool whitelist, `.gitignore` cleanup.
- README glow-up with setup, usage, and deployment tips.
- Typo fix: `reciever.js` → `receiver.js`.

**How to Try**
- `npm install`
- `cp .env.example .env` and set `SOCKET_URL=http://localhost:3000`
- `npm run dev` → open `http://localhost:3000`
- Open two tabs, draw, hit Clear, watch both canvases wipe.

**Notes**
- Socket.IO is now v4, so external clients should match.
- Entry point is `server/app.js`; static files live in `public/`.
