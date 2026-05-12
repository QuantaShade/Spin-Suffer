import { getRandomChallenge, type Challenge } from "@/provider/challenges";
import { create } from "zustand";

export type GameScreen = "landing" | "setup" | "spin" | "challenge" | "done";

export interface Player {
  id: string;
  name: string;
  avatar: string; // emoji or avatar key
  score: number;   // challenges completed
  skips: number;   // times skipped
}

interface GameState {
  screen: GameScreen;
  players: Player[];
  currentPlayerIndex: number;
  currentChallenge: Challenge | null;
  lastChallengeId: string | null;
  spinResult: string | null; // player id that was spun to
  roundNumber: number;

  // Actions
  setScreen: (s: GameScreen) => void;
  setPlayers: (players: Player[]) => void;
  startGame: () => void;
  setSpinResult: (playerId: string) => void;
  drawChallenge: () => void;
  completeChallenge: () => void;
  skipChallenge: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  screen: "landing",
  players: [],
  currentPlayerIndex: 0,
  currentChallenge: null,
  lastChallengeId: null,
  spinResult: null,
  roundNumber: 1,

  setScreen: (screen) => set({ screen }),

  setPlayers: (players) => set({ players }),

  startGame: () => {
    set({ screen: "spin", currentPlayerIndex: 0, roundNumber: 1, spinResult: null, currentChallenge: null });
  },

  setSpinResult: (playerId) => {
    set({ spinResult: playerId, screen: "challenge" });
    get().drawChallenge();
  },

  drawChallenge: () => {
    const challenge = getRandomChallenge(get().lastChallengeId ?? undefined);
    set({ currentChallenge: challenge, lastChallengeId: challenge.id });
  },

  completeChallenge: () => {
    const { players, spinResult } = get();
    const updated = players.map((p) =>
      p.id === spinResult ? { ...p, score: p.score + 1 } : p
    );
    const nextIdx = (get().currentPlayerIndex + 1) % players.length;
    set({
      players: updated,
      screen: "spin",
      currentPlayerIndex: nextIdx,
      currentChallenge: null,
      spinResult: null,
      roundNumber: get().roundNumber + 1,
    });
  },

  skipChallenge: () => {
    const { players, spinResult } = get();
    const updated = players.map((p) =>
      p.id === spinResult ? { ...p, skips: p.skips + 1 } : p
    );
    set({ players: updated });
    get().drawChallenge(); // draw a new one for the same player
  },

  resetGame: () =>
    set({
      screen: "landing",
      players: [],
      currentPlayerIndex: 0,
      currentChallenge: null,
      lastChallengeId: null,
      spinResult: null,
      roundNumber: 1,
    }),
}));