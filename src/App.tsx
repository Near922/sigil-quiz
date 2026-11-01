import { useState } from 'react';
import { FeedbackAlert } from './components/FeedbackAlert.tsx';
import { GameOverDialog } from './components/GameOverDialog.tsx';
import { SigilGrid } from './components/SigilGrid.tsx';
import { createGame, currentRound, scorePercent, selectSigil } from './game/sigilGame.ts';
import { SIGILS } from './game/sigils.ts';

type Feedback = { isCorrect: boolean } | null;

export default function App() {
  const [game, setGame] = useState(() => createGame(SIGILS));
  const [feedback, setFeedback] = useState<Feedback>(null);

  function handleSelect(sigilId: number) {
    const result = selectSigil(game, sigilId);
    setGame(result.state);
    setFeedback({ isCorrect: result.isCorrect });
  }

  function handlePlayAgain() {
    setGame(createGame(SIGILS));
    setFeedback(null);
  }

  return (
    <main className="quiz">
      <h1 className="title">Game of Thrones Sigil Quiz</h1>

      <div className="feedback-slot">
        {feedback && (
          <FeedbackAlert isCorrect={feedback.isCorrect} onDismiss={() => setFeedback(null)} />
        )}
      </div>

      <p className="question-number">
        Question {currentRound(game)} of {game.totalRounds}
      </p>
      <p className="question">
        Please choose the sigil that belongs to <strong>{game.currentSigil.house}</strong>
      </p>

      <SigilGrid choices={game.choices} onSelect={handleSelect} />

      <GameOverDialog
        open={!game.isActive}
        score={scorePercent(game)}
        correctAnswers={game.correctAnswers}
        totalRounds={game.totalRounds}
        onPlayAgain={handlePlayAgain}
      />
    </main>
  );
}
