// IQ Arena 2027 — display constants. The server (backend/config/iqArena.js) is the source of
// truth for the amount charged; these values are for display only and must be kept in sync.

export const IQ_ARENA = {
  eventName: "IQ Arena 2027",
  registrationFee: 149,
  platformCharge: 10,
  totalPayable: 159,
  eventDateISO: "2027-01-23T09:00:00+05:30",
  eventDateLabel: "23 January 2027",
  eventDay: "Saturday",
  mode: "Offline",
  venue: "Sparsh Business School, Noida",
  region: "Delhi NCR",
  organizer: "Educate Me",
  collaborationPartner: "Career Critics", // shown as "In association with"
  eventPartner: "Sparsh Business School",
  prizePool: 90000,
  contactEmail: "admissions@educate-me.in",
  contactPhone: "7974163158",
} as const;

export const REGISTER_PATH = "/iq-arena/register";
export const AUTH_REDIRECT_PATH = `/Auth?redirect=${encodeURIComponent(REGISTER_PATH)}`;

export const ASSESSMENT_PILLARS = [
  { key: "intel", title: "Intelligence & Analytical Thinking", text: "Break down problems, connect the dots and reason your way to sharp answers." },
  { key: "comm", title: "Confidence & Communication", text: "Speak with clarity, hold the room and make your point land." },
  { key: "subject", title: "Command over Subject & General Awareness", text: "Show depth in your field and a wide-angle view of the world." },
  { key: "mind", title: "Presence of Mind & Quick Decision-Making", text: "Think on your feet when the clock is ticking and the pressure is on." },
  { key: "persona", title: "Personality & Soft Skills", text: "Lead, collaborate and leave a lasting impression on the jury." },
] as const;

export const ROUNDS = [
  {
    no: "01",
    title: "The GD Battle",
    subtitle: "Group Discussion",
    tag: "Elimination Round",
    elimination: true,
    text: "Test your communication, perspective, confidence and ability to collaborate.",
  },
  {
    no: "02",
    title: "The Idea Stage",
    subtitle: "Bring Your Topic. Present Your Vision.",
    tag: "Presentation",
    elimination: false,
    text: "Present an idea or topic of your choice and impress the jury with your creativity and presentation skills.",
  },
  {
    no: "03",
    title: "The Business Challenge",
    subtitle: "Real-World Case Study",
    tag: "Case Study",
    elimination: false,
    text: "Analyze a real business situation, identify challenges and present practical solutions.",
  },
  {
    no: "04",
    title: "Pitch Yourself",
    subtitle: "Personal Branding",
    tag: "Elimination Round",
    elimination: true,
    text: "Showcase your personality, strengths, achievements and convince the jury why YOU stand out.",
  },
  {
    no: "05",
    title: "The Rapid Fire",
    subtitle: "Think Fast. Answer Smart.",
    tag: "Grand Finale",
    elimination: false,
    text: "A high-energy final round testing your presence of mind, knowledge, accuracy and quick thinking.",
  },
] as const;

export const PRIZES = [
  {
    rank: 2,
    position: "2nd Position",
    title: "Silver Winner",
    amount: 30000,
    perks: ["Cash prize awarded on the spot", "Silver Medal", "Memento & Certificate"],
  },
  {
    rank: 1,
    position: "1st Position",
    title: "The Ultimate Champion",
    amount: 50000,
    perks: ["Cash prize awarded on the spot", "Exclusive GOLD MEDAL", "THE EM-IQ ARENA CUP — the ultimate trophy!"],
  },
  {
    rank: 3,
    position: "3rd Position",
    title: "Bronze Winner",
    amount: 10000,
    perks: ["Cash prize awarded on the spot", "Bronze Medal", "Memento & Certificate"],
  },
] as const;

export const PERKS = [
  { key: "cert", title: "Participation Certificate", text: "Acknowledgement of your achievement and involvement." },
  { key: "goodies", title: "Exciting Goodies", text: "Special giveaways and event surprises." },
  { key: "brand", title: "Personal Branding Exposure", text: "Showcase your personality, ideas and communication skills." },
  { key: "industry", title: "Industry Interaction", text: "Engage with jury members and professionals from different organizations." },
  { key: "network", title: "Networking Opportunities", text: "Connect with ambitious students and future management professionals." },
  { key: "business", title: "Real-World Business Exposure", text: "Experience practical business challenges and problem-solving." },
  { key: "confidence", title: "Confidence Booster", text: "Challenge yourself through GDs, presentations, case studies and rapid-fire rounds." },
  { key: "social", title: "Social Media Spotlight", text: "Get opportunities to be featured in IQ ARENA's event coverage." },
  { key: "feedback", title: "Constructive Feedback", text: "Learn from jury observations and improve your professional presentation." },
  { key: "experience", title: "Unforgettable Experience", text: "Be part of a high-energy, brain-powered competition." },
] as const;

export const AFTER_PARTY = [
  { key: "refuel", title: "Refuel & Relax", text: "Refreshments for all participants." },
  { key: "campus", title: "Campus Takeover", text: "Explore the host university with a guided campus tour." },
  { key: "win", title: "The Big Win Moment", text: "Celebrate our champions at the grand award ceremony." },
  { key: "founders", title: "Founders Unplugged", text: "Got 100 questions about your Master's? Stop Googling everything! Join the founders of Career Critics & Educate Me for real conversations, honest answers, a little career reality check and a round table where no question is too awkward." },
  { key: "dj", title: "Let's Get Loud!", text: "Done exercising your brains? Now it's time to let loose! Join us at Sparsh Business School for an exclusive fun-filled experience packed with crazy activities, unexpected challenges, laughter and unlimited energy. No lectures, no case studies, no academics – just pure fun. And trust us, you don't want to miss this!" },
] as const;

export const FAQS = [
  {
    q: "Who can participate?",
    a: "Final-year undergraduate students, and students aspiring to pursue any Master's degree in 2027 across disciplines and specializations, who have not yet enrolled in a Master's programme.",
  },
  {
    q: "Where is the event?",
    a: `IQ Arena 2027 is an offline event in Delhi NCR, hosted at ${IQ_ARENA.venue}, on ${IQ_ARENA.eventDay}, ${IQ_ARENA.eventDateLabel}. Reporting time and the detailed venue address will be shared by email.`,
  },
  {
    q: "How do I register?",
    a: "Create an account or log in on www.educate-me.in, fill the IQ Arena registration form and complete the payment. Your registration is confirmed only after a successful payment.",
  },
  {
    q: "How much does it cost?",
    a: `The registration fee is ₹${IQ_ARENA.registrationFee} plus a ₹${IQ_ARENA.platformCharge} platform fee — ₹${IQ_ARENA.totalPayable} in total, paid securely online through Razorpay.`,
  },
  {
    q: "How are participants selected?",
    a: "Entries will be screened and shortlisted candidates will be invited to participate. Selected candidates will receive official communication from Educate Me.",
  },
  {
    q: "When will I get my confirmation?",
    a: "Immediately. As soon as your payment succeeds you will see your registration number on screen and receive a confirmation email.",
  },
  {
    q: "Can I register more than once?",
    a: "No. Only one registration is allowed per participant (per account, email and mobile number).",
  },
] as const;

export const TERMS: { title: string; points: string[] }[] = [
  {
    title: "Eligibility",
    points: [
      "IQ Arena 2027 is open to final-year undergraduate students and graduates who aspire to pursue a Master's degree in 2027 and have not yet enrolled in a Master's programme.",
      "The organisers may ask for proof of eligibility (college ID card, marksheet or provisional certificate) at any stage. Registrations found ineligible may be cancelled.",
    ],
  },
  {
    title: "Registration & Fees",
    points: [
      `The registration fee is ₹${IQ_ARENA.registrationFee} per form plus a platform fee of ₹${IQ_ARENA.platformCharge} (₹${IQ_ARENA.totalPayable} in total), payable online only.`,
      "A registration is confirmed only after a successful payment. Incomplete or unpaid forms are not considered registrations.",
      "Only one registration is permitted per participant. Duplicate registrations may be cancelled without notice.",
      "The registration and platform fees are non-refundable and non-transferable, except where the event is cancelled by the organisers.",
      "Participants must provide accurate information. Registrations with false or misleading details may be cancelled.",
    ],
  },
  {
    title: "Screening & Shortlisting",
    points: [
      "All entries will be screened. Only shortlisted candidates will be invited to participate in the competition rounds.",
      "Shortlisted candidates will receive official communication from Educate Me on their registered email address and/or mobile number.",
    ],
  },
  {
    title: "Offline Event & Attendance",
    points: [
      `IQ Arena 2027 is an OFFLINE event to be held on ${IQ_ARENA.eventDateLabel} at ${IQ_ARENA.venue} (${IQ_ARENA.region}). There is no online participation option.`,
      "Participants are responsible for their own travel, accommodation and expenses for attending the event.",
      "Participants must carry a valid college ID or government-issued photo ID along with their registration number. Entry may be refused without valid identification.",
      "Participants must report on time. Late arrivals may not be allowed to join rounds already in progress.",
    ],
  },
  {
    title: "Competition Rules & Conduct",
    points: [
      "The competition consists of five rounds, two of which (Round 01 and Round 04) are elimination rounds. The format, timing and scoring of rounds are decided by the organisers.",
      "The decision of the jury and the organisers on scoring, elimination and winners is final and binding. No correspondence will be entertained regarding results.",
      "Participants must maintain discipline and decorum at the venue. Misconduct, use of unfair means, plagiarism or any behaviour that disrupts the event will lead to disqualification without refund.",
      "Consumption of alcohol, smoking or any illegal substances at the venue is strictly prohibited.",
    ],
  },
  {
    title: "Prizes",
    points: [
      "Cash prizes of ₹50,000 (1st), ₹30,000 (2nd) and ₹10,000 (3rd), along with medals, mementos, certificates and the EM-IQ Arena Cup, will be awarded at the event.",
      "Prize distribution is subject to identity verification and applicable tax laws. Prizes are non-transferable.",
    ],
  },
  {
    title: "Media & Data Consent",
    points: [
      "By registering, participants consent to being photographed, recorded and featured in event coverage and promotional material by Educate Me, Career Critics and the event partner, including on social media.",
      "Information shared in the registration form will be used for managing the event and for communication about higher-education opportunities by Educate Me and Career Critics, as described in our Privacy Policy.",
    ],
  },
  {
    title: "General",
    points: [
      "The organisers reserve the right to modify the schedule, venue, rounds, prizes or these terms if required. Any changes will be communicated to registered participants by email.",
      "The organisers are not responsible for loss of or damage to personal belongings, or for any injury, during the event.",
      "In case of any event cancellation by the organisers, registered participants will be informed and refunded the fee paid.",
      `For queries, contact ${IQ_ARENA.contactEmail} or call ${IQ_ARENA.contactPhone}.`,
    ],
  },
];

// ─────────────── Form options (must match backend enums)

export const COLLEGE_YEAR_OPTIONS = ["Final Year", "Graduate"] as const;
export const MASTERS_AIM_OPTIONS = ["MBA", "MCA", "M.Tech", "MSc", "LLM", "Other"] as const;
export const ENTRANCE_EXAM_OPTIONS = ["CAT", "XAT", "MAT", "CMAT", "MHT-CET", "NMAT", "GATE", "Other"] as const;
export const GENDER_OPTIONS = ["Male", "Female", "Other", "Prefer not to say"] as const;
export const GRADUATION_YEAR_OPTIONS = Array.from({ length: 2027 - 2010 + 1 }, (_, i) => String(2027 - i));

export const INDIAN_STATES = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh",
  "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep",
  "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry",
  "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
  "West Bengal",
];

export const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;
