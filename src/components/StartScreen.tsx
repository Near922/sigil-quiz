import { SIGILS } from '../game/sigils.ts';
import { sigilImageUrl } from '../game/sigilImage.ts';
import { CHOICES_PER_ROUND, TOTAL_ROUNDS } from '../game/sigilGame.ts';

// Great houses shown on the start screen (Stark, Lannister, Targaryen, Baratheon, Greyjoy, Tyrell, Martell, Arryn).
const SHOWCASE_IDS = [12, 1, 16, 11, 15, 3, 10, 4];
const SHOWCASE = SIGILS.filter((s) => SHOWCASE_IDS.includes(s.id));

interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <section className="screen start-screen">
      <div className="showcase" aria-hidden="true">
        {SHOWCASE.map((sigil, index) => (
          <img
            key={sigil.id}
            src={sigilImageUrl(sigil)}
            alt=""
            style={{ animationDelay: `${index * 70}ms` }}
          />
        ))}
      </div>

      <p className="eyebrow">A Game of Thrones quiz</p>
      <h1 className="display-title">Sigils of Westeros</h1>
      <p className="lede">
        {TOTAL_ROUNDS} houses. {CHOICES_PER_ROUND} banners each. Can you tell which sigil flies over
        which house?
      </p>

      <button type="button" className="primary-button" onClick={onStart} autoFocus>
        Begin
      </button>
    </section>
  );
}
