import { useEffect, useRef } from 'react';

interface GameOverDialogProps {
  open: boolean;
  score: number;
  correctAnswers: number;
  totalRounds: number;
  onPlayAgain: () => void;
}

function scoreClassName(score: number): string {
  if (score > 90) return 'score score-high';
  if (score < 65) return 'score score-low';
  return 'score';
}

export function GameOverDialog({
  open,
  score,
  correctAnswers,
  totalRounds,
  onPlayAgain,
}: GameOverDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className="game-over"
      aria-labelledby="game-over-title"
      // The game is finished, so Escape starts a new one instead of leaving a dead board.
      onCancel={(event) => {
        event.preventDefault();
        onPlayAgain();
      }}
    >
      <h2 id="game-over-title">Game Over</h2>
      <p className="score-line">
        Your Score: <span className={scoreClassName(score)}>{score}%</span>
      </p>
      <p className="score-detail">
        {correctAnswers} of {totalRounds} correct
      </p>
      <button type="button" className="primary-button" onClick={onPlayAgain} autoFocus>
        Play Again
      </button>
    </dialog>
  );
}
