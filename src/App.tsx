import { useEffect, useRef, useState } from 'react';
import { QuizScreen } from './components/QuizScreen.tsx';
import { ResultsScreen } from './components/ResultsScreen.tsx';
import { StartScreen } from './components/StartScreen.tsx';
import { createGame, scorePercent, selectSigil } from './game/sigilGame.ts';
import { SIGILS } from './game/sigils.ts';

type Phase = 'start' | 'playing' | 'results';

/** How long the right/wrong highlight stays on screen before the next question. */
const REVEAL_MS = 1200;

export default function App() {
  const [phase, setPhase] = useState<Phase>('start');
  const [game, setGame] = useState(() => createGame(SIGILS));
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const timerRef = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  function startGame() {
    window.clearTimeout(timerRef.current);
    setGame(createGame(SIGILS));
    setSelectedId(null);
    setPhase('playing');
  }

  function handleSelect(sigilId: number) {
    if (selectedId !== null) return;
    setSelectedId(sigilId);

    timerRef.current = window.setTimeout(() => {
      const { state } = selectSigil(game, sigilId);
      setGame(state);
      setSelectedId(null);
      if (!state.isActive) setPhase('results');
    }, REVEAL_MS);
  }

  return (
    <main className="app">
      {phase === 'start' && <StartScreen onStart={startGame} />}
      {phase === 'playing' && (
        <QuizScreen game={game} selectedId={selectedId} onSelect={handleSelect} />
      )}
      {phase === 'results' && (
        <ResultsScreen
          score={scorePercent(game)}
          correctAnswers={game.correctAnswers}
          totalRounds={game.totalRounds}
          onPlayAgain={startGame}
          onHome={() => setPhase('start')}
        />
      )}
    </main>
  );
}
