import { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight, Award, Brain, Briefcase, Building2, CalendarDays, Camera, Crown, FileText, Flame, Gift,
  GraduationCap, Handshake, Lightbulb, MapPin, Medal, MessageSquare, Mic, Music, Network, PartyPopper,
  Pizza, Rocket, ShieldCheck, Sparkles, Star, Target, Ticket, Timer, TrendingUp, Trophy, Users, Zap,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  ArenaBackground, Countdown, GradientText, IqArenaTerms, SectionHeading,
} from "@/components/iq-arena/ArenaShared";
import {
  AFTER_PARTY, ASSESSMENT_PILLARS, AUTH_REDIRECT_PATH, FAQS, IQ_ARENA, PERKS, PRIZES, REGISTER_PATH, ROUNDS,
  formatINR,
} from "@/lib/iqArena";

const PILLAR_ICONS: Record<string, typeof Brain> = {
  intel: Brain, comm: MessageSquare, subject: GraduationCap, mind: Zap, persona: Star,
};
const ROUND_ICONS = [Users, Lightbulb, Briefcase, Mic, Timer];
const PERK_ICONS: Record<string, typeof Brain> = {
  cert: Award, goodies: Gift, brand: Sparkles, industry: Building2, network: Network,
  business: TrendingUp, confidence: Rocket, social: Camera, feedback: MessageSquare, experience: Flame,
};
const PARTY_ICONS: Record<string, typeof Brain> = {
  refuel: Pizza, campus: GraduationCap, win: Trophy, founders: Handshake, dj: Music,
};
const PARTY_GRADIENTS = [
  "from-amber-400 to-orange-600",
  "from-sky-400 to-indigo-600",
  "from-yellow-300 to-amber-600",
  "from-emerald-400 to-teal-600",
  "from-fuchsia-500 to-violet-700",
];

const MARQUEE = [
  "Think Big", "Play Smart", "Own the Future", "5 Rounds", "One Champion",
  `${formatINR(IQ_ARENA.prizePool)} in prizes`, IQ_ARENA.eventDateLabel, IQ_ARENA.region,
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

const IqArena = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "IQ Arena 2027 — Quiz Championship | Educate Me";
  }, []);

  const goRegister = () => {
    const token = localStorage.getItem("token");
    navigate(token ? REGISTER_PATH : AUTH_REDIRECT_PATH);
  };

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#07070d] selection:bg-orange-500/40">
      <Header />

      {/* text-white is scoped to <main> so the shared Header keeps its own colours */}
      <main className="text-white">
      {/* ───────────────────────── HERO */}
      <section className="relative overflow-hidden pb-20 pt-32 lg:pb-28 lg:pt-40">
        <ArenaBackground />
        <div className="container relative mx-auto px-4">
          <div className="grid items-center gap-14 lg:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="lg:col-span-7"
            >
              <div className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-orange-400/30 bg-orange-500/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-orange-200 backdrop-blur sm:gap-2 sm:px-4 sm:text-[11px] sm:tracking-[0.22em]">
                <Sparkles className="h-3.5 w-3.5" />
                {IQ_ARENA.organizer} <span className="text-white/40">×</span> {IQ_ARENA.collaborationPartner} present
              </div>

              <h1 className="mt-7 font-black leading-[0.88] tracking-tighter">
                <span className="block bg-gradient-to-br from-white via-orange-100 to-orange-300 bg-clip-text text-6xl text-transparent sm:text-7xl lg:text-8xl xl:text-[8.5rem]">
                  IQ ARENA
                </span>
                <span className="block text-6xl text-transparent [-webkit-text-stroke:2px_rgba(251,146,60,0.95)] sm:text-7xl lg:text-8xl xl:text-[8.5rem]">
                  2027
                </span>
              </h1>

              <p className="mt-6 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Quiz Championship
              </p>
              <p className="mt-3 text-lg text-white/65 sm:text-xl">
                Think Big. <span className="text-orange-300">Play Smart.</span> Own the Future.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  { icon: CalendarDays, text: `${IQ_ARENA.eventDay}, ${IQ_ARENA.eventDateLabel}` },
                  { icon: MapPin, text: `${IQ_ARENA.venue}` },
                  { icon: Ticket, text: `${formatINR(IQ_ARENA.registrationFee)} registration` },
                ].map(({ icon: Icon, text }) => (
                  <span
                    key={text}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-3.5 py-2 text-sm font-medium text-white/85 backdrop-blur"
                  >
                    <Icon className="h-4 w-4 text-orange-300" />
                    {text}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <button
                  onClick={goRegister}
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 px-8 py-4 text-base font-extrabold text-white shadow-[0_10px_40px_-5px_rgba(249,115,22,0.6)] transition-all hover:scale-[1.03] hover:shadow-[0_14px_50px_-5px_rgba(249,115,22,0.8)] focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  Register Now — {formatINR(IQ_ARENA.registrationFee)}
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => scrollTo("rounds")}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[0.04] px-8 py-4 text-base font-bold text-white backdrop-blur transition-all hover:border-orange-400/50 hover:bg-white/[0.08]"
                >
                  Explore the 5 Rounds
                </button>
              </div>

              <p className="mt-6 flex items-center gap-2 text-sm text-white/50">
                <GraduationCap className="h-4 w-4 text-orange-300/80" />
                Open to final-year students & all Master's aspirants (2027) not yet enrolled in a Master's.
              </p>
            </motion.div>

            {/* Hero card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
              className="lg:col-span-5"
            >
              <div className="relative rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-6 shadow-2xl shadow-black/60 backdrop-blur-xl sm:p-8">
                <div className="absolute -inset-px -z-10 rounded-[2rem] bg-gradient-to-br from-orange-500/40 via-transparent to-violet-500/30 blur-xl" />

                <div className="relative mx-auto mb-7 grid h-40 w-40 place-items-center">
                  <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,#f97316,#fbbf24,#f43f5e,#8b5cf6,#f97316)] animate-spin-slow opacity-80 blur-[2px]" />
                  <div className="absolute inset-[5px] rounded-full bg-[#0d0d16]" />
                  <div className="absolute inset-6 rounded-full bg-orange-500/20 blur-2xl" />
                  <Trophy className="relative h-16 w-16 text-amber-300 drop-shadow-[0_0_24px_rgba(251,191,36,0.7)]" />
                </div>

                <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-white/50">Total prize pool</p>
                <p className="mt-1 text-center text-5xl font-black tracking-tight">
                  <GradientText>{formatINR(IQ_ARENA.prizePool)}</GradientText>
                </p>
                <p className="mt-2 text-center text-sm text-white/55">Cash prizes awarded on the spot</p>

                <div className="my-7 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

                <p className="mb-3 text-center text-xs font-bold uppercase tracking-[0.3em] text-white/50">
                  The Arena opens in
                </p>
                <Countdown />

                <div className="mt-6 flex items-center justify-between rounded-2xl border border-orange-400/20 bg-orange-500/[0.08] px-4 py-3 text-sm">
                  <span className="text-white/70">Registration</span>
                  <span className="font-bold text-white">
                    {formatINR(IQ_ARENA.registrationFee)}{" "}
                    <span className="font-medium text-white/50">+ {formatINR(IQ_ARENA.platformCharge)} platform fee</span>
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───────────────────────── MARQUEE */}
      <div className="relative -my-2 overflow-hidden py-4">
        <div className="-rotate-1 border-y border-orange-300/30 bg-gradient-to-r from-orange-600 via-amber-500 to-rose-500 py-4 shadow-[0_0_60px_rgba(249,115,22,0.35)]">
          <motion.div
            className="flex w-max gap-10 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          >
            {[...MARQUEE, ...MARQUEE].map((t, i) => (
              <span key={i} className="flex items-center gap-10 text-lg font-black uppercase tracking-[0.15em] text-white sm:text-xl">
                {t}
                <Star className="h-4 w-4 fill-white/90 text-white/90" />
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ───────────────────────── PARTNERS */}
      <section className="relative py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { label: "Presented by", name: IQ_ARENA.organizer, logo: "/logo.png", icon: GraduationCap },
              { label: "In collaboration with", name: IQ_ARENA.collaborationPartner, icon: Target },
              { label: "Event partner", name: IQ_ARENA.eventPartner, icon: Building2 },
            ].map((p, i) => (
              <motion.div
                key={p.label}
                {...fadeUp(i * 0.1)}
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-orange-400/30 hover:bg-white/[0.05]"
              >
                {p.logo ? (
                  <img src={p.logo} alt={p.name} className="h-14 w-14 rounded-xl bg-white object-cover p-1" />
                ) : (
                  <div className="grid h-14 w-14 place-items-center rounded-xl bg-gradient-to-br from-orange-500/25 to-violet-500/20 ring-1 ring-white/10">
                    <p.icon className="h-6 w-6 text-orange-200" />
                  </div>
                )}
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/45">{p.label}</p>
                  <p className="mt-0.5 text-lg font-extrabold text-white">{p.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── ABOUT */}
      <section className="relative py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="About IQ Arena"
            title={
              <>
                It's not just about getting <GradientText>answers right.</GradientText>
              </>
            }
            subtitle="It's about how you think, lead, communicate and stand out! Not just the right answers — IQ ARENA will assess:"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {ASSESSMENT_PILLARS.map((p, i) => {
              const Icon = PILLAR_ICONS[p.key];
              return (
                <motion.div
                  key={p.key}
                  {...fadeUp(i * 0.08)}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.01] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-orange-400/40"
                >
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-orange-500/10 blur-2xl transition-opacity group-hover:opacity-100" />
                  <div className="relative mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-orange-500 to-rose-500 shadow-lg shadow-orange-500/30">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="relative text-base font-bold leading-snug text-white">{p.title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-white/55">{p.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────────────────── ELIGIBILITY / LOCATION / SELECTION */}
      <section className="relative py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-5 lg:grid-cols-3">
            {[
              {
                icon: Users,
                title: "Who can participate?",
                points: [
                  "Final-year undergraduate students.",
                  "Students aspiring to pursue any Master's Degree in 2027, across disciplines and specializations.",
                ],
              },
              {
                icon: MapPin,
                title: "Event location",
                points: [
                  `${IQ_ARENA.region} — ${IQ_ARENA.venue}.`,
                  `${IQ_ARENA.eventDay}, ${IQ_ARENA.eventDateLabel}. Offline event, in-person attendance.`,
                ],
              },
              {
                icon: ShieldCheck,
                title: "Registration & selection",
                points: [
                  "Register through www.educate-me.in.",
                  "Entries will be screened and shortlisted candidates will be invited to participate.",
                  "Selected candidates will receive official communication from Educate Me.",
                ],
              },
            ].map((c, i) => (
              <motion.div
                key={c.title}
                {...fadeUp(i * 0.1)}
                className="rounded-3xl border border-white/10 bg-[#0d0d17] p-7 shadow-xl shadow-black/30"
              >
                <div className="mb-5 flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-orange-500/15 ring-1 ring-orange-400/30">
                    <c.icon className="h-5 w-5 text-orange-300" />
                  </div>
                  <h3 className="text-lg font-extrabold text-white">{c.title}</h3>
                </div>
                <ul className="space-y-3">
                  {c.points.map((pt) => (
                    <li key={pt} className="flex gap-3 text-sm leading-relaxed text-white/65">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── ROUNDS */}
      <section id="rounds" className="relative scroll-mt-24 overflow-hidden py-24 lg:py-32">
        <ArenaBackground variant="subtle" />
        <div className="container relative mx-auto px-4">
          <SectionHeading
            eyebrow="The IQ Arena Challenge"
            title={
              <>
                5 Rounds. <GradientText>One Champion.</GradientText>
                <br className="hidden sm:block" /> Are you ready?
              </>
            }
          />

          <div className="relative mx-auto max-w-5xl">
            <div className="absolute bottom-0 left-6 top-0 w-px bg-gradient-to-b from-orange-500/0 via-orange-500/60 to-orange-500/0 lg:left-1/2" />
            {ROUNDS.map((r, i) => {
              const Icon = ROUND_ICONS[i];
              const even = i % 2 === 0;
              const finale = i === ROUNDS.length - 1;
              return (
                <motion.div
                  key={r.no}
                  initial={{ opacity: 0, x: even ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className={`relative mb-8 pl-16 lg:mb-12 lg:w-1/2 ${even ? "lg:pl-0 lg:pr-14" : "lg:ml-auto lg:pl-14"}`}
                >
                  <div
                    className={`absolute left-6 top-7 z-10 grid h-12 w-12 -translate-x-1/2 place-items-center rounded-full bg-[#07070d] ring-2 ${
                      finale ? "ring-amber-400" : "ring-orange-500"
                    } shadow-[0_0_30px_rgba(249,115,22,0.5)] ${
                      even ? "lg:left-auto lg:right-0 lg:translate-x-1/2" : "lg:left-0 lg:-translate-x-1/2"
                    }`}
                  >
                    <span className="text-sm font-black text-orange-200">{r.no}</span>
                  </div>

                  <div
                    className={`group relative overflow-hidden rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1 sm:p-7 ${
                      finale
                        ? "border-amber-400/40 bg-gradient-to-br from-amber-500/15 via-orange-500/10 to-transparent"
                        : "border-white/10 bg-white/[0.04] hover:border-orange-400/40"
                    }`}
                  >
                    <span className="pointer-events-none absolute -right-2 -top-6 select-none text-[7rem] font-black leading-none text-white/[0.04]">
                      {r.no}
                    </span>
                    <div className="relative flex items-start justify-between gap-4">
                      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-orange-500 to-rose-500 shadow-lg shadow-orange-500/30">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] ${
                          r.elimination
                            ? "bg-rose-500/15 text-rose-300 ring-1 ring-rose-400/30"
                            : finale
                              ? "bg-amber-400/15 text-amber-200 ring-1 ring-amber-300/40"
                              : "bg-sky-500/10 text-sky-300 ring-1 ring-sky-400/25"
                        }`}
                      >
                        {r.tag}
                      </span>
                    </div>
                    <p className="relative mt-5 text-xs font-bold uppercase tracking-[0.25em] text-orange-300/80">
                      Round {r.no}
                    </p>
                    <h3 className="relative mt-1 text-2xl font-black text-white">{r.title}</h3>
                    <p className="relative mt-1 text-sm font-semibold text-white/75">{r.subtitle}</p>
                    <p className="relative mt-3 text-sm leading-relaxed text-white/55">{r.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────────────────── PRIZES */}
      <section id="prizes" className="relative scroll-mt-24 overflow-hidden py-24 lg:py-32">
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/3 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-amber-500/15 blur-[140px]" />
        <div className="container relative mx-auto px-4">
          <SectionHeading
            eyebrow="The Winners' Podium"
            title={
              <>
                Win big. Win <GradientText>on the spot.</GradientText>
              </>
            }
            subtitle={`${formatINR(IQ_ARENA.prizePool)} in cash prizes, medals, mementos and the EM-IQ Arena Cup.`}
          />

          <div className="mx-auto grid max-w-6xl items-end gap-6 md:grid-cols-3">
            {PRIZES.map((p, i) => {
              const theme =
                p.rank === 1
                  ? {
                      ring: "border-amber-300/60",
                      bg: "from-amber-400/25 via-yellow-500/10 to-transparent",
                      medal: "from-yellow-200 via-amber-400 to-yellow-600",
                      text: "text-amber-200",
                      glow: "shadow-[0_0_80px_-10px_rgba(251,191,36,0.55)]",
                      step: "h-28",
                      icon: Crown,
                    }
                  : p.rank === 2
                    ? {
                        ring: "border-slate-300/40",
                        bg: "from-slate-300/15 via-slate-400/5 to-transparent",
                        medal: "from-white via-slate-300 to-slate-500",
                        text: "text-slate-200",
                        glow: "shadow-[0_0_60px_-15px_rgba(203,213,225,0.4)]",
                        step: "h-20",
                        icon: Medal,
                      }
                    : {
                        ring: "border-orange-400/40",
                        bg: "from-orange-700/20 via-amber-800/10 to-transparent",
                        medal: "from-orange-200 via-orange-500 to-amber-800",
                        text: "text-orange-200",
                        glow: "shadow-[0_0_60px_-15px_rgba(234,88,12,0.45)]",
                        step: "h-14",
                        icon: Medal,
                      };
              const Icon = theme.icon;
              return (
                <motion.div
                  key={p.rank}
                  {...fadeUp(i * 0.12)}
                  className={`flex flex-col ${p.rank === 1 ? "order-first md:order-none" : ""}`}
                >
                  <div
                    className={`relative overflow-hidden rounded-[2rem] border bg-gradient-to-b ${theme.ring} ${theme.bg} ${theme.glow} p-7 text-center backdrop-blur ${
                      p.rank === 1 ? "md:pb-10 md:pt-10" : ""
                    }`}
                  >
                    {p.rank === 1 && (
                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent" />
                    )}
                    <div
                      className={`mx-auto grid place-items-center rounded-full bg-gradient-to-br ${theme.medal} shadow-xl ${
                        p.rank === 1 ? "h-24 w-24" : "h-20 w-20"
                      }`}
                    >
                      <Icon className={`${p.rank === 1 ? "h-11 w-11" : "h-9 w-9"} text-black/70`} />
                    </div>
                    <p className={`mt-5 text-xs font-bold uppercase tracking-[0.3em] ${theme.text}`}>{p.position}</p>
                    <h3 className="mt-1 text-xl font-black uppercase tracking-tight text-white">{p.title}</h3>
                    <p className={`mt-4 font-black tracking-tight text-white ${p.rank === 1 ? "text-5xl lg:text-6xl" : "text-4xl"}`}>
                      {formatINR(p.amount)}
                    </p>
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/45">Cash prize</p>
                    <ul className="mt-6 space-y-2.5 text-left">
                      {p.perks.map((perk) => (
                        <li key={perk} className="flex items-start gap-2.5 text-sm text-white/75">
                          <Sparkles className={`mt-0.5 h-4 w-4 shrink-0 ${theme.text}`} />
                          {perk}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div
                    className={`mx-6 hidden rounded-b-2xl border-x border-b border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent md:grid md:place-items-center ${theme.step}`}
                  >
                    <span className="text-4xl font-black text-white/15">{p.rank}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────────────────── PERKS */}
      <section className="relative py-24 lg:py-28">
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="Every participant gets"
            title={
              <>
                Don't just participate. <GradientText>Make yourself recognisable.</GradientText>
              </>
            }
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {PERKS.map((perk, i) => {
              const Icon = PERK_ICONS[perk.key];
              return (
                <motion.div
                  key={perk.key}
                  {...fadeUp((i % 5) * 0.06)}
                  className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-orange-400/40 hover:bg-white/[0.06]"
                >
                  <Icon className="h-6 w-6 text-orange-300 transition-transform group-hover:scale-110" />
                  <h3 className="mt-4 text-sm font-bold text-white">{perk.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-white/50">{perk.text}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.blockquote
            {...fadeUp(0.1)}
            className="relative mx-auto mt-16 max-w-3xl rounded-3xl border border-orange-400/20 bg-gradient-to-br from-orange-500/10 via-transparent to-violet-500/10 px-8 py-10 text-center"
          >
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-7xl font-black leading-none text-orange-400/60">“</span>
            <p className="text-lg font-semibold leading-relaxed text-white/85 sm:text-xl">
              Every idea you share, every challenge you face and every fear you overcome is a victory in itself.
            </p>
            <p className="mt-4 text-sm font-bold uppercase tracking-[0.2em] text-orange-300">
              At IQ Arena, everyone walks away with something worth celebrating.
            </p>
          </motion.blockquote>
        </div>
      </section>

      {/* ───────────────────────── AFTER PARTY */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <ArenaBackground variant="violet" />
        <div className="container relative mx-auto px-4">
          <SectionHeading
            eyebrow="The quiz ends. The real fun begins!"
            title={
              <>
                More than a competition.{" "}
                <span className="bg-gradient-to-r from-fuchsia-300 via-pink-400 to-violet-400 bg-clip-text text-transparent">
                  It's a whole vibe!
                </span>
              </>
            }
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {AFTER_PARTY.map((item, i) => {
              const Icon = PARTY_ICONS[item.key];
              return (
                <motion.div
                  key={item.key}
                  {...fadeUp(i * 0.08)}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-fuchsia-400/40"
                >
                  <div
                    className={`mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br ${PARTY_GRADIENTS[i]} shadow-lg transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110`}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="mt-5 text-base font-black uppercase tracking-wide text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{item.text}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.div {...fadeUp(0.1)} className="mt-16 text-center">
            <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-2xl font-black uppercase tracking-tight sm:text-4xl">
              <span>Think Big.</span>
              <span className="text-orange-400">Play Smart.</span>
              <span>Make Connections.</span>
              <span className="bg-gradient-to-r from-fuchsia-400 to-violet-400 bg-clip-text text-transparent">Party Hard!</span>
            </p>
            <p className="mt-5 text-white/55">
              Come for the challenge. Stay for the connections. Leave with stories worth telling.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ───────────────────────── PRICING CTA */}
      <section id="register" className="relative scroll-mt-24 py-24">
        <div className="container mx-auto px-4">
          <motion.div
            {...fadeUp()}
            className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] border border-orange-400/30 bg-gradient-to-br from-[#1a0f0a] via-[#0f0b16] to-[#160a14] p-8 shadow-[0_0_100px_-20px_rgba(249,115,22,0.5)] sm:p-12"
          >
            <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-orange-500/25 blur-3xl" />
            <div aria-hidden className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />

            <div className="relative grid items-center gap-10 lg:grid-cols-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-300">Claim your seat</p>
                <h2 className="mt-3 text-4xl font-black leading-tight text-white sm:text-5xl">
                  Your seat in the <GradientText>Arena</GradientText> awaits.
                </h2>
                <ul className="mt-7 space-y-3">
                  {[
                    `${IQ_ARENA.eventDay}, ${IQ_ARENA.eventDateLabel}`,
                    `${IQ_ARENA.venue} (${IQ_ARENA.region}) — offline`,
                    "Instant confirmation by email after payment",
                    "Certificate, goodies, networking & DJ night",
                  ].map((t) => (
                    <li key={t} className="flex items-center gap-3 text-white/80">
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-500/15 ring-1 ring-emerald-400/40">
                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-300" />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-white/10 bg-black/40 p-7 backdrop-blur">
                <div className="flex items-end justify-center gap-2">
                  <span className="text-6xl font-black tracking-tight text-white">{formatINR(IQ_ARENA.registrationFee)}</span>
                  <span className="mb-2 text-white/50">/ form</span>
                </div>
                <p className="mt-1 text-center text-sm text-white/50">
                  + {formatINR(IQ_ARENA.platformCharge)} platform fee
                </p>
                <div className="my-6 space-y-2 rounded-2xl bg-white/[0.04] p-4 text-sm">
                  <div className="flex justify-between text-white/65">
                    <span>Registration fee</span>
                    <span>{formatINR(IQ_ARENA.registrationFee)}</span>
                  </div>
                  <div className="flex justify-between text-white/65">
                    <span>Platform fee</span>
                    <span>{formatINR(IQ_ARENA.platformCharge)}</span>
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-2 font-bold text-white">
                    <span>Total payable</span>
                    <span>{formatINR(IQ_ARENA.totalPayable)}</span>
                  </div>
                </div>
                <button
                  onClick={goRegister}
                  className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 py-4 text-base font-extrabold text-white shadow-[0_10px_40px_-5px_rgba(249,115,22,0.6)] transition-all hover:scale-[1.02]"
                >
                  Register Now
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
                <p className="mt-4 flex items-center justify-center gap-2 text-xs text-white/45">
                  <ShieldCheck className="h-3.5 w-3.5" /> Secure payment via Razorpay · One registration per participant
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ───────────────────────── FAQ */}
      <section id="faq" className="relative scroll-mt-24 py-20">
        <div className="container mx-auto max-w-4xl px-4">
          <SectionHeading eyebrow="FAQ's" title={<>Got questions? <GradientText>We've got answers.</GradientText></>} />
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`faq-${i}`}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] px-6 data-[state=open]:border-orange-400/40 data-[state=open]:bg-white/[0.05]"
              >
                <AccordionTrigger className="py-5 text-left text-base font-bold text-white hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-white/65">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ───────────────────────── TERMS */}
      <section id="terms" className="relative scroll-mt-24 py-20">
        <div className="container mx-auto max-w-4xl px-4">
          <SectionHeading
            eyebrow="Terms & Conditions"
            title={<>The rules of the <GradientText>Arena</GradientText></>}
            subtitle="Please read these terms carefully. You must accept them before completing your registration."
          />
          <motion.div
            {...fadeUp()}
            className="rounded-3xl border border-white/10 bg-[#0d0d17] p-6 shadow-xl shadow-black/30 sm:p-10"
          >
            <div className="mb-8 flex items-center gap-3 text-white/60">
              <FileText className="h-5 w-5 text-orange-300" />
              <span className="text-sm font-semibold">IQ Arena 2027 — Participant Terms & Conditions</span>
            </div>
            <IqArenaTerms />
          </motion.div>
        </div>
      </section>

      {/* ───────────────────────── FINAL CTA */}
      <section className="relative overflow-hidden py-24">
        <ArenaBackground />
        <div className="container relative mx-auto px-4 text-center">
          <motion.div {...fadeUp()}>
            <PartyPopper className="mx-auto h-12 w-12 text-orange-300" />
            <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-black leading-tight text-white sm:text-6xl">
              Think big. Play smart. <GradientText>Own the future.</GradientText>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-white/60">
              Seats are limited and entries are shortlisted. Register today and step into the Arena on{" "}
              {IQ_ARENA.eventDateLabel}.
            </p>
            <button
              onClick={goRegister}
              className="group mt-10 inline-flex items-center gap-2 rounded-2xl bg-white px-10 py-4 text-base font-extrabold text-black shadow-[0_10px_50px_-10px_rgba(255,255,255,0.5)] transition-all hover:scale-[1.04]"
            >
              Register for IQ Arena 2027
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
};

export default IqArena;
