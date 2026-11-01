# Game of Thrones Sigil Quiz

A React + TypeScript rewrite of the sigil quiz from my old ASP.NET Web Forms portfolio project ([Near922/Main](https://github.com/Near922/Main)).

Each game has 20 questions. Every question names a house and shows four sigils; pick the one that belongs to that house. No house is asked about twice in the same game. After each pick, your card turns green or red and the correct sigil is highlighted for a moment before the next question. At the end you get your score as a percentage and a rank.

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
src/components/         StartScreen, QuizScreen, SigilGrid, ResultsScreen
src/App.tsx             switches between screens and runs the answer reveal
src/index.css           dark theme (gold accents, Cinzel headings, Inter body text)
```

## Differences from the Web Forms version

- Runs entirely in the browser. The original kept game state in the server session and round-tripped every click through an `UpdatePanel` postback.
- The house list is a typed TypeScript module instead of an XML file read at runtime.
- New dark design with a start screen, a progress bar and running score, answer feedback on the cards themselves, and a results screen in place of the game-over modal.
- "Exit" linked back to the portfolio home page; it's replaced by a Home button that returns to the start screen.
- Fixed house name typos: "Tuly" → "Tully", "Crakenhall" → "Crakehall".
