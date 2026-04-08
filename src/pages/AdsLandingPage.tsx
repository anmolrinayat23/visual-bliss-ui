import { useEffect, useRef, useState } from "react";

const AdsLandingPage = () => {
  const [countdown, setCountdown] = useState({ days: "--", hours: "--", minutes: "--", seconds: "--" });

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
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .ads-landing *, .ads-landing *::before, .ads-landing *::after { margin: 0; padding: 0; box-sizing: border-box; }
        .ads-landing {
          font-family: 'DM Sans', sans-serif;
          color: #1E293B;
          background: #FFFFFF;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }
        .ads-landing h1,.ads-landing h2,.ads-landing h3,.ads-landing h4 { font-family: 'Outfit', sans-serif; }
        .ads-landing .al-container { max-width: 1140px; margin: 0 auto; padding: 0 20px; }
        .ads-landing .btn-primary {
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          background: linear-gradient(135deg, #FF6D00, #FF9100);
          color: #FFFFFF; font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 17px;
          padding: 16px 40px; border: none; border-radius: 60px; cursor: pointer; text-decoration: none;
          transition: all 0.3s ease; box-shadow: 0 4px 20px rgba(255,109,0,0.35);
        }
        .ads-landing .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(255,109,0,0.45); }

        .ads-landing .topbar {
          background: #0B1D3A; color: #FFFFFF; text-align: center; padding: 10px 16px;
          font-size: 14px; font-weight: 500; position: sticky; top: 0; z-index: 100;
          display: flex; align-items: center; justify-content: center; gap: 12px;
        }
        .ads-landing .topbar .pulse-dot {
          width: 8px; height: 8px; border-radius: 50%; background: #00C853;
          animation: alPulse 1.5s infinite;
        }
        @keyframes alPulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }
        .ads-landing .topbar strong { color: #FF9100; }

        .ads-landing .hero {
          background: linear-gradient(165deg, #0B1D3A 0%, #0D2B5E 55%, #1565C0 100%);
          position: relative; overflow: hidden; padding: 60px 0 80px;
        }
        .ads-landing .hero::before {
          content: ''; position: absolute; top: -100px; right: -200px; width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(33,150,243,0.15) 0%, transparent 70%); border-radius: 50%;
        }
        .ads-landing .hero .al-container {
          display: grid; grid-template-columns: 1fr 420px; gap: 48px; align-items: center; position: relative; z-index: 2;
        }
        .ads-landing .hero-content { color: #FFFFFF; }
        .ads-landing .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
          border-radius: 60px; padding: 8px 18px; font-size: 13px; font-weight: 600;
          color: #FF9100; margin-bottom: 24px; backdrop-filter: blur(8px);
        }
        .ads-landing .hero h1 { font-size: 44px; font-weight: 800; line-height: 1.15; margin-bottom: 20px; }
        .ads-landing .hero h1 span { color: #FF9100; }
        .ads-landing .hero-sub {
          font-size: 18px; line-height: 1.7; color: rgba(255,255,255,0.8); margin-bottom: 28px; max-width: 520px;
        }
        .ads-landing .hero-stats { display: flex; gap: 32px; margin-bottom: 32px; }
        .ads-landing .hero-stat .num { font-family: 'Outfit', sans-serif; font-size: 32px; font-weight: 800; color: #FFFFFF; }
        .ads-landing .hero-stat .label { font-size: 13px; color: rgba(255,255,255,0.6); margin-top: 2px; }
        .ads-landing .hero-trust { display: flex; align-items: center; gap: 12px; font-size: 13px; color: rgba(255,255,255,0.6); }

        .ads-landing .form-card {
          background: #FFFFFF; border-radius: 20px; padding: 36px 32px;
          box-shadow: 0 12px 48px rgba(11,29,58,0.15); position: relative;
        }
        .ads-landing .form-card::before {
          content: ''; position: absolute; top: -2px; left: 20%; right: 20%; height: 4px;
          background: linear-gradient(90deg, #FF6D00, #1565C0); border-radius: 0 0 4px 4px;
        }
        .ads-landing .form-title { font-size: 22px; font-weight: 700; color: #0B1D3A; margin-bottom: 4px; text-align: center; }
        .ads-landing .form-subtitle { font-size: 13px; color: #475569; text-align: center; margin-bottom: 24px; }
        .ads-landing .form-subtitle strong { color: #FF6D00; }
        .ads-landing .form-group { margin-bottom: 16px; }
        .ads-landing .form-group label { display: block; font-size: 13px; font-weight: 600; color: #1E293B; margin-bottom: 6px; }
        .ads-landing .form-group input, .ads-landing .form-group select {
          width: 100%; padding: 12px 16px; border: 1.5px solid #E2E8F0; border-radius: 10px;
          font-family: 'DM Sans', sans-serif; font-size: 15px; color: #1E293B; background: #F8FAFC;
          transition: border-color 0.2s, box-shadow 0.2s; outline: none; -webkit-appearance: none;
        }
        .ads-landing .form-group input:focus, .ads-landing .form-group select:focus {
          border-color: #1565C0; box-shadow: 0 0 0 3px rgba(21,101,192,0.1); background: #FFFFFF;
        }
        .ads-landing .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .ads-landing .form-card .btn-primary { width: 100%; padding: 16px; font-size: 16px; margin-top: 4px; }
        .ads-landing .form-footer { text-align: center; font-size: 12px; color: #94A3B8; margin-top: 12px; }
        .ads-landing .seats-left {
          display: flex; align-items: center; justify-content: center; gap: 6px;
          background: #FFF3E0; color: #FF6D00; font-size: 13px; font-weight: 600;
          padding: 8px 16px; border-radius: 8px; margin-bottom: 20px;
        }

        .ads-landing .countdown-section { background: #F8FAFC; padding: 48px 0; text-align: center; }
        .ads-landing .countdown-label { font-size: 14px; font-weight: 600; color: #475569; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 16px; }
        .ads-landing .countdown-grid { display: flex; justify-content: center; gap: 16px; margin-bottom: 16px; }
        .ads-landing .cd-box {
          background: #FFFFFF; border-radius: 12px; padding: 16px 24px; min-width: 90px;
          box-shadow: 0 4px 24px rgba(11,29,58,0.08); border: 1px solid #E2E8F0;
        }
        .ads-landing .cd-box .num { font-family: 'Outfit', sans-serif; font-size: 36px; font-weight: 800; color: #0B1D3A; }
        .ads-landing .cd-box .lbl { font-size: 11px; font-weight: 600; color: #94A3B8; text-transform: uppercase; letter-spacing: 1px; margin-top: 2px; }
        .ads-landing .exam-date-text { font-size: 15px; color: #475569; }
        .ads-landing .exam-date-text strong { color: #0B1D3A; }

        .ads-landing .empathy { padding: 80px 0; background: #FFFFFF; }
        .ads-landing .empathy .al-container { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
        .ads-landing .empathy-left h2 { font-size: 36px; font-weight: 800; color: #0B1D3A; line-height: 1.2; margin-bottom: 20px; }
        .ads-landing .empathy-left h2 span { color: #FF6D00; }
        .ads-landing .empathy-left p { font-size: 16px; line-height: 1.8; color: #475569; margin-bottom: 28px; }
        .ads-landing .pain-tags { display: flex; flex-wrap: wrap; gap: 10px; }
        .ads-landing .pain-tag {
          display: inline-flex; align-items: center; gap: 6px; background: #FEF2F2;
          border: 1px solid #FECACA; border-radius: 60px; padding: 8px 18px; font-size: 14px; font-weight: 500; color: #DC2626;
        }
        .ads-landing .solution-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .ads-landing .sol-card {
          background: #F8FAFC; border-radius: 12px; padding: 24px; border: 1px solid #E2E8F0; transition: all 0.3s ease;
        }
        .ads-landing .sol-card:hover { border-color: #2196F3; box-shadow: 0 4px 24px rgba(11,29,58,0.08); transform: translateY(-2px); }
        .ads-landing .sol-card .icon { width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 12px; font-size: 22px; }
        .ads-landing .sol-card h4 { font-size: 15px; font-weight: 700; color: #0B1D3A; margin-bottom: 6px; }
        .ads-landing .sol-card p { font-size: 13px; color: #475569; line-height: 1.5; }

        .ads-landing .what-is { padding: 80px 0; background: #0B1D3A; color: #FFFFFF; position: relative; overflow: hidden; }
        .ads-landing .what-is .al-container { position: relative; z-index: 2; text-align: center; }
        .ads-landing .section-tag { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; color: #FF9100; margin-bottom: 16px; }
        .ads-landing .what-is h2 { font-size: 36px; font-weight: 800; margin-bottom: 16px; }
        .ads-landing .what-is .desc { font-size: 17px; line-height: 1.7; color: rgba(255,255,255,0.7); max-width: 700px; margin: 0 auto 48px; }
        .ads-landing .feature-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; text-align: left; }
        .ads-landing .feature-card {
          background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px; padding: 32px 28px; backdrop-filter: blur(4px); transition: all 0.3s ease;
        }
        .ads-landing .feature-card:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.2); transform: translateY(-4px); }
        .ads-landing .feature-card .f-icon { font-size: 28px; margin-bottom: 16px; }
        .ads-landing .feature-card h4 { font-size: 17px; font-weight: 700; margin-bottom: 8px; }
        .ads-landing .feature-card p { font-size: 14px; line-height: 1.6; color: rgba(255,255,255,0.6); }

        .ads-landing .how-it-works { padding: 80px 0; background: #FFFFFF; }
        .ads-landing .how-it-works .al-container { text-align: center; }
        .ads-landing .how-it-works h2 { font-size: 36px; font-weight: 800; color: #0B1D3A; margin-bottom: 48px; }
        .ads-landing .steps-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; position: relative; }
        .ads-landing .steps-row::before {
          content: ''; position: absolute; top: 40px; left: 12%; right: 12%; height: 2px;
          background: linear-gradient(90deg, #FF6D00, #1565C0); z-index: 0;
        }
        .ads-landing .step-item { position: relative; z-index: 1; text-align: center; }
        .ads-landing .step-num {
          width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Outfit', sans-serif; font-size: 28px; font-weight: 800;
        }
        .ads-landing .step-num.s1 { background: #FFF3E0; color: #FF6D00; border: 3px solid #FF6D00; }
        .ads-landing .step-num.s2 { background: #E3F2FD; color: #1565C0; border: 3px solid #1565C0; }
        .ads-landing .step-num.s3 { background: #E8F5E9; color: #2E7D32; border: 3px solid #2E7D32; }
        .ads-landing .step-num.s4 { background: #F3E5F5; color: #7B1FA2; border: 3px solid #7B1FA2; }
        .ads-landing .step-item h4 { font-size: 16px; font-weight: 700; color: #0B1D3A; margin-bottom: 8px; }
        .ads-landing .step-item p { font-size: 14px; color: #475569; line-height: 1.5; }

        .ads-landing .streams { padding: 80px 0; background: #F8FAFC; }
        .ads-landing .streams .al-container { text-align: center; }
        .ads-landing .streams h2 { font-size: 36px; font-weight: 800; color: #0B1D3A; margin-bottom: 12px; }
        .ads-landing .streams .desc { font-size: 16px; color: #475569; margin-bottom: 48px; }
        .ads-landing .stream-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .ads-landing .stream-card {
          background: #FFFFFF; border-radius: 12px; padding: 36px 20px; border: 1.5px solid #E2E8F0;
          text-align: center; transition: all 0.3s ease; cursor: default;
        }
        .ads-landing .stream-card:hover { border-color: #2196F3; box-shadow: 0 4px 24px rgba(11,29,58,0.08); transform: translateY(-4px); }
        .ads-landing .stream-card .s-icon { font-size: 40px; margin-bottom: 16px; }
        .ads-landing .stream-card h4 { font-size: 17px; font-weight: 700; color: #0B1D3A; margin-bottom: 8px; }
        .ads-landing .stream-card p { font-size: 13px; color: #475569; line-height: 1.5; }

        .ads-landing .testimonials { padding: 80px 0; background: #FFFFFF; }
        .ads-landing .testimonials .al-container { text-align: center; }
        .ads-landing .testimonials h2 { font-size: 36px; font-weight: 800; color: #0B1D3A; margin-bottom: 48px; }
        .ads-landing .testi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; text-align: left; }
        .ads-landing .testi-card {
          background: #F8FAFC; border-radius: 12px; padding: 32px; border: 1px solid #E2E8F0; position: relative;
        }
        .ads-landing .testi-card .stars { color: #F59E0B; font-size: 16px; margin-bottom: 12px; }
        .ads-landing .testi-card .quote { font-size: 15px; line-height: 1.7; color: #475569; margin-bottom: 20px; font-style: italic; }
        .ads-landing .testi-card .author { font-size: 14px; font-weight: 700; color: #0B1D3A; }
        .ads-landing .testi-card .role { font-size: 12px; color: #94A3B8; }

        .ads-landing .final-cta {
          padding: 80px 0; background: linear-gradient(135deg, #0B1D3A, #0D2B5E);
          text-align: center; color: #FFFFFF; position: relative; overflow: hidden;
        }
        .ads-landing .final-cta::before {
          content: ''; position: absolute; top: 50%; left: 50%; width: 600px; height: 600px;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, rgba(255,109,0,0.08) 0%, transparent 70%); border-radius: 50%;
        }
        .ads-landing .final-cta .al-container { position: relative; z-index: 2; }
        .ads-landing .final-cta h2 { font-size: 40px; font-weight: 800; margin-bottom: 16px; }
        .ads-landing .final-cta h2 span { color: #FF9100; }
        .ads-landing .final-cta p { font-size: 18px; color: rgba(255,255,255,0.7); margin-bottom: 32px; max-width: 560px; margin-left: auto; margin-right: auto; }
        .ads-landing .final-cta .btn-primary { font-size: 18px; padding: 18px 48px; }

        .ads-landing .al-footer {
          background: #F8FAFC; padding: 32px 0; text-align: center; border-top: 1px solid #E2E8F0;
        }
        .ads-landing .footer-logo { font-family: 'Outfit', sans-serif; font-size: 20px; font-weight: 800; color: #0B1D3A; margin-bottom: 4px; }
        .ads-landing .footer-logo span { color: #FF6D00; }
        .ads-landing .footer-tagline { font-size: 12px; color: #94A3B8; margin-bottom: 12px; }
        .ads-landing .footer-links { display: flex; justify-content: center; gap: 24px; margin-bottom: 12px; }
        .ads-landing .footer-links a { font-size: 13px; color: #475569; text-decoration: none; }
        .ads-landing .footer-links a:hover { color: #1565C0; }
        .ads-landing .footer-copy { font-size: 12px; color: #94A3B8; }

        .ads-landing .floating-cta {
          display: none; position: fixed; bottom: 0; left: 0; right: 0;
          background: #FFFFFF; padding: 12px 16px; box-shadow: 0 -4px 20px rgba(0,0,0,0.1); z-index: 99;
        }
        .ads-landing .floating-cta .btn-primary { width: 100%; font-size: 15px; padding: 14px; }

        @media (max-width: 1024px) {
          .ads-landing .hero .al-container { grid-template-columns: 1fr; }
          .ads-landing .hero-content { text-align: center; }
          .ads-landing .hero-sub { margin: 0 auto 28px; }
          .ads-landing .hero-stats { justify-content: center; }
          .ads-landing .hero-trust { justify-content: center; }
          .ads-landing .form-card { max-width: 480px; margin: 0 auto; }
          .ads-landing .empathy .al-container { grid-template-columns: 1fr; }
          .ads-landing .empathy-left { text-align: center; }
          .ads-landing .pain-tags { justify-content: center; }
          .ads-landing .solution-cards { max-width: 500px; margin: 0 auto; }
        }
        @media (max-width: 768px) {
          .ads-landing .hero { padding: 40px 0 60px; }
          .ads-landing .hero h1 { font-size: 30px; }
          .ads-landing .hero-sub { font-size: 15px; }
          .ads-landing .hero-stats { gap: 20px; flex-wrap: wrap; }
          .ads-landing .hero-stat .num { font-size: 24px; }
          .ads-landing .feature-grid { grid-template-columns: 1fr; }
          .ads-landing .steps-row { grid-template-columns: 1fr 1fr; gap: 32px; }
          .ads-landing .steps-row::before { display: none; }
          .ads-landing .stream-grid { grid-template-columns: 1fr 1fr; }
          .ads-landing .testi-grid { grid-template-columns: 1fr; }
          .ads-landing .countdown-grid { gap: 8px; }
          .ads-landing .cd-box { padding: 12px 16px; min-width: 70px; }
          .ads-landing .cd-box .num { font-size: 28px; }
          .ads-landing .form-row { grid-template-columns: 1fr; }
          .ads-landing .floating-cta { display: block; }
          .ads-landing .final-cta h2 { font-size: 28px; }
          .ads-landing .what-is h2, .ads-landing .how-it-works h2, .ads-landing .streams h2, .ads-landing .testimonials h2 { font-size: 28px; }
          .ads-landing .empathy-left h2 { font-size: 28px; }
        }
        @media (max-width: 480px) {
          .ads-landing .hero h1 { font-size: 26px; }
          .ads-landing .hero-stats { gap: 12px; }
          .ads-landing .stream-grid { grid-template-columns: 1fr; }
          .ads-landing .steps-row { grid-template-columns: 1fr; }
        }

        .ads-landing .fade-up { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .ads-landing .fade-up.visible { opacity: 1; transform: translateY(0); }
      `}</style>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Outfit:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />

      <div className="ads-landing">
        {/* Topbar */}
        <div className="topbar">
          <span className="pulse-dot"></span>
          🎯 EM-MAT UG Exam — 18th May 2026 &nbsp;|&nbsp; <strong>Limited Seats</strong> — Register Now!
        </div>

        {/* Hero */}
        <section className="hero">
          <div className="al-container">
            <div className="hero-content">
              <div className="hero-badge">🎓 UG EM-MAT Exam 2026 · Registrations Open</div>
              <h1>Didn't Clear JEE or NEET?<br />Your Career <span>Isn't Over.</span></h1>
              <p className="hero-sub">
                Take the EM-MAT exam and unlock 1,000+ alternative college options across Engineering, Management, Medical & Design — with expert 1-on-1 career mentorship.
              </p>
              <div className="hero-stats">
                <div className="hero-stat"><div className="num">1,000+</div><div className="label">College Options</div></div>
                <div className="hero-stat"><div className="num">4</div><div className="label">Career Streams</div></div>
                <div className="hero-stat"><div className="num">1-on-1</div><div className="label">Career Mentorship</div></div>
              </div>
              <div className="hero-trust">✅ Trusted by students across Madhya Pradesh & beyond</div>
            </div>

            <div className="form-card">
              <h3 className="form-title">Register for EM-MAT Exam</h3>
              <p className="form-subtitle">Exam Date: <strong>18th May 2026</strong> · Limited Seats Available</p>
              <div className="seats-left">🔥 Only limited seats remaining — register now!</div>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label>Full Name *</label>
                  <input type="text" placeholder="Enter your full name" required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input type="tel" placeholder="+91 XXXXX XXXXX" required />
                  </div>
                  <div className="form-group">
                    <label>City *</label>
                    <input type="text" placeholder="Your city" required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input type="email" placeholder="you@email.com" required />
                </div>
                <div className="form-group">
                  <label>Which exam were you preparing for?</label>
                  <select>
                    <option>Select an option</option>
                    <option>JEE</option>
                    <option>NEET</option>
                    <option>Board Exams Only</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>What are you looking for?</label>
                  <select>
                    <option>Select an option</option>
                    <option>Alternative College Options</option>
                    <option>1-on-1 Career Mentorship</option>
                    <option>Details on the EM-MAT Exam</option>
                  </select>
                </div>
                <button type="submit" className="btn-primary">Register Now — Secure Your Seat →</button>
              </form>
              <p className="form-footer">🔒 Your information is secure. We'll never share your data.</p>
            </div>
          </div>
        </section>

        {/* Countdown */}
        <section className="countdown-section fade-up">
          <div className="al-container">
            <div className="countdown-label">Exam Countdown</div>
            <div className="countdown-grid">
              <div className="cd-box"><div className="num">{countdown.days}</div><div className="lbl">Days</div></div>
              <div className="cd-box"><div className="num">{countdown.hours}</div><div className="lbl">Hours</div></div>
              <div className="cd-box"><div className="num">{countdown.minutes}</div><div className="lbl">Minutes</div></div>
              <div className="cd-box"><div className="num">{countdown.seconds}</div><div className="lbl">Seconds</div></div>
            </div>
            <p className="exam-date-text">Exam Date: <strong>18th May 2026</strong> · Don't miss the registration window</p>
          </div>
        </section>

        {/* Empathy */}
        <section className="empathy fade-up">
          <div className="al-container">
            <div className="empathy-left">
              <h2>Board Exams Done.<br /><span>Now What?</span></h2>
              <p>We get it. After boards, the pressure to "figure it all out" feels overwhelming. JEE didn't go well? NEET score not as expected? That doesn't mean your career is stuck. Thousands of students face the same confusion every year — and Educate Me exists to show you there's always a path forward.</p>
              <div className="pain-tags">
                <span className="pain-tag">😰 Exam Stress</span>
                <span className="pain-tag">😕 Career Confusion</span>
                <span className="pain-tag">👨‍👩‍👦 Parental Pressure</span>
                <span className="pain-tag">🏃 Peer Competition</span>
                <span className="pain-tag">❓ Too Many Options</span>
              </div>
            </div>
            <div className="solution-cards">
              <div className="sol-card"><div className="icon">🎯</div><h4>Personalized Guidance</h4><p>1-on-1 career mentorship tailored to your strengths, interests & score</p></div>
              <div className="sol-card"><div className="icon">🏫</div><h4>1,000+ Colleges</h4><p>Discover alternative options you didn't even know existed</p></div>
              <div className="sol-card"><div className="icon">🧭</div><h4>Career Clarity</h4><p>Engineering, Medical, Management, Design — find what fits YOU</p></div>
              <div className="sol-card"><div className="icon">💡</div><h4>Competitive Edge</h4><p>EM-MAT score opens doors that JEE/NEET alone can't</p></div>
            </div>
          </div>
        </section>

        {/* What is EM-MAT */}
        <section className="what-is fade-up">
          <div className="al-container">
            <div className="section-tag">✦ ABOUT THE EXAM</div>
            <h2>What is the UG EM-MAT Exam?</h2>
            <p className="desc">The Educate Me Management Aptitude Test (EM-MAT) is your gateway to top colleges across India. One exam. Multiple career paths. Whether it's engineering, management, medicine, or design — EM-MAT gives you the platform to prove your potential.</p>
            <div className="feature-grid">
              <div className="feature-card"><div className="f-icon">📝</div><h4>Single Exam, Multiple Streams</h4><p>One test covers aptitude, logical reasoning & subject knowledge — valid across all major streams.</p></div>
              <div className="feature-card"><div className="f-icon">🏆</div><h4>Scholarship Opportunities</h4><p>Top scorers are eligible for merit-based scholarships at partner institutions.</p></div>
              <div className="feature-card"><div className="f-icon">💻</div><h4>Online & Offline Mode</h4><p>Appear from Bhopal office or take it online from anywhere in India.</p></div>
              <div className="feature-card"><div className="f-icon">🎓</div><h4>Accepted by 1,000+ Colleges</h4><p>Partner institutions across India recognize EM-MAT scores for direct admission.</p></div>
              <div className="feature-card"><div className="f-icon">📊</div><h4>Career Assessment Included</h4><p>Get a detailed aptitude report + career mapping with your exam results.</p></div>
              <div className="feature-card"><div className="f-icon">🤝</div><h4>Expert Mentorship</h4><p>Every registrant gets a complimentary 1-on-1 session with career counsellors.</p></div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="how-it-works fade-up">
          <div className="al-container">
            <div className="section-tag">✦ SIMPLE PROCESS</div>
            <h2>How It Works</h2>
            <div className="steps-row">
              <div className="step-item"><div className="step-num s1">1</div><h4>Register Online</h4><p>Fill the form above — takes 60 seconds</p></div>
              <div className="step-item"><div className="step-num s2">2</div><h4>Get Guidance</h4><p>Our counsellor calls you within 24 hours</p></div>
              <div className="step-item"><div className="step-num s3">3</div><h4>Appear for Exam</h4><p>Take EM-MAT on 18th May (online/offline)</p></div>
              <div className="step-item"><div className="step-num s4">4</div><h4>Get Admitted</h4><p>Receive college options matched to your profile</p></div>
            </div>
          </div>
        </section>

        {/* Streams */}
        <section className="streams fade-up">
          <div className="al-container">
            <div className="section-tag">✦ YOUR PATH, YOUR CHOICE</div>
            <h2>Explore Career Streams</h2>
            <p className="desc">EM-MAT covers all major UG career paths. Pick your stream — we'll guide you to the right college.</p>
            <div className="stream-grid">
              <div className="stream-card"><div className="s-icon">⚙️</div><h4>Engineering</h4><p>B.Tech, B.E. & more — Computer Science, Mechanical, Civil, Electronics</p></div>
              <div className="stream-card"><div className="s-icon">📈</div><h4>Management</h4><p>BBA, B.Com, Integrated MBA — Finance, Marketing, HR & more</p></div>
              <div className="stream-card"><div className="s-icon">🏥</div><h4>Medical & Allied</h4><p>MBBS alternatives, BDS, Pharmacy, Nursing, Physiotherapy & more</p></div>
              <div className="stream-card"><div className="s-icon">🎨</div><h4>Design & Creative</h4><p>B.Des, Animation, Fashion, Interior Design, UX/UI & more</p></div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="testimonials fade-up">
          <div className="al-container">
            <div className="section-tag">✦ STUDENT STORIES</div>
            <h2>Where Potential Became Progress</h2>
            <div className="testi-grid">
              <div className="testi-card">
                <div className="stars">★★★★★</div>
                <p className="quote">"I scored low in JEE but through EM-MAT, I got into a great B.Tech college in Bhopal. The mentorship session cleared all my confusion about branch selection."</p>
                <div className="author">Arjun S.</div>
                <div className="role">B.Tech Student, Bhopal</div>
              </div>
              <div className="testi-card">
                <div className="stars">★★★★★</div>
                <p className="quote">"My parents were worried after NEET results. Educate Me showed us BDS and Pharmacy options I didn't know about. Now I'm happily studying what I love."</p>
                <div className="author">Priya M.</div>
                <div className="role">BDS Student, Indore</div>
              </div>
              <div className="testi-card">
                <div className="stars">★★★★★</div>
                <p className="quote">"The career counselling was genuinely helpful — not just generic advice. They looked at my scores, interests, and budget to suggest the right colleges."</p>
                <div className="author">Rohit K.</div>
                <div className="role">BBA Student, Pune</div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="final-cta fade-up">
          <div className="al-container">
            <h2>Your Potential Deserves<br /><span>The Right Platform.</span></h2>
            <p>Register for the EM-MAT Exam today — it takes 60 seconds and could change your entire career trajectory.</p>
            <a href="#" className="btn-primary" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Register Now →</a>
          </div>
        </section>

        {/* Footer */}
        <footer className="al-footer">
          <div className="al-container">
            <div className="footer-logo">Educate<span>Me</span></div>
            <p className="footer-tagline">Where Potential Becomes Progress</p>
            <div className="footer-links">
              <a href="https://educate-me.in" target="_blank" rel="noopener noreferrer">Website</a>
              <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Register</a>
              <a href="mailto:info@educate-me.in">Contact</a>
            </div>
            <p className="footer-copy">© 2026 Educate Me. All rights reserved. | Bhopal, Madhya Pradesh</p>
          </div>
        </footer>

        {/* Floating CTA Mobile */}
        <div className="floating-cta">
          <a href="#" className="btn-primary" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Register for EM-MAT Exam — Secure Your Seat →</a>
        </div>
      </div>
    </>
  );
};

export default AdsLandingPage;
