import type { Sigil } from './sigils.ts';

export function sigilImageUrl(sigil: Sigil): string {
  return `${import.meta.env.BASE_URL}sigils/${sigil.id}.png`;
}
