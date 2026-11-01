import { useEffect, useRef, type CSSProperties } from 'react';

interface ResultsScreenProps {
  score: number;
  correctAnswers: number;
  totalRounds: number;
  onPlayAgain: () => void;
  onHome: () => void;
}

// Same thresholds the Web Forms version used to colour the score.
function rating(score: number): { title: string; tone: 'high' | 'mid' | 'low' } {
  if (score > 90) return { title: 'Master of Heraldry', tone: 'high' };
  if (score >= 65) return { title: 'Sworn Sword', tone: 'mid' };
  return { title: 'You know nothing', tone: 'low' };
}

export function ResultsScreen({
  score,
  correctAnswers,
  totalRounds,
  onPlayAgain,
  onHome,
}: ResultsScreenProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { title, tone } = rating(score);

  // Move focus here so screen readers announce the result.
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <section className="screen results-screen">
      <p className="eyebrow">Game over</p>
      <h1 className="display-title" ref={headingRef} tabIndex={-1}>
        {title}
      </h1>

      <div className={`score-ring score-ring--${tone}`} style={{ '--score': score } as CSSProperties}>
        <span className="score-ring__value">{score}%</span>
      </div>

      <p className="lede">
        You named {correctAnswers} of {totalRounds} houses correctly.
      </p>

      <div className="button-row">
        <button type="button" className="primary-button" onClick={onPlayAgain}>
          Play again
        </button>
        <button type="button" className="ghost-button" onClick={onHome}>
          Home
        </button>
      </div>
    </section>
  );
}
