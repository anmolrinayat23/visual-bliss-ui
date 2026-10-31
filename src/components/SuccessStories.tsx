import { useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  GraduationCap,
  Maximize2,
  Pause,
  Play,
  Sparkles,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { Link } from "react-router-dom";
import batchOne from "@/assets/success-stories/batch-1-pg-2026.jpeg";
import batchTwo from "@/assets/success-stories/batch-2-2026.jpeg";
import "./SuccessStories.css";

const banners = [
  {
    src: batchOne,
    chapter: "01",
    title: "The first of many.",
    batch: "Batch 1",
    year: "PG · 2026",
    caption: "Big ambitions. Remarkable new beginnings.",
    width: 1024,
    height: 1280,
    alt: "Educate Me Batch 1, PG 2026 success banner featuring 18 students and their destinations, including IIM Jammu, Great Lakes, NMIMS, SOIL and XISS. The first chapter of many success stories.",
  },
  {
    src: batchTwo,
    chapter: "02",
    title: "And the story continues.",
    batch: "Batch 2",
    year: "Class of 2026",
    caption: "New faces. New dreams. The same determination.",
    width: 1060,
    height: 1330,
    alt: "Educate Me Batch 2, 2026 success banner featuring nine students and their destinations, including Great Lakes Gurugram, GL Bajaj, Asian School of Business, RIIM Pune, GIBS, IILM, SIRT and LNCT.",
  },
];

type Banner = (typeof banners)[number];

const destinations = [
  { name: "Great Lakes", logo: "/Great Lakes Institute of Management.png" },
  { name: "NMIMS", logo: "/NMIMS School of Business Management.png" },
  { name: "SOIL", logo: "/SOIL Institute of Management.jpg" },
  { name: "GL Bajaj", logo: "/GL Bajaj Institute of Management.jpeg" },
];

function BannerCard({
  banner,
  index,
  animate,
  activeOnMobile,
  onOpen,
}: {
  banner: Banner;
  index: number;
  animate: boolean;
  activeOnMobile: boolean;
  onOpen: (index: number, trigger: HTMLButtonElement) => void;
}) {
  return (
    <motion.article
      className={`success-story success-story--${index + 1}${activeOnMobile ? " success-story--mobile-active" : ""}`}
      initial={false}
      whileInView={animate ? { opacity: [0.65, 1], y: [24, 0] } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: animate ? 0.7 : 0, delay: animate ? index * 0.12 : 0, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="success-story__frame">
        <span className="success-story__tape" aria-hidden="true" />
        <div className="success-story__chapter">
          <span className="success-story__number">CHAPTER {banner.chapter}</span>
          <span className="success-story__chapter-label">{index === 0 ? "18" : "9"} student stories <Sparkles size={13} aria-hidden="true" /></span>
        </div>
        <button
          type="button"
          className="success-story__poster"
          onClick={(event) => onOpen(index, event.currentTarget)}
          aria-label={`View ${banner.batch} success banner full screen`}
          aria-haspopup="dialog"
        >
          <span className="success-story__image">
            <img
              src={banner.src}
              alt={banner.alt}
              width={banner.width}
              height={banner.height}
              loading="lazy"
              decoding="async"
            />
            <span className="success-story__hover-hint" aria-hidden="true"><Maximize2 size={17} /> A closer look</span>
          </span>
          <span className="success-story__caption">
            <span>
              <span className="success-story__batch">{banner.batch}</span>
              <span className="success-story__year">{banner.year}</span>
            </span>
            <span className="success-story__expand"><Maximize2 size={17} aria-hidden="true" /></span>
          </span>
        </button>
        <h3 className="success-story__title">{banner.title}</h3>
      </div>
      <p className="success-story__note">{banner.caption}</p>
    </motion.article>
  );
}

const SuccessStories = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { amount: 0.1 });
  const reducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [mobileBatch, setMobileBatch] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const animate = !reducedMotion && !paused && inView && selected === null;
  const current = selected === null ? null : banners[selected];

  const openBanner = (index: number, trigger: HTMLButtonElement) => {
    openerRef.current = trigger;
    setZoomed(false);
    setSelected(index);
  };

  const changeBanner = (direction: number) => {
    setSelected((index) => index === null ? null : (index + direction + banners.length) % banners.length);
    setZoomed(false);
  };

  useEffect(() => {
    viewerRef.current?.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [selected, zoomed]);

  return (
    <>
      <section
        ref={sectionRef}
        id="success-stories"
        className="success-stories"
        aria-labelledby="success-stories-title"
        data-animated={animate}
      >
        <div className="success-stories__ambient" aria-hidden="true">
          <span className="success-stories__paper-grid" />
          <span className="success-stories__edge-word">POSSIBILITIES</span>
        </div>

        <div className="success-stories__container">
          <div className="success-stories__topline">
            <span className="success-stories__kicker"><GraduationCap size={18} aria-hidden="true" /> EDUCATE ME <span>/</span> THE SUCCESS EDIT</span>
            <div className="success-stories__topline-actions">
              <span className="success-stories__class">REAL PEOPLE. REMARKABLE BEGINNINGS.</span>
              {!reducedMotion && (
                <button
                  type="button"
                  className="success-stories__motion-toggle"
                  onClick={() => setPaused((value) => !value)}
                  aria-pressed={paused}
                  aria-label={paused ? "Resume success story animations" : "Pause success story animations"}
                >
                  {paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}
                  <span>{paused ? "Resume motion" : "Pause motion"}</span>
                </button>
              )}
            </div>
          </div>

          <div className="success-stories__showcase">
            <motion.div
              className="success-stories__intro"
              initial={false}
              whileInView={reducedMotion || paused ? { opacity: 1, y: 0 } : { opacity: [0.5, 1], y: [24, 0] }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: reducedMotion || paused ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="success-stories__edition"><span /> OUR STUDENTS. OUR PRIDE.</span>
              <h2 id="success-stories-title">They dreamed.<br /><em>They did it.<svg viewBox="0 0 430 26" fill="none" aria-hidden="true"><path pathLength="1" d="M5 14C114 1 282 3 423 10M101 24C183 15 290 16 377 18" /></svg></em></h2>
              <p className="success-stories__lead">Big ambitions. Brave first steps.<br /><strong>And a future that’s looking bright.</strong></p>
              <div className="success-stories__admissions">
                <p className="success-stories__admissions-label">OUR BATCH STUDENTS ARE JOINING</p>
                <p className="success-stories__admissions-value"><strong>Tier 1 <span>&amp;</span> Tier 2</strong><span> colleges.</span></p>
                <GraduationCap className="success-stories__admissions-icon" size={34} aria-hidden="true" />
              </div>
              <Link to="/session" className="success-stories__cta">Let’s write your story <span><ArrowUpRight size={20} aria-hidden="true" /></span></Link>
              <div className="success-stories__personal-note"><span>A little guidance.<br />A whole new beginning.</span><svg viewBox="0 0 100 75" fill="none" aria-hidden="true"><path d="M4 12C25 49 65 58 89 20M71 23L92 14L95 36" /></svg></div>
            </motion.div>

            <div className="success-stories__exhibition">
              <div className="success-stories__scene" aria-hidden="true">
                <span className="success-stories__sun" />
                <svg className="success-stories__flight" viewBox="0 0 800 700" fill="none"><path d="M35 440C-15 205 268 71 502 137S815 431 636 589S146 678 117 533" /></svg>
                <svg className="success-stories__asterisk success-stories__asterisk--one" viewBox="0 0 90 90" fill="none"><path d="M45 3V87M3 45H87M15 15L75 75M15 75L75 15" /></svg>
                <svg className="success-stories__asterisk success-stories__asterisk--two" viewBox="0 0 90 90" fill="none"><path d="M45 3V87M3 45H87M15 15L75 75M15 75L75 15" /></svg>
                <span className="success-stories__confetti success-stories__confetti--one" />
                <span className="success-stories__confetti success-stories__confetti--two" />
              </div>
              <div className="success-stories__class-note"><span /> THE CLASS OF <strong>2026</strong></div>

              <div className="success-stories__batch-switcher" role="group" aria-label="Choose a student batch">
                {banners.map((banner, index) => (
                  <button key={banner.chapter} type="button" aria-pressed={mobileBatch === index} onClick={() => setMobileBatch(index)}>
                    <span>{banner.batch}</span><span>{banner.year}</span><ArrowUpRight size={14} aria-hidden="true" />
                  </button>
                ))}
              </div>

              <div className="success-stories__gallery" role="group" aria-label="Success stories from two student batches">
                {banners.map((banner, index) => (
                  <BannerCard key={banner.chapter} banner={banner} index={index} animate={animate} activeOnMobile={mobileBatch === index} onOpen={openBanner} />
                ))}
              </div>
              <div className="success-stories__exhibition-note"><span>Real faces. Really proud moments.</span><span><Maximize2 size={13} aria-hidden="true" /> Tap a banner. Meet the achievers.</span></div>
            </div>
          </div>

          <div className="success-stories__destinations">
            <div className="success-stories__destinations-heading"><span>NEW CAMPUS. NEW POSSIBILITIES.</span><h3>From here,<br /><em>to incredible places.</em></h3></div>
            <div className="success-stories__marquee" role="img" aria-label={`A few student destinations featured in the banners: ${destinations.map((item) => item.name).join(", ")}.`}>
              <div className="success-stories__marquee-track" aria-hidden="true">
                {[0, 1].map((copy) => (
                  <div key={copy} className="success-stories__marquee-group">
                    {destinations.map((destination) => <span key={destination.name}><img src={destination.logo} alt="" loading="lazy" decoding="async" /><span>{destination.name}</span></span>)}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="success-stories__footnote"><span>Different dreams. One shared beginning. <ArrowUpRight size={13} aria-hidden="true" /></span></p>
        </div>
      </section>

      <Dialog.Root open={selected !== null} onOpenChange={(open) => { if (!open) setSelected(null); }}>
        <Dialog.Portal>
          <Dialog.Overlay className="success-viewer__overlay" />
          <Dialog.Content
            className="success-viewer"
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              openerRef.current?.focus({ preventScroll: true });
            }}
            onKeyDown={(event) => {
              if (event.altKey || event.ctrlKey || event.metaKey) return;
              // When zoomed, arrow keys scroll the enlarged poster instead.
              if (!zoomed && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
                event.preventDefault();
                changeBanner(event.key === "ArrowRight" ? 1 : -1);
              }
            }}
          >
            <div className="success-viewer__toolbar">
              <div>
                <Dialog.Title className="success-viewer__title">{current?.batch} <span>{current?.year}</span></Dialog.Title>
                <Dialog.Description className="success-viewer__description">The first chapter of many success stories.</Dialog.Description>
              </div>
              <div className="success-viewer__actions">
                <button
                  type="button"
                  onClick={() => setZoomed((value) => !value)}
                  className="success-viewer__zoom"
                  aria-label={zoomed ? "Fit banner to screen" : "Zoom in to read banner"}
                  aria-pressed={zoomed}
                >
                  {zoomed ? <ZoomOut size={19} aria-hidden="true" /> : <ZoomIn size={19} aria-hidden="true" />}
                  <span>{zoomed ? "Fit to screen" : "Zoom in"}</span>
                </button>
                <Dialog.Close className="success-viewer__icon-button" aria-label="Close banner viewer"><X size={23} aria-hidden="true" /></Dialog.Close>
              </div>
            </div>

            <div ref={viewerRef} className={`success-viewer__canvas${zoomed ? " success-viewer__canvas--zoomed" : ""}`} tabIndex={0} aria-label="Banner image. When zoomed, scroll to explore the full banner.">
              {current && (
                <img
                  key={current.src}
                  src={current.src}
                  alt={current.alt}
                  width={current.width}
                  height={current.height}
                  className="success-viewer__image"
                  style={zoomed ? { width: current.width, minWidth: "100%" } : undefined}
                />
              )}
            </div>

            <div className="success-viewer__footer">
              <button type="button" className="success-viewer__icon-button" onClick={() => changeBanner(-1)} aria-label="Previous banner"><ArrowLeft size={20} aria-hidden="true" /></button>
              <span aria-live="polite">{selected === null ? 0 : selected + 1} <span>/ {banners.length}</span></span>
              <button type="button" className="success-viewer__icon-button" onClick={() => changeBanner(1)} aria-label="Next banner"><ArrowRight size={20} aria-hidden="true" /></button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

export default SuccessStories;
