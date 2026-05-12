import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Play, Users, Zap, Trophy, RotateCcw, Skull } from "lucide-react";
import { useI18n } from "@/components/provider/langProvider";
import { Link } from "react-router-dom";

const WHEEL_COLORS = [
  "#ff146e", "#ffffff", "#ff146e", "#1a1a1a",
  "#ff146e", "#ffffff", "#ff146e", "#1a1a1a",
];

export default function HeroSection() {
  const { t, isRTL } = useI18n();
  const h = t.hero;
  const challengeItems = t.challenges.items;

  const wheelRef = useRef<SVGSVGElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const spinBtnRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);

  const [isSpinning, setIsSpinning] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState<{ label: string; text: string } | null>(null);
  const wheelAngleRef = useRef(0);
  const floatTweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance timeline
      const tl = gsap.timeline({ defaults: { ease: "back.out(1.7)" } });
      tl.fromTo(badgeRef.current, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })
        .fromTo(titleRef.current, { y: 50, opacity: 0, skewY: 3 }, { y: 0, opacity: 1, skewY: 0, duration: 0.8 }, "-=0.3")
        .fromTo(subtitleRef.current, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.4")
        .fromTo(buttonsRef.current, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.3")
        .fromTo(statsRef.current, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.3");

      // Wheel entrance
      gsap.fromTo(floatRef.current,
        { scale: 0.4, opacity: 0, rotation: -200 },
        { scale: 1, opacity: 1, rotation: 0, duration: 1.3, ease: "elastic.out(1, 0.55)", delay: 0.3 }
      );

      // Player bubbles stagger
      gsap.fromTo(".player-bubble",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, stagger: 0.13, ease: "back.out(2)", delay: 0.8 }
      );

      // Idle float
      floatTweenRef.current = gsap.to(floatRef.current, {
        y: -14,
        duration: 2.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    });

    return () => ctx.revert();
  }, []);

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setCurrentChallenge(null);
    if (cardRef.current) cardRef.current.style.opacity = "0";

    const randomIndex = Math.floor(Math.random() * challengeItems.length);
    const segmentAngle = 360 / challengeItems.length;
    const extraSpins = 5 + Math.random() * 5;
    const targetAngle = wheelAngleRef.current + extraSpins * 360 + randomIndex * segmentAngle;

    // Shake the spin button
    gsap.to(spinBtnRef.current, {
      x: "+=5", duration: 0.07, repeat: 8, yoyo: true, ease: "none",
      onComplete: () => gsap.set(spinBtnRef.current, { x: 0 }),
    });

    // Pause float during spin
    floatTweenRef.current?.pause();
    gsap.to(floatRef.current, { y: 0, duration: 0.3 });

    gsap.to(wheelRef.current, {
      rotation: targetAngle,
      duration: 3.5 + Math.random() * 0.8,
      ease: "power4.out",
      onComplete: () => {
        wheelAngleRef.current = targetAngle % 360;
        setCurrentChallenge(challengeItems[randomIndex]);
        setIsSpinning(false);

        // Bounce + resume float
        gsap.fromTo(floatRef.current, { scale: 1.1 }, { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.5)" });
        floatTweenRef.current?.resume();

        // Challenge card pop-in
        gsap.fromTo(cardRef.current,
          { scale: 0.6, opacity: 0, y: 20 },
          { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: "back.out(2)" }
        );
      },
    });
  };

  // Build SVG segments
  const TOTAL = challengeItems.length;
  const SEG = 360 / TOTAL;
  const R = 140;
  const CX = 160;
  const CY = 160;

  const segments = challengeItems.map((item: any, i: any) => {
    const startRad = ((SEG * i - 90) * Math.PI) / 180;
    const endRad = ((SEG * (i + 1) - 90) * Math.PI) / 180;
    const x1 = CX + R * Math.cos(startRad);
    const y1 = CY + R * Math.sin(startRad);
    const x2 = CX + R * Math.cos(endRad);
    const y2 = CY + R * Math.sin(endRad);
    const midRad = ((SEG * i + SEG / 2 - 90) * Math.PI) / 180;
    const tx = CX + R * 0.64 * Math.cos(midRad);
    const ty = CY + R * 0.64 * Math.sin(midRad);
    const textRotation = SEG * i + SEG / 2;
    return { item, x1, y1, x2, y2, tx, ty, textRotation, color: WHEEL_COLORS[i % WHEEL_COLORS.length] };
  });

  const statItems = [
    { icon: <Users className="h-4 w-4" />, label: h.players },
    { icon: <Zap className="h-4 w-4" />, label: h.instantChaos },
    { icon: <Trophy className="h-4 w-4" />, label: h.oneSurvivor },
  ];

  return (
    <section
      id="play"
      dir={isRTL ? "rtl" : "ltr"}
      className="relative mx-auto max-w-7xl px-6 pt-16 pb-28 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 overflow-hidden"
    >
      {/* Background noise grain */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")" }} />

      {/* Glow blob */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[#ff146e]/5 blur-[120px]" />

      {/* ── LEFT ── */}
      <div className="flex-1 text-center lg:text-left z-10">
        {/* Badge */}
        <div
          ref={badgeRef}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#ff146e]/40 bg-[#ff146e]/10 px-4 py-2 text-lg text-[#ff146e]"
        >
          <Skull className="h-4 w-4" />
          {h.badge}
        </div>

        {/* Title */}
        <h1
          ref={titleRef}
          className="text-6xl font-black leading-tight md:text-8xl"
        >
          {h.title1}
          <br />
          <span className="text-[#ff146e]">{h.title2}</span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="mt-5 max-w-md text-xl text-gray-400 mx-auto lg:mx-0"
        >
          {h.subtitle}
        </p>

        {/* Buttons */}
        <div
          ref={buttonsRef}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
        >
          <Link
            to="#play"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#ff146e] px-8 py-4 text-lg font-bold text-white shadow-lg shadow-[#ff146e]/30 transition-all duration-200 hover:bg-[#e0105f] hover:shadow-[#ff146e]/50 hover:-translate-y-0.5 active:translate-y-0"
          >
            <Play className="h-5 w-5" />
            {h.startPlaying}
          </Link>
          <Link
            to="#how"
            className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/20 bg-white/5 px-8 py-4 text-lg font-bold text-white transition-all duration-200 hover:border-white/40 hover:bg-white/10"
          >
            {h.howItWorks}
          </Link>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="mt-10 flex flex-wrap gap-3 justify-center lg:justify-start"
        >
          {statItems.map((s, i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-full border border-gray-300 bg-gray-100
              dark:border-white/10 dark:bg-white/5
              dark px-4 py-2 text-sm"
            >
              <span className="text-[#ff146e]">{s.icon}</span>
              {s.label}
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT: Wheel ── */}
      <div className="flex-1 flex flex-col items-center gap-6 z-10">
        <div ref={floatRef} className="relative flex items-center justify-center">
          {/* Outer glow ring */}
          <div className="absolute h-[360px] w-[360px] rounded-full bg-[#ff146e]/10 blur-2xl" />
          <div className="absolute h-[340px] w-[340px] rounded-full border border-[#ff146e]/20" />

          {/* Pointer triangle */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-20"
            style={{
              width: 0, height: 0,
              borderLeft: "14px solid transparent",
              borderRight: "14px solid transparent",
              borderTop: "28px solid #ff146e",
              filter: "drop-shadow(0 0 8px #ff146e)",
            }}
          />

          {/* SVG Wheel */}
          <svg
            ref={wheelRef}
            width="320"
            height="320"
            viewBox="0 0 320 320"
            style={{ filter: "drop-shadow(0 0 30px rgba(255,20,110,0.35))" }}
          >
            {segments.map((seg, i) => {
              const fillColor = seg.color;
              const textColor = fillColor === "#ffffff" ? "#1a1a1a" : fillColor === "#1a1a1a" ? "#ffffff" : "#000000";
              return (
                <g key={i}>
                  <path
                    d={`M ${CX} ${CY} L ${seg.x1} ${seg.y1} A ${R} ${R} 0 0 1 ${seg.x2} ${seg.y2} Z`}
                    fill={fillColor}
                    stroke="#0a0a0a"
                    strokeWidth="2"
                  />
                  <text
                    x={seg.tx}
                    y={seg.ty}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="10"
                    fontWeight="900"
                    fill={textColor}
                    transform={`rotate(${seg.textRotation}, ${seg.tx}, ${seg.ty})`}
                  >
                    {seg.item.label}
                  </text>
                </g>
              );
            })}
            {/* Center */}
            <circle cx={CX} cy={CY} r="34" fill="#ff146e" stroke="#0a0a0a" strokeWidth="3" />
            <circle cx={CX} cy={CY} r="28" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            <text
              x={CX} y={CY}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="10"
              fontWeight="bold"
              fill="white"
            >
              SPIN
            </text>
          </svg>

          {/* Player bubbles */}
          {["M", "A", "S", "K"].map((letter, i) => {
            const positions = [
              "absolute -left-5 top-10",
              "absolute -right-5 top-16",
              "absolute -left-3 bottom-10",
              "absolute -right-3 bottom-16",
            ];
            const isBgPink = i % 2 === 0;
            return (
              <div
                key={i}
                className={`player-bubble ${positions[i]} flex h-12 w-12 items-center justify-center rounded-full border-2 border-black text-sm font-black shadow-lg`}
                style={{
                  background: isBgPink ? "#ff146e" : "#ffffff",
                  color: isBgPink ? "#ffffff" : "#1a1a1a",
                  boxShadow: isBgPink ? "0 0 16px rgba(255,20,110,0.5)" : "0 4px 12px rgba(0,0,0,0.4)",
                }}
              >
                {letter}
              </div>
            );
          })}
        </div>

        {/* Spin button */}
        <button
          ref={spinBtnRef}
          onClick={handleSpin}
          disabled={isSpinning}
          className="flex items-center gap-3 rounded-xl border-2 border-[#ff146e] bg-[#ff146e] px-10 py-4 text-xl font-bold text-white shadow-lg shadow-[#ff146e]/30 transition-all duration-200 hover:bg-transparent hover:text-[#ff146e] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RotateCcw className={`h-6 w-6 ${isSpinning ? "animate-spin" : ""}`} />
          {isSpinning ? h.spinning : h.spinBtn}
        </button>

        {/* Challenge result card */}
        {currentChallenge && (
          <div
            ref={cardRef}
            className="w-full max-w-xs rounded-xl border border-[#ff146e]/30 bg-white/5 p-6 text-center backdrop-blur"
            style={{ opacity: 0 }}
          >
            <p className="mb-1 text-xs tracking-widest text-gray-500">
              {h.challengeLabel}
            </p>
            <p
              className="mb-2 text-3xl text-[#ff146e]"
            >
              {currentChallenge.label}
            </p>
            <p className="text-lg text-gray-300">
              {currentChallenge.text}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}