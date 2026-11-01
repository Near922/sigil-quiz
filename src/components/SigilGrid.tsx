import type { Sigil } from '../game/sigils.ts';

interface SigilGridProps {
  choices: readonly Sigil[];
  onSelect: (sigilId: number) => void;
}

function sigilImageUrl(sigil: Sigil): string {
  return `${import.meta.env.BASE_URL}sigils/${sigil.id}.png`;
}

export function SigilGrid({ choices, onSelect }: SigilGridProps) {
  return (
    <div className="sigil-grid">
      {choices.map((sigil, index) => (
        <button
          key={sigil.id}
          type="button"
          className="sigil-button"
          onClick={() => onSelect(sigil.id)}
        >
          {/* Alt text deliberately omits the house name so it doesn't give away the answer. */}
          <img src={sigilImageUrl(sigil)} alt={`Sigil option ${index + 1}`} />
        </button>
      ))}
    </div>
  );
}
