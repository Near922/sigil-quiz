# Game of Thrones Sigil Quiz

A React + TypeScript rewrite of the sigil quiz from my old ASP.NET Web Forms portfolio project ([Near922/Main](https://github.com/Near922/Main)).

Each game has 20 questions. Every question names a house and shows four sigils; pick the one that belongs to that house. No house is asked about twice in the same game. At the end you get your score as a percentage.

## Running locally

Requires Node.js 20.19+ or 22.12+ (Vite 7).

```bash
npm install
npm run dev       # start the dev server
npm run build     # type-check and build to dist/
npm run preview   # serve the production build
```

## Project layout

```
public/sigils/          sigil images, named {id}.png
src/game/sigils.ts      house list (ported from Sigils.xml)
src/game/sigilGame.ts   game rules as pure functions (no React)
src/components/         SigilGrid, FeedbackAlert, GameOverDialog
src/App.tsx             wires the game state to the UI
```

## Differences from the Web Forms version

- Runs entirely in the browser. The original kept game state in the server session and round-tripped every click through an `UpdatePanel` postback.
- The house list is a typed TypeScript module instead of an XML file read at runtime.
- The game-over modal uses the native `<dialog>` element instead of Bootstrap/jQuery. "Exit" and the close buttons linked back to the portfolio home page, so they were dropped; Escape starts a new game.
- Fixed house name typos: "Tuly" → "Tully", "Crakenhall" → "Crakehall".
