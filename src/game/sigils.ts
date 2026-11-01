export interface Sigil {
  id: number;
  house: string;
}

/**
 * Ported from Sigils.xml in the original Web Forms project.
 * The image for each sigil lives at public/sigils/{id}.png.
 */
export const SIGILS: readonly Sigil[] = [
  { id: 0, house: 'House Baratheon of Dragonstone' },
  { id: 1, house: 'House Lannister' },
  { id: 2, house: 'House Tully' },
  { id: 3, house: 'House Tyrell' },
  { id: 4, house: 'House Arryn' },
  { id: 5, house: 'House Mallister' },
  { id: 6, house: 'House Marbrand' },
  { id: 7, house: 'House Swyft' },
  { id: 8, house: "House Baratheon of Storm's End (Renly)" },
  { id: 9, house: 'House Bolton' },
  { id: 10, house: 'House Martell' },
  { id: 11, house: 'House Baratheon (Robert)' },
  { id: 12, house: 'House Stark' },
  { id: 13, house: 'House Bracken' },
  { id: 14, house: 'House Payne' },
  { id: 15, house: 'House Greyjoy' },
  { id: 16, house: 'House Targaryen' },
  { id: 17, house: 'House Karstark' },
  { id: 18, house: 'House Florent' },
  { id: 19, house: 'House Umber' },
  { id: 20, house: 'House Blackwood' },
  { id: 21, house: 'House Crakehall' },
  { id: 22, house: 'House Redwyne' },
  { id: 23, house: 'House Frey' },
  { id: 24, house: 'House Clegane' },
  { id: 25, house: 'House Mormont' },
  { id: 26, house: 'House Selmy' },
  { id: 27, house: 'House Manderly' },
  { id: 28, house: 'House Reed' },
  { id: 29, house: 'House Whent' },
  { id: 30, house: 'House Tarth' },
  { id: 31, house: 'House Caron' },
  { id: 32, house: 'House Swann' },
];
