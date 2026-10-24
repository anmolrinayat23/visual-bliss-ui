import { useEffect, useRef, useState, type PointerEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import {
  ArrowDown,
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

function BannerCard({
  banner,
  index,
  animate,
  onOpen,
}: {
  banner: Banner;
  index: number;
  animate: boolean;
  onOpen: (index: number, trigger: HTMLButtonElement) => void;
}) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const tiltX = useSpring(rotateX, { stiffness: 180, damping: 24 });
  const tiltY = useSpring(rotateY, { stiffness: 180, damping: 24 });

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  useEffect(() => {
    if (!animate) {
      rotateX.set(0);
      rotateY.set(0);
    }
  }, [animate, rotateX, rotateY]);

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (!animate || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    rotateX.set(((event.clientY - bounds.top) / bounds.height - 0.5) * -4);
    rotateY.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 4);
  };

  return (
    <motion.article
      className={`success-story success-story--${index + 1}`}
      initial={false}
      whileInView={animate ? { opacity: [0.4, 1], y: [40, 0] } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.75, delay: index * 0.15 }}
    >
      <div className="success-story__chapter">
        <span className="success-story__number">{banner.chapter}</span>
        <div>
          <p className="success-story__eyebrow">THE NEXT CHAPTER</p>
          <h3>{banner.title}</h3>
        </div>
        <ArrowDown size={20} aria-hidden="true" />
      </div>

      <div className="success-story__perspective">
        <div className="success-story__float">
          <motion.div style={{ rotateX: tiltX, rotateY: tiltY }}>
            <button
              type="button"
              className="success-story__poster"
              onPointerMove={handlePointerMove}
              onPointerLeave={resetTilt}
              onBlur={resetTilt}
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
              </span>
              <span className="success-story__caption">
                <span>
                  <span className="success-story__batch">{banner.batch}</span>
                  <span className="success-story__year">{banner.year}</span>
                </span>
                <span className="success-story__expand">
                  <span>Explore the banner</span>
                  <Maximize2 size={17} aria-hidden="true" />
                </span>
              </span>
            </button>
          </motion.div>
        </div>
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
          <span className="success-stories__orb success-stories__orb--one" />
          <span className="success-stories__orb success-stories__orb--two" />
          <span className="success-stories__watermark">2026</span>
          <Sparkles className="success-stories__spark success-stories__spark--one" />
          <Sparkles className="success-stories__spark success-stories__spark--two" />
          <span className="success-stories__dot success-stories__dot--one" />
          <span className="success-stories__dot success-stories__dot--two" />
        </div>

        <div className="success-stories__container">
          <div className="success-stories__topline">
            <span className="success-stories__kicker"><span /> THE EDUCATE ME YEARBOOK</span>
            {!reducedMotion && (
              <button
                type="button"
                className="success-stories__motion-toggle"
                onClick={() => setPaused((value) => !value)}
                aria-pressed={paused}
                aria-label="Pause success story animations"
              >
                {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
                <span>{paused ? "Motion paused" : "Pause motion"}</span>
              </button>
            )}
          </div>

          <div className="success-stories__heading-row">
            <div>
              <div className="success-stories__edition"><GraduationCap size={17} aria-hidden="true" /> CLASS OF 2026</div>
              <h2 id="success-stories-title">
                Big dreams.<br />
                <span>Beautiful beginnings.</span>
              </h2>
            </div>
            <div className="success-stories__intro">
              <p>From the first conversation<br className="success-stories__desktop-break" /> to the next big milestone.</p>
              <p>Meet the faces behind our story. Two batches, countless ambitions, and a future full of possibility.</p>
              <span className="success-stories__handwritten">This is just the beginning <ArrowDown size={19} aria-hidden="true" /></span>
            </div>
          </div>

          <div className="success-stories__gallery">
            {banners.map((banner, index) => (
              <BannerCard key={banner.chapter} banner={banner} index={index} animate={animate} onOpen={openBanner} />
            ))}
            <div className="success-stories__seal" aria-hidden="true">
              <Sparkles size={22} />
              <span>POTENTIAL<br /><strong>INTO PROGRESS</strong></span>
            </div>
          </div>

          <div className="success-stories__closing">
            <div className="success-stories__closing-copy">
              <span className="success-stories__closing-icon"><GraduationCap size={25} aria-hidden="true" /></span>
              <div>
                <p>Your story could be next.</p>
                <span>Let’s find the path that’s right for you.</span>
              </div>
            </div>
            <Link to="/session" className="success-stories__cta">
              Start your journey <ArrowUpRight size={20} aria-hidden="true" />
            </Link>
          </div>
          <p className="success-stories__footnote">BHOPAL <span>✦</span> NOIDA <span>✦</span> PUNE <span className="success-stories__footnote-line" /> ONE SHARED VISION.</p>
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
