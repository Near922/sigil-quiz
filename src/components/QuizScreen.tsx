import type { GameState } from '../game/sigilGame.ts';
import { currentRound } from '../game/sigilGame.ts';
import { SigilGrid } from './SigilGrid.tsx';

interface QuizScreenProps {
  game: GameState;
  selectedId: number | null;
  onSelect: (sigilId: number) => void;
}

export function QuizScreen({ game, selectedId, onSelect }: QuizScreenProps) {
  const revealed = selectedId !== null;
  const isCorrect = revealed && selectedId === game.currentSigil.id;

  // While the answer is being revealed, count it toward progress and score straight away.
  const answered = game.roundsPlayed + (revealed ? 1 : 0);
  const score = game.correctAnswers + (isCorrect ? 1 : 0);
  const progress = (answered / game.totalRounds) * 100;

  return (
    <section className="screen quiz-screen">
      <header className="quiz-header">
        <div className="quiz-stats">
          <span>
            Question <strong>{currentRound(game)}</strong> / {game.totalRounds}
          </span>
          <span>
            Score <strong>{score}</strong>
          </span>
        </div>
        <div
          className="progress"
          role="progressbar"
          aria-label="Quiz progress"
          aria-valuemin={0}
          aria-valuemax={game.totalRounds}
          aria-valuenow={answered}
        >
          <div className="progress__fill" style={{ width: `${progress}%` }} />
        </div>
      </header>

      <div className="prompt">
        <p className="eyebrow">Which sigil belongs to</p>
        <h2 className="house-name">{game.currentSigil.house}</h2>
      </div>

      <SigilGrid
        // Re-mount each round so the cards replay their entrance animation.
        key={game.roundsPlayed}
        choices={game.choices}
        correctId={game.currentSigil.id}
        selectedId={selectedId}
        onSelect={onSelect}
      />

      <p className={`verdict ${revealed ? (isCorrect ? 'verdict--correct' : 'verdict--wrong') : ''}`} aria-live="polite">
        {revealed && (isCorrect ? 'Correct!' : 'Not quite. The correct sigil is highlighted.')}
      </p>
    </section>
  );
}
