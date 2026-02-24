import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import {
  FileText,
  Upload,
  Users,
  CheckCircle,
  UserCheck,
  CreditCard,
  Globe,
  Plane,
  DollarSign,
  ClipboardList,
  Phone,
  Award,
  ShieldCheck,
  Stethoscope,
  BookOpen,
  FlaskConical,
  Target,
  Sparkles,
  GraduationCap,
  BriefcaseMedical,
  Compass,
  Gem,
  Lightbulb,
  Users2,
  Brain,
} from "lucide-react";
import { Card } from "@/components/ui/card";

const admissionSteps = [
  { icon: FileText, label: "Fill Application Form" },
  { icon: Upload, label: "Submit Academic Documents" },
  { icon: Users, label: "Admission Committee Review" },
  { icon: ClipboardList, label: "Admission Committee Decision" },
  { icon: CheckCircle, label: "Committee Acceptance" },
  { icon: UserCheck, label: "Student Decision" },
  { icon: CreditCard, label: "Student Acceptance Fee" },
  { icon: Globe, label: "Initiate Visa Documentation Process" },
  { icon: ShieldCheck, label: "Receive Visa" },
  { icon: DollarSign, label: "Full Semester Fee Submission" },
  { icon: Plane, label: "Travel to Barbados" },
];

const usps = [
  {
    icon: Stethoscope,
    title: "Integrated U.S. Clinical Exposure",
    desc: "Over 70 weeks of structured clinical training across Chicago teaching hospitals, offering students insights grounded in real U.S. healthcare environments.",
  },
  {
    icon: Compass,
    title: "Firsthand U.S. Licensing Navigation",
    desc: "Successfully navigated the U.S. medical licensing pathway — bringing practical clarity to exam preparation, sequencing, and long-term positioning.",
  },
  {
    icon: Target,
    title: "Competitive Application Strategy",
    desc: "Experience within performance-driven academic systems enables structured guidance on profile building, narrative development, and strategic differentiation.",
  },
  {
    icon: GraduationCap,
    title: "Founder-Led Mentorship Model",
    desc: "As Co-Founder of 4th Ventricle, delivers performance-oriented preparation frameworks rooted in disciplined academic methodology.",
  },
  {
    icon: Globe,
    title: "Cross-Border Academic Expertise",
    desc: "Education spanning the Caribbean and the United States, offering nuanced understanding of international medical pathways and global transitions.",
  },
  {
    icon: FlaskConical,
    title: "Research-Informed Advisory Perspective",
    desc: "Active involvement in research projects ranging from public health behavior to applied neutron-based analytical systems — enabling guidance for research-oriented candidates.",
  },
  {
    icon: BriefcaseMedical,
    title: "Institutional Awareness & Professional Positioning",
    desc: "Deep understanding of how residency programs evaluate applicants — translating into tailored, credibility-driven advisory strategies.",
  },
  {
    icon: Users2,
    title: "Leadership & Governance Experience",
    desc: "Background in student government and nonprofit financial leadership strengthens strategic thinking, organizational discipline, and systems-level mentorship.",
  },
  {
    icon: Brain,
    title: "Precision-Driven Preparation Approach",
    desc: "Focuses on clarity, sequencing, and intentional preparation — ensuring students are structured, not overwhelmed.",
  },
  {
    icon: Gem,
    title: "Boutique, High-Touch Advisory Structure",
    desc: "Selective, personalized mentorship model emphasizing long-term academic trajectory over transactional application services.",
  },
];

const AUBMedicine = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* ───────── HERO ───────── */}
        <section className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24">
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(210,60%,8%)] via-[hsl(210,50%,14%)] to-[hsl(24,40%,12%)]" />
          {/* Animated orbs */}
          <div className="absolute top-10 left-10 w-80 h-80 bg-primary/8 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[hsl(200,60%,40%)]/6 rounded-full blur-3xl animate-float-delayed" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary/4 rounded-full blur-3xl" />
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <div className="container mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center text-center"
            >
              {/* Logo with glow ring */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="mb-8 relative"
              >
                <div className="absolute inset-0 w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-primary/20 blur-2xl animate-pulse-ring" />
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-white/10 backdrop-blur-xl border-2 border-white/20 p-2.5 shadow-[0_0_80px_hsla(24,95%,62%,0.2)]">
                  <img
                    src="/aub.jpg"
                    alt="American University of Barbados Logo"
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-3 tracking-tight"
              >
                American University of{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[hsl(30,95%,58%)]">
                  Barbados
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg sm:text-xl text-[hsl(200,30%,70%)] font-medium tracking-widest uppercase mb-10"
              >
                <Stethoscope className="inline w-5 h-5 mr-2 text-primary" />
                School of Medicine
              </motion.p>

              {/* Stat pills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="flex flex-wrap justify-center gap-3 sm:gap-5"
              >
                {[
                  { label: "CAAM-HP Accredited", icon: ShieldCheck },
                  { label: "Listed in World Directory of Medical Schools", icon: Award },
                  { label: "US-Style Curriculum", icon: BookOpen },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white/90 text-sm font-medium hover:bg-white/10 transition-colors duration-300"
                  >
                    <stat.icon className="w-4 h-4 text-primary" />
                    {stat.label}
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ───────── ABOUT AUB ───────── */}
        <section className="py-16 md:py-24 px-4 sm:px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(210,60%,8%)] via-background to-background" />
          <div className="container mx-auto max-w-5xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-8 sm:p-12 bg-card/80 backdrop-blur-md border border-border/50 shadow-[var(--shadow-soft)] relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1.5 h-10 rounded-full bg-gradient-to-b from-primary to-primary/30" />
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                    About AUB
                  </h2>
                </div>
                <div className="space-y-5 text-muted-foreground leading-relaxed text-base sm:text-lg">
                  <p>
                    The American University of Barbados (AUB), School of Medicine,
                    is a globally recognized institution focused on creating the
                    next generation of healthcare professionals. Located in the
                    beautiful Caribbean island of Barbados, AUB offers an
                    affordable, accredited medical degree program with quality
                    clinical training in the USA and the Caribbean.
                  </p>
                  <p>
                    AUB follows a US-style curriculum and provides a highly
                    creative learning environment powered by advanced learning and
                    interactive technologies, including the Anatomage™ Table. The
                    university offers internationally recognized 4-year and
                    5½-year MD programmes taught entirely in English.
                  </p>
                  <p>
                    With clinical rotations available at affiliated hospitals in
                    the United States and the Caribbean, AUB prepares students to
                    practice medicine globally. The university is committed to
                    nurturing compassionate, skilled, and ethical physicians ready
                    to serve communities worldwide.
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* ───────── PROGRAMS OFFERED ───────── */}
        <section className="py-16 md:py-24 px-4 sm:px-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-[hsl(200,60%,40%)]/5 rounded-full blur-3xl" />

          <div className="container mx-auto max-w-6xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-4">
                Curriculum
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
                Programs Offered
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Two pathway options designed for different academic backgrounds
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 5½ Year MD Program */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="h-full bg-card border border-border/50 overflow-hidden hover:border-primary/30 hover:shadow-[var(--shadow-hover)] transition-all duration-300 group">
                  <div className="h-1.5 bg-gradient-to-r from-primary via-[hsl(30,95%,58%)] to-primary" />
                  <div className="p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                        <GraduationCap className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-foreground">5½ Year MD Program</h3>
                        <p className="text-xs text-primary font-semibold tracking-widest uppercase">For 10+2 Pass-outs</p>
                      </div>
                    </div>

                    {/* Phase: Pre Medical */}
                    <div className="mt-6">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <h4 className="text-sm font-bold text-foreground tracking-wide uppercase">Pre Medical Program</h4>
                        <span className="ml-auto text-xs text-muted-foreground bg-muted/60 px-2.5 py-0.5 rounded-full">4 semesters × 15 weeks</span>
                      </div>
                      <div className="grid grid-cols-4 gap-2 mb-4">
                        {["Semester I", "Semester II", "Semester III", "Semester IV"].map((s, i) => (
                          <div key={i} className="text-center py-2.5 px-1 rounded-lg bg-muted/50 border border-border/50 text-xs font-medium text-foreground group-hover:border-primary/20 transition-colors">
                            {s}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex justify-center my-2">
                      <div className="w-px h-6 bg-gradient-to-b from-primary to-primary/30" />
                    </div>

                    {/* Phase: Basic Science */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-[hsl(200,70%,50%)]" />
                        <h4 className="text-sm font-bold text-foreground tracking-wide uppercase">Basic Science Program</h4>
                        <span className="ml-auto text-xs text-muted-foreground bg-muted/60 px-2.5 py-0.5 rounded-full">5 semesters × 16 weeks</span>
                      </div>
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-2">
                        {["Semester I", "Semester II", "Semester III", "Semester IV", "Semester V"].map((s, i) => (
                          <div key={i} className="text-center py-2.5 px-1 rounded-lg bg-muted/50 border border-border/50 text-xs font-medium text-foreground">
                            {s}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex justify-center my-2">
                      <div className="w-px h-6 bg-gradient-to-b from-[hsl(200,70%,50%)] to-primary/30" />
                    </div>

                    {/* Phase: Clinical Science */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <h4 className="text-sm font-bold text-foreground tracking-wide uppercase">Clinical Science Program</h4>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                        <div className="py-3 px-4 rounded-lg bg-muted/50 border border-border/50 text-sm font-medium text-foreground text-center">
                          Core Rotation <span className="text-muted-foreground">(48 Weeks)</span>
                        </div>
                        <div className="py-3 px-4 rounded-lg bg-muted/50 border border-border/50 text-sm font-medium text-foreground text-center">
                          Elective Rotation <span className="text-muted-foreground">(24 Weeks)</span>
                        </div>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex justify-center my-2">
                      <div className="w-px h-6 bg-gradient-to-b from-green-500 to-primary/30" />
                    </div>

                    {/* Final */}
                    <div className="text-center space-y-2">
                      <div className="inline-block px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary/15 to-[hsl(30,95%,58%)]/15 border border-primary/20 text-foreground font-bold text-sm">
                        🎓 Earn your MD Degree
                      </div>
                      <div className="flex justify-center">
                        <div className="w-px h-4 bg-primary/30" />
                      </div>
                      <span className="inline-block text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">USMLE Step-3</span>
                      <div className="flex justify-center">
                        <div className="w-px h-4 bg-primary/30" />
                      </div>
                      <div className="inline-block px-5 py-2.5 rounded-xl bg-gradient-to-r from-green-500/15 to-green-600/15 border border-green-500/20 text-green-700 dark:text-green-400 font-bold text-sm">
                        🏥 Residency in USA
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* 4 Year MD Program */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="h-full bg-card border border-border/50 overflow-hidden hover:border-primary/30 hover:shadow-[var(--shadow-hover)] transition-all duration-300 group">
                  <div className="h-1.5 bg-gradient-to-r from-[hsl(200,70%,50%)] via-primary to-[hsl(200,70%,50%)]" />
                  <div className="p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[hsl(200,70%,50%)]/20 to-[hsl(200,70%,50%)]/5 flex items-center justify-center">
                        <GraduationCap className="w-6 h-6 text-[hsl(200,70%,50%)]" />
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-foreground">4 Year MD Program</h3>
                        <p className="text-xs text-[hsl(200,70%,50%)] font-semibold tracking-widest uppercase">For College Graduates</p>
                      </div>
                    </div>

                    {/* No Pre Medical */}
                    <div className="mt-6 mb-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-muted-foreground/40" />
                        <h4 className="text-sm font-bold text-muted-foreground tracking-wide uppercase">Pre Medical Program</h4>
                        <span className="ml-auto text-xs font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">Not Required</span>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex justify-center my-2">
                      <div className="w-px h-6 bg-gradient-to-b from-muted-foreground/20 to-[hsl(200,70%,50%)]" />
                    </div>

                    {/* Phase: Basic Science */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-[hsl(200,70%,50%)]" />
                        <h4 className="text-sm font-bold text-foreground tracking-wide uppercase">Basic Science Program</h4>
                        <span className="ml-auto text-xs text-muted-foreground bg-muted/60 px-2.5 py-0.5 rounded-full">5 semesters × 16 weeks</span>
                      </div>
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-2">
                        {["Semester I", "Semester II", "Semester III", "Semester IV", "Semester V"].map((s, i) => (
                          <div key={i} className="text-center py-2.5 px-1 rounded-lg bg-muted/50 border border-border/50 text-xs font-medium text-foreground">
                            {s}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex justify-center my-2">
                      <div className="w-px h-6 bg-gradient-to-b from-[hsl(200,70%,50%)] to-green-500" />
                    </div>

                    {/* Phase: Clinical Science */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <h4 className="text-sm font-bold text-foreground tracking-wide uppercase">Clinical Science Program</h4>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                        <div className="py-3 px-4 rounded-lg bg-muted/50 border border-border/50 text-sm font-medium text-foreground text-center">
                          Core Rotation <span className="text-muted-foreground">(48 Weeks)</span>
                        </div>
                        <div className="py-3 px-4 rounded-lg bg-muted/50 border border-border/50 text-sm font-medium text-foreground text-center">
                          Elective Rotation <span className="text-muted-foreground">(24 Weeks)</span>
                        </div>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex justify-center my-2">
                      <div className="w-px h-6 bg-gradient-to-b from-green-500 to-primary/30" />
                    </div>

                    {/* Final */}
                    <div className="text-center space-y-2">
                      <div className="inline-block px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary/15 to-[hsl(30,95%,58%)]/15 border border-primary/20 text-foreground font-bold text-sm">
                        🎓 Earn your MD Degree
                      </div>
                      <div className="flex justify-center">
                        <div className="w-px h-4 bg-primary/30" />
                      </div>
                      <span className="inline-block text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">USMLE Step-3</span>
                      <div className="flex justify-center">
                        <div className="w-px h-4 bg-primary/30" />
                      </div>
                      <div className="inline-block px-5 py-2.5 rounded-xl bg-gradient-to-r from-green-500/15 to-green-600/15 border border-green-500/20 text-green-700 dark:text-green-400 font-bold text-sm">
                        🏥 Residency in USA
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───────── ADMISSION PROCESS ───────── */}
        <section className="py-16 md:py-24 px-4 sm:px-6 bg-muted/30 relative overflow-hidden">
          {/* Decorative */}
          <div className="absolute top-20 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />

          <div className="container mx-auto max-w-5xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-4">
                Step-by-Step
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
                Process of Admission
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Your journey from application to arrival in Barbados
              </p>
            </motion.div>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/40 to-primary/5" />

              <div className="space-y-5 md:space-y-0">
                {admissionSteps.map((step, index) => {
                  const isLeft = index % 2 === 0;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.07 }}
                      className={`md:flex md:items-center md:gap-8 ${
                        isLeft ? "md:flex-row" : "md:flex-row-reverse"
                      } relative md:py-4`}
                    >
                      <div className={`md:w-[calc(50%-2rem)] ${isLeft ? "md:text-right" : "md:text-left"}`}>
                        <Card className="p-4 sm:p-5 bg-card border border-border/50 hover:border-primary/40 hover:shadow-[var(--shadow-hover)] transition-all duration-300 group relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/0 to-primary/0 group-hover:from-primary/3 group-hover:to-primary/0 transition-all duration-500" />
                          <div className={`flex items-center gap-4 relative z-10 ${isLeft ? "md:flex-row-reverse" : ""}`}>
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:from-primary/25 transition-all duration-300">
                              <step.icon className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <span className="text-[10px] text-primary font-bold tracking-[0.2em] uppercase">
                                Step {index + 1}
                              </span>
                              <h3 className="text-sm sm:text-base font-semibold text-foreground">
                                {step.label}
                              </h3>
                            </div>
                          </div>
                        </Card>
                      </div>

                      {/* Center node */}
                      <div className="hidden md:flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-primary to-[hsl(30,95%,55%)] text-primary-foreground text-xs font-bold shadow-[var(--shadow-glow)] z-10 flex-shrink-0 ring-4 ring-background">
                        {index + 1}
                      </div>

                      <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ───────── MENTORSHIP — DR. ESHA ───────── */}
        <section className="py-16 md:py-24 px-4 sm:px-6 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/4 rounded-full blur-3xl" />

          <div className="container mx-auto max-w-6xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-4">
                Your Mentor
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
                Mentorship Led By
              </h2>
              <p className="text-muted-foreground">
                Expert guidance for your medical career
              </p>
            </motion.div>

            {/* Mentor Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <Card className="relative bg-card border border-border/50 overflow-hidden shadow-[var(--shadow-soft)]">
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-[hsl(30,95%,58%)] to-primary" />

                <div className="flex flex-col lg:flex-row">
                  {/* Photo Side */}
                  <div className="lg:w-2/5 relative bg-gradient-to-br from-[hsl(210,50%,10%)] to-[hsl(24,30%,12%)] flex items-center justify-center p-8 sm:p-12 min-h-[320px]">
                    {/* Decorative rings */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-64 h-64 rounded-full border border-primary/10 animate-spin-slow" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-80 h-80 rounded-full border border-white/5" />
                    </div>

                    <div className="relative z-10">
                      {/* Photo frame with glow */}
                      <div className="relative">
                        <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-primary/40 to-[hsl(30,95%,58%)]/40 blur-xl animate-pulse-ring" />
                        <div className="relative w-44 h-44 sm:w-52 sm:h-52 mx-auto rounded-full overflow-hidden ring-4 ring-primary/30 shadow-[0_0_60px_hsla(24,95%,62%,0.25)]">
                          <img
                            src="/Dr.Eashaa-ahirwar.PNG"
                            alt="Dr. Esha Ahirwar"
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Info Side */}
                  <div className="lg:w-3/5 p-8 sm:p-10 lg:p-12">
                    <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
                      Dr. Esha Ahirwar
                    </h3>
                    <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-2">
                      Director — Medical Education
                    </p>
                    <p className="text-xs text-muted-foreground mb-6">
                      ECFMG Certified · Foreign Medical Graduate · MP State Rank 5
                    </p>

                    <div className="space-y-4 text-muted-foreground text-sm sm:text-base leading-relaxed">
                      <p>
                        Dr. Esha Ahirwar is an internationally trained medical graduate whose academic foundation was shaped at the American University of Barbados, School of Medicine, where her education included integrated clinical rotations across multiple teaching hospitals in Chicago. This cross-border training provided her with direct exposure to the U.S. healthcare system and a nuanced understanding of global medical education pathways.
                      </p>
                      <p>
                        Having personally navigated U.S. licensing examinations and competitive academic transitions, she brings a clear understanding of the preparation, positioning, and discipline required for international advancement. Her perspective is informed not only by structured training, but by experience within high-performance academic environments.
                      </p>
                      <p>
                        As Co-Founder of <span className="text-foreground font-semibold">4th Ventricle</span>, a peer-driven medical learning platform, Dr. Esha has mentored students through structured exam preparation and strategic clinical progression. Through this work, she recognized that success is rarely a matter of potential — it is often a matter of clarity, direction, and informed guidance at pivotal stages.
                      </p>
                      <p>
                        Her advisory philosophy blends strategic precision with thoughtful mentorship. She focuses on simplifying complex processes, strengthening professional profiles, and aligning decisions with long-term academic vision. Whether guiding licensing preparation, international applications, or career planning, her commitment remains consistent: cultivating confidence through preparation and credibility through intention.
                      </p>
                    </div>

                    <div className="mt-6 flex items-center gap-2 text-muted-foreground bg-muted/50 rounded-full px-5 py-2.5 w-fit">
                      <Phone className="w-4 h-4 text-primary" />
                      <span className="text-sm">Contact details shared upon inquiry</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* ───────── USPs ───────── */}
        <section className="py-16 md:py-24 px-4 sm:px-6 bg-muted/30 relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

          <div className="container mx-auto max-w-6xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-4">
                Why Dr. Esha
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
                Unique Strengths & Expertise
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                What sets Dr. Esha Ahirwar's mentorship apart
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
              {usps.map((usp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                >
                  <Card className="h-full p-6 bg-card border border-border/50 hover:border-primary/30 hover:shadow-[var(--shadow-hover)] transition-all duration-300 group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/3 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10 flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:from-primary/25 transition-all duration-300">
                        <usp.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-bold text-foreground mb-1.5">
                          {usp.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {usp.desc}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── QUALIFICATIONS ───────── */}
        <section className="py-16 md:py-24 px-4 sm:px-6 relative overflow-hidden">
          <div className="absolute top-10 left-10 w-60 h-60 bg-primary/5 rounded-full blur-3xl" />

          <div className="container mx-auto max-w-5xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-4">
                Accreditations
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
                Qualification & Affiliation
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Globally recognized accreditations ensuring world-class medical education
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-8 sm:p-12 bg-card border border-border/50 shadow-[var(--shadow-soft)] relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-10">
                  The American University of Barbados (AUB) is licensed and
                  recognized by the Ministry of Education, Barbados, accredited
                  by the Caribbean Accreditation Authority for Education in
                  Medicine and other Health Professions (CAAM-HP), and listed in
                  the World Directory of Medical Schools. It operates a US-style
                  curriculum with clinical rotations
                  available in Barbados and the United States.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Licensed by Ministry of Education, Barbados",
                    "Accredited by CAAM-HP",
                    "Listed in World Directory of Medical Schools",
                    "US-Style Curriculum",
                    "Clinical Rotations in USA & Caribbean",
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, duration: 0.4 }}
                      className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all duration-300 group"
                    >
                      <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-sm sm:text-base text-foreground font-medium">
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AUBMedicine;
