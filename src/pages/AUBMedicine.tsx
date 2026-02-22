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
  ArrowRight,
  Stethoscope,
  BookOpen,
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

const AUBMedicine = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section with Gradient */}
        <section className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(210,60%,12%)] via-[hsl(210,50%,18%)] to-[hsl(200,40%,25%)]" />
          {/* Floating shapes */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[hsl(200,60%,40%)]/10 rounded-full blur-3xl animate-float-delayed" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

          <div className="container mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center text-center"
            >
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-6"
              >
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-white/10 backdrop-blur-md border border-white/20 p-3 shadow-[0_0_60px_hsla(24,95%,62%,0.15)]">
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
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3"
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
                className="text-lg sm:text-xl text-[hsl(200,40%,70%)] font-medium tracking-wide mb-8"
              >
                <Stethoscope className="inline w-5 h-5 mr-2 text-primary" />
                School of Medicine
              </motion.p>

              {/* Quick stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap justify-center gap-4 sm:gap-8"
              >
                {[
                  { label: "CAAM-HP Accredited", icon: ShieldCheck },
                  { label: "ECFMG Certified", icon: Award },
                  { label: "US-Style Curriculum", icon: BookOpen },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white/80 text-sm"
                  >
                    <stat.icon className="w-4 h-4 text-primary" />
                    {stat.label}
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* University Intro */}
        <section className="py-16 md:py-20 px-4 sm:px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(210,60%,12%)] to-background" />
          <div className="container mx-auto max-w-5xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-6 sm:p-10 bg-card/80 backdrop-blur-md border border-border/50 shadow-[var(--shadow-soft)]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 rounded-full bg-gradient-to-b from-primary to-primary/40" />
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                    About AUB
                  </h2>
                </div>
                <div className="space-y-4 text-muted-foreground leading-relaxed text-base sm:text-lg">
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

        {/* Admission Process - Timeline Style */}
        <section className="py-16 md:py-20 px-4 sm:px-6 bg-muted/30">
          <div className="container mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
                Process of Admission
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Your step-by-step journey from application to arrival in Barbados
              </p>
            </motion.div>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical line (hidden on mobile, visible on md+) */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary/10" />

              <div className="space-y-6 md:space-y-0">
                {admissionSteps.map((step, index) => {
                  const isLeft = index % 2 === 0;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.08 }}
                      className={`md:flex md:items-center md:gap-8 ${
                        isLeft ? "md:flex-row" : "md:flex-row-reverse"
                      } relative md:py-4`}
                    >
                      {/* Card */}
                      <div className={`md:w-[calc(50%-2rem)] ${isLeft ? "md:text-right" : "md:text-left"}`}>
                        <Card className="p-4 sm:p-5 bg-card border border-border/50 hover:border-primary/30 hover:shadow-[var(--shadow-hover)] transition-all duration-300 group">
                          <div className={`flex items-center gap-4 ${isLeft ? "md:flex-row-reverse" : ""}`}>
                            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                              <step.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                            </div>
                            <div className="flex-1">
                              <span className="text-xs text-primary font-bold tracking-wider uppercase">
                                Step {index + 1}
                              </span>
                              <h3 className="text-sm sm:text-base font-semibold text-foreground">
                                {step.label}
                              </h3>
                            </div>
                          </div>
                        </Card>
                      </div>

                      {/* Center dot */}
                      <div className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-[var(--shadow-glow)] z-10 flex-shrink-0">
                        {index + 1}
                      </div>

                      {/* Spacer */}
                      <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Mentorship */}
        <section className="py-16 md:py-20 px-4 sm:px-6">
          <div className="container mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
                Mentorship Led By
              </h2>
              <p className="text-muted-foreground">Expert guidance for your medical career</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex justify-center"
            >
              <Card className="relative p-8 sm:p-10 bg-card border border-border/50 max-w-lg w-full text-center overflow-hidden group hover:shadow-[var(--shadow-hover)] transition-all duration-500">
                {/* Decorative gradient */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-500" />

                <div className="relative z-10">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto mb-5 ring-4 ring-primary/10 group-hover:ring-primary/20 transition-all duration-300">
                    {/* <Award className="w-12 h-2 text-primary" /> */}
                    <img src="./Dr.Eashaa-ahirwar.PNG" alt="" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-1">
                    Dr. Esha Ahirwar
                  </h3>
                  <p className="text-primary font-semibold mb-1 text-sm tracking-wider uppercase">
                    Director — Medical Education
                  </p>
                  <p className="text-muted-foreground text-sm mb-5">
                    ECFMG Certified
                  </p>
                  <div className="flex items-center justify-center gap-2 text-muted-foreground bg-muted/50 rounded-full px-5 py-2.5 mx-auto w-fit">
                    <Phone className="w-4 h-4 text-primary" />
                    <span className="text-sm">
                      Contact details shared upon inquiry
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Qualifications & Affiliations */}
        <section className="py-16 md:py-20 px-4 sm:px-6 bg-muted/30">
          <div className="container mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
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
              <Card className="p-6 sm:p-10 bg-card border border-border/50 shadow-[var(--shadow-soft)]">
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
                  The American University of Barbados (AUB) is licensed and
                  recognized by the Ministry of Education, Barbados, accredited
                  by the Caribbean Accreditation Authority for Education in
                  Medicine and other Health Professions (CAAM-HP), and listed in
                  the World Directory of Medical Schools. It operates a US-style
                  curriculum and is ECFMG certified, with clinical rotations
                  available in Barbados and the United States.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Licensed by Ministry of Education, Barbados",
                    "Accredited by CAAM-HP",
                    "Listed in World Directory of Medical Schools",
                    "ECFMG Certified",
                    "US-Style Curriculum",
                    "Clinical Rotations in USA & Caribbean",
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-primary/5 transition-colors duration-300"
                    >
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
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
