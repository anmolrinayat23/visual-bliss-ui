import { useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowDownLeft, ArrowLeft, ArrowRight, ArrowUpRight, Camera,
  Expand, MessageCircle, Pause, Play, Presentation, Sparkles, Users,
  X, ZoomIn, ZoomOut,
} from "lucide-react";
import classroom from "@/assets/sessions/session-054-classroom.png";
import conversation from "@/assets/sessions/session-098-discussion.png";
import interactiveWorkshop from "@/assets/sessions/session-040-faculty-workshop.png";
import community from "@/assets/sessions/session-091-community.png";
import familyGuidance from "@/assets/sessions/session-073-family-guidance.png";
import familyConversation from "@/assets/sessions/session-076-family-guidance.png";
import familyCounselling from "@/assets/sessions/session-085-family-guidance.png";
import facultyWorkshop from "@/assets/sessions/session-007-faculty-workshop.png";
import "./SessionGallery.css";

const filters = ["All moments", "Mentorship", "Personal guidance", "Workshops"] as const;
type Filter = (typeof filters)[number];
type Session = {
  id: string;
  src: string;
  title: string;
  category: Exclude<Filter, "All moments">;
  alt: string;
  width: number;
  height: number;
  crop: { x: number; y: number; width: number; height: number };
};

// Byte-for-byte originals from the user's Screenshots folder. Preview bounds
// hide browser/desktop chrome with CSS; the viewer always opens the full file.
const featured: Session = {
  id: "full-class", src: classroom, title: "A classroom full of possibility.", category: "Mentorship",
  alt: "An Educate Me group session with students and their mentor in a large video-call grid.",
  width: 1366, height: 768, crop: { x: 8, y: 120, width: 1350, height: 544 },
};
const sessions: Session[] = [
  { id: "community", src: community, title: "Different faces. Shared ambition.", category: "Mentorship", alt: "Students and their Educate Me mentor connecting in a classroom video-call grid.", width: 1366, height: 768, crop: { x: 13, y: 145, width: 1040, height: 480 } },
  { id: "small-group", src: conversation, title: "Learning grows through conversation.", category: "Mentorship", alt: "Five participants smiling and talking together during a small-group Educate Me session.", width: 1366, height: 768, crop: { x: 13, y: 145, width: 1040, height: 480 } },
  { id: "family-guidance", src: familyGuidance, title: "Planning the next step, together.", category: "Personal guidance", alt: "An Educate Me guidance call with two participants sharing one camera, a faculty member and a mentor.", width: 1366, height: 768, crop: { x: 113, y: 141, width: 859, height: 489 } },
  { id: "family-conversation", src: familyConversation, title: "Guidance that includes the family.", category: "Personal guidance", alt: "A student and an accompanying participant sharing a camera during a guidance conversation with two mentors.", width: 1366, height: 768, crop: { x: 113, y: 141, width: 859, height: 489 } },
  { id: "family-counselling", src: familyCounselling, title: "A shared conversation. A clearer plan.", category: "Personal guidance", alt: "Three participants sharing one video tile in an Educate Me guidance conversation with a faculty member and mentor.", width: 1366, height: 768, crop: { x: 113, y: 141, width: 859, height: 489 } },
  { id: "faculty-workshop", src: facultyWorkshop, title: "Learn with faculty. Grow with confidence.", category: "Workshops", alt: "A faculty member, students and an Educate Me mentor participating in a teacher-led group session.", width: 1366, height: 768, crop: { x: 14, y: 141, width: 1338, height: 523 } },
  { id: "interactive-workshop", src: interactiveWorkshop, title: "Expert perspectives. Fresh possibilities.", category: "Workshops", alt: "A teacher speaking with students and an Educate Me mentor in an interactive group video session.", width: 1366, height: 768, crop: { x: 16, y: 147, width: 1335, height: 509 } },
];
const allSessions = [featured, ...sessions];

function SessionPreview({ session, fit = false }: { session: Session; fit?: boolean }) {
  return <span className="session-journal__viewport" style={{ aspectRatio: `${session.crop.width} / ${session.crop.height}`, width: fit ? `${Math.min(1, (session.crop.width / session.crop.height) / (16 / 9)) * 100}%` : "100%" }}>
    <img
      src={session.src} alt={session.alt} width={session.width} height={session.height}
      loading="lazy" decoding="async"
      style={{ width: `${session.width / session.crop.width * 100}%`, left: `${-session.crop.x / session.crop.width * 100}%`, top: `${-session.crop.y / session.crop.height * 100}%` }}
    />
  </span>;
}
const categoryIcons = { Mentorship: Users, "Personal guidance": MessageCircle, Workshops: Presentation };

const SessionGallery = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const photosRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const inView = useInView(sectionRef, { amount: 0.05 });
  const [paused, setPaused] = useState(false);
  const [filter, setFilter] = useState<Filter>("All moments");
  const [selected, setSelected] = useState<string | null>(null);
  const [viewerSessions, setViewerSessions] = useState<Session[]>(allSessions);
  const [zoomed, setZoomed] = useState(false);
  const [scrollable, setScrollable] = useState({ back: false, next: false });
  const visibleSessions = filter === "All moments" ? sessions : sessions.filter((session) => session.category === filter);
  const currentIndex = viewerSessions.findIndex((session) => session.id === selected);
  const current = currentIndex < 0 ? null : viewerSessions[currentIndex];
  const animate = !reducedMotion && !paused && inView && selected === null;

  const updateScroll = () => {
    const el = photosRef.current;
    if (el) setScrollable({ back: el.scrollLeft > 4, next: el.scrollLeft + el.clientWidth < el.scrollWidth - 4 });
  };

  useEffect(() => {
    const el = photosRef.current;
    if (!el) return;
    el.scrollTo({ left: 0, behavior: "instant" });
    const frame = requestAnimationFrame(updateScroll);
    const observer = new ResizeObserver(updateScroll);
    observer.observe(el);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); };
  }, [filter]);

  useEffect(() => {
    canvasRef.current?.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [selected, zoomed]);

  const openPhoto = (session: Session, trigger: HTMLButtonElement, collection: Session[]) => {
    openerRef.current = trigger;
    setViewerSessions(collection);
    setZoomed(false);
    setSelected(session.id);
  };

  const changePhoto = (direction: number) => {
    const next = (currentIndex + direction + viewerSessions.length) % viewerSessions.length;
    setSelected(viewerSessions[next].id);
    setZoomed(false);
  };

  const scrollPhotos = (direction: number) => {
    const el = photosRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".session-journal__card");
    el.scrollBy({ left: direction * ((card?.offsetWidth ?? el.clientWidth) + 16), behavior: reducedMotion || paused ? "instant" : "smooth" });
  };

  return (
    <>
      <section id="live-sessions" ref={sectionRef} className="session-journal" aria-labelledby="session-journal-title" data-animated={animate}>
        <div className="session-journal__decoration" aria-hidden="true">
          <span className="session-journal__wash" /><span className="session-journal__background-word">TOGETHER.</span>
          <svg className="session-journal__thread" viewBox="0 0 1440 1400" fill="none" preserveAspectRatio="none"><path d="M-40 500C240 260 460 420 590 300S1130 80 1270 360S1110 750 1330 940S1570 1160 1350 1380" /></svg>
          <Sparkles className="session-journal__spark session-journal__spark--one" />
          <Sparkles className="session-journal__spark session-journal__spark--two" />
        </div>
        <div className="session-journal__container">
          <div className="session-journal__topline">
            <span><Camera size={15} aria-hidden="true" /><span>INSIDE EDUCATE ME</span><span className="session-journal__topline-divider" /><span className="session-journal__journal-label">THE SESSION JOURNAL</span></span>
            {!reducedMotion && <button type="button" className="session-journal__motion-toggle" onClick={() => setPaused((value) => !value)} aria-label={paused ? "Resume gallery animations" : "Pause gallery animations"} aria-pressed={paused}>
              {paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}<span>{paused ? "Resume motion" : "Pause motion"}</span>
            </button>}
          </div>

          <div className="session-journal__heading">
            <div>
              <p className="session-journal__eyebrow">REAL MOMENTS. REAL CONNECTIONS.</p>
              <h2 id="session-journal-title">Inside our<br /><em>Live Sessions.<svg viewBox="0 0 480 18" fill="none" aria-hidden="true"><path d="M3 11C120 1 300 1 475 8M135 17C240 9 340 9 432 13" /></svg></em></h2>
            </div>
            <div className="session-journal__intro">
              <p>A screen full of people.<br />A world of possibility.</p>
              <span>From personal guidance to practical workshops, take a look at the conversations moving our students forward.</span>
              <span className="session-journal__handwritten">This is where it begins.<ArrowDownLeft size={24} aria-hidden="true" /></span>
            </div>
          </div>

          <div className="session-journal__feature">
            <motion.div className="session-journal__feature-frame" initial={false} whileInView={reducedMotion || paused ? { opacity: 1, y: 0 } : { opacity: [0.5, 1], y: [24, 0] }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: reducedMotion || paused ? 0 : 0.7 }}>
              <div className="session-journal__frame-top"><span className="session-journal__frame-dots" aria-hidden="true"><i /><i /><i /></span><span>THE CLASSROOM, UP CLOSE</span><Camera size={15} aria-hidden="true" /></div>
              <button type="button" className="session-journal__feature-photo" onClick={(event) => openPhoto(featured, event.currentTarget, allSessions)} aria-label="View featured classroom photo" aria-haspopup="dialog">
                <SessionPreview session={featured} />
                <span className="session-journal__feature-open"><Expand size={15} aria-hidden="true" /><span>Open the full moment</span><ArrowUpRight size={17} aria-hidden="true" /></span>
              </button>
              <div className="session-journal__feature-caption"><div><span className="session-journal__eyebrow">GROUP MENTORSHIP / LEARNING TOGETHER</span><h3>{featured.title}</h3></div><span className="session-journal__snapshot">One classroom.<br />So many possibilities.</span></div>
            </motion.div>
          </div>

          <div className="session-journal__gallery-heading"><div><span className="session-journal__eyebrow">THE SESSION COLLECTION</span><h3>A closer look at the journey.</h3></div><span className="session-journal__gallery-hint"><Expand size={14} aria-hidden="true" /> Tap any photo to explore</span></div>
          <div className="session-journal__filter-row">
            <div className="session-journal__filters" role="group" aria-label="Filter session photos">
              {filters.map((item) => <button key={item} type="button" className="session-journal__filter" aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}<span>{item === "All moments" ? sessions.length : sessions.filter((session) => session.category === item).length}</span></button>)}
            </div>
            <span className="session-journal__result-count" aria-live="polite">{String(visibleSessions.length).padStart(2, "0")} moments to explore</span>
          </div>

          <div ref={photosRef} className="session-journal__photos" data-layout={filter === "All moments" ? "all" : visibleSessions.length === 2 ? "pair" : "filtered"} onScroll={updateScroll} role="region" aria-label="Session photographs" tabIndex={0}>
            <AnimatePresence initial={false} mode="popLayout" onExitComplete={() => requestAnimationFrame(updateScroll)}>
              {visibleSessions.map((session, index) => {
                const Icon = categoryIcons[session.category];
                return <motion.button
                  layout={!reducedMotion && !paused}
                  key={session.id} type="button" className="session-journal__card"
                  initial={reducedMotion || paused ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: reducedMotion || paused ? 1 : 0.97 }}
                  transition={{ duration: reducedMotion || paused ? 0 : 0.28, delay: reducedMotion || paused ? 0 : index * 0.025 }}
                  onClick={(event) => openPhoto(session, event.currentTarget, visibleSessions)}
                  aria-label={`View ${session.title} photo`} aria-haspopup="dialog"
                >
                  <span className="session-journal__card-image"><SessionPreview session={session} fit /><span className="session-journal__card-expand"><Expand size={17} aria-hidden="true" /></span><span className="session-journal__photo-index" aria-hidden="true">{String(sessions.indexOf(session) + 1).padStart(2, "0")}</span></span>
                  <span className="session-journal__card-body"><span className="session-journal__card-category"><Icon size={12} aria-hidden="true" />{session.category}</span><span className="session-journal__card-title">{session.title}</span><span className="session-journal__card-footer">Explore this moment<ArrowUpRight size={16} aria-hidden="true" /></span></span>
                </motion.button>;
              })}
            </AnimatePresence>
          </div>
          <div className="session-journal__mobile-nav"><span>{visibleSessions.length > 1 ? "Swipe through the moments" : "One moment. A fresh perspective."}</span><div><button type="button" aria-label="Show earlier photos" disabled={!scrollable.back} onClick={() => scrollPhotos(-1)}><ArrowLeft size={18} aria-hidden="true" /></button><button type="button" aria-label="Show more photos" disabled={!scrollable.next} onClick={() => scrollPhotos(1)}><ArrowRight size={18} aria-hidden="true" /></button></div></div>

        </div>
      </section>

      <Dialog.Root open={selected !== null} onOpenChange={(open) => { if (!open) setSelected(null); }}>
        <Dialog.Portal>
          <Dialog.Overlay className="session-lightbox__overlay" />
          <Dialog.Content className="session-lightbox" onCloseAutoFocus={(event) => { event.preventDefault(); openerRef.current?.focus({ preventScroll: true }); }} onKeyDown={(event) => {
            if (!zoomed && !event.altKey && !event.ctrlKey && !event.metaKey && (event.key === "ArrowLeft" || event.key === "ArrowRight")) { event.preventDefault(); changePhoto(event.key === "ArrowRight" ? 1 : -1); }
          }}>
            <div className="session-lightbox__toolbar"><div><span className="session-lightbox__eyebrow">INSIDE EDUCATE ME / {current?.category}</span><Dialog.Title className="session-lightbox__title">{current?.title}</Dialog.Title><Dialog.Description className="sr-only">A photograph from an Educate Me session. Use the previous and next buttons to explore, or zoom in for a closer look.</Dialog.Description></div><div className="session-lightbox__actions"><button type="button" onClick={() => setZoomed((value) => !value)} aria-label={zoomed ? "Fit photo to screen" : "Zoom in to see details"} aria-pressed={zoomed}>{zoomed ? <ZoomOut size={19} aria-hidden="true" /> : <ZoomIn size={19} aria-hidden="true" />}</button><Dialog.Close aria-label="Close photo viewer"><X size={23} aria-hidden="true" /></Dialog.Close></div></div>
            <div ref={canvasRef} className={`session-lightbox__canvas${zoomed ? " session-lightbox__canvas--zoomed" : ""}`} tabIndex={0} aria-label="Session photo. Scroll to explore when zoomed.">
              {current && <img className="session-lightbox__image" key={current.id} src={current.src} alt={current.alt} width={current.width} height={current.height} style={zoomed ? { width: current.width, minWidth: "100%" } : undefined} />}
            </div>
            <div className="session-lightbox__footer"><button type="button" aria-label="Previous photo" disabled={viewerSessions.length < 2} onClick={() => changePhoto(-1)}><ArrowLeft size={20} aria-hidden="true" /></button><span aria-live="polite">{String(currentIndex + 1).padStart(2, "0")} <span>/ {String(viewerSessions.length).padStart(2, "0")}</span></span><button type="button" aria-label="Next photo" disabled={viewerSessions.length < 2} onClick={() => changePhoto(1)}><ArrowRight size={20} aria-hidden="true" /></button></div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

export default SessionGallery;
