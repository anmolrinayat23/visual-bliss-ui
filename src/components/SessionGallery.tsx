import { useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowDownLeft, ArrowLeft, ArrowRight, ArrowUpRight, Camera, Check,
  Expand, MessageCircle, Pause, Play, Presentation, Sparkles, Users,
  X, ZoomIn, ZoomOut,
} from "lucide-react";
import g1 from "@/assets/gallery/gallery_1.jpg";
import g2 from "@/assets/gallery/gallery_2.jpg";
import g3 from "@/assets/gallery/gallery_3.jpg";
import g4 from "@/assets/gallery/gallery_4.jpg";
import g5 from "@/assets/gallery/gallery_5.jpg";
import g6 from "@/assets/gallery/gallery_6.jpg";
import g7 from "@/assets/gallery/gallery_7.jpg";
import g8 from "@/assets/gallery/gallery_8.jpg";
import g9 from "@/assets/gallery/gallery_9.jpg";
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
};

// Original photographs travel with the build; no platform-only image URLs.
const featured: Session = {
  id: "full-class", src: g8, title: "A room full of possibility.", category: "Mentorship",
  alt: "Students and an Educate Me mentor sharing a live online classroom session in a video-call grid.",
  width: 1366, height: 600,
};
const sessions: Session[] = [
  { id: "classroom", src: g2, title: "Learning, together.", category: "Mentorship", alt: "Educate Me students and mentors in a group video-call classroom.", width: 1078, height: 610 },
  { id: "guidance", src: g4, title: "A little expert perspective.", category: "Personal guidance", alt: "A student discussing their next steps with experts on an Educate Me guidance call.", width: 1058, height: 610 },
  { id: "mindset", src: g9, title: "A fresh way to think.", category: "Workshops", alt: "A Mindset Shift presentation from an Educate Me workshop, exploring ownership of learning and meaningful work.", width: 905, height: 528 },
  { id: "small-group", src: g1, title: "Space for every question.", category: "Mentorship", alt: "A small group of students and their mentor in an Educate Me online discussion.", width: 1058, height: 610 },
  { id: "counselling", src: g6, title: "Your goals. Your conversation.", category: "Personal guidance", alt: "A student speaking during a personal Educate Me counselling session.", width: 1095, height: 472 },
  { id: "batch", src: g5, title: "Growing as a community.", category: "Mentorship", alt: "Students joining an Educate Me group learning session over a video call.", width: 1078, height: 610 },
  { id: "interactive", src: g3, title: "Ideas into understanding.", category: "Mentorship", alt: "Students taking notes while their Educate Me mentor leads an interactive session.", width: 1056, height: 610 },
  { id: "connections", src: g7, title: "Different faces. Shared ambition.", category: "Mentorship", alt: "A full grid of students connecting with an Educate Me mentor during a live class.", width: 1048, height: 610 },
];
const allSessions = [featured, ...sessions];
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
          <span className="session-journal__wash" />
          <svg className="session-journal__thread" viewBox="0 0 1440 1400" fill="none" preserveAspectRatio="none"><path d="M-40 500C240 260 460 420 590 300S1130 80 1270 360S1110 750 1330 940S1570 1160 1350 1380" /></svg>
          <Sparkles className="session-journal__spark session-journal__spark--one" />
          <Sparkles className="session-journal__spark session-journal__spark--two" />
        </div>
        <div className="session-journal__container">
          <div className="session-journal__topline">
            <span><Camera size={15} aria-hidden="true" /><span>INSIDE EDUCATE ME</span><span className="session-journal__topline-divider" /><span className="session-journal__journal-label">THE SESSION JOURNAL</span></span>
            {!reducedMotion && <button type="button" className="session-journal__motion-toggle" onClick={() => setPaused((value) => !value)} aria-label="Pause gallery animations" aria-pressed={paused}>
              {paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}<span>{paused ? "Motion paused" : "Pause motion"}</span>
            </button>}
          </div>

          <div className="session-journal__heading">
            <div>
              <p className="session-journal__eyebrow">A CLOSER LOOK AT THE JOURNEY</p>
              <h2 id="session-journal-title">Glimpses of our<br /><em>Live Sessions.<svg viewBox="0 0 480 18" fill="none" aria-hidden="true"><path d="M3 11C120 1 300 1 475 8M135 17C240 9 340 9 432 13" /></svg></em></h2>
            </div>
            <div className="session-journal__intro">
              <p>The questions. The conversations.<br />The moments that move us forward.</p>
              <span>Step inside our mentorship classes, personal guidance calls and workshops. This is what learning together looks like.</span>
              <span className="session-journal__handwritten">Real people. A little more possibility.<ArrowDownLeft size={24} aria-hidden="true" /></span>
            </div>
          </div>

          <div className="session-journal__feature">
            <motion.div className="session-journal__feature-frame" initial={false} whileInView={reducedMotion || paused ? { opacity: 1, y: 0 } : { opacity: [0.4, 1], y: [24, 0] }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65 }}>
              <div className="session-journal__frame-top"><span className="session-journal__frame-dots" aria-hidden="true"><i /><i /><i /></span><span>THE CLASSROOM, UP CLOSE</span><Camera size={14} aria-hidden="true" /></div>
              <button type="button" className="session-journal__feature-photo" onClick={(event) => openPhoto(featured, event.currentTarget, allSessions)} aria-label="View featured classroom photo" aria-haspopup="dialog">
                <img src={featured.src} alt={featured.alt} width={featured.width} height={featured.height} loading="lazy" decoding="async" />
                <span className="session-journal__feature-open"><Expand size={18} aria-hidden="true" /><span>Step inside</span></span>
              </button>
              <div className="session-journal__feature-caption"><div><span className="session-journal__eyebrow">IN FOCUS / GROUP MENTORSHIP</span><h3>{featured.title}</h3></div><span className="session-journal__snapshot">A moment from our sessions</span></div>
            </motion.div>
            <aside className="session-journal__fieldnote">
              <span className="session-journal__tape" aria-hidden="true" />
              <span className="session-journal__note-label"><Sparkles size={15} aria-hidden="true" /> MORE THAN A CLASS</span>
              <p>Good questions.<br />Real connections.<br /><em>New beginnings.</em></p>
              <span className="session-journal__note-copy">Behind every next step is a conversation that makes things a little clearer.</span>
              <div className="session-journal__note-list"><span><Check size={14} aria-hidden="true" /> Room for your questions</span><span><Check size={14} aria-hidden="true" /> Guidance for your goals</span><span><Check size={14} aria-hidden="true" /> Learning with a community</span></div>
              <svg className="session-journal__note-star" viewBox="0 0 80 80" fill="none" aria-hidden="true"><path d="M40 5L45 29L64 14L52 35L76 40L52 45L66 66L45 52L40 76L35 52L14 66L29 45L5 40L29 35L15 15L35 29Z" /></svg>
            </aside>
          </div>

          <div className="session-journal__gallery-heading"><div><span className="session-journal__eyebrow">THE MOMENTS IN BETWEEN</span><h3>A window into our world.</h3></div><span className="session-journal__gallery-hint"><Expand size={14} aria-hidden="true" /> Tap any photo to explore</span></div>
          <div className="session-journal__filter-row">
            <div className="session-journal__filters" role="group" aria-label="Filter session photos">
              {filters.map((item) => <button key={item} type="button" className="session-journal__filter" aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}<span>{item === "All moments" ? sessions.length : sessions.filter((session) => session.category === item).length}</span></button>)}
            </div>
            <span className="session-journal__result-count" aria-live="polite">{String(visibleSessions.length).padStart(2, "0")} moments to explore</span>
          </div>

          <div ref={photosRef} className="session-journal__photos" onScroll={updateScroll} role="region" aria-label="Session photographs" tabIndex={0}>
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
                  <span className="session-journal__card-image"><img src={session.src} alt={session.alt} width={session.width} height={session.height} loading="lazy" decoding="async" /><span className="session-journal__card-expand"><Expand size={17} aria-hidden="true" /></span><span className="session-journal__photo-index" aria-hidden="true">{String(sessions.indexOf(session) + 1).padStart(2, "0")}</span></span>
                  <span className="session-journal__card-body"><span className="session-journal__card-category"><Icon size={12} aria-hidden="true" />{session.category}</span><span className="session-journal__card-title">{session.title}</span><span className="session-journal__card-footer">A moment at Educate Me<ArrowUpRight size={16} aria-hidden="true" /></span></span>
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
