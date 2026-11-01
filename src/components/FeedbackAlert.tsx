interface FeedbackAlertProps {
  isCorrect: boolean;
  onDismiss: () => void;
}

export function FeedbackAlert({ isCorrect, onDismiss }: FeedbackAlertProps) {
  return (
    <div className={`alert ${isCorrect ? 'alert-success' : 'alert-danger'}`} role="status">
      <span>
        <strong>{isCorrect ? 'Correct!' : 'Incorrect!'}</strong>{' '}
        {isCorrect ? 'You chose the correct answer.' : 'You chose the incorrect answer.'}
      </span>
      <button type="button" className="alert-close" aria-label="Close" onClick={onDismiss}>
        &times;
      </button>
    </div>
  );
}
