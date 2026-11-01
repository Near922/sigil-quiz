import type { Sigil } from '../game/sigils.ts';
import { sigilImageUrl } from '../game/sigilImage.ts';

interface SigilGridProps {
  choices: readonly Sigil[];
  correctId: number;
  /** The sigil the player picked this round, or null while they are still choosing. */
  selectedId: number | null;
  onSelect: (sigilId: number) => void;
}

type CardState = 'idle' | 'correct' | 'wrong' | 'dimmed';

function cardState(sigilId: number, correctId: number, selectedId: number | null): CardState {
  if (selectedId === null) return 'idle';
  if (sigilId === correctId) return 'correct';
  if (sigilId === selectedId) return 'wrong';
  return 'dimmed';
}

export function SigilGrid({ choices, correctId, selectedId, onSelect }: SigilGridProps) {
  const revealed = selectedId !== null;

  return (
    <div className="sigil-grid">
      {choices.map((sigil, index) => {
        const state = cardState(sigil.id, correctId, selectedId);
        return (
          <button
            key={sigil.id}
            type="button"
            className={`sigil-card sigil-card--${state}`}
            style={{ animationDelay: `${index * 60}ms` }}
            disabled={revealed}
            onClick={() => onSelect(sigil.id)}
          >
            {/* Alt text deliberately omits the house name so it doesn't give away the answer. */}
            <img src={sigilImageUrl(sigil)} alt={`Sigil option ${index + 1}`} />
            {(state === 'correct' || state === 'wrong') && (
              <span className="sigil-card__badge" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  {state === 'correct' ? <path d="M5 12.5l4.5 4.5L19 7.5" /> : <path d="M6 6l12 12M18 6L6 18" />}
                </svg>
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
