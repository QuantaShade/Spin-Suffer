import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { RotateCcw, Trophy } from "lucide-react";
import { useI18n } from "@/provider/langProvider";
import { getAvatarById } from "@/components/avatars";
import { useGameStore } from "@/store/store";

// Distinct colors for player segments — alternating pink / white / dark
const SEGMENT_PALETTE = [
  { bg: "#ff146e", text: "#ffffff" },
  { bg: "#ffffff", text: "#111111" },
  { bg: "#1a1a1a", text: "#ff146e" },
  { bg: "#ff146e", text: "#ffffff" },
  { bg: "#ffffff", text: "#111111" },
  { bg: "#1a1a1a", text: "#ff146e" },
  { bg: "#ff146e", text: "#ffffff" },
  { bg: "#ffffff", text: "#111111" },
  { bg: "#1a1a1a", text: "#ff146e" },
  { bg: "#ff146e", text: "#ffffff" },
];

export default function SpinPage() {
  const { players, currentPlayerIndex, setSpinResult, roundNumber, resetGame } = useGameStore();
  const { isRTL } = useI18n();

  const wheelRef = useRef<SVGGElement>(null);
  const spinBtnRef = useRef<HTMLButtonElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const [isSpinning, setIsSpinning] = useState(false);
  const [landed, setLanded] = useState<string | null>(null); // player id
  const wheelAngleRef = useRef(0);
  const floatTl = useRef<gsap.core.Tween | null>(null);

  const currentPlayer = players[currentPlayerIndex];
  const TOTAL = players.length;
  const SEG = 360 / TOTAL;
  const R = 140;
  const CX = 160;
  const CY = 160;

  useEffect(() => {
    // Page entrance
    gsap.fromTo(pageRef.current,
      { opacity: 0, scale: 0.96 },
      { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }
    );

    // Idle float
    floatTl.current = gsap.to("#wheel-group-wrapper", {
      y: -10, duration: 2.5, ease: "sine.inOut", repeat: -1, yoyo: true,
    });
  }, []);

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setLanded(null);

    // pick a random player index (can be self too)
    const winnerIdx = Math.floor(Math.random() * TOTAL);
    const winner = players[winnerIdx];

    // The wheel rotates; the pointer is at top (12 o'clock).
    // Segment i starts at angle: SEG * i - 90 (because we start at -90° for top).
    // We want segment center at 270° (top = -90° = 270°) after rotation.
    // segment center in degrees: SEG * winnerIdx + SEG / 2
    // We need that angle to map to 270° after rotation.
    // So rotation = 270 - (SEG * winnerIdx + SEG/2) + extra full spins
    const extraSpins = 1440 + Math.random() * 720; // 4–6 full spins
    const segCenter = SEG * winnerIdx + SEG / 2;
    const targetRotation = wheelAngleRef.current + extraSpins + (270 - segCenter - (wheelAngleRef.current % 360));

    floatTl.current?.pause();
    gsap.to("#wheel-group-wrapper", { y: 0, duration: 0.3 });

    // Shake spin button
    gsap.to(spinBtnRef.current, {
      x: 5, duration: 0.06, repeat: 10, yoyo: true, ease: "none",
      onComplete: () => gsap.set(spinBtnRef.current, { x: 0 }),
    });

    gsap.to(wheelRef.current, {
      rotation: targetRotation,
      transformOrigin: `${CX}px ${CY}px`,
      duration: 4 + Math.random(),
      ease: "power4.out",
      onComplete: () => {
        wheelAngleRef.current = targetRotation;
        setIsSpinning(false);
        setLanded(winner.id);
        floatTl.current?.resume();

        // Bounce
        gsap.fromTo("#wheel-group-wrapper",
          { scale: 1.06 },
          { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.5)", transformOrigin: "center center" }
        );

        // Result pop
        gsap.fromTo(resultRef.current,
          { scale: 0.7, opacity: 0, y: 16 },
          { scale: 1, opacity: 1, y: 0, duration: 0.55, ease: "back.out(2.2)" }
        );
      },
    });
  };

  const handleAccept = () => {
    if (!landed) return;
    setSpinResult(landed);
  };

  // Build path segments
  const segments = players.map((player, i) => {
    const startAngle = SEG * i - 90;
    const endAngle = SEG * (i + 1) - 90;
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    const x1 = CX + R * Math.cos(startRad);
    const y1 = CY + R * Math.sin(startRad);
    const x2 = CX + R * Math.cos(endRad);
    const y2 = CY + R * Math.sin(endRad);
    const midRad = (((startAngle + endAngle) / 2) * Math.PI) / 180;
    const tx = CX + R * 0.62 * Math.cos(midRad);
    const ty = CY + R * 0.62 * Math.sin(midRad);
    const textAngle = (startAngle + endAngle) / 2 + 90;
    const avatar = getAvatarById(player.avatar);
    const palette = SEGMENT_PALETTE[i % SEGMENT_PALETTE.length];
    return { player, x1, y1, x2, y2, tx, ty, textAngle, avatar, palette };
  });

  const landedPlayer = players.find((p) => p.id === landed);

  return (
    <div
      ref={pageRef}
      dir={isRTL ? "rtl" : "ltr"}
      className="min-h-screen bg-black flex flex-col items-center justify-start px-4 py-10 relative overflow-hidden"
    >
      {/* Glow */}
      <div className="pointer-events-none fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[#ff146e]/6 blur-[120px]" />

      {/* Top bar */}
      <div className="w-full max-w-lg flex items-center justify-between mb-6 z-10">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-600 uppercase tracking-widest" style={{ fontFamily: "'Caveat', cursive" }}>
            Round
          </span>
          <span
            className="text-lg text-[#ff146e]"
            style={{ fontFamily: "'Permanent Marker', cursive" }}
          >
            #{roundNumber}
          </span>
        </div>

        {/* Scoreboard mini */}
        <div className="flex items-center gap-1.5">
          {players.map((p) => {
            const av = getAvatarById(p.avatar);
            return (
              <div
                key={p.id}
                title={`${p.name}: ${p.score} done`}
                className={`flex flex-col items-center ${currentPlayerIndex === players.indexOf(p) ? "opacity-100" : "opacity-40"}`}
              >
                <span className="text-lg">{av.emoji}</span>
                <span className="text-[10px] text-[#ff146e]" style={{ fontFamily: "'Permanent Marker', cursive" }}>
                  {p.score}
                </span>
              </div>
            );
          })}
        </div>

        <button
          onClick={resetGame}
          className="flex items-center gap-1 text-gray-600 text-xs hover:text-red-400 transition-colors"
          style={{ fontFamily: "'Caveat', cursive" }}
        >
          Quit
        </button>
      </div>

      {/* Whose turn */}
      <div className="text-center mb-6 z-10">
        <p className="text-gray-500 text-sm" style={{ fontFamily: "'Caveat', cursive" }}>
          {getAvatarById(currentPlayer.avatar).emoji} <span className="text-white font-bold">{currentPlayer.name}</span>'s turn to spin
        </p>
      </div>

      {/* Wheel */}
      <div id="wheel-group-wrapper" className="relative z-10">
        {/* Outer glow */}
        <div className="absolute inset-0 rounded-full bg-[#ff146e]/10 blur-2xl scale-110 pointer-events-none" />

        {/* Pointer */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3 z-20"
          style={{
            width: 0, height: 0,
            borderLeft: "15px solid transparent",
            borderRight: "15px solid transparent",
            borderTop: "30px solid #ff146e",
            filter: "drop-shadow(0 0 10px #ff146e)",
          }}
        />

        <svg width="320" height="320" viewBox="0 0 320 320"
          style={{ filter: "drop-shadow(0 0 40px rgba(255,20,110,0.3))" }}>
          {/* Wheel group — this is what we rotate */}
          <g ref={wheelRef}>
            {segments.map((seg) => (
              <g key={seg.player.id}>
                <path
                  d={`M ${CX} ${CY} L ${seg.x1} ${seg.y1} A ${R} ${R} 0 0 1 ${seg.x2} ${seg.y2} Z`}
                  fill={seg.palette.bg}
                  stroke="#000"
                  strokeWidth="2"
                />
                {/* Avatar emoji */}
                <text
                  x={seg.tx}
                  y={seg.ty - 8}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="18"
                  transform={`rotate(${seg.textAngle}, ${seg.tx}, ${seg.ty})`}
                >
                  {seg.avatar.emoji}
                </text>
                {/* Name */}
                <text
                  x={seg.tx}
                  y={seg.ty + 10}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={TOTAL > 6 ? "8" : "9"}
                  fontWeight="700"
                  fontFamily="'Permanent Marker', cursive"
                  fill={seg.palette.text}
                  transform={`rotate(${seg.textAngle}, ${seg.tx}, ${seg.ty})`}
                >
                  {seg.player.name.slice(0, 8)}
                </text>
              </g>
            ))}
            {/* Center circle */}
            <circle cx={CX} cy={CY} r="32" fill="#ff146e" stroke="#000" strokeWidth="3" />
            <circle cx={CX} cy={CY} r="24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeDasharray="4 3" />
            <text
              x={CX} y={CY}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="10" fontWeight="bold"
              fontFamily="'Permanent Marker', cursive"
              fill="white"
            >
              SPIN
            </text>
          </g>
        </svg>
      </div>

      {/* Spin button */}
      <button
        ref={spinBtnRef}
        onClick={handleSpin}
        disabled={isSpinning || !!landed}
        className="mt-8 z-10 flex items-center gap-3 rounded-xl border-2 border-[#ff146e] bg-[#ff146e] px-10 py-4 text-xl text-white font-bold shadow-lg shadow-[#ff146e]/30 transition-all hover:bg-transparent hover:text-[#ff146e] disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ fontFamily: "'Permanent Marker', cursive" }}
      >
        <RotateCcw className={`w-6 h-6 ${isSpinning ? "animate-spin" : ""}`} />
        {isSpinning ? "Spinning..." : landed ? "Spun!" : "SPIN"}
      </button>

      {/* Result card */}
      {landed && landedPlayer && (
        <div ref={resultRef} className="mt-6 z-10 w-full max-w-sm" style={{ opacity: 0 }}>
          <div className="rounded-2xl border border-[#ff146e]/30 bg-white/5 p-6 text-center backdrop-blur">
            <p className="text-xs tracking-widest text-gray-500 mb-2" style={{ fontFamily: "'Caveat', cursive" }}>
              THE WHEEL HAS SPOKEN
            </p>
            <div className="text-5xl mb-2">{getAvatarById(landedPlayer.avatar).emoji}</div>
            <p
              className="text-3xl text-white mb-1"
              style={{ fontFamily: "'Permanent Marker', cursive" }}
            >
              {landedPlayer.name}
            </p>
            <p className="text-gray-400 mb-5 text-base" style={{ fontFamily: "'Caveat', cursive" }}>
              gets a challenge!
            </p>
            <button
              onClick={handleAccept}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#ff146e] py-3 text-lg text-white font-bold shadow-lg shadow-[#ff146e]/30 transition-all hover:bg-[#e0105f]"
              style={{ fontFamily: "'Permanent Marker', cursive" }}
            >
              <Trophy className="w-5 h-5" />
              See the Challenge →
            </button>
          </div>
        </div>
      )}

      {/* Players row at bottom */}
      <div className="mt-8 z-10 flex gap-3 flex-wrap justify-center">
        {players.map((p) => {
          const av = getAvatarById(p.avatar);
          const isLanded = p.id === landed;
          return (
            <div
              key={p.id}
              className={`flex flex-col items-center gap-1 transition-all ${isLanded ? "scale-110" : "opacity-50 scale-95"}`}
            >
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl border-2 transition-all ${
                  isLanded
                    ? "border-[#ff146e] shadow-lg shadow-[#ff146e]/50"
                    : "border-white/10"
                }`}
                style={{ background: isLanded ? "rgba(255,20,110,0.15)" : "rgba(255,255,255,0.05)" }}
              >
                {av.emoji}
              </div>
              <span
                className="text-xs text-gray-400 max-w-[56px] truncate text-center"
                style={{ fontFamily: "'Caveat', cursive" }}
              >
                {p.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}