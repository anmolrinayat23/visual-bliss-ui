import { useState, type MouseEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowRight, CalendarDays, Lightbulb, MapPin, Ticket, TrendingUp, Trophy, User, Users, Zap } from "lucide-react";
import { Countdown, GradientText, ShineSweep } from "@/components/iq-arena/ArenaShared";
import { AUTH_REDIRECT_PATH, IQ_ARENA, REGISTER_PATH, ROUNDS, formatINR } from "@/lib/iqArena";

// The poster lives in frontend/public (1600 x 900). If it ever fails to load, a poster-style
// placeholder is shown instead of a broken image.
const BANNER_SOURCES = ["/iq-arena-2027-banner.jpeg"];

const BANNER_ALT =
  "IQ Arena 2027 poster: The Ultimate Quiz Championship presented by Educate Me with Career Critics and " +
  "Sparsh Global Business School. 23 January 2027, Delhi NCR. 5 rounds, one champion.";

const FACTS = [
  { icon: CalendarDays, value: "23 Jan 2027", label: IQ_ARENA.region },
  { icon: Trophy, value: formatINR(IQ_ARENA.prizePool), label: "in cash prizes" },
  { icon: Users, value: `${ROUNDS.length} rounds`, label: "One champion" },
  { icon: Ticket, value: formatINR(IQ_ARENA.registrationFee), label: `+ ${formatINR(IQ_ARENA.platformCharge)} platform fee` },
];

// Section colours, taken from the navy of the IQ Arena poster.
const STAGE_EDGE = "#04060f";

/**
 * Stage spotlight: a lamp at the top corner and a cone of gold light aimed at the banner.
 * The angle steps up with screen width so the beam always lands on the banner.
 * The blur is on a wrapper so it softens the clipped cone's edges (blurring the clipped
 * element itself leaves hard lines).
 */
const Beam = ({ side, reduceMotion }: { side: "left" | "right"; reduceMotion: boolean | null }) => {
  const left = side === "left";
  return (
    <>
      <div
        className={`absolute top-0 h-[64rem] w-[18rem] origin-top -translate-x-1/2 sm:w-[26rem] ${
          left
            ? "left-[8%] -rotate-[12deg] sm:-rotate-[22deg] md:-rotate-[26deg] lg:-rotate-[38deg]"
            : "left-[92%] rotate-[12deg] sm:rotate-[22deg] md:rotate-[26deg] lg:rotate-[38deg]"
        }`}
      >
        <motion.div
          className="h-full w-full origin-top"
          style={{ filter: "blur(22px)" }}
          animate={reduceMotion ? undefined : { rotate: left ? [0, 3, 0] : [0, -3, 0] }}
          transition={{ duration: left ? 7 : 8.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            className="h-full w-full"
            style={{
              clipPath: "polygon(47% 0, 53% 0, 100% 100%, 0 100%)",
              background:
                "linear-gradient(to bottom, rgba(253,230,170,0.5), rgba(251,191,36,0.16) 38%, rgba(249,115,22,0.05) 68%, transparent 88%)",
            }}
          />
        </motion.div>
      </div>
      {/* the lamp itself */}
      <div className={`absolute top-0 -translate-x-1/2 ${left ? "left-[8%]" : "left-[92%]"}`}>
        <div className="h-3 w-14 rounded-b-full bg-gradient-to-b from-slate-500 to-slate-800" />
        <div className="mx-auto -mt-1 h-2 w-8 rounded-full bg-amber-100 shadow-[0_0_24px_10px_rgba(253,230,170,0.55)]" />
      </div>
    </>
  );
};

// Gold dust drifting up through the light. Fixed positions so it looks the same on every load.
const DUST = Array.from({ length: 22 }, (_, i) => ({
  left: (i * 41 + 7) % 100,
  top: 12 + ((i * 29) % 78),
  size: 2 + (i % 3),
  duration: 6 + (i % 5) * 1.3,
  delay: (i * 0.65) % 6,
}));

const StageBackground = ({ reduceMotion }: { reduceMotion: boolean | null }) => (
  <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
    {/* base: navy in the middle, near-black at the edges */}
    <div
      className="absolute inset-0"
      style={{ background: `radial-gradient(ellipse 85% 65% at 50% 48%, #0f1d48 0%, #0a1331 42%, ${STAGE_EDGE} 100%)` }}
    />
    {/* overhead wash of light on the heading */}
    <div className="absolute left-1/2 top-0 h-[34rem] w-[64rem] max-w-[160%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(253,224,160,0.16),transparent_65%)]" />
    {/* the top edge matches the end of the hero fade, so the two sections join without a line */}
    <div className="absolute inset-x-0 top-0 h-32" style={{ background: `linear-gradient(to bottom, ${STAGE_EDGE}, transparent)` }} />
    <Beam side="left" reduceMotion={reduceMotion} />
    <Beam side="right" reduceMotion={reduceMotion} />
    {/* soft dot texture, centred */}
    <div
      className="absolute inset-0 opacity-[0.12]"
      style={{
        backgroundImage: "radial-gradient(rgba(255,255,255,0.55) 1px, transparent 1px)",
        backgroundSize: "26px 26px",
        maskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black, transparent)",
        WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black, transparent)",
      }}
    />
    {DUST.map((d, i) => (
      <motion.span
        key={i}
        className="absolute rounded-full bg-amber-200 shadow-[0_0_8px_2px_rgba(253,224,160,0.6)]"
        style={{ left: `${d.left}%`, top: `${d.top}%`, width: d.size, height: d.size }}
        initial={{ opacity: reduceMotion ? 0.35 : 0 }}
        animate={reduceMotion ? undefined : { y: [0, -70], opacity: [0, 0.85, 0] }}
        transition={{ duration: d.duration, delay: d.delay, repeat: Infinity, ease: "easeOut" }}
      />
    ))}
    {/* vignette, then a gold line where the stage ends */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.55)_100%)]" />
    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
  </div>
);

const PLACEHOLDER_ROUNDS = [
  { icon: Users, label: "The GD Battle" },
  { icon: Lightbulb, label: "The Idea Stage" },
  { icon: TrendingUp, label: "The Business Challenge" },
  { icon: User, label: "Pitch Yourself" },
  { icon: Zap, label: "The Rapid Fire" },
];

/**
 * Shown inside the frame until the poster file is added to frontend/public. Laid out like the
 * poster and sized in cqw (percent of the frame's width), so it scales like an image.
 */
const BannerPlaceholder = () => (
  <div className="absolute inset-0 overflow-hidden bg-[#f6f1e7] text-[#0c1838]">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_25%,#fffaf0,transparent_70%)]" />
    <div
      className="absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-b from-[#13245a] to-[#0a132e]"
      style={{ clipPath: "polygon(0 16%, 100% 0, 100% 100%, 0 100%)" }}
    />

    {/* trophy (left) and date note (right) */}
    <Trophy className="absolute left-[6cqw] top-[22cqw] h-[9cqw] w-[9cqw] -rotate-6 text-amber-500 drop-shadow-[0_0.6cqw_0.8cqw_rgba(180,83,9,0.35)]" />
    <div className="absolute right-[5cqw] top-[21cqw] rotate-[4deg] rounded-[0.6cqw] bg-[#fff4d6] px-[1.8cqw] py-[1cqw] text-center shadow-[0_0.6cqw_1.2cqw_rgba(12,24,56,0.25)]">
      <p className="text-[2.6cqw] font-black leading-none text-[#b4231a]">23 JAN</p>
      <p className="text-[2cqw] font-black leading-tight">2027</p>
      <p className="mt-[0.4cqw] flex items-center justify-center gap-[0.4cqw] text-[1.25cqw] font-extrabold">
        <MapPin className="h-[1.3cqw] w-[1.3cqw]" /> DELHI NCR
      </p>
    </div>

    <div className="relative flex h-full flex-col items-center pt-[2.6cqw] text-center">
      <div className="flex items-center gap-[2.2cqw]">
        <img src="/logo.png" alt="" className="h-[7cqw] w-auto object-contain" />
        <span className="h-[4.4cqw] w-px bg-[#0c1838]/25" />
        <img src="/career-critics-logo.png" alt="" className="h-[5.6cqw] w-auto object-contain" />
        <span className="h-[4.4cqw] w-px bg-[#0c1838]/25" />
        <img src="/sparsh-global-business-school-logo.png" alt="" className="h-[5.4cqw] w-auto object-contain" />
      </div>
      <p className="mt-[1cqw] text-[1.3cqw] font-bold tracking-[0.5em]">PRESENTS</p>
      <p className="mt-[0.2cqw] text-[10cqw] font-black leading-none tracking-tight">
        IQ{" "}
        <span className="bg-gradient-to-b from-amber-400 via-orange-500 to-orange-700 bg-clip-text text-transparent">ARENA</span>
      </p>
      <span className="mt-[0.5cqw] rounded-[0.6cqw] bg-[#0c1838] px-[2.4cqw] py-[0.2cqw] text-[2.8cqw] font-black tracking-[0.25em] text-white">
        2027
      </span>
      <p className="mt-[0.9cqw] text-[1.55cqw] font-extrabold tracking-[0.32em]">THE ULTIMATE QUIZ CHAMPIONSHIP</p>

      <div className="absolute inset-x-0 bottom-[1.2cqw] flex flex-col items-center text-white">
        <p className="text-[2.3cqw] font-black tracking-wide">
          {ROUNDS.length} ROUNDS. <span className="text-amber-400">ONE CHAMPION.</span>
        </p>
        <div className="mt-[1cqw] flex items-start justify-center gap-[2.4cqw]">
          {PLACEHOLDER_ROUNDS.map(({ icon: Icon, label }) => (
            <span key={label} className="flex w-[11cqw] flex-col items-center gap-[0.5cqw]">
              <Icon className="h-[2.2cqw] w-[2.2cqw] text-amber-400" />
              <span className="text-[1.1cqw] font-bold uppercase leading-tight">{label}</span>
            </span>
          ))}
        </div>
        <p className="mt-[1.2cqw] rounded-[0.4cqw] bg-gradient-to-r from-amber-600 via-amber-300 to-amber-600 px-[3cqw] py-[0.5cqw] text-[1.3cqw] font-black tracking-wide text-[#0c1838]">
          FOR ALL MASTER'S ASPIRANTS &amp; FINAL-YEAR STUDENTS
        </p>
      </div>
    </div>
  </div>
);

const IqArenaSpotlight = () => {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const [srcIndex, setSrcIndex] = useState(0);
  const bannerFailed = srcIndex >= BANNER_SOURCES.length;

  // Gentle 3D tilt that follows the mouse on desktop. Off for touch and reduced motion.
  const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    rotateY.set(px * 7);
    rotateX.set(-py * 6);
  };
  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const goRegister = () => {
    const token = localStorage.getItem("token");
    navigate(token ? REGISTER_PATH : AUTH_REDIRECT_PATH);
  };

  return (
    <>
    {/* Fades the bottom of the hero photo into the stage, so there's no hard line between them. */}
    <div aria-hidden className="pointer-events-none relative z-10 h-0">
      <div className="absolute inset-x-0 -top-28 h-28" style={{ background: `linear-gradient(to bottom, transparent, ${STAGE_EDGE})` }} />
    </div>
    <section
      id="iq-arena-spotlight"
      aria-labelledby="iq-arena-spotlight-title"
      className="relative overflow-hidden py-20 text-white sm:py-24 lg:py-28"
      style={{ backgroundColor: STAGE_EDGE }}
    >
      <StageBackground reduceMotion={reduceMotion} />

      <div className="container relative mx-auto px-4">
        {/* ── Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-amber-300/30 bg-amber-400/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.28em] text-amber-200">
            <span className="relative flex h-2 w-2">
              {!reduceMotion && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />}
              <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-400" />
            </span>
            <span className="hidden sm:inline">In the spotlight · </span>Registrations open
          </p>
          <h2
            id="iq-arena-spotlight-title"
            className="mt-5 text-3xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl"
          >
            The stage is set for <GradientText>IQ Arena 2027</GradientText>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
            The Ultimate Quiz Championship for Master's aspirants and final-year students.{" "}
            {IQ_ARENA.eventDay}, {IQ_ARENA.eventDateLabel} at {IQ_ARENA.venue}.
          </p>
        </div>

        {/* ── Banner on stage */}
        <div className="relative mx-auto mt-12 max-w-5xl [perspective:1400px]">
          {/* Glow around and under the banner. Kept off the tilting frame: a box-shadow on a 3D-transformed
              element gets cut off with hard edges in Chrome. */}
          <div aria-hidden className="pointer-events-none absolute inset-x-6 bottom-0 top-8 rounded-[2.5rem] bg-gradient-to-b from-amber-400/10 via-orange-500/30 to-orange-600/35 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-10 left-1/2 h-24 w-[85%] -translate-x-1/2 rounded-[100%] bg-amber-400/25 blur-3xl" />

          <motion.div
            onMouseMove={handleMove}
            onMouseLeave={resetTilt}
            style={{ rotateX, rotateY }}
            className="relative rounded-[1.75rem] p-[2px]"
          >
            {/* animated light travelling around the border */}
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[1.75rem]">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-300/40 via-white/10 to-orange-500/40" />
              <motion.div
                className="absolute left-1/2 top-1/2 aspect-square w-[160%] -translate-x-1/2 -translate-y-1/2"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0deg, transparent 220deg, #fde68a 270deg, #f97316 310deg, #fb7185 340deg, transparent 360deg)",
                }}
                animate={reduceMotion ? undefined : { rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />
            </div>

            <Link
              to="/iq-arena"
              aria-label="Open IQ Arena 2027 details"
              className="group relative block aspect-[16/9] overflow-hidden rounded-[1.65rem] bg-[#0b0b12] [container-type:inline-size] focus:outline-none focus-visible:ring-4 focus-visible:ring-orange-400/60"
            >
              {bannerFailed ? (
                <BannerPlaceholder />
              ) : (
                <img
                  src={BANNER_SOURCES[srcIndex]}
                  alt={BANNER_ALT}
                  width={1600}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  onError={() => setSrcIndex((i) => i + 1)}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              )}
              {/* occasional light sweep across the poster */}
              {!reduceMotion && (
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  style={{ skewX: -14 }}
                  initial={{ x: "-150%" }}
                  animate={{ x: ["-150%", "520%"] }}
                  transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 4.5, ease: "easeInOut", delay: 1.5 }}
                />
              )}
              <span className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs font-bold text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                View event details <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </motion.div>

          {/* corner badge */}
          <div className="absolute -left-2 -top-3 z-10 rotate-[-4deg] rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-lg shadow-orange-500/40 sm:-left-4 sm:-top-4 sm:text-xs">
            New event
          </div>
        </div>

        {/* ── Key facts */}
        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-3 lg:grid-cols-4">
          {FACTS.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.04] p-3 transition-colors hover:border-amber-300/30 sm:gap-3 sm:p-4"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-amber-400/25 to-orange-600/20 ring-1 ring-amber-300/20 sm:h-10 sm:w-10">
                <Icon className="h-[18px] w-[18px] text-amber-200 sm:h-5 sm:w-5" />
              </span>
              <span className="min-w-0 leading-tight">
                <span className="block text-sm font-extrabold text-white sm:text-base">{value}</span>
                <span className="mt-0.5 block text-[11px] text-white/50 sm:text-xs">{label}</span>
              </span>
            </div>
          ))}
        </div>

        {/* ── Countdown + CTAs */}
        <div className="mx-auto mt-4 flex max-w-5xl flex-col items-stretch gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="lg:w-[22rem]">
            <p className="mb-2.5 text-center text-[11px] font-bold uppercase tracking-[0.25em] text-white/45 lg:text-left">
              The Arena opens in
            </p>
            <Countdown size="sm" />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              onClick={goRegister}
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 px-8 py-4 text-base font-extrabold text-white shadow-[0_10px_40px_-5px_rgba(249,115,22,0.6)] transition-all hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
            >
              <ShineSweep delay={0.6} />
              <span className="relative inline-flex items-center gap-2">
                Register Now — {formatINR(IQ_ARENA.registrationFee)}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
            <Link
              to="/iq-arena"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[0.04] px-8 py-4 text-base font-bold text-white transition-all hover:border-amber-300/50 hover:bg-white/[0.08]"
            >
              Explore IQ Arena
            </Link>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default IqArenaSpotlight;
