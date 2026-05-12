import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Plus, Trash2, ChevronRight, Users } from "lucide-react";
import { useGameStore, type Player } from "@/store/store";
import { AVATARS } from "@/components/avatars";
import { useI18n } from "@/provider/langProvider";
import { useNavigate } from "react-router-dom";

const MIN_PLAYERS = 2;
const MAX_PLAYERS = 10;

function generateId() {
  return Math.random().toString(36).slice(2, 9);
}

function makePlayer(): Player {
  return { id: generateId(), name: "", avatar: AVATARS[0].id, score: 0, skips: 0 };
}

interface PlayerRowProps {
  player: Player;
  index: number;
  onChange: (id: string, field: keyof Player, value: string) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
  isRTL: boolean;
}

function PlayerRow({ player, index, onChange, onRemove, canRemove, isRTL }: PlayerRowProps) {
  const [showAvatars, setShowAvatars] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(rowRef.current,
      { x: isRTL ? 40 : -40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.4, ease: "back.out(1.5)" }
    );
  }, []);

  const selectedAvatar = AVATARS.find((a) => a.id === player.avatar) ?? AVATARS[0];

  return (
    <div ref={rowRef} className="relative">
      <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 transition-all hover:border-[#ff146e]/30">
        {/* Number */}
        <span
          className="shrink-0 w-7 h-7 flex items-center justify-center rounded-full bg-[#ff146e]/10 text-[#ff146e] text-xs font-bold"
          style={{ fontFamily: "'Permanent Marker', cursive" }}
        >
          {index + 1}
        </span>

        {/* Avatar picker trigger */}
        <button
          type="button"
          onClick={() => setShowAvatars((v) => !v)}
          className="shrink-0 w-11 h-11 rounded-full border-2 border-white/20 bg-white/10 flex items-center justify-center text-2xl transition-all hover:border-[#ff146e] hover:bg-[#ff146e]/10"
        >
          {selectedAvatar.emoji}
        </button>

        {/* Name input */}
        <input
          type="text"
          value={player.name}
          onChange={(e) => onChange(player.id, "name", e.target.value)}
          placeholder={`Player ${index + 1}`}
          maxLength={20}
          className="flex-1 min-w-0 bg-transparent text-white placeholder-gray-600 outline-none text-base"
          style={{ fontFamily: "'Caveat', cursive", fontSize: "1.1rem" }}
        />

        {/* Remove */}
        {canRemove && (
          <button
            type="button"
            onClick={() => onRemove(player.id)}
            className="shrink-0 p-1.5 rounded-lg text-gray-600 transition-colors hover:text-red-400 hover:bg-red-400/10"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Avatar grid dropdown */}
      {showAvatars && (
        <div className="absolute z-20 top-full mt-2 left-0 right-0 rounded-xl border border-white/10 bg-[#111] p-3 shadow-2xl shadow-black">
          <p className="text-xs text-gray-500 mb-2" style={{ fontFamily: "'Caveat', cursive" }}>
            Pick an avatar
          </p>
          <div className="grid grid-cols-6 gap-2">
            {AVATARS.map((av) => (
              <button
                key={av.id}
                type="button"
                onClick={() => {
                  onChange(player.id, "avatar", av.id);
                  setShowAvatars(false);
                }}
                className={`text-2xl p-1.5 rounded-lg transition-all hover:bg-white/10 ${
                  player.avatar === av.id ? "bg-[#ff146e]/20 ring-2 ring-[#ff146e]" : ""
                }`}
              >
                {av.emoji}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function SetupPage() {
  const navigate = useNavigate();
  const { setPlayers, startGame, setScreen } = useGameStore();
  const { isRTL } = useI18n();
  const [players, setLocalPlayers] = useState<Player[]>([makePlayer(), makePlayer()]);
  const [error, setError] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "back.out(1.5)" }
    );
    gsap.fromTo(containerRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  const addPlayer = () => {
    if (players.length >= MAX_PLAYERS) return;
    setLocalPlayers((prev) => [...prev, makePlayer()]);
  };

  const removePlayer = (id: string) => {
    setLocalPlayers((prev) => prev.filter((p) => p.id !== id));
  };

  const updatePlayer = (id: string, field: keyof Player, value: string) => {
    setLocalPlayers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const handleSubmit = () => {
    const named = players.map((p, i) => ({
      ...p,
      name: p.name.trim() || `Player ${i + 1}`,
    }));

    if (named.length < MIN_PLAYERS) {
      setError("Need at least 2 players!");
      return;
    }

    setError("");
    setPlayers(named);

    // Animate out then start
    gsap.to(containerRef.current, {
      y: -40, opacity: 0, duration: 0.4, ease: "power2.in",
      onComplete: startGame,
    });
    setTimeout(() => {
        navigate("/play")
    }, 1000)
  };

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="min-h-screen bg-black flex flex-col items-center justify-center px-4 py-16"
    >
      {/* Glow */}
      <div className="pointer-events-none fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[#ff146e]/8 blur-[100px]" />

      <h1
        ref={titleRef}
        className="text-5xl md:text-6xl text-white mb-2 text-center"
        style={{ fontFamily: "'Permanent Marker', cursive" }}
      >
        Who's <span className="text-[#ff146e]">Playing?</span>
      </h1>
      <p className="text-gray-500 mb-10 text-center" style={{ fontFamily: "'Caveat', cursive", fontSize: "1.2rem" }}>
        Add up to {MAX_PLAYERS} players. Pick your avatars. Meet your fate.
      </p>

      <div ref={containerRef} className="w-full max-w-md z-10">
        {/* Players list */}
        <div className="flex flex-col gap-3 mb-4">
          {players.map((player, i) => (
            <PlayerRow
              key={player.id}
              player={player}
              index={i}
              onChange={updatePlayer}
              onRemove={removePlayer}
              canRemove={players.length > MIN_PLAYERS}
              isRTL={isRTL}
            />
          ))}
        </div>

        {/* Add player */}
        {players.length < MAX_PLAYERS && (
          <button
            type="button"
            onClick={addPlayer}
            className="w-full flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-white/15 py-3 text-gray-500 transition-all hover:border-[#ff146e]/50 hover:text-[#ff146e] hover:bg-[#ff146e]/5 mb-6"
            style={{ fontFamily: "'Caveat', cursive", fontSize: "1.1rem" }}
          >
            <Plus className="w-4 h-4" />
            Add Player ({players.length}/{MAX_PLAYERS})
          </button>
        )}

        {/* Error */}
        {error && (
          <p className="text-red-400 text-sm text-center mb-4" style={{ fontFamily: "'Caveat', cursive" }}>
            {error}
          </p>
        )}

        {/* Players summary preview */}
        <div className="flex items-center gap-2 mb-6 flex-wrap justify-center">
          <Users className="w-4 h-4 text-gray-500" />
          {players.map((p, i) => {
            const av = AVATARS.find((a) => a.id === p.avatar);
            return (
              <span
                key={p.id}
                className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-gray-300"
              >
                {av?.emoji} {p.name || `P${i + 1}`}
              </span>
            );
          })}
        </div>

        {/* Start button */}
        <button
          onClick={handleSubmit}
          className="w-full flex items-center justify-center gap-3 rounded-xl bg-[#ff146e] py-4 text-xl text-white font-bold shadow-lg shadow-[#ff146e]/30 transition-all hover:bg-[#e0105f] hover:-translate-y-0.5 active:translate-y-0"
          style={{ fontFamily: "'Permanent Marker', cursive" }}
        >
          Start the Game
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Back */}
        <button
          onClick={() => setScreen("landing")}
          className="w-full mt-3 py-3 text-gray-600 text-sm hover:text-gray-400 transition-colors"
          style={{ fontFamily: "'Caveat', cursive" }}
        >
          ← Back to home
        </button>
      </div>
    </div>
  );
}