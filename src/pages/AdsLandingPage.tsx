import { useEffect, useState, useRef } from "react";

const AdsLandingPage = () => {
  const [countdown, setCountdown] = useState({ days: "--", hours: "--", minutes: "--", seconds: "--" });
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const examDate = new Date("2026-05-18T00:00:00").getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const diff = examDate - now;
      if (diff <= 0) {
        setCountdown({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        clearInterval(timer);
        return;
      }
      setCountdown({
        days: String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, "0"),
        hours: String(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, "0"),
        minutes: String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0"),
        seconds: String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, "0"),
      });
    }, 1000);

    // Fade-up observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".fade-up").forEach((el) => observerRef.current?.observe(el));

    return () => {
      clearInterval(timer);
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: "#1E293B", background: "#fff", WebkitFontSmoothing: "antialiased", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Outfit:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        h1,h2,h3,h4 { font-family: 'Outfit', sans-serif; }
        :root {
          --em-navy: #0B1D3A; --em-blue: #1565C0; --em-blue-light: #2196F3;
          --em-orange: #FF6D00; --em-orange-glow: #FF9100; --em-green: #00C853;
          --em-white: #FFFFFF; --em-gray-50: #F8FAFC; --em-gray-100: #F1F5F9;
          --em-gray-200: #E2E8F0; --em-gray-400: #94A3B8; --em-gray-600: #475569;
          --em-gray-800: #1E293B; --radius: 12px; --radius-lg: 20px;
          --shadow-card: 0 4px 24px rgba(11,29,58,0.08);
          --shadow-heavy: 0 12px 48px rgba(11,29,58,0.15);
        }
        .lp-container { max-width: 1140px; margin: 0 auto; padding: 0 20px; }
        .lp-btn-primary {
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          background: linear-gradient(135deg, var(--em-orange), var(--em-orange-glow));
          color: var(--em-white); font-family: 'Outfit', sans-serif;
          font-weight: 700; font-size: 17px; padding: 16px 40px;
          border: none; border-radius: 60px; cursor: pointer; text-decoration: none;
          transition: all 0.3s ease; box-shadow: 0 4px 20px rgba(255,109,0,0.35);
        }
        .lp-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(255,109,0,0.45); }

        /* TOPBAR */
        .lp-topbar {
          background: var(--em-navy); color: var(--em-white); text-align: center;
          padding: 10px 16px; font-size: 14px; font-weight: 500;
          position: sticky; top: 0; z-index: 100;
          display: flex; align-items: center; justify-content: center; gap: 12px;
        }
        .lp-topbar .pulse-dot {
          width: 8px; height: 8px; border-radius: 50%; background: var(--em-green);
          animation: lp-pulse 1.5s infinite;
        }
        @keyframes lp-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.4)} }
        .lp-topbar strong { color: var(--em-orange-glow); }

        /* HERO */
        .lp-hero {
          background: linear-gradient(165deg, var(--em-navy) 0%, #0D2B5E 55%, var(--em-blue) 100%);
          position: relative; overflow: hidden; padding: 60px 0 80px;
        }
        .lp-hero::before {
          content:''; position:absolute; top:-100px; right:-200px; width:600px; height:600px;
          background:radial-gradient(circle,rgba(33,150,243,0.15) 0%,transparent 70%); border-radius:50%;
        }
        .lp-hero::after {
          content:''; position:absolute; bottom:-150px; left:-100px; width:500px; height:500px;
          background:radial-gradient(circle,rgba(255,109,0,0.1) 0%,transparent 70%); border-radius:50%;
        }
        .lp-hero .lp-container {
          display: grid; grid-template-columns: 1fr 420px; gap: 48px;
          align-items: center; position: relative; z-index: 2;
        }
        .lp-hero-content { color: var(--em-white); }
        .lp-hero-badge {
          display:inline-flex; align-items:center; gap:8px;
          background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2);
          border-radius:60px; padding:8px 18px; font-size:13px; font-weight:600;
          color:var(--em-orange-glow); margin-bottom:24px; backdrop-filter:blur(8px);
        }
        .lp-hero h1 { font-size:44px; font-weight:800; line-height:1.15; margin-bottom:20px; }
        .lp-hero h1 span { color: var(--em-orange-glow); }
        .lp-hero-sub { font-size:18px; line-height:1.7; color:rgba(255,255,255,0.8); margin-bottom:28px; max-width:520px; }
        .lp-hero-stats { display:flex; gap:32px; margin-bottom:32px; }
        .lp-hero-stat { text-align:left; }
        .lp-hero-stat .num { font-family:'Outfit',sans-serif; font-size:32px; font-weight:800; color:var(--em-white); }
        .lp-hero-stat .label { font-size:13px; color:rgba(255,255,255,0.6); margin-top:2px; }
        .lp-hero-trust { display:flex; align-items:center; gap:12px; font-size:13px; color:rgba(255,255,255,0.6); }

        /* FORM CARD */
        .lp-form-card {
          background:var(--em-white); border-radius:var(--radius-lg); padding:36px 32px;
          box-shadow:var(--shadow-heavy); position:relative;
        }
        .lp-form-card::before {
          content:''; position:absolute; top:-2px; left:20%; right:20%; height:4px;
          background:linear-gradient(90deg,var(--em-orange),var(--em-blue)); border-radius:0 0 4px 4px;
        }
        .lp-form-title { font-size:22px; font-weight:700; color:var(--em-navy); margin-bottom:4px; text-align:center; }
        .lp-form-subtitle { font-size:13px; color:var(--em-gray-600); text-align:center; margin-bottom:24px; }
        .lp-form-subtitle strong { color:var(--em-orange); }
        .lp-form-group { margin-bottom:16px; }
        .lp-form-group label { display:block; font-size:13px; font-weight:600; color:var(--em-gray-800); margin-bottom:6px; }
        .lp-form-group input, .lp-form-group select {
          width:100%; padding:12px 16px; border:1.5px solid var(--em-gray-200); border-radius:10px;
          font-family:'DM Sans',sans-serif; font-size:15px; color:var(--em-gray-800);
          background:var(--em-gray-50); transition:border-color 0.2s,box-shadow 0.2s; outline:none;
          -webkit-appearance:none; appearance:none;
        }
        .lp-form-group input:focus, .lp-form-group select:focus {
          border-color:var(--em-blue); box-shadow:0 0 0 3px rgba(21,101,192,0.1); background:var(--em-white);
        }
        .lp-form-group select {
          background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4L6 8L10 4' stroke='%2394A3B8' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat:no-repeat; background-position:right 14px center; padding-right:36px;
        }
        .lp-form-row { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
        .lp-form-card .lp-btn-primary { width:100%; padding:16px; font-size:16px; margin-top:4px; }
        .lp-form-footer { text-align:center; font-size:12px; color:var(--em-gray-400); margin-top:12px; }
        .lp-seats-left {
          display:flex; align-items:center; justify-content:center; gap:6px;
          background:#FFF3E0; color:var(--em-orange); font-size:13px; font-weight:600;
          padding:8px 16px; border-radius:8px; margin-bottom:20px;
        }

        /* COUNTDOWN */
        .lp-countdown-section { background:var(--em-gray-50); padding:48px 0; text-align:center; }
        .lp-countdown-label { font-size:14px; font-weight:600; color:var(--em-gray-600); text-transform:uppercase; letter-spacing:2px; margin-bottom:16px; }
        .lp-countdown-grid { display:flex; justify-content:center; gap:16px; margin-bottom:16px; }
        .lp-cd-box {
          background:var(--em-white); border-radius:var(--radius); padding:16px 24px; min-width:90px;
          box-shadow:var(--shadow-card); border:1px solid var(--em-gray-200);
        }
        .lp-cd-box .num { font-family:'Outfit',sans-serif; font-size:36px; font-weight:800; color:var(--em-navy); }
        .lp-cd-box .lbl { font-size:11px; font-weight:600; color:var(--em-gray-400); text-transform:uppercase; letter-spacing:1px; margin-top:2px; }
        .lp-exam-date-text { font-size:15px; color:var(--em-gray-600); }
        .lp-exam-date-text strong { color:var(--em-navy); }

        /* EMPATHY */
        .lp-empathy { padding:80px 0; background:var(--em-white); }
        .lp-empathy .lp-container { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; }
        .lp-empathy-left h2 { font-size:36px; font-weight:800; color:var(--em-navy); line-height:1.2; margin-bottom:20px; }
        .lp-empathy-left h2 span { color:var(--em-orange); }
        .lp-empathy-left p { font-size:16px; line-height:1.8; color:var(--em-gray-600); margin-bottom:28px; }
        .lp-pain-tags { display:flex; flex-wrap:wrap; gap:10px; }
        .lp-pain-tag {
          display:inline-flex; align-items:center; gap:6px;
          background:#FEF2F2; border:1px solid #FECACA; border-radius:60px;
          padding:8px 18px; font-size:14px; font-weight:500; color:#DC2626;
        }
        .lp-solution-cards { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        .lp-sol-card {
          background:var(--em-gray-50); border-radius:var(--radius); padding:24px;
          border:1px solid var(--em-gray-200); transition:all 0.3s ease;
        }
        .lp-sol-card:hover { border-color:var(--em-blue-light); box-shadow:var(--shadow-card); transform:translateY(-2px); }
        .lp-sol-card .icon { width:44px; height:44px; border-radius:10px; display:flex; align-items:center; justify-content:center; margin-bottom:12px; font-size:22px; }
        .lp-sol-card h4 { font-size:15px; font-weight:700; color:var(--em-navy); margin-bottom:6px; }
        .lp-sol-card p { font-size:13px; color:var(--em-gray-600); line-height:1.5; }

        /* WHAT IS */
        .lp-what-is {
          padding:80px 0; background:var(--em-navy); color:var(--em-white);
          position:relative; overflow:hidden;
        }
        .lp-what-is::before {
          content:''; position:absolute; top:0; left:0; right:0; bottom:0;
          background:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        .lp-what-is .lp-container { position:relative; z-index:2; text-align:center; }
        .lp-section-tag {
          display:inline-flex; align-items:center; gap:6px; font-size:12px; font-weight:600;
          text-transform:uppercase; letter-spacing:2px; color:var(--em-orange-glow); margin-bottom:16px;
        }
        .lp-what-is h2 { font-size:36px; font-weight:800; margin-bottom:16px; }
        .lp-what-is .desc { font-size:17px; line-height:1.7; color:rgba(255,255,255,0.7); max-width:700px; margin:0 auto 48px; }
        .lp-feature-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; text-align:left; }
        .lp-feature-card {
          background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1);
          border-radius:var(--radius); padding:32px 28px; backdrop-filter:blur(4px); transition:all 0.3s ease;
        }
        .lp-feature-card:hover { background:rgba(255,255,255,0.08); border-color:rgba(255,255,255,0.2); transform:translateY(-4px); }
        .lp-feature-card .f-icon { font-size:28px; margin-bottom:16px; }
        .lp-feature-card h4 { font-size:17px; font-weight:700; margin-bottom:8px; }
        .lp-feature-card p { font-size:14px; line-height:1.6; color:rgba(255,255,255,0.6); }

        /* HOW IT WORKS */
        .lp-how-it-works { padding:80px 0; background:var(--em-white); }
        .lp-how-it-works .lp-container { text-align:center; }
        .lp-how-it-works h2 { font-size:36px; font-weight:800; color:var(--em-navy); margin-bottom:48px; }
        .lp-steps-row { display:grid; grid-template-columns:repeat(4,1fr); gap:24px; position:relative; }
        .lp-steps-row::before {
          content:''; position:absolute; top:40px; left:12%; right:12%; height:2px;
          background:linear-gradient(90deg,var(--em-orange),var(--em-blue)); z-index:0;
        }
        .lp-step-item { position:relative; z-index:1; text-align:center; }
        .lp-step-num {
          width:80px; height:80px; border-radius:50%; margin:0 auto 20px;
          display:flex; align-items:center; justify-content:center;
          font-family:'Outfit',sans-serif; font-size:28px; font-weight:800;
        }
        .lp-step-num.s1 { background:#FFF3E0; color:var(--em-orange); border:3px solid var(--em-orange); }
        .lp-step-num.s2 { background:#E3F2FD; color:var(--em-blue); border:3px solid var(--em-blue); }
        .lp-step-num.s3 { background:#E8F5E9; color:#2E7D32; border:3px solid #2E7D32; }
        .lp-step-num.s4 { background:#F3E5F5; color:#7B1FA2; border:3px solid #7B1FA2; }
        .lp-step-item h4 { font-size:16px; font-weight:700; color:var(--em-navy); margin-bottom:8px; }
        .lp-step-item p { font-size:14px; color:var(--em-gray-600); line-height:1.5; }

        /* STREAMS */
        .lp-streams { padding:80px 0; background:var(--em-gray-50); }
        .lp-streams .lp-container { text-align:center; }
        .lp-streams h2 { font-size:36px; font-weight:800; color:var(--em-navy); margin-bottom:12px; }
        .lp-streams .desc { font-size:16px; color:var(--em-gray-600); margin-bottom:48px; }
        .lp-stream-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:20px; }
        .lp-stream-card {
          background:var(--em-white); border-radius:var(--radius); padding:36px 20px;
          border:1.5px solid var(--em-gray-200); text-align:center; transition:all 0.3s ease;
        }
        .lp-stream-card:hover { border-color:var(--em-blue-light); box-shadow:var(--shadow-card); transform:translateY(-4px); }
        .lp-stream-card .s-icon { font-size:40px; margin-bottom:16px; }
        .lp-stream-card h4 { font-size:17px; font-weight:700; color:var(--em-navy); margin-bottom:8px; }
        .lp-stream-card p { font-size:13px; color:var(--em-gray-600); line-height:1.5; }

        /* TESTIMONIALS */
        .lp-testimonials { padding:80px 0; background:var(--em-white); }
        .lp-testimonials .lp-container { text-align:center; }
        .lp-testimonials h2 { font-size:36px; font-weight:800; color:var(--em-navy); margin-bottom:48px; }
        .lp-testi-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; text-align:left; }
        .lp-testi-card {
          background:var(--em-gray-50); border-radius:var(--radius); padding:32px;
          border:1px solid var(--em-gray-200);
        }
        .lp-testi-card .stars { color:#F59E0B; font-size:16px; margin-bottom:12px; }
        .lp-testi-card .quote { font-size:15px; line-height:1.7; color:var(--em-gray-600); margin-bottom:20px; font-style:italic; }
        .lp-testi-card .author { font-size:14px; font-weight:700; color:var(--em-navy); }
        .lp-testi-card .role { font-size:12px; color:var(--em-gray-400); }

        /* FINAL CTA */
        .lp-final-cta {
          padding:80px 0; background:linear-gradient(135deg,var(--em-navy),#0D2B5E);
          text-align:center; color:var(--em-white); position:relative; overflow:hidden;
        }
        .lp-final-cta::before {
          content:''; position:absolute; top:50%; left:50%; width:600px; height:600px;
          transform:translate(-50%,-50%);
          background:radial-gradient(circle,rgba(255,109,0,0.08) 0%,transparent 70%); border-radius:50%;
        }
        .lp-final-cta .lp-container { position:relative; z-index:2; }
        .lp-final-cta h2 { font-size:40px; font-weight:800; margin-bottom:16px; }
        .lp-final-cta h2 span { color:var(--em-orange-glow); }
        .lp-final-cta p { font-size:18px; color:rgba(255,255,255,0.7); margin-bottom:32px; max-width:560px; margin-left:auto; margin-right:auto; }
        .lp-final-cta .lp-btn-primary { font-size:18px; padding:18px 48px; }

        /* FOOTER */
        .lp-footer { background:var(--em-gray-50); padding:32px 0; text-align:center; border-top:1px solid var(--em-gray-200); }
        .lp-footer-logo { font-family:'Outfit',sans-serif; font-size:20px; font-weight:800; color:var(--em-navy); margin-bottom:4px; }
        .lp-footer-logo span { color:var(--em-orange); }
        .lp-footer-tagline { font-size:12px; color:var(--em-gray-400); margin-bottom:12px; }
        .lp-footer-links { display:flex; justify-content:center; gap:24px; margin-bottom:12px; }
        .lp-footer-links a { font-size:13px; color:var(--em-gray-600); text-decoration:none; }
        .lp-footer-links a:hover { color:var(--em-blue); }
        .lp-footer-copy { font-size:12px; color:var(--em-gray-400); }

        /* FLOATING CTA */
        .lp-floating-cta {
          display:none; position:fixed; bottom:0; left:0; right:0;
          background:var(--em-white); padding:12px 16px; box-shadow:0 -4px 20px rgba(0,0,0,0.1); z-index:99;
        }
        .lp-floating-cta .lp-btn-primary { width:100%; font-size:15px; padding:14px; }

        /* FADE UP */
        .fade-up { opacity:0; transform:translateY(30px); transition:opacity 0.6s ease, transform 0.6s ease; }
        .fade-up.visible { opacity:1; transform:translateY(0); }

        /* RESPONSIVE */
        @media (max-width:1024px) {
          .lp-hero .lp-container { grid-template-columns:1fr; }
          .lp-hero-content { text-align:center; }
          .lp-hero-sub { margin:0 auto 28px; }
          .lp-hero-stats { justify-content:center; }
          .lp-hero-trust { justify-content:center; }
          .lp-form-card { max-width:480px; margin:0 auto; }
          .lp-empathy .lp-container { grid-template-columns:1fr; }
          .lp-empathy-left { text-align:center; }
          .lp-pain-tags { justify-content:center; }
          .lp-solution-cards { max-width:500px; margin:0 auto; }
        }
        @media (max-width:768px) {
          .lp-hero { padding:40px 0 60px; }
          .lp-hero h1 { font-size:30px; }
          .lp-hero-sub { font-size:15px; }
          .lp-hero-stats { gap:20px; flex-wrap:wrap; }
          .lp-hero-stat .num { font-size:24px; }
          .lp-feature-grid { grid-template-columns:1fr; }
          .lp-steps-row { grid-template-columns:1fr 1fr; gap:32px; }
          .lp-steps-row::before { display:none; }
          .lp-stream-grid { grid-template-columns:1fr 1fr; }
          .lp-testi-grid { grid-template-columns:1fr; }
          .lp-countdown-grid { gap:8px; }
          .lp-cd-box { padding:12px 16px; min-width:70px; }
          .lp-cd-box .num { font-size:28px; }
          .lp-form-row { grid-template-columns:1fr; }
          .lp-floating-cta { display:block; }
          .lp-final-cta h2 { font-size:28px; }
          .lp-what-is h2, .lp-how-it-works h2, .lp-streams h2, .lp-testimonials h2 { font-size:28px; }
          .lp-empathy-left h2 { font-size:28px; }
        }
        @media (max-width:480px) {
          .lp-hero h1 { font-size:26px; }
          .lp-hero-stats { gap:12px; }
          .lp-stream-grid { grid-template-columns:1fr; }
          .lp-steps-row { grid-template-columns:1fr; }
        }
      `}</style>

      {/* TOPBAR */}
      <div className="lp-topbar">
        <span className="pulse-dot"></span>
        <span>🎯 EM-MAT UG Exam — <strong>18th May 2026</strong> &nbsp;|&nbsp; Limited Seats — Register Now!</span>
      </div>

      {/* HERO */}
      <section className="lp-hero">
        <div className="lp-container">
          <div className="lp-hero-content">
            <div className="lp-hero-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              UG EM-MAT Exam 2026 · Registrations Open
            </div>
            <h1>Didn't Clear JEE or NEET?<br/><span>Your Career Isn't Over.</span></h1>
            <p className="lp-hero-sub">Take the EM-MAT exam and unlock 1,000+ alternative college options across Engineering, Management, Medical & Design — with expert 1-on-1 career mentorship.</p>
            <div className="lp-hero-stats">
              <div className="lp-hero-stat"><div className="num">1,000+</div><div className="label">College Options</div></div>
              <div className="lp-hero-stat"><div className="num">4</div><div className="label">Career Streams</div></div>
              <div className="lp-hero-stat"><div className="num">1-on-1</div><div className="label">Career Mentorship</div></div>
            </div>
            <div className="lp-hero-trust">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{color:"#00C853"}}><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
              Trusted by students across Madhya Pradesh & beyond
            </div>
          </div>

          {/* FORM */}
          <div className="lp-form-card">
            <h3 className="lp-form-title">Register for EM-MAT Exam</h3>
            <p className="lp-form-subtitle">Exam Date: <strong>18th May 2026</strong> · Limited Seats Available</p>
            <div className="lp-seats-left">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              Only limited seats remaining — register now!
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="lp-form-group">
                <label>Full Name *</label>
                <input type="text" placeholder="Enter your full name" required />
              </div>
              <div className="lp-form-row">
                <div className="lp-form-group">
                  <label>Phone Number *</label>
                  <input type="tel" placeholder="10-digit mobile no." required />
                </div>
                <div className="lp-form-group">
                  <label>City *</label>
                  <input type="text" placeholder="e.g. Bhopal" required />
                </div>
              </div>
              <div className="lp-form-group">
                <label>Email Address *</label>
                <input type="email" placeholder="your@email.com" required />
              </div>
              <div className="lp-form-group">
                <label>Which exam were you preparing for?</label>
                <select>
                  <option>Select an option</option>
                  <option>JEE</option>
                  <option>NEET</option>
                  <option>Board Exams Only</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="lp-form-group">
                <label>What are you looking for?</label>
                <select>
                  <option>Select an option</option>
                  <option>Alternative College Options</option>
                  <option>1-on-1 Career Mentorship</option>
                  <option>Details on the EM-MAT Exam</option>
                </select>
              </div>
              <button type="submit" className="lp-btn-primary">
                Register Now — Secure Your Seat
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </form>
            <p className="lp-form-footer">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
              Your information is secure. We'll never share your data.
            </p>
          </div>
        </div>
      </section>

      {/* COUNTDOWN */}
      <section className="lp-countdown-section">
        <div className="lp-container">
          <p className="lp-countdown-label">Exam Countdown</p>
          <div className="lp-countdown-grid">
            <div className="lp-cd-box"><div className="num">{countdown.days}</div><div className="lbl">Days</div></div>
            <div className="lp-cd-box"><div className="num">{countdown.hours}</div><div className="lbl">Hours</div></div>
            <div className="lp-cd-box"><div className="num">{countdown.minutes}</div><div className="lbl">Minutes</div></div>
            <div className="lp-cd-box"><div className="num">{countdown.seconds}</div><div className="lbl">Seconds</div></div>
          </div>
          <p className="lp-exam-date-text">Exam Date: <strong>18th May 2026</strong> · Don't miss the registration window</p>
        </div>
      </section>

      {/* EMPATHY */}
      <section className="lp-empathy fade-up">
        <div className="lp-container">
          <div className="lp-empathy-left">
            <h2>Board Exams Done.<br/><span>Now What?</span></h2>
            <p>We get it. After boards, the pressure to "figure it all out" feels overwhelming. JEE didn't go well? NEET score not as expected? That doesn't mean your career is stuck. Thousands of students face the same confusion every year — and Educate Me exists to show you there's always a path forward.</p>
            <div className="lp-pain-tags">
              <span className="lp-pain-tag">😰 Exam Stress</span>
              <span className="lp-pain-tag">😕 Career Confusion</span>
              <span className="lp-pain-tag">👨‍👩‍👦 Parental Pressure</span>
              <span className="lp-pain-tag">🏃 Peer Competition</span>
              <span className="lp-pain-tag">❓ Too Many Options</span>
            </div>
          </div>
          <div className="lp-solution-cards">
            <div className="lp-sol-card"><div className="icon">🎯</div><h4>Personalized Guidance</h4><p>1-on-1 career mentorship tailored to your strengths, interests & score</p></div>
            <div className="lp-sol-card"><div className="icon">🏫</div><h4>1,000+ Colleges</h4><p>Discover alternative options you didn't even know existed</p></div>
            <div className="lp-sol-card"><div className="icon">🧭</div><h4>Career Clarity</h4><p>Engineering, Medical, Management, Design — find what fits YOU</p></div>
            <div className="lp-sol-card"><div className="icon">💡</div><h4>Competitive Edge</h4><p>EM-MAT score opens doors that JEE/NEET alone can't</p></div>
          </div>
        </div>
      </section>

      {/* WHAT IS EM-MAT */}
      <section className="lp-what-is fade-up">
        <div className="lp-container">
          <p className="lp-section-tag">✦ ABOUT THE EXAM</p>
          <h2>What is the UG EM-MAT Exam?</h2>
          <p className="desc">The Educate Me Management Aptitude Test (EM-MAT) is your gateway to top colleges across India. One exam. Multiple career paths. Whether it's engineering, management, medicine, or design — EM-MAT gives you the platform to prove your potential.</p>
          <div className="lp-feature-grid">
            <div className="lp-feature-card"><div className="f-icon">📝</div><h4>Single Exam, Multiple Streams</h4><p>One test covers aptitude, logical reasoning & subject knowledge — valid across all major streams.</p></div>
            <div className="lp-feature-card"><div className="f-icon">🏆</div><h4>Scholarship Opportunities</h4><p>Top scorers are eligible for merit-based scholarships at partner institutions.</p></div>
            <div className="lp-feature-card"><div className="f-icon">💻</div><h4>Online & Offline Mode</h4><p>Appear from Bhopal office or take it online from anywhere in India.</p></div>
            <div className="lp-feature-card"><div className="f-icon">🎓</div><h4>Accepted by 1,000+ Colleges</h4><p>Partner institutions across India recognize EM-MAT scores for direct admission.</p></div>
            <div className="lp-feature-card"><div className="f-icon">📊</div><h4>Career Assessment Included</h4><p>Get a detailed aptitude report + career mapping with your exam results.</p></div>
            <div className="lp-feature-card"><div className="f-icon">🤝</div><h4>Expert Mentorship</h4><p>Every registrant gets a complimentary 1-on-1 session with career counsellors.</p></div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="lp-how-it-works fade-up">
        <div className="lp-container">
          <p className="lp-section-tag">✦ SIMPLE PROCESS</p>
          <h2>How It Works</h2>
          <div className="lp-steps-row">
            <div className="lp-step-item"><div className="lp-step-num s1">1</div><h4>Register Online</h4><p>Fill the form above — takes 60 seconds</p></div>
            <div className="lp-step-item"><div className="lp-step-num s2">2</div><h4>Get Guidance</h4><p>Our counsellor calls you within 24 hours</p></div>
            <div className="lp-step-item"><div className="lp-step-num s3">3</div><h4>Appear for Exam</h4><p>Take EM-MAT on 18th May (online/offline)</p></div>
            <div className="lp-step-item"><div className="lp-step-num s4">4</div><h4>Get Admitted</h4><p>Receive college options matched to your profile</p></div>
          </div>
        </div>
      </section>

      {/* STREAMS */}
      <section className="lp-streams fade-up">
        <div className="lp-container">
          <p className="lp-section-tag">✦ YOUR PATH, YOUR CHOICE</p>
          <h2>Explore Career Streams</h2>
          <p className="desc">EM-MAT covers all major UG career paths. Pick your stream — we'll guide you to the right college.</p>
          <div className="lp-stream-grid">
            <div className="lp-stream-card"><div className="s-icon">⚙️</div><h4>Engineering</h4><p>B.Tech, B.E. & more — Computer Science, Mechanical, Civil, Electronics</p></div>
            <div className="lp-stream-card"><div className="s-icon">📈</div><h4>Management</h4><p>BBA, B.Com, Integrated MBA — Finance, Marketing, HR & more</p></div>
            <div className="lp-stream-card"><div className="s-icon">🏥</div><h4>Medical & Allied</h4><p>MBBS alternatives, BDS, Pharmacy, Nursing, Physiotherapy & more</p></div>
            <div className="lp-stream-card"><div className="s-icon">🎨</div><h4>Design & Creative</h4><p>B.Des, Animation, Fashion, Interior Design, UX/UI & more</p></div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="lp-testimonials fade-up">
        <div className="lp-container">
          <p className="lp-section-tag">✦ STUDENT STORIES</p>
          <h2>Where Potential Became Progress</h2>
          <div className="lp-testi-grid">
            <div className="lp-testi-card">
              <div className="stars">★★★★★</div>
              <p className="quote">"I scored low in JEE but through EM-MAT, I got into a great B.Tech college in Bhopal. The mentorship session cleared all my confusion about branch selection."</p>
              <p className="author">Arjun S.</p>
              <p className="role">B.Tech Student, Bhopal</p>
            </div>
            <div className="lp-testi-card">
              <div className="stars">★★★★★</div>
              <p className="quote">"My parents were worried after NEET results. Educate Me showed us BDS and Pharmacy options I didn't know about. Now I'm happily studying what I love."</p>
              <p className="author">Priya M.</p>
              <p className="role">BDS Student, Indore</p>
            </div>
            <div className="lp-testi-card">
              <div className="stars">★★★★★</div>
              <p className="quote">"The career counselling was genuinely helpful — not just generic advice. They looked at my scores, interests, and budget to suggest the right colleges."</p>
              <p className="author">Rohit K.</p>
              <p className="role">BBA Student, Pune</p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="lp-final-cta">
        <div className="lp-container">
          <h2>Your Potential Deserves<br/><span>The Right Platform.</span></h2>
          <p>Register for the EM-MAT Exam today — it takes 60 seconds and could change your entire career trajectory.</p>
          <a href="#" className="lp-btn-primary" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            Register Now
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="lp-footer">
        <div className="lp-container">
          <p className="lp-footer-logo">Educate<span>Me</span></p>
          <p className="lp-footer-tagline">Where Potential Becomes Progress</p>
          <div className="lp-footer-links">
            <a href="https://educate-me.in">Website</a>
            <a href="#">Register</a>
            <a href="mailto:contact@educate-me.in">Contact</a>
          </div>
          <p className="lp-footer-copy">© 2026 Educate Me. All rights reserved. | Bhopal, Madhya Pradesh</p>
        </div>
      </footer>

      {/* FLOATING CTA (mobile) */}
      <div className="lp-floating-cta">
        <button className="lp-btn-primary" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Register for EM-MAT Exam — Secure Your Seat →
        </button>
      </div>
    </div>
  );
};

export default AdsLandingPage;
