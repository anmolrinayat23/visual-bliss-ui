import { useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { IQ_ARENA, TERMS } from "@/lib/iqArena";

/** Layered glow + grid backdrop used across IQ Arena sections. */
export const ArenaBackground = ({ variant = "default" }: { variant?: "default" | "violet" | "subtle" }) => (
  <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
    {variant !== "subtle" && (
      <div
        className={`absolute -top-48 left-1/2 h-[44rem] w-[44rem] -translate-x-1/2 rounded-full blur-[140px] ${
          variant === "violet" ? "bg-fuchsia-600/20" : "bg-orange-500/20"
        }`}
      />
    )}
    <div className="absolute top-1/3 -left-48 h-[30rem] w-[30rem] rounded-full bg-violet-600/15 blur-[120px] animate-float" />
    <div className="absolute -bottom-24 -right-48 h-[32rem] w-[32rem] rounded-full bg-rose-500/10 blur-[120px] animate-float-delayed" />
    <div
      className="absolute inset-0 opacity-[0.06]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        maskImage: "radial-gradient(ellipse at center, black 25%, transparent 75%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, black 25%, transparent 75%)",
      }}
    />
  </div>
);

export const GradientText = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <span className={`bg-gradient-to-r from-amber-200 via-orange-400 to-rose-400 bg-clip-text text-transparent ${className}`}>
    {children}
  </span>
);

export const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
}) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className={`mb-14 ${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}`}
  >
    <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-400/25 bg-orange-500/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-orange-200">
      <span className="h-1.5 w-1.5 rounded-full bg-orange-400 shadow-[0_0_12px_2px_rgba(251,146,60,0.8)]" />
      {eyebrow}
    </p>
    <h2 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">{title}</h2>
    {subtitle && <p className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg">{subtitle}</p>}
  </motion.div>
);

const getRemaining = (target: number) => {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    done: diff === 0,
  };
};

const useCountdown = (iso: string) => {
  const target = new Date(iso).getTime();
  const [remaining, setRemaining] = useState(() => getRemaining(target));
  useEffect(() => {
    const id = window.setInterval(() => setRemaining(getRemaining(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);
  return remaining;
};

export const Countdown = ({ size = "lg" }: { size?: "lg" | "sm" }) => {
  const { days, hours, minutes, seconds, done } = useCountdown(IQ_ARENA.eventDateISO);
  if (done) {
    return <p className="text-center text-lg font-bold text-orange-300">The Arena is live!</p>;
  }
  const units = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Mins", value: minutes },
    { label: "Secs", value: seconds },
  ];
  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-3">
      {units.map((u) => (
        <div
          key={u.label}
          className="rounded-2xl border border-white/10 bg-white/[0.04] px-1 py-3 text-center shadow-inner shadow-black/40"
        >
          <div
            className={`font-black tabular-nums text-white ${size === "lg" ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl"}`}
          >
            {String(u.value).padStart(2, "0")}
          </div>
          <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">{u.label}</div>
        </div>
      ))}
    </div>
  );
};

/** Full Terms & Conditions, rendered on the info page and inside the registration dialog. */
export const IqArenaTerms = () => (
  <div>
    <ol className="space-y-7">
      {TERMS.map((section, i) => (
        <li key={section.title}>
          <h4 className="flex items-center gap-3 text-base font-bold text-white">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-orange-500/30 to-rose-500/20 text-xs font-black text-orange-200 ring-1 ring-orange-400/30">
              {i + 1}
            </span>
            {section.title}
          </h4>
          <ul className="mt-3 list-disc space-y-2 pl-14 text-sm leading-relaxed text-white/65 marker:text-orange-400/70">
            {section.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
    <p className="mt-8 border-t border-white/10 pt-5 text-xs text-white/45">
      By registering you also agree to the Educate Me{" "}
      <Link to="/privacy-policy" className="font-semibold text-orange-300 underline-offset-4 hover:underline">
        Privacy Policy
      </Link>
      . Presented by {IQ_ARENA.organizer} in collaboration with {IQ_ARENA.collaborationPartner}. Event partner:{" "}
      {IQ_ARENA.eventPartner}.
    </p>
  </div>
);
