import type { Sigil } from './sigils.ts';

export const TOTAL_ROUNDS = 20;
export const CHOICES_PER_ROUND = 4;

export type Random = () => number;

export interface GameState {
  /** Every sigil the game can draw from. */
  readonly sigils: readonly Sigil[];
  readonly totalRounds: number;
  /** Zero-based count of rounds already answered. */
  readonly roundsPlayed: number;
  readonly correctAnswers: number;
  /** IDs of sigils that have already been the correct answer. Each house is asked about at most once. */
  readonly usedSigilIds: readonly number[];
  /** The sigil the player has to find this round. */
  readonly currentSigil: Sigil;
  /** The shuffled options shown this round; always contains currentSigil. */
  readonly choices: readonly Sigil[];
  readonly isActive: boolean;
}

export interface AnswerResult {
  readonly state: GameState;
  readonly isCorrect: boolean;
}

function shuffle<T>(items: readonly T[], random: Random): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j]!, result[i]!];
  }
  return result;
}

function pickRandom<T>(items: readonly T[], random: Random): T {
  const item = items[Math.floor(random() * items.length)];
  if (item === undefined) {
    throw new Error('Cannot pick from an empty list.');
  }
  return item;
}

/**
 * Picks a correct answer that hasn't been asked yet, plus distinct decoys
 * drawn from the full list, then shuffles them.
 */
function createRound(
  sigils: readonly Sigil[],
  usedSigilIds: readonly number[],
  random: Random,
): { currentSigil: Sigil; choices: Sigil[] } {
  const unused = sigils.filter((s) => !usedSigilIds.includes(s.id));
  const currentSigil = pickRandom(unused, random);

  const choices: Sigil[] = [currentSigil];
  while (choices.length < CHOICES_PER_ROUND) {
    const candidates = sigils.filter((s) => !choices.some((c) => c.id === s.id));
    choices.push(pickRandom(candidates, random));
  }

  return { currentSigil, choices: shuffle(choices, random) };
}

export function createGame(
  sigils: readonly Sigil[],
  totalRounds: number = TOTAL_ROUNDS,
  random: Random = Math.random,
): GameState {
  if (sigils.length < CHOICES_PER_ROUND) {
    throw new Error(`At least ${CHOICES_PER_ROUND} sigils are required.`);
  }
  if (totalRounds < 1 || totalRounds > sigils.length) {
    throw new Error(`totalRounds must be between 1 and ${sigils.length}.`);
  }

  const { currentSigil, choices } = createRound(sigils, [], random);
  return {
    sigils,
    totalRounds,
    roundsPlayed: 0,
    correctAnswers: 0,
    usedSigilIds: [currentSigil.id],
    currentSigil,
    choices,
    isActive: true,
  };
}

export function selectSigil(
  state: GameState,
  sigilId: number,
  random: Random = Math.random,
): AnswerResult {
  if (!state.isActive) {
    return { state, isCorrect: false };
  }

  const isCorrect = sigilId === state.currentSigil.id;
  const roundsPlayed = state.roundsPlayed + 1;
  const correctAnswers = state.correctAnswers + (isCorrect ? 1 : 0);
  const isActive = roundsPlayed < state.totalRounds;

  if (!isActive) {
    return {
      isCorrect,
      state: { ...state, roundsPlayed, correctAnswers, isActive },
    };
  }

  const { currentSigil, choices } = createRound(state.sigils, state.usedSigilIds, random);
  return {
    isCorrect,
    state: {
      ...state,
      roundsPlayed,
      correctAnswers,
      isActive,
      currentSigil,
      choices,
      usedSigilIds: [...state.usedSigilIds, currentSigil.id],
    },
  };
}

/** One-based number of the question being shown. */
export function currentRound(state: GameState): number {
  return Math.min(state.roundsPlayed + 1, state.totalRounds);
}

/** Percentage of correct answers, rounded to the nearest whole number. */
export function scorePercent(state: GameState): number {
  return Math.round((state.correctAnswers / state.totalRounds) * 100);
}
