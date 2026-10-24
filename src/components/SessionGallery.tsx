import { motion } from "framer-motion";
import { Video, Users, MessageCircle, Presentation, Sparkles } from "lucide-react";

// Keep gallery files in the repository instead of relying on Lovable's
// platform-only /__l5e asset URLs. Vite fingerprints these files for builds.
import g1 from "@/assets/gallery/gallery_1.jpg";
import g2 from "@/assets/gallery/gallery_2.jpg";
import g3 from "@/assets/gallery/gallery_3.jpg";
import g4 from "@/assets/gallery/gallery_4.jpg";
import g5 from "@/assets/gallery/gallery_5.jpg";
import g6 from "@/assets/gallery/gallery_6.jpg";
import g8 from "@/assets/gallery/gallery_8.jpg";
import g9 from "@/assets/gallery/gallery_9.jpg";

type Session = {
  src: string;
  title: string;
  tag: string;
  icon: React.ComponentType<{ className?: string }>;
  span: string; // lg grid span
};

const sessions: Session[] = [
  { src: g2, title: "Live Classroom Session", tag: "Group Mentorship", icon: Users, span: "lg:col-span-8" },
  { src: g1, title: "Small Group Mentoring", tag: "Mentorship", icon: Users, span: "lg:col-span-4" },
  { src: g4, title: "Expert Guidance Call", tag: "One-on-One", icon: Video, span: "lg:col-span-4" },
  { src: g6, title: "One-on-One Counselling", tag: "One-on-One", icon: MessageCircle, span: "lg:col-span-4" },
  { src: g9, title: "Mindset & Career Workshop", tag: "Workshop", icon: Presentation, span: "lg:col-span-4" },
  { src: g8, title: "Full Batch Live Class", tag: "Group Mentorship", icon: Users, span: "lg:col-span-5" },
  { src: g5, title: "Batch Mentorship Class", tag: "Mentorship", icon: Users, span: "lg:col-span-4" },
  { src: g3, title: "Interactive Learning", tag: "Live Class", icon: Sparkles, span: "lg:col-span-3" },
];

const SessionGallery = () => {
  return (
    <section className="relative py-16 md:py-20 px-4 sm:px-6 overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50">
      {/* decorative glows */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full bg-orange-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-blue-200/40 blur-3xl" />

      <div className="container mx-auto max-w-7xl relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 text-orange-600 text-xs sm:text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            Inside Educate Me
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Glimpses of Our{" "}
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              Live Sessions
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Real moments from our mentorship classes, one-on-one guidance calls and
            career workshops — where students get personal attention every single day.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5">
          {sessions.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.12, ease: "easeOut" }}
              viewport={{ once: true, margin: "-60px" }}
              className={`${s.span} sm:col-span-1`}
            >
              <div className="group relative h-56 sm:h-60 md:h-64 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer ring-1 ring-gray-200 hover:ring-orange-300">
                <img
                  src={s.src}
                  alt={s.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                {/* gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/85 via-gray-900/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />
                {/* top chip */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur text-[11px] sm:text-xs font-semibold text-gray-800 shadow-sm">
                  <s.icon className="w-3.5 h-3.5 text-orange-500" />
                  {s.tag}
                </div>
                {/* bottom label */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-white font-semibold text-sm sm:text-base md:text-lg drop-shadow">
                    {s.title}
                  </h3>
                  <p className="text-orange-200 text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 mt-0.5">
                    Live from Educate Me sessions
                  </p>
                </div>
                {/* hover border glow */}
                <div className="absolute inset-0 rounded-2xl ring-2 ring-orange-400/0 group-hover:ring-orange-400/60 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SessionGallery;
