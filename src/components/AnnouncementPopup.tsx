import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, ArrowRight, Trophy, Star, Gift } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const AnnouncementPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 20000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -50 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed top-20 inset-x-0 mx-auto md:inset-x-auto md:right-4 md:left-auto md:mx-0 z-50 w-[calc(100%-2rem)] max-w-md"
        >
          {/* Outer glow */}
          <motion.div
            animate={{ 
              boxShadow: [
                "0 0 20px rgba(249, 115, 22, 0.3)",
                "0 0 40px rgba(249, 115, 22, 0.5)",
                "0 0 20px rgba(249, 115, 22, 0.3)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-2xl"
          />
          
          <div className="relative bg-gradient-to-br from-hero-dark via-gray-900 to-hero-dark border border-primary/40 rounded-2xl overflow-hidden shadow-2xl">
            {/* Animated particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [-20, -120],
                    x: [0, (i % 2 === 0 ? 30 : -30)],
                    opacity: [0, 1, 0],
                    scale: [0.5, 1.2, 0.5]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: "easeOut"
                  }}
                  className="absolute bottom-0 w-3 h-3 bg-gradient-to-t from-primary to-amber-400 rounded-full"
                  style={{ left: `${10 + i * 12}%` }}
                />
              ))}
            </div>

            {/* Floating stars */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`star-${i}`}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3
                }}
                className="absolute"
                style={{
                  top: `${15 + i * 15}%`,
                  left: `${5 + i * 20}%`
                }}
              >
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              </motion.div>
            ))}

            {/* Rotating background ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-20 -right-20 w-40 h-40 border-2 border-primary/20 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-16 -left-16 w-32 h-32 border-2 border-orange-500/20 rounded-full"
            />

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:rotate-90 group"
            >
              <X className="w-4 h-4 text-white group-hover:text-primary transition-colors" />
            </button>

            {/* Content */}
            <div className="relative p-5 md:p-6">
              {/* Date Badge */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-center gap-2 mb-4"
              >
                <motion.div
                  animate={{ 
                    boxShadow: [
                      "0 0 10px rgba(249, 115, 22, 0.5)",
                      "0 0 25px rgba(249, 115, 22, 0.8)",
                      "0 0 10px rgba(249, 115, 22, 0.5)"
                    ]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="relative px-5 py-2 bg-gradient-to-r from-primary via-orange-500 to-amber-500 rounded-full"
                >
                  <span className="text-sm md:text-base font-extrabold text-white uppercase tracking-widest">
                    8th March 2026
                  </span>
                </motion.div>
              </motion.div>

              {/* Main Title with EM-MAT PG highlighted */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center mb-4"
              >
                <motion.div
                  animate={{ 
                    textShadow: [
                      "0 0 10px rgba(249, 115, 22, 0.5)",
                      "0 0 20px rgba(249, 115, 22, 0.8)",
                      "0 0 10px rgba(249, 115, 22, 0.5)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex items-center justify-center gap-3 mb-3"
                >
                  <Trophy className="w-6 h-6 text-amber-400" />
                  <h3 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-primary via-orange-400 to-amber-400 bg-clip-text text-transparent">
                    EM-MAT PG
                  </h3>
                  <Trophy className="w-6 h-6 text-amber-400" />
                </motion.div>
              </motion.div>

              {/* Tagline */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center mb-5"
              >
                <div className="relative inline-block">
                  <motion.div
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="relative"
                  >
                    <p className="text-lg md:text-xl font-bold text-white leading-snug">
                      High Merit, High Rewards
                    </p>
                    <motion.div
                      animate={{ 
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="mt-2 px-4 py-2 bg-gradient-to-r from-primary/20 via-orange-500/30 to-amber-500/20 rounded-lg border border-primary/40 bg-[length:200%_100%]"
                    >
                      <p className="text-sm md:text-base text-orange-200 font-medium">
                        Secure Your Scholarship for
                      </p>
                      <p className="text-base md:text-lg font-bold text-white">
                        PAN India Institutes
                      </p>
                      <p className="text-sm text-orange-300 font-semibold mt-1">
                        This March!
                      </p>
                    </motion.div>
                  </motion.div>

                  {/* Gift icon */}
                  <motion.div
                    animate={{ 
                      y: [0, -5, 0],
                      rotate: [-5, 5, -5]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute -top-2 -right-4"
                  >
                    <Gift className="w-6 h-6 text-amber-400" />
                  </motion.div>
                </div>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Link to="/em-mat">
                  <Button 
                    className="w-full bg-gradient-to-r from-primary via-orange-500 to-amber-500 hover:from-primary/90 hover:via-orange-500/90 hover:to-amber-500/90 text-white font-semibold py-3 rounded-xl group transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 relative overflow-hidden"
                    onClick={handleClose}
                  >
                    <motion.span
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                    />
                    <span className="relative flex items-center justify-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Register Now for EM-MAT
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </Link>
              </motion.div>

              {/* Bottom gradient bar */}
              <motion.div
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-orange-400 to-amber-400 bg-[length:200%_100%]"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnnouncementPopup;
