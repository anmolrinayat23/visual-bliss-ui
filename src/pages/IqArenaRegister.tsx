import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import {
  ArrowLeft, BookOpen, Building2, CalendarDays, Check, CheckCircle, Clock, CreditCard, FileText,
  GraduationCap, Home, Loader2, Lock, Mail, MapPin, ShieldCheck, Sparkles, Target, Ticket, Trophy, User,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import api from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArenaBackground, Countdown, GradientText, IqArenaTerms } from "@/components/iq-arena/ArenaShared";
import {
  AUTH_REDIRECT_PATH, COLLEGE_YEAR_OPTIONS, ENTRANCE_EXAM_OPTIONS, GENDER_OPTIONS, GRADUATION_YEAR_OPTIONS,
  INDIAN_STATES, IQ_ARENA, MASTERS_AIM_OPTIONS, formatINR,
} from "@/lib/iqArena";

declare global {
  interface Window {
    // Must match the existing global declaration in EmMat.tsx (interface merging requires identical types).
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any;
  }
}

interface CreateOrderResponse {
  key: string;
  payableAmount: number;
  order: { id: string; amount: number; currency: string };
  prefill: { name: string; email: string; contact: string };
}

interface RazorpayFailure {
  error?: { description?: string };
}

type Stage = "loading" | "form" | "processing" | "verifying" | "unverified" | "success";

interface FormState {
  name: string;
  email: string;
  mobile: string;
  gender: string;
  city: string;
  state: string;
  collegeYear: string;
  graduationYear: string;
  graduationStream: string;
  cgpa10: string;
  cgpa12: string;
  mastersAim: string;
  mastersAimOther: string;
  entranceExam: string;
  entranceExamOther: string;
  offlineEventAccepted: boolean;
  termsAccepted: boolean;
}

interface Registration extends Partial<Omit<FormState, "graduationYear" | "cgpa10" | "cgpa12">> {
  _id: string;
  registrationNumber?: string;
  paymentStatus: "pending" | "completed" | "failed";
  graduationYear?: number;
  cgpa10?: number;
  cgpa12?: number;
  registrationFee?: number;
  platformCharge?: number;
  amountPaid?: number;
  paymentId?: string;
  paidAt?: string;
}

type Errors = Partial<Record<keyof FormState, string>>;

const EMPTY_FORM: FormState = {
  name: "", email: "", mobile: "", gender: "", city: "", state: "",
  collegeYear: "", graduationYear: "", graduationStream: "", cgpa10: "", cgpa12: "",
  mastersAim: "", mastersAimOther: "", entranceExam: "", entranceExamOther: "",
  offlineEventAccepted: false, termsAccepted: false,
};

const FIELD_ORDER: (keyof FormState)[] = [
  "name", "email", "mobile", "gender", "city", "state",
  "collegeYear", "graduationYear", "graduationStream", "cgpa10", "cgpa12",
  "mastersAim", "mastersAimOther", "entranceExam", "entranceExamOther",
  "offlineEventAccepted", "termsAccepted",
];

const authHeaders = () => ({ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const isValidCgpa = (v: string) => v.trim() !== "" && !isNaN(Number(v)) && Number(v) >= 0 && Number(v) <= 10;

const validate = (f: FormState): Errors => {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Please enter your full name";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = "Enter a valid email address";
  if (!/^[6-9]\d{9}$/.test(f.mobile)) e.mobile = "Enter a valid 10-digit mobile number";
  if (!f.gender) e.gender = "Please select your gender";
  if (!f.city.trim()) e.city = "Please enter your city";
  if (!f.state) e.state = "Please select your state";
  if (!f.collegeYear) e.collegeYear = "Please select your college year";
  if (!f.graduationYear) e.graduationYear = "Please select your graduation year";
  if (!f.graduationStream.trim()) e.graduationStream = "Please enter your graduation stream";
  if (!isValidCgpa(f.cgpa10)) e.cgpa10 = "Enter a CGPA between 0 and 10";
  if (!isValidCgpa(f.cgpa12)) e.cgpa12 = "Enter a CGPA between 0 and 10";
  if (!f.mastersAim) e.mastersAim = "Please select the Master's degree you are aiming for";
  if (f.mastersAim === "Other" && !f.mastersAimOther.trim()) e.mastersAimOther = "Please specify your Master's aim";
  if (!f.entranceExam) e.entranceExam = "Please select your entrance exam";
  if (f.entranceExam === "Other" && !f.entranceExamOther.trim()) e.entranceExamOther = "Please specify the entrance exam";
  if (!f.offlineEventAccepted) e.offlineEventAccepted = "Please confirm that this is an offline event";
  if (!f.termsAccepted) e.termsAccepted = "Please accept the Terms & Conditions";
  return e;
};

const formFromRegistration = (r: Registration, base: FormState): FormState => ({
  ...base,
  name: r.name || base.name,
  email: r.email || base.email,
  mobile: r.mobile || base.mobile,
  gender: r.gender || "",
  city: r.city || "",
  state: r.state || "",
  collegeYear: r.collegeYear || "",
  graduationYear: r.graduationYear ? String(r.graduationYear) : "",
  graduationStream: r.graduationStream || "",
  cgpa10: r.cgpa10 !== undefined ? String(r.cgpa10) : "",
  cgpa12: r.cgpa12 !== undefined ? String(r.cgpa12) : "",
  mastersAim: r.mastersAim || "",
  mastersAimOther: r.mastersAimOther || "",
  entranceExam: r.entranceExam || "",
  entranceExamOther: r.entranceExamOther || "",
  offlineEventAccepted: false,
  termsAccepted: false,
});

// ─────────────────────────────────────────── small UI building blocks

const inputClass =
  "h-12 rounded-xl border-white/10 bg-white/[0.04] text-white placeholder:text-white/30 focus-visible:border-orange-400/60 focus-visible:ring-2 focus-visible:ring-orange-500/30 focus-visible:ring-offset-0";

const selectTriggerClass =
  "h-12 rounded-xl border-white/10 bg-white/[0.04] text-white data-[placeholder]:text-white/30 focus:ring-2 focus:ring-orange-500/30 focus:ring-offset-0";

const FormSection = ({
  step, title, subtitle, icon: Icon, children,
}: { step: number; title: string; subtitle: string; icon: typeof User; children: ReactNode }) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: step * 0.08, ease: "easeOut" }}
    className="rounded-3xl border border-white/10 bg-[#0d0d17]/90 p-6 shadow-xl shadow-black/30 backdrop-blur sm:p-8"
  >
    <div className="mb-7 flex items-start gap-4">
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-orange-500 to-rose-500 shadow-lg shadow-orange-500/25">
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-orange-300/80">Step {step} of 4</p>
        <h2 className="text-xl font-extrabold text-white">{title}</h2>
        <p className="mt-0.5 text-sm text-white/50">{subtitle}</p>
      </div>
    </div>
    {children}
  </motion.section>
);

const Field = ({
  id, label, error, hint, children, className = "",
}: { id: keyof FormState; label: string; error?: string; hint?: string; children: ReactNode; className?: string }) => (
  <div id={`field-${id}`} className={`scroll-mt-32 ${className}`}>
    <label htmlFor={id} className="mb-2 block text-sm font-semibold text-white/80">
      {label} <span className="text-orange-400">*</span>
    </label>
    {children}
    {error ? (
      <p className="mt-1.5 text-xs font-medium text-rose-400">{error}</p>
    ) : hint ? (
      <p className="mt-1.5 text-xs text-white/35">{hint}</p>
    ) : null}
  </div>
);

const ChipGroup = ({
  options, value, onChange, cols = "grid-cols-2 sm:grid-cols-3", invalid,
}: { options: readonly string[]; value: string; onChange: (v: string) => void; cols?: string; invalid?: boolean }) => (
  <div role="radiogroup" className={`grid gap-2.5 ${cols}`}>
    {options.map((opt) => {
      const active = value === opt;
      return (
        <button
          key={opt}
          type="button"
          role="radio"
          aria-checked={active}
          onClick={() => onChange(opt)}
          className={`relative flex h-12 items-center justify-center gap-2 rounded-xl border px-3 text-sm font-bold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/60 ${
            active
              ? "border-transparent bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-lg shadow-orange-500/25"
              : `bg-white/[0.03] text-white/70 hover:border-orange-400/40 hover:bg-white/[0.06] hover:text-white ${
                  invalid ? "border-rose-500/50" : "border-white/10"
                }`
          }`}
        >
          {active && <Check className="h-4 w-4" />}
          {opt}
        </button>
      );
    })}
  </div>
);

const Stepper = ({ current }: { current: number }) => {
  const steps = [
    { label: "Your details", icon: User },
    { label: "Secure payment", icon: CreditCard },
    { label: "Confirmed", icon: Ticket },
  ];
  return (
    <ol className="mx-auto flex max-w-xl items-center justify-between">
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={s.label} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <div
                className={`grid h-11 w-11 place-items-center rounded-full border-2 transition-all ${
                  done
                    ? "border-emerald-400 bg-emerald-500/20 text-emerald-300"
                    : active
                      ? "border-orange-400 bg-orange-500/20 text-orange-200 shadow-[0_0_24px_rgba(249,115,22,0.5)]"
                      : "border-white/15 bg-white/[0.03] text-white/35"
                }`}
              >
                {done ? <Check className="h-5 w-5" /> : <s.icon className="h-5 w-5" />}
              </div>
              <span className={`text-xs font-semibold ${active ? "text-white" : "text-white/45"}`}>{s.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className="mx-2 mb-6 h-0.5 flex-1 rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-orange-500 to-emerald-400 transition-all duration-500"
                  style={{ width: done ? "100%" : "0%" }}
                />
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
};

// ─────────────────────────────────────────── success view

const Confetti = () => {
  const pieces = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => {
        const angle = (i / 28) * Math.PI * 2;
        const dist = 120 + Math.random() * 120;
        return {
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist,
          rotate: Math.random() * 540 - 270,
          color: ["#f97316", "#fbbf24", "#f43f5e", "#a855f7", "#34d399", "#38bdf8"][i % 6],
          size: 6 + Math.random() * 6,
          delay: Math.random() * 0.15,
        };
      }),
    []
  );
  return (
    <div aria-hidden className="pointer-events-none absolute left-1/2 top-12 h-0 w-0">
      {pieces.map((p, i) => (
        <motion.span
          key={i}
          className="absolute block rounded-sm"
          style={{ width: p.size, height: p.size * 0.5, background: p.color }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          animate={{ x: p.x, y: p.y, opacity: 0, rotate: p.rotate }}
          transition={{ duration: 1.6, delay: 0.2 + p.delay, ease: "easeOut" }}
        />
      ))}
    </div>
  );
};

const SuccessView = ({ registration }: { registration: Registration }) => {
  const fee = registration.registrationFee ?? IQ_ARENA.registrationFee;
  const platform = registration.platformCharge ?? IQ_ARENA.platformCharge;
  const total = registration.amountPaid ?? fee + platform;

  const details = [
    { icon: CalendarDays, label: "Quiz date", value: `${IQ_ARENA.eventDay}, ${IQ_ARENA.eventDateLabel}` },
    { icon: MapPin, label: "Venue", value: `${IQ_ARENA.venue} (${IQ_ARENA.region})` },
    { icon: Sparkles, label: "Presented by", value: IQ_ARENA.organizer },
    { icon: Target, label: "In association with", value: IQ_ARENA.collaborationPartner },
    { icon: Building2, label: "Event partner", value: IQ_ARENA.eventPartner },
    { icon: Clock, label: "Mode", value: "Offline — in-person attendance" },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <div className="relative text-center">
        <Confetti />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
          className="relative mx-auto grid h-24 w-24 place-items-center rounded-full bg-emerald-500/15 shadow-[0_0_80px_rgba(52,211,153,0.45)] ring-2 ring-emerald-400/60"
        >
          <CheckCircle className="h-12 w-12 text-emerald-300" />
        </motion.div>
        <p className="mt-8 text-xs font-bold uppercase tracking-[0.3em] text-emerald-300">Payment successful · Registration confirmed</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
          You're in the <GradientText>Arena!</GradientText>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-white/60">
          A confirmation email with all the details has been sent to{" "}
          <span className="font-semibold text-white">{registration.email}</span>.
        </p>
      </div>

      {/* Ticket */}
      <div className="relative mx-auto mt-12 max-w-4xl">
        <div className="absolute -inset-1 rounded-[2.2rem] bg-gradient-to-r from-orange-500/40 via-rose-500/30 to-violet-500/40 blur-xl" />
        <div className="relative grid overflow-hidden rounded-[2rem] border border-orange-400/30 bg-gradient-to-br from-[#1b100a] via-[#0f0b16] to-[#170a15] md:grid-cols-[1fr_11rem]">
          <div className="p-7 sm:p-9">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-3xl font-black tracking-tight text-white">
                  IQ ARENA <span className="text-orange-400">2027</span>
                </p>
                <p className="text-sm font-semibold text-white/55">Quiz Championship · Official Entry</p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-300 ring-1 ring-emerald-400/40">
                <ShieldCheck className="h-3.5 w-3.5" /> Confirmed
              </span>
            </div>

            <div className="mt-7 grid gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:grid-cols-2">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">Participant</p>
                <p className="mt-1 text-lg font-extrabold text-white">{registration.name}</p>
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">Registration no.</p>
                <p className="mt-1 font-mono text-lg font-extrabold tracking-wider text-orange-300">
                  {registration.registrationNumber}
                </p>
              </div>
            </div>

            <dl className="mt-6 grid gap-x-6 gap-y-5 sm:grid-cols-2">
              {details.map((d) => (
                <div key={d.label} className="flex gap-3">
                  <d.icon className="mt-0.5 h-4 w-4 shrink-0 text-orange-300" />
                  <div>
                    <dt className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">{d.label}</dt>
                    <dd className="mt-0.5 text-sm font-semibold text-white/90">{d.value}</dd>
                  </div>
                </div>
              ))}
            </dl>

            <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-dashed border-white/15 pt-5 text-sm">
              <div className="text-white/60">
                Paid <span className="font-extrabold text-white">{formatINR(total)}</span>{" "}
                <span className="text-white/40">
                  ({formatINR(fee)} + {formatINR(platform)} platform fee)
                </span>
              </div>
              {registration.paymentId && (
                <div className="font-mono text-xs text-white/45">Payment ID: {registration.paymentId}</div>
              )}
            </div>
          </div>

          {/* Stub */}
          <div className="relative flex flex-row items-center justify-center gap-4 border-t-2 border-dashed border-white/15 bg-gradient-to-b from-orange-500/15 to-rose-500/10 p-6 md:flex-col md:border-l-2 md:border-t-0">
            <Trophy className="h-10 w-10 text-amber-300 drop-shadow-[0_0_20px_rgba(251,191,36,0.6)]" />
            <p className="text-center text-xs font-black uppercase tracking-[0.35em] text-white/80">Admit one</p>
            <p className="text-center font-mono text-xs font-bold text-orange-200">{registration.registrationNumber}</p>
          </div>
        </div>
        <div aria-hidden className="absolute -top-4 right-40 hidden h-8 w-8 rounded-full bg-[#07070d] md:block" />
        <div aria-hidden className="absolute -bottom-4 right-40 hidden h-8 w-8 rounded-full bg-[#07070d] md:block" />
      </div>

      <div className="mx-auto mt-10 max-w-4xl rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
        <h3 className="flex items-center gap-2 text-lg font-extrabold text-white">
          <Sparkles className="h-5 w-5 text-orange-300" /> What happens next?
        </h3>
        <ol className="mt-4 grid gap-4 sm:grid-cols-3">
          {[
            "Entries are screened and shortlisted candidates are invited to participate.",
            "Reporting time, venue address and entry details will be sent to your email.",
            "Carry a valid college or government photo ID and your registration number on 23 January 2027.",
          ].map((t, i) => (
            <li key={t} className="flex gap-3 text-sm leading-relaxed text-white/65">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-orange-500/15 text-xs font-black text-orange-200 ring-1 ring-orange-400/30">
                {i + 1}
              </span>
              {t}
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          to="/iq-arena"
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 px-8 py-3.5 font-extrabold text-white shadow-[0_10px_40px_-5px_rgba(249,115,22,0.6)] transition-transform hover:scale-[1.03]"
        >
          <Trophy className="h-5 w-5" /> Explore IQ Arena
        </Link>
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[0.04] px-8 py-3.5 font-bold text-white transition-colors hover:bg-white/[0.08]"
        >
          <Home className="h-5 w-5" /> Back to Home
        </Link>
      </div>
    </motion.div>
  );
};

// ─────────────────────────────────────────── page

const IqArenaRegister = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState<Stage>("loading");
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Errors>({});
  const [registration, setRegistration] = useState<Registration | null>(null);
  const [termsOpen, setTermsOpen] = useState(false);
  // Defaults for display; replaced by the server's actual fees (which can differ in test mode).
  const [fees, setFees] = useState({
    registrationFee: IQ_ARENA.registrationFee as number,
    platformCharge: IQ_ARENA.platformCharge as number,
    totalPayable: IQ_ARENA.totalPayable as number,
    testMode: false,
  });
  const paidRef = useRef(false);

  useEffect(() => {
    document.title = "Register — IQ Arena 2027 | Educate Me";

    const token = localStorage.getItem("token");
    if (!token) {
      navigate(AUTH_REDIRECT_PATH, { replace: true });
      return;
    }

    let base = EMPTY_FORM;
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      base = {
        ...EMPTY_FORM,
        name: user.name || "",
        email: user.email || "",
        mobile: String(user.phone || "").replace(/\D/g, "").slice(-10),
      };
    } catch {
      /* ignore malformed user cache */
    }
    setForm(base);

    api
      .get("/user/iq-arena/me", authHeaders())
      .then(({ data }) => {
        if (data.fees) setFees((f) => ({ ...f, ...data.fees }));
        const reg: Registration | null = data.registration;
        if (reg?.paymentStatus === "completed") {
          setRegistration(reg);
          setStage("success");
          return;
        }
        if (reg) setForm(formFromRegistration(reg, base));
        setStage("form");
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          toast.error("Your session has expired. Please log in again.");
          navigate(AUTH_REDIRECT_PATH, { replace: true });
          return;
        }
        setStage("form");
      });
  }, [navigate]);

  useEffect(() => {
    if (stage === "success" || stage === "unverified") window.scrollTo({ top: 0, behavior: "smooth" });
  }, [stage]);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const showSuccess = (reg: Registration) => {
    setRegistration(reg);
    setStage("success");
  };

  const pollForConfirmation = async () => {
    for (let i = 0; i < 6; i++) {
      await sleep(3000);
      try {
        const { data } = await api.get("/user/iq-arena/me", authHeaders());
        if (data.registration?.paymentStatus === "completed") {
          showSuccess(data.registration);
          return true;
        }
      } catch {
        /* keep polling */
      }
    }
    return false;
  };

  const confirmPayment = async (registrationId: string, response: Record<string, string>) => {
    paidRef.current = true;
    setStage("verifying");
    try {
      const { data } = await api.post(
        "/user/iq-arena/confirm-payment",
        {
          registrationId,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        },
        authHeaders()
      );
      showSuccess(data.registration);
    } catch {
      // The Razorpay webhook may still confirm it server-side; give it a few seconds.
      const confirmed = await pollForConfirmation();
      if (!confirmed) setStage("unverified");
    }
  };

  const openCheckout = (order: CreateOrderResponse, registrationId: string) => {
    paidRef.current = false;
    const rzp = new window.Razorpay({
      key: order.key,
      amount: order.order.amount,
      currency: order.order.currency,
      order_id: order.order.id,
      name: "Educate Me",
      description: "IQ Arena 2027 — Registration",
      image: `${window.location.origin}/logo.png`,
      prefill: order.prefill,
      notes: { event: "IQ Arena 2027" },
      theme: { color: "#f97316" },
      handler: (response: Record<string, string>) => confirmPayment(registrationId, response),
      modal: {
        confirm_close: true,
        ondismiss: () => {
          if (paidRef.current) return;
          setStage("form");
          toast("Payment not completed", {
            description: "Your details are saved. You can complete the payment anytime.",
          });
        },
      },
    });
    rzp.on("payment.failed", (resp: RazorpayFailure) => {
      toast.error(resp?.error?.description || "Payment failed. Please try again.");
    });
    rzp.open();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    const firstError = FIELD_ORDER.find((k) => errs[k]);
    if (firstError) {
      document.getElementById(`field-${firstError}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      toast.error("Please complete the highlighted fields");
      return;
    }
    if (!window.Razorpay) {
      toast.error("Payment gateway could not load. Please refresh the page and try again.");
      return;
    }

    setStage("processing");
    try {
      const payload = {
        ...form,
        name: form.name.trim(),
        email: form.email.trim(),
        city: form.city.trim(),
        graduationStream: form.graduationStream.trim(),
        graduationYear: Number(form.graduationYear),
        cgpa10: Number(form.cgpa10),
        cgpa12: Number(form.cgpa12),
      };
      const { data: regRes } = await api.post("/user/iq-arena/register", payload, authHeaders());
      const registrationId = regRes.registration._id;
      const { data: orderRes } = await api.post("/user/iq-arena/create-order", { registrationId }, authHeaders());
      openCheckout(orderRes, registrationId);
    } catch (err) {
      const res = isAxiosError(err) ? err.response : undefined;
      if (res?.status === 409 && res.data?.alreadyRegistered && res.data.registration) {
        toast.success("You're already registered for IQ Arena 2027!");
        showSuccess(res.data.registration);
        return;
      }
      if (res?.status === 401) {
        toast.error("Your session has expired. Please log in again.");
        navigate(AUTH_REDIRECT_PATH);
        return;
      }
      toast.error(res?.data?.message || "Something went wrong. Please try again.");
      setStage("form");
    }
  };

  const recheckStatus = async () => {
    setStage("verifying");
    const confirmed = await pollForConfirmation();
    if (!confirmed) setStage("unverified");
  };

  const stepIndex = stage === "success" ? 2 : stage === "processing" || stage === "verifying" || stage === "unverified" ? 1 : 0;
  const busy = stage === "processing" || stage === "verifying";

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#07070d]">
      <Header />

      {/* text-white is scoped to <main> so the shared Header keeps its own colours */}
      <main className="relative overflow-hidden pb-24 pt-32 text-white">
        <ArenaBackground variant="subtle" />
        <div className="container relative mx-auto max-w-6xl px-4">
          <Link
            to="/iq-arena"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-white/55 transition-colors hover:text-orange-300"
          >
            <ArrowLeft className="h-4 w-4" /> Back to IQ Arena 2027
          </Link>

          {stage !== "loading" && (
            <div className="mb-12">
              <Stepper current={stepIndex} />
            </div>
          )}

          {stage === "loading" && (
            <div className="grid min-h-[50vh] place-items-center">
              <Loader2 className="h-10 w-10 animate-spin text-orange-400" />
            </div>
          )}

          {stage === "success" && registration && <SuccessView registration={registration} />}

          {stage === "unverified" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto max-w-xl rounded-3xl border border-amber-400/30 bg-amber-500/[0.06] p-8 text-center"
            >
              <Clock className="mx-auto h-12 w-12 text-amber-300" />
              <h1 className="mt-5 text-2xl font-black text-white">We're confirming your payment</h1>
              <p className="mt-3 text-sm leading-relaxed text-white/65">
                Your payment was received by the gateway but confirmation is taking longer than usual. Please do not pay
                again. You will receive a confirmation email as soon as it is verified. If you don't hear from us within a
                few hours, write to <span className="font-semibold text-white">{IQ_ARENA.contactEmail}</span>.
              </p>
              <button
                onClick={recheckStatus}
                className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 font-bold text-black transition-transform hover:scale-[1.03]"
              >
                Check status again
              </button>
            </motion.div>
          )}

          {(stage === "form" || busy) && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-10 text-center"
              >
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-300">IQ Arena 2027 · Registration</p>
                <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
                  Claim your seat in the <GradientText>Arena</GradientText>
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-white/55">
                  Fill in your details, confirm the declarations and pay securely. Your registration is confirmed only after
                  a successful payment.
                </p>
              </motion.div>

              {fees.testMode && (
                <div className="mx-auto mb-8 max-w-3xl rounded-2xl border-2 border-dashed border-yellow-400/70 bg-yellow-400/10 px-5 py-3 text-center text-sm font-bold text-yellow-200">
                  TEST MODE: the server is charging {formatINR(fees.totalPayable)} instead of ₹159. Remove
                  IQ_ARENA_TEST_AMOUNT from backend/.env before going live.
                </div>
              )}

              <div className="grid gap-8 lg:grid-cols-3">
                <form onSubmit={handleSubmit} noValidate className="space-y-6 lg:col-span-2">
                  {/* 1 — Personal */}
                  <FormSection step={1} title="Personal details" subtitle="Tell us who you are" icon={User}>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field id="name" label="Full name" error={errors.name} className="sm:col-span-2">
                        <Input
                          id="name"
                          value={form.name}
                          onChange={(e) => update("name", e.target.value)}
                          placeholder="As on your college ID"
                          autoComplete="name"
                          maxLength={100}
                          className={inputClass}
                        />
                      </Field>
                      <Field id="email" label="Email address" error={errors.email} hint="Your confirmation will be sent here">
                        <Input
                          id="email"
                          type="email"
                          value={form.email}
                          onChange={(e) => update("email", e.target.value)}
                          placeholder="you@example.com"
                          autoComplete="email"
                          className={inputClass}
                        />
                      </Field>
                      <Field id="mobile" label="Mobile number" error={errors.mobile}>
                        <div className="relative">
                          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-white/40">
                            +91
                          </span>
                          <Input
                            id="mobile"
                            inputMode="numeric"
                            value={form.mobile}
                            onChange={(e) => update("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))}
                            placeholder="98765 43210"
                            autoComplete="tel-national"
                            className={`${inputClass} pl-14`}
                          />
                        </div>
                      </Field>
                      <Field id="gender" label="Gender" error={errors.gender} className="sm:col-span-2">
                        <ChipGroup
                          options={GENDER_OPTIONS}
                          value={form.gender}
                          onChange={(v) => update("gender", v)}
                          cols="grid-cols-2 sm:grid-cols-4"
                          invalid={!!errors.gender}
                        />
                      </Field>
                      <Field id="city" label="City" error={errors.city}>
                        <Input
                          id="city"
                          value={form.city}
                          onChange={(e) => update("city", e.target.value)}
                          placeholder="e.g. Noida"
                          autoComplete="address-level2"
                          className={inputClass}
                        />
                      </Field>
                      <Field id="state" label="State" error={errors.state}>
                        <Select value={form.state} onValueChange={(v) => update("state", v)}>
                          <SelectTrigger id="state" className={selectTriggerClass}>
                            <SelectValue placeholder="Select your state" />
                          </SelectTrigger>
                          <SelectContent className="max-h-72 border-white/10 bg-[#12121c] text-white">
                            {INDIAN_STATES.map((s) => (
                              <SelectItem key={s} value={s} className="focus:bg-orange-500/20 focus:text-white">
                                {s}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </Field>
                    </div>
                  </FormSection>

                  {/* 2 — Academic */}
                  <FormSection step={2} title="Academic profile" subtitle="Your graduation and school scores" icon={GraduationCap}>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field id="collegeYear" label="College year" error={errors.collegeYear} className="sm:col-span-2">
                        <ChipGroup
                          options={COLLEGE_YEAR_OPTIONS}
                          value={form.collegeYear}
                          onChange={(v) => update("collegeYear", v)}
                          cols="grid-cols-2"
                          invalid={!!errors.collegeYear}
                        />
                      </Field>
                      <Field id="graduationYear" label="Graduation year" error={errors.graduationYear} hint="2027 or earlier">
                        <Select value={form.graduationYear} onValueChange={(v) => update("graduationYear", v)}>
                          <SelectTrigger id="graduationYear" className={selectTriggerClass}>
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                          <SelectContent className="max-h-72 border-white/10 bg-[#12121c] text-white">
                            {GRADUATION_YEAR_OPTIONS.map((y) => (
                              <SelectItem key={y} value={y} className="focus:bg-orange-500/20 focus:text-white">
                                {y}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </Field>
                      <Field id="graduationStream" label="Graduation stream" error={errors.graduationStream}>
                        <Input
                          id="graduationStream"
                          value={form.graduationStream}
                          onChange={(e) => update("graduationStream", e.target.value)}
                          placeholder="e.g. B.Com, B.Tech CSE, BBA"
                          className={inputClass}
                        />
                      </Field>
                      <Field id="cgpa10" label="10th CGPA (out of 10)" error={errors.cgpa10}>
                        <Input
                          id="cgpa10"
                          type="number"
                          inputMode="decimal"
                          step="0.01"
                          min={0}
                          max={10}
                          value={form.cgpa10}
                          onChange={(e) => update("cgpa10", e.target.value)}
                          placeholder="e.g. 8.6"
                          className={inputClass}
                        />
                      </Field>
                      <Field id="cgpa12" label="12th CGPA (out of 10)" error={errors.cgpa12}>
                        <Input
                          id="cgpa12"
                          type="number"
                          inputMode="decimal"
                          step="0.01"
                          min={0}
                          max={10}
                          value={form.cgpa12}
                          onChange={(e) => update("cgpa12", e.target.value)}
                          placeholder="e.g. 8.2"
                          className={inputClass}
                        />
                      </Field>
                    </div>
                  </FormSection>

                  {/* 3 — Aspirations */}
                  <FormSection step={3} title="Your aspirations" subtitle="Where you're headed next" icon={Target}>
                    <div className="space-y-6">
                      <Field id="mastersAim" label="Master's degree you're aiming for" error={errors.mastersAim}>
                        <ChipGroup
                          options={MASTERS_AIM_OPTIONS}
                          value={form.mastersAim}
                          onChange={(v) => update("mastersAim", v)}
                          invalid={!!errors.mastersAim}
                        />
                      </Field>
                      <AnimatePresence initial={false}>
                        {form.mastersAim === "Other" && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                            <Field id="mastersAimOther" label="Please specify" error={errors.mastersAimOther}>
                              <Input
                                id="mastersAimOther"
                                value={form.mastersAimOther}
                                onChange={(e) => update("mastersAimOther", e.target.value)}
                                placeholder="e.g. MA Economics, M.Des"
                                className={inputClass}
                              />
                            </Field>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <Field id="entranceExam" label="Entrance exam" error={errors.entranceExam}>
                        <ChipGroup
                          options={ENTRANCE_EXAM_OPTIONS}
                          value={form.entranceExam}
                          onChange={(v) => update("entranceExam", v)}
                          cols="grid-cols-2 sm:grid-cols-4"
                          invalid={!!errors.entranceExam}
                        />
                      </Field>
                      <AnimatePresence initial={false}>
                        {form.entranceExam === "Other" && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                            <Field id="entranceExamOther" label="Please specify" error={errors.entranceExamOther}>
                              <Input
                                id="entranceExamOther"
                                value={form.entranceExamOther}
                                onChange={(e) => update("entranceExamOther", e.target.value)}
                                placeholder="e.g. SNAP, IIFT, CUET-PG"
                                className={inputClass}
                              />
                            </Field>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </FormSection>

                  {/* 4 — Declarations */}
                  <FormSection step={4} title="Declarations" subtitle="Required before payment" icon={FileText}>
                    <div className="space-y-4">
                      <div id="field-offlineEventAccepted" className="scroll-mt-32">
                        <label
                          htmlFor="offlineEventAccepted"
                          className={`flex cursor-pointer gap-4 rounded-2xl border p-5 transition-colors ${
                            form.offlineEventAccepted
                              ? "border-orange-400/50 bg-orange-500/[0.08]"
                              : errors.offlineEventAccepted
                                ? "border-rose-500/50 bg-rose-500/[0.04]"
                                : "border-white/10 bg-white/[0.02] hover:border-white/20"
                          }`}
                        >
                          <Checkbox
                            id="offlineEventAccepted"
                            checked={form.offlineEventAccepted}
                            onCheckedChange={(c) => update("offlineEventAccepted", c === true)}
                            className="mt-0.5 h-5 w-5 rounded-md border-white/30 data-[state=checked]:border-orange-500 data-[state=checked]:bg-orange-500"
                          />
                          <span className="text-sm leading-relaxed text-white/80">
                            <span className="mb-1 flex items-center gap-2 font-bold text-white">
                              <MapPin className="h-4 w-4 text-orange-300" /> This is an OFFLINE event
                            </span>
                            I understand that IQ Arena 2027 will be held in person on {IQ_ARENA.eventDateLabel} at{" "}
                            {IQ_ARENA.venue} ({IQ_ARENA.region}), and I will attend the event physically.
                          </span>
                        </label>
                        {errors.offlineEventAccepted && (
                          <p className="mt-1.5 text-xs font-medium text-rose-400">{errors.offlineEventAccepted}</p>
                        )}
                      </div>

                      <div id="field-termsAccepted" className="scroll-mt-32">
                        <div
                          className={`flex gap-4 rounded-2xl border p-5 transition-colors ${
                            form.termsAccepted
                              ? "border-orange-400/50 bg-orange-500/[0.08]"
                              : errors.termsAccepted
                                ? "border-rose-500/50 bg-rose-500/[0.04]"
                                : "border-white/10 bg-white/[0.02] hover:border-white/20"
                          }`}
                        >
                          <Checkbox
                            id="termsAccepted"
                            checked={form.termsAccepted}
                            onCheckedChange={(c) => update("termsAccepted", c === true)}
                            className="mt-0.5 h-5 w-5 rounded-md border-white/30 data-[state=checked]:border-orange-500 data-[state=checked]:bg-orange-500"
                          />
                          <div className="text-sm leading-relaxed text-white/80">
                            <label htmlFor="termsAccepted" className="mb-1 flex cursor-pointer items-center gap-2 font-bold text-white">
                              <ShieldCheck className="h-4 w-4 text-orange-300" /> Terms & Conditions
                            </label>
                            <label htmlFor="termsAccepted" className="cursor-pointer">
                              I have read and accept the{" "}
                            </label>
                            <button
                              type="button"
                              onClick={() => setTermsOpen(true)}
                              className="font-semibold text-orange-300 underline underline-offset-4 hover:text-orange-200"
                            >
                              IQ Arena 2027 Terms & Conditions
                            </button>
                            , including the non-refundable registration and platform fee.
                          </div>
                        </div>
                        {errors.termsAccepted && (
                          <p className="mt-1.5 text-xs font-medium text-rose-400">{errors.termsAccepted}</p>
                        )}
                      </div>
                    </div>
                  </FormSection>

                  <button
                    type="submit"
                    disabled={busy || !form.offlineEventAccepted || !form.termsAccepted}
                    className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 py-5 text-lg font-extrabold text-white shadow-[0_10px_40px_-5px_rgba(249,115,22,0.6)] transition-all hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
                  >
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : <Lock className="h-5 w-5" />}
                    {busy ? "Please wait…" : `Proceed to Pay ${formatINR(fees.totalPayable)}`}
                  </button>
                  {(!form.offlineEventAccepted || !form.termsAccepted) && (
                    <p className="text-center text-xs text-white/40">
                      Tick both declarations above to enable payment.
                    </p>
                  )}
                </form>

                {/* Summary */}
                <aside className="lg:col-span-1">
                  <div className="space-y-5 lg:sticky lg:top-28">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="relative overflow-hidden rounded-3xl border border-orange-400/30 bg-gradient-to-br from-[#1b100a] via-[#0f0b16] to-[#170a15] p-6 shadow-[0_0_60px_-20px_rgba(249,115,22,0.5)]"
                    >
                      <div aria-hidden className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-orange-500/25 blur-3xl" />
                      <div className="relative">
                        <div className="flex items-center gap-3">
                          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-amber-300 to-orange-600 shadow-lg">
                            <Trophy className="h-6 w-6 text-black/70" />
                          </div>
                          <div>
                            <p className="text-lg font-black leading-tight">IQ Arena 2027</p>
                            <p className="text-xs text-white/50">Quiz Championship</p>
                          </div>
                        </div>

                        <ul className="mt-6 space-y-3 text-sm">
                          <li className="flex gap-3 text-white/75">
                            <CalendarDays className="h-4 w-4 shrink-0 text-orange-300" />
                            {IQ_ARENA.eventDay}, {IQ_ARENA.eventDateLabel}
                          </li>
                          <li className="flex gap-3 text-white/75">
                            <MapPin className="h-4 w-4 shrink-0 text-orange-300" />
                            {IQ_ARENA.venue} ({IQ_ARENA.region})
                          </li>
                          <li className="flex gap-3 text-white/75">
                            <BookOpen className="h-4 w-4 shrink-0 text-orange-300" />
                            5 rounds · Offline event
                          </li>
                        </ul>

                        <div className="mt-6 space-y-2.5 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm">
                          <div className="flex justify-between text-white/65">
                            <span>Registration fee</span>
                            <span>{formatINR(fees.registrationFee)}</span>
                          </div>
                          <div className="flex justify-between text-white/65">
                            <span>Platform fee</span>
                            <span>{formatINR(fees.platformCharge)}</span>
                          </div>
                          <div className="flex items-baseline justify-between border-t border-white/10 pt-3">
                            <span className="font-bold text-white">Total payable</span>
                            <span className="text-2xl font-black text-white">{formatINR(fees.totalPayable)}</span>
                          </div>
                        </div>

                        <p className="mb-3 mt-6 text-center text-[11px] font-bold uppercase tracking-[0.25em] text-white/45">
                          The Arena opens in
                        </p>
                        <Countdown size="sm" />
                      </div>
                    </motion.div>

                    <div className="space-y-3 rounded-3xl border border-white/10 bg-white/[0.03] p-5 text-sm">
                      {[
                        { icon: ShieldCheck, text: "100% secure payment via Razorpay" },
                        { icon: Mail, text: "Instant confirmation email after payment" },
                        { icon: User, text: "One registration per participant" },
                      ].map((t) => (
                        <div key={t.text} className="flex items-center gap-3 text-white/65">
                          <t.icon className="h-4 w-4 shrink-0 text-emerald-300" />
                          {t.text}
                        </div>
                      ))}
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 text-xs leading-relaxed text-white/50">
                      Presented by <span className="font-bold text-white/80">{IQ_ARENA.organizer}</span> · In association
                      with <span className="font-bold text-white/80">{IQ_ARENA.collaborationPartner}</span> · Event partner{" "}
                      <span className="font-bold text-white/80">{IQ_ARENA.eventPartner}</span>
                    </div>
                  </div>
                </aside>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Processing overlay */}
      <AnimatePresence>
        {busy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] grid place-items-center bg-black/70 backdrop-blur-sm"
          >
            <div className="rounded-3xl border border-white/10 bg-[#0d0d17] px-10 py-8 text-center shadow-2xl">
              <Loader2 className="mx-auto h-10 w-10 animate-spin text-orange-400" />
              <p className="mt-4 font-bold text-white">
                {stage === "verifying" ? "Confirming your payment…" : "Opening secure payment…"}
              </p>
              <p className="mt-1 text-sm text-white/50">Please don't close or refresh this page.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Terms dialog */}
      <Dialog open={termsOpen} onOpenChange={setTermsOpen}>
        <DialogContent className="max-h-[85vh] max-w-3xl overflow-y-auto border-white/10 bg-[#0d0d17] text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-white">IQ Arena 2027 — Terms & Conditions</DialogTitle>
            <DialogDescription className="text-white/50">
              Please read carefully before completing your registration.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-2">
            <IqArenaTerms />
          </div>
          <div className="sticky bottom-0 -mx-6 -mb-6 mt-4 flex justify-end gap-3 border-t border-white/10 bg-[#0d0d17] px-6 py-4">
            <button
              type="button"
              onClick={() => setTermsOpen(false)}
              className="rounded-xl border border-white/15 px-5 py-2.5 text-sm font-bold text-white/80 hover:bg-white/5"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                update("termsAccepted", true);
                setTermsOpen(false);
              }}
              className="rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 px-5 py-2.5 text-sm font-extrabold text-white"
            >
              I Accept
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default IqArenaRegister;
