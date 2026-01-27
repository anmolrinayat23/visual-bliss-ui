import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, Sparkles, ArrowRight, Flame } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const AnnouncementPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Calculate time left until February 1st, 2026
  useEffect(() => {
    const targetDate = new Date('2026-02-01T00:00:00').getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

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

  const CountdownUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="relative group text-center">
      <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-3 md:p-4 border border-primary/50 shadow-lg min-w-[55px] md:min-w-[65px]">
        {/* Subtle glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent rounded-xl" />
        
        {/* Number - stable, no key-based remount */}
        <div className="relative z-10 text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
          {value.toString().padStart(2, '0')}
        </div>
      </div>
      
      <span className="block text-[10px] md:text-xs text-orange-300 mt-2 font-medium uppercase tracking-wider">
        {label}
      </span>
    </div>
  );

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
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [-20, -100],
                    x: [0, (i % 2 === 0 ? 20 : -20)],
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeOut"
                  }}
                  className="absolute bottom-0 w-2 h-2 bg-primary/60 rounded-full"
                  style={{ left: `${15 + i * 15}%` }}
                />
              ))}
            </div>

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
              {/* Header badge - Highlighted */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-center gap-2 mb-4"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Flame className="w-5 h-5 text-orange-400" />
                </motion.div>
                
                {/* Highlighted Badge */}
                <motion.div
                  animate={{ 
                    boxShadow: [
                      "0 0 10px rgba(249, 115, 22, 0.5)",
                      "0 0 20px rgba(249, 115, 22, 0.8)",
                      "0 0 10px rgba(249, 115, 22, 0.5)"
                    ]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="relative px-4 py-1.5 bg-gradient-to-r from-primary/20 via-orange-500/30 to-amber-500/20 rounded-full border border-primary/60"
                >
                  <span className="text-sm md:text-base font-extrabold text-white uppercase tracking-widest drop-shadow-[0_0_10px_rgba(249,115,22,0.8)]">
                    EM-MAT Round 1 PG
                  </span>
                </motion.div>
                
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                >
                  <Flame className="w-5 h-5 text-orange-400" />
                </motion.div>
              </motion.div>

              {/* Countdown Title */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center mb-5"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <h3 className="text-lg md:text-xl font-bold text-white">
                    Exam Starts In
                  </h3>
                </div>
                <p className="text-orange-300/70 text-xs">1st February 2026</p>
              </motion.div>

              {/* Countdown Timer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center justify-center gap-2 md:gap-3 mb-5"
              >
                <CountdownUnit value={timeLeft.days} label="Days" />
                <span className="text-2xl font-bold text-primary mt-[-20px]">:</span>
                <CountdownUnit value={timeLeft.hours} label="Hours" />
                <span className="text-2xl font-bold text-primary mt-[-20px]">:</span>
                <CountdownUnit value={timeLeft.minutes} label="Mins" />
                <span className="text-2xl font-bold text-primary mt-[-20px]">:</span>
                <CountdownUnit value={timeLeft.seconds} label="Secs" />
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <Link to="/em-mat">
                  <Button 
                    className="w-full bg-gradient-to-r from-primary via-orange-500 to-amber-500 hover:from-primary/90 hover:via-orange-500/90 hover:to-amber-500/90 text-white font-semibold py-2.5 rounded-xl group transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 relative overflow-hidden"
                    onClick={handleClose}
                  >
                    <motion.span
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                    />
                    <span className="relative flex items-center justify-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Register Now
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
