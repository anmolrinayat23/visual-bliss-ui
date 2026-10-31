import { useCallback, useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronDown, Heart, LayoutGrid, MessageCircle, Pause, Play, Quote, Star, X } from "lucide-react";
import { Link } from "react-router-dom";
import { googleReviews, type GoogleReview } from "@/data/googleReviews";
import "./GoogleReviews.css";

function GoogleWordmark() {
  return <span className="reviews-google-wordmark" role="img" aria-label="Google"><span aria-hidden="true"><i>G</i><i>o</i><i>o</i><i>g</i><i>l</i><i>e</i></span></span>;
}

function ReviewStars({ rating }: { rating: number }) {
  return <span className="google-review-stars" role="img" aria-label={`${rating} out of 5 stars`}>{Array.from({ length: 5 }, (_, index) => <Star key={index} size={15} className={index < rating ? "is-filled" : ""} aria-hidden="true" />)}</span>;
}

// How long a page of reviews stays on screen before the slideshow advances.
const AUTOPLAY_DELAY_MS = 1800;

function initials(name: string) {
  const words = name.trim().split(/\s+/);
  return `${words[0][0]}${words.length > 1 ? words[words.length - 1][0] : ""}`.toUpperCase();
}

const GoogleReviews = () => {
  const railRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const inView = useInView(railRef, { amount: 0.35 });
  const reducedMotion = useReducedMotion();
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState<GoogleReview | null>(null);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [pageVisible, setPageVisible] = useState(() => document.visibilityState === "visible");
  const [position, setPosition] = useState({ first: 0, perPage: 3, back: false, next: true });
  const autoplayRunning = !reducedMotion && !paused && !hovered && !focusWithin && !interacting && inView && pageVisible && !expanded && selected === null;

  useEffect(() => {
    const updateVisibility = () => setPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    if (!interacting) return;
    const stopInteracting = () => setInteracting(false);
    window.addEventListener("pointerup", stopInteracting);
    window.addEventListener("pointercancel", stopInteracting);
    window.addEventListener("blur", stopInteracting);
    return () => {
      window.removeEventListener("pointerup", stopInteracting);
      window.removeEventListener("pointercancel", stopInteracting);
      window.removeEventListener("blur", stopInteracting);
    };
  }, [interacting]);

  const updatePosition = useCallback(() => {
    const rail = railRef.current;
    const card = rail?.querySelector<HTMLElement>(".google-review-card");
    if (!rail || !card) return;
    const style = getComputedStyle(rail);
    const perPage = Number(style.getPropertyValue("--reviews-per-page")) || 3;
    const step = card.offsetWidth + (parseFloat(style.columnGap) || 0);
    setPosition({
      first: Math.max(0, Math.min(googleReviews.length - perPage, Math.round(rail.scrollLeft / step))),
      perPage,
      back: rail.scrollLeft > 4,
      next: rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollTo({ left: 0, behavior: "instant" });
    const frame = requestAnimationFrame(updatePosition);
    const observer = new ResizeObserver(updatePosition);
    observer.observe(rail);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); };
  }, [expanded, updatePosition]);

  const goToReview = useCallback((index: number, instant = false) => {
    const rail = railRef.current;
    const card = rail?.querySelector<HTMLElement>(".google-review-card");
    if (!rail || !card) return;
    const step = card.offsetWidth + (parseFloat(getComputedStyle(rail).columnGap) || 0);
    rail.scrollTo({ left: Math.max(0, index) * step, behavior: reducedMotion || instant ? "instant" : "smooth" });
  }, [reducedMotion]);

  useEffect(() => {
    if (autoplayRunning) return;
    const rail = railRef.current;
    // A pause also stops an automatic scroll that has already started.
    rail?.scrollTo({ left: rail.scrollLeft, behavior: "instant" });
  }, [autoplayRunning]);

  useEffect(() => {
    if (!autoplayRunning) return;
    // Start a fresh reading interval after any manual scroll or temporary pause.
    const timer = window.setTimeout(() => {
      const lastPage = Math.max(0, googleReviews.length - position.perPage);
      const wrap = position.first >= lastPage;
      goToReview(wrap ? 0 : Math.min(position.first + position.perPage, lastPage), wrap);
    }, AUTOPLAY_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [autoplayRunning, position.first, position.perPage, goToReview]);

  const totalPages = Math.ceil(googleReviews.length / position.perPage);
  const currentPage = Math.min(totalPages - 1, Math.round(position.first / position.perPage));

  return (
    <>
      <section id="google-reviews" className="google-reviews" aria-labelledby="google-reviews-title" data-autoplay={autoplayRunning}>
        <div className="google-reviews__decoration" aria-hidden="true"><span>“</span><svg viewBox="0 0 240 240" fill="none"><circle cx="120" cy="120" r="100" /><circle cx="120" cy="120" r="82" /><path d="M120 32V55M120 185V208M32 120H55M185 120H208" /></svg></div>
        <div className="google-reviews__container">
          <div className="google-reviews__heading">
            <div>
              <span className="google-reviews__eyebrow"><Heart size={14} aria-hidden="true" /> THE PEOPLE BEHIND THE PROGRESS</span>
              <h2 id="google-reviews-title">What our students<br /><em>& parents say.<svg viewBox="0 0 500 20" fill="none" aria-hidden="true"><path d="M4 12C150 1 330 1 492 8M160 19C280 10 380 10 455 13" /></svg></em></h2>
            </div>
            <div className="google-reviews__introduction">
              <div className="google-reviews__source"><GoogleWordmark /><span>Reviews</span></div>
              <p>A little reassurance from people<br />who’ve been where you are.</p>
              <span>Honest experiences of finding clarity, building confidence, and taking the next step.</span>
              <div className="google-reviews__community"><span aria-hidden="true">{googleReviews.slice(0, 3).map((review) => <i key={review.id}>{initials(review.name)}</i>)}</span><span>{googleReviews.length} voices. Individual journeys.</span></div>
            </div>
          </div>

          <div
            className="google-reviews__carousel"
            onPointerEnter={(event) => { if (event.pointerType === "mouse") setHovered(true); }}
            onPointerLeave={(event) => { if (event.pointerType === "mouse") setHovered(false); }}
            onFocusCapture={(event) => {
              // Keep the play control usable without requiring a keyboard or touch user to blur it.
              setFocusWithin(!(event.target instanceof Element && event.target.closest(".google-reviews__autoplay-toggle")));
            }}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setFocusWithin(false);
            }}
          >
          <div className="google-reviews__toolbar">
            <p><span /> In their own words <span className="google-reviews__featured-count">{googleReviews.length} featured reviews</span></p>
            <div className="google-reviews__controls">
              {!expanded && !reducedMotion && <button type="button" className="google-reviews__autoplay-toggle" onClick={() => setPaused((value) => !value)} aria-label={paused ? "Play review slideshow" : "Pause review slideshow"} aria-pressed={paused} aria-controls="google-review-list">{paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}{paused ? "Play slideshow" : "Pause slideshow"}</button>}
              <button type="button" className="google-reviews__all-toggle" aria-expanded={expanded} aria-controls="google-review-list" onClick={() => setExpanded((value) => !value)}>{expanded ? <ArrowLeft size={14} aria-hidden="true" /> : <LayoutGrid size={14} aria-hidden="true" />}{expanded ? "Back to carousel" : `View all ${googleReviews.length} reviews`}</button>
            </div>
          </div>

          <div ref={railRef} id="google-review-list" className={`google-reviews__rail${expanded ? " google-reviews__rail--expanded" : ""}`} role="region" aria-label={expanded ? "All featured Google reviews" : "Student and parent review carousel"} aria-roledescription={expanded ? undefined : "carousel"} aria-live="off" onScroll={updatePosition} onPointerDown={() => setInteracting(true)} tabIndex={0}>
            {googleReviews.map((review, index) => (
              <motion.article key={review.id} className={`google-review-card${index === 1 ? " google-review-card--parent" : ""}`} initial={false} whileInView={reducedMotion ? { opacity: 1, y: 0 } : { opacity: [0.65, 1], y: [14, 0] }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: reducedMotion ? 0 : 0.45, delay: (index % 3) * 0.06 }}>
                <div className="google-review-card__person"><span className={`google-review-avatar google-review-avatar--${index % 5}`} aria-hidden="true">{initials(review.name)}</span><div><h3>{review.name}</h3><span>{review.perspective ?? "Shared on Google"}</span></div><Quote className="google-review-card__quote" size={25} aria-hidden="true" /></div>
                <ReviewStars rating={review.rating} />
                <blockquote><p>{review.text}{review.isExcerpt ? "…" : ""}</p></blockquote>
                <div className="google-review-card__footer"><span>{review.isExcerpt ? "Review excerpt" : "Google review"}</span><button type="button" onClick={(event) => { openerRef.current = event.currentTarget; setSelected(review); }} aria-label={`Read review by ${review.name}`} aria-haspopup="dialog">{review.isExcerpt ? "Read excerpt" : "Read review"}<ArrowUpRight size={15} aria-hidden="true" /></button></div>
              </motion.article>
            ))}
          </div>

          {!expanded && <div className="google-reviews__navigation"><span className="google-reviews__position" aria-live={autoplayRunning ? "off" : "polite"} aria-atomic="true">{String(position.first + 1).padStart(2, "0")}–{String(Math.min(position.first + position.perPage, googleReviews.length)).padStart(2, "0")}<span> / {googleReviews.length} stories</span></span><div className="google-reviews__pagination" aria-label="Review pages">{Array.from({ length: totalPages }, (_, page) => <button type="button" key={page} aria-label={`Go to reviews ${page * position.perPage + 1} to ${Math.min((page + 1) * position.perPage, googleReviews.length)}`} aria-current={page === currentPage ? "true" : undefined} onClick={() => goToReview(page * position.perPage)}><span /></button>)}</div><div className="google-reviews__arrows"><button type="button" aria-label="Previous reviews" disabled={!position.back} onClick={() => goToReview(position.first - position.perPage)}><ArrowLeft size={20} aria-hidden="true" /></button><button type="button" aria-label="Next reviews" disabled={!position.next} onClick={() => goToReview(position.first + position.perPage)}><ArrowRight size={20} aria-hidden="true" /></button></div></div>}

          <p className="google-reviews__reading-note">Experiences shared on Google. Some reviews are shown as excerpts.{!expanded && <span className="google-reviews__swipe-note"> Swipe to explore <ArrowRight size={12} aria-hidden="true" /></span>}</p>
          </div>

          <div className="google-reviews__invitation"><div className="google-reviews__invitation-decoration" aria-hidden="true"><MessageCircle /><span>✦</span></div><div className="google-reviews__invitation-copy"><span>YOUR NEXT CHAPTER STARTS WITH A CONVERSATION</span><h3>Good guidance.<br className="google-reviews__mobile-break" /> <em>A great beginning.</em></h3><p>Tell us where you want to go. Let’s explore the way forward, together.</p></div><Link to="/session" className="google-reviews__book">Book a session<ArrowUpRight size={20} aria-hidden="true" /></Link></div>
        </div>
      </section>

      <Dialog.Root open={selected !== null} onOpenChange={(open) => { if (!open) setSelected(null); }}>
        <Dialog.Portal><Dialog.Overlay className="google-review-dialog__overlay" /><Dialog.Content className="google-review-dialog" onCloseAutoFocus={(event) => { event.preventDefault(); openerRef.current?.focus({ preventScroll: true }); }}>
          {selected && <>
            <div className="google-review-dialog__header"><div className="google-review-dialog__source"><GoogleWordmark /><span>Review</span></div><Dialog.Close aria-label="Close review"><X size={21} aria-hidden="true" /></Dialog.Close></div>
            <div className="google-review-dialog__content"><div className="google-review-dialog__person"><span className={`google-review-avatar google-review-avatar--${googleReviews.indexOf(selected) % 5}`} aria-hidden="true">{initials(selected.name)}</span><div><Dialog.Title className="google-review-dialog__title">{selected.name}</Dialog.Title><Dialog.Description>{selected.perspective ?? "Shared on Google"}</Dialog.Description></div></div><ReviewStars rating={selected.rating} /><blockquote className="google-review-dialog__body">{selected.text}{selected.isExcerpt ? "…" : ""}</blockquote><div className="google-review-dialog__note">{selected.isExcerpt ? "Review excerpt — this review continues on Google." : "In the reviewer’s own words."}</div></div>
            <Dialog.Close className="google-review-dialog__done">Back to the stories<ChevronDown size={17} aria-hidden="true" /></Dialog.Close>
          </>}
        </Dialog.Content></Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

export default GoogleReviews;
